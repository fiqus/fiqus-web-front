---
lang: es
type: "post"
title: "Spark Strucutred Streaming"
author: "Agustin Recouso"
slug: "/spark-structured-streaming"
date: "2022-01-24"
image:  ../images/sparkstrucutredstreaming.png
imageCredits: "unsplash"
tags: ["python", "spark", "big-data"]
---

# Creando una aplicacion con Spark Structured Streaming
### Codigo, configuraciones y consejos

[Apache Spark](https://spark.apache.org/) es un framework de programación open-source para procesar datos masivos o big data, de forma distribuida, diseñado para ser rápido, y tolerante a fallas.
Trabaja en memoria, con lo que se consigue mucha mayor velocidad de procesamiento.
Proporciona APIs para los lenguajes `Java`, `Scala`, `Python` y `R`.

Utiliza la evaluación perezosa (_lazy_), lo que significa es que todas las transformaciones que vamos realizando sobre los RDD o Dataframes, no se resuelven, si no que se van almacenando en un grafo acíclico dirigido (_llamado DAG_), y cuando ejecutamos una acción, es decir, cuando la herramienta no tenga más opción que realizar todas las transformaciones, será cuando se ejecuten

![image](../images/apache-spark-circulo.png)

Una de las más novedosas e interesantes funcionalidades de Spark es el [Structured Streaming](https://spark.apache.org/docs/latest/structured-streaming-programming-guide.html), que permite procesar datos de forma escalable, tolerante a fallos y continua.

La idea de Structure Streaming es procesar la data en tiempo real como si fuera una tabla que continuamente se actualiza con los nuevos valores, y permite realizar agregaciones sobre la misma.
Los datos deben mantener una estructura definida, y el beneficio es que se pueden realizar operaciones basadas en el tiempo para decidir si los valores se deben considerar o descartar.


Como ejemplo, para un proyecto debimos realizar unos cálculos en una ventana de las últimas 24 horas (sliding window), agregando los valores nuevos recibidos y descartando los viejos para obtener unas métricas que se actualizan cada 5 minutos.
Para esto utilizamos la funcionalidad de Structure Streaming de Spark corriendo en un EMR cluster en AWS.



![image](../images/so-apache-spark-in-theory-enough-show-me-the-code.jpeg)

Algunos ejemplos iniciales se puede encontrar en la [documentación de spark](https://spark.apache.org/docs/latest/structured-streaming-programming-guide.html)

Pero en la vida real suelen ser un poco más complejos, aquí les compartimos una versión simplificada de lo que hicimos:

```python
# imports
from datetime import datetime
from pyspark.sql.types import StructType, StringType, StructField, \
   DoubleType, BooleanType, IntegerType
from pyspark.sql import functions as F

# definicion de variables
hours_window = 24
sliding_window = 5
checkpoint_dir = 'hdfs:///checkpoint_folder/'

# funcion para crear tipos facilmente
def _get_types(types_dict):
   return StructType([(StructField(f_name, f_type, True)) for f_name, f_type in types_dict.items()])

# definimos los tipos para la data que recibiremos
LOGLINE_SCHEMA = _get_types({
   'timestamp': StringType(),
   'cost': DoubleType(),
   'clicks': DoubleType(),
})

# definimos del lector de streaming
logline_df = self.spark \
   .readStream \
   .schema(LOGLINE_SCHEMA) \
   .parquet('hdfs:///mydata/*')

# convertimos en timestamp para poder usar la funcion window
logline_df = logline_df.withColumn('timestamp', F.to_timestamp('timestamp'))


# agregamos definicion de watermark
logline_df = logline_df.withWatermark('timestamp', '1 minute')


# calculamos las metricas que nos interesan 
metrics_df = logline_df.groupBy(
   F.window(
      logline_df.timestamp, f'{hours_window} hours', 
      f'{sliding_window} minutes'
   ),
   logline_df.campaign_eid
) \
.agg(
   F.sum('cost').alias('cost'),
   F.sum('clicks').alias('clicks')
)


# iniciamos el proceso de streaming
query = metrics_df.writeStream \
   .option("checkpointLocation", checkpoint_dir) \
   .foreachBatch(collect_metrics_fn) \
   .outputMode('append') \
   .trigger(processingTime=f'{sliding_window} minutes') \
   .start()

# funcion llamada para cada iteracion (batch)
# aqui podemos manipular el df final que tendremos
def collect_metrics_fn(df, epoch_id):
   # agregamos una columna
   df = df.withColumn('timestamp', F.lit(datetime.now()))
   # escribimos el dataframe en HDFS en formato parquet
   df.write.mode('overwrite').parquet('hdfs:///output')
```

En el código podemos ver que en la función `.readStream`
definimos que vamos a leer archivos del tipo parquet desde el path local en `/mydata/`
En este ejemplo estamos leyendo desde los archivos distribuidos Hadoop (HDFS).

Más informacion acerca de HDFS:
https://hadoop.apache.org/docs/r1.2.1/hdfs_design.html



Con la definición de:
```python
   F.window(
      logline_df.timestamp, f'{hours_window} hours', 
      f'{sliding_window} minutes'
   )
``` 

creamos una ventana de tiempo sobre el campo timestamp de 24 horas (hours_window), que se va a desplazar cada 5 minutos.

Para comenzar con el procesamiento debemos llamar a la función `writeStream`.
La definición de la carpeta `checkpoint` es importante, ya que si nuestro trabajo de streaming falla o es deployado nuevamente, intentará primero iniciar el trabajo desde el último checkpoint guardado, sin tener que procesar todos los datos nuevamente; siempre y cuando no haya cambios la estructura de la query que rompan la compatibilidad con el checkpoint. De ser así, es necesario remover la carpeta *manualmente* antes de iniciar nuevamente el proceso.

El `outputMode`  define como queremos que las ventanas sean procesadas, con el modo `append` el resultado de cada ventana es escrito una sola vez, al finalizar el periodo definido en el `Watermark`, de esta forma cada ventana escrita es siempre final ya que no se espera que más datos puedan ingresar en esa ventana. 

A diferencia en el modo `update` si hay nuevos datos que entran en una ventana se re-escribe en el output la misma ventana.
Pueden ver más información en la [documentación de spark](https://spark.apache.org/docs/latest/structured-streaming-programming-guide.html#output-modes) sobre los `output mode` de las ventanas disponibles. 

Y finalmente en la sección `foreachBatch` se puede agregar una función para ser llamada en cada iteración donde se puede manipular, agregar más información y escribir el dataframe al destino y en el formato necesario. El parametro `epoch_id` sirve para identificar unívocamente cada iteración y tener una garantia de escribir los datos una sola vez si es necesario.

### Algunas configuraciones útiles para trabajos que corran por mucho tiempo
![image](../images/spark-defaults.png)

`spark.sql.streaming.minBatchesToRetain`

Esta configuración indica la cantidad mínima de checkpoints que se van a guardar para hacer un recovery en caso de que haya un error.
El default es 100, pero puede hacer crecer mucho la carpeta del checkpoint en caso de que sean muchos datos, por esto nosotros utilizamos un valor de 5.

`spark.cleaner.referenceTracking.cleanCheckpoints`

También esta configuración que por default está en false, cambiando a true elimina los checkpoints que se encuentran sin referencia.

`spark.default.parallelism`

Esto indica cuanto paralelismo puede tener un trabajo, lo cual depende del hardware provisionado. Mucho paralelismo hará que las tareas sean muy chicas y genere mucho overhead y poco hará que se sub-utilice los recursos de los executors.

Un cálculo simple para saber qué valor utilizar sería el siguiente:
`spark.default.parallelism = spark.executor.instances * spark.executors.cores * 2 (or 3)`

*Más configuraciones que podrían ser útiles para trabajos de Structure Streaming pueden ser encontradas aqui*
https://jaceklaskowski.gitbooks.io/spark-structured-streaming/content/spark-sql-streaming-properties.html

**Deployar una aplicación Spark en EMR con yarn**

`
aws emr add-steps --cluster-id ClusterID --steps Type=spark,Name=MyApp,Args=[--deploy-mode,cluster,--master,yarn,--conf,spark.yarn.submit.waitAppCompletion=False,--conf,spark.yarn.appMasterEnv.profile=$(profile),--py-files,s3://my-bucket/app-dependencies.zip,s3://my-bucket/my_app.py],ActionOnFailure=CONTINUE
`

Con el comando aws emr add-steps podemos agregar un step que va a crear una aplicación, y al elegir `waitAppCompletion=False` el step terminara al deployar, al ser un job de streaming idealmente no tendra una finalización.


Y con este parámetro:
`spark.yarn.appMasterEnv.profile`

Podemos pasar variables de entorno a la aplicación para su ejecución, como por ejemplo el profile (*staging / producción*), un ejemplo de como usar esa variable del código en python:

`PROFILE = os.getenv('profile', 'staging')`

**Spark structure streaming** es una gran herramienta pero requiere esfuerzo y conocimiento para poder obtener resultados satisfactorios. Esperamos que les sirva a los nuevos aventurados en el tema.
