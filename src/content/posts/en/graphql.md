---
lang: en
type: "post"
title: "Knowing GraphQL"
author: "Jerónimo Clinaz"
slug: "/knowing_graphqL"
date: "2023-02-08"
image:  ../images/2023_Fiqus_GraphQL_Blog_blog ingles.jpg
imageCredits: "unsplash"
tags: ["GraphQL"]
---
# Knowing GraphQL

GraphQL defines two elements::

* A query language 

<img src="../images/Request_graphQL.jpg" />
* execution environment to respond to these queries through the specification of a typed schema that lists the data that the web service can deliver and the operations to respond to client requests. 


GraphQL allows developers to create queries to extract data from multiple sources in a single API call.


# GraphQL vs REST
<img src="../images/GraphQL_Rest.jpg" />
The main difference between the two architectures is that GraphQL is database independent and works by creating a single endpoint responsible for accepting queries, rather than relying on the REST API approach of having separate endpoints for each service. 

GraphQL is a client-oriented language. It has an architecture where the front-end application decides what data to fetch and how much the server should return. Meanwhile, when using REST, everything is designed on the server, so the server drives the architecture.

There are no over-fetching and under-fetching issues. One advantage of GraphQl over REST is that REST responses contain too much data or sometimes not enough, which creates the need for another request. GraphQL solves this problem by fetching only the exact and specific data in a single request.

But this is not a rivalry, they can be complementary! the way in which the execution environment that resolves the queries can access any kind of data source, such as a database ORM or 3rd party API calls.


# Why and when to use?

A good situation to use GraphQL is when:

* Your application needs to handle a large number of different queries and mutations, and a traditional REST API would be difficult to manage.
* Your application needs to handle a variety of different data types, and a GraphQL schema allows for better organization and documentation of the data.
* Your client-side application needs to have precise control over the data it receives from the server, and GraphQL allows for greater flexibility in data retrieval and querying.
* Your application is going to be used by other developers or third-party systems and you want to provide them with a clear and well-documented API.
* Your application needs to handle real-time updates and subscriptions, GraphQL provides native support for subscriptions which can help you implement this feature.


Reasons to use GraphQL:

* Flexibility: allows the client to request only the specific data it needs, avoiding data overload or underestimation.
* Strong typing: GraphQL provides a clear and easy to understand schema, allowing for better documentation and more robust error handling.
* Efficient: since the client can specify exactly what data it needs, multiple requests can often be combined into a single request.

Reasons not to use GraphQL:

* Learning curve: GraphQL has a steeper learning curve than REST, and developers may need to spend more time getting familiar with it.
* Caching: GraphQL does not have built-in caching mechanisms, which can make it more difficult to cache server responses.
* Overloading: if the client specifies too much data in its request, it can end up overloading, which can lead to performance issues.


# Pros and cons
Pros
* GraphQL is much faster than other communication APIs because it makes it easier to reduce requests by choosing only the specific fields you want to query.
* Complex systems and microservices. We can integrate multiple systems behind the GraphQL API. It unifies them and hides their complexity. The GraphQL server is also used to pull data from existing systems and package it into the GraphQL response format. This is very beneficial for legacy infrastructures or third-party APIs that are huge in size and difficult to maintain and manage. When we have to migrate from a monolithic backend application to a microservices architecture, the * GraphQL API can help us manage communication between multiple microservices by merging into a GraphQL schema.
* Define a form of data: When we make GraphQL request to the server, it returns the response in a simple, secure and predictable form. Thus, it makes it easy for you to write a specific query according to your requirement.
* Code sharing: We can share GraphQL fields used in multiple queries at a higher component level for reuse. This feature is known as fragments and allows you to get different data while keeping the same schema field.
* GraphQL is a strongly typed language where each level of a GraphQL query corresponds to a particular type, and each type describes a set of available fields. Therefore, it is similar to SQL and provides descriptive error messages before executing a query.
* Introspection: We can query a GraphQL server for its support types. It creates a powerful platform for tools and client software such as the framework, Relay, or IDEs such as GraphiQL. GraphiQL makes it easy for developers to learn and explore an API quickly.
* The latest version is not required. In GraphQL, the result set or data returned is very specific to the client query, so it is very simple and easy for the server to generalize it. When we add new product features, additional fields to the server, it does not affect the existing clients. You can use the previous server without any concern because the server fields may be obsolete but still work. This compatible process does not require the need for a growing version number. You can see that Facebook is using the same version of GraphQL API in their applications.

Cons
* Queries always return an HTTP status code of 200, regardless of whether the query was successful or not. If the query is unsuccessful, your JSON response will have a top-level "errors:" key with associated error messages and stacktrace. This can make it much more difficult to do error handling.
* Depending on your implementation, GraphQL may require different API management strategies than REST APIs, especially when pricing and frequency limits are taken into account.
* The flexibility and richness of the query language also adds complexity that may not be worthwhile for simpler APIs.



# Basic example:

For this example we will be using the [apollo](https://www.apollographql.com/docs/) library which gives us in this case a client for react and a server for nodeJS.
The schema defined will be a very simple schema of a blog where users can have associated posts

```html
type User {
  id: ID!
  name: String!
  lastName: String!
  emails: [String!]
  age: Int!
  posts: [Post]
}
type Post {
  id: ID!
  title: String!
  content: String!
}
type Query {
  user(id: ID!): User
  post(id: ID!): Post
  allUsers: [User]
  allPosts: [Post]
}
```
Server:
```html
const { ApolloServer, gql } = require('apollo-server');


// Definir tipos de datos y resolvers
const typeDefs = gql`
 type User {
   id: ID!
   name: String!
   lastName: String!
   emails: [String!]
   age: Int!
   posts: [Post]
 }
 type Post {
   id: ID!
   title: String!
   content: String!
 }
 type Query {
   user(id: ID!): User
   post(id: ID!): Post
   allUsers: [User]
   allPosts: [Post]
 }
`;


const users = [
 { name: 'John', lastName: 'Doe', emails: ['johndoe@example.com'], age: 30 },
 { name: 'Jane', lastName: 'Doe', emails: ['janedoe@example.com'], age: 25 },
];


const posts = [
 { id: '1', title: 'My first post', content: 'This is my first post' },
 { id: '2', title: 'My second post', content: 'This is my second post' },
];


const resolvers = {
 Query: {
   // En los resolvers podriamos hacer una llamada a una api de 3ros
   user: (_, { id }) => users.find((user) => user.id === id),
   post: (_, { id }) => posts.find((post) => post.id === id),
   allUsers: () => users,
   allPosts: () => posts,
 },
};


// Creamos la instancia del servidor
const server = new ApolloServer({ typeDefs, resolvers });

// Inicializamos el servidor
server.listen().then(({ url }) => {
 console.log(`Server ready at ${url}`);
});

```

React client

```html
import React from 'react';
import { ApolloClient, ApolloProvider, gql, useQuery } from '@apollo/client';


const client = new ApolloClient({
 uri: 'http://localhost:4000/graphql',
});


function User({ id }) {
 const { loading, error, data } = useQuery(gql`
   query User($id: ID!) {
     user(id: $id) {
       name
       lastName
       emails
       age
     }
   }
 `, { variables: { id } });


 if (loading) return <p>Loading...</p>;
 if (error) return <p>Error :(</p>;


 return (
   <div>
     <h2>{data.user.name} {data.user.lastName}</h2>
     <p>Age: {data.user.age}</p>
     <p>Emails: {data.user.emails.join(', ')}</p>
   </div>
 );
}


function App() {
 return (
   <ApolloProvider client={client}>
     <User id="1" />
   </ApolloProvider>
 );
}


export default App;
```
In this example, the User component uses the react-apollo hook useQuery to query the server for a specific user by ID. The ApolloProvider component is used to provide the client instance to the entire React application. When the component is rendered

# Some extras:

GraphQL was developed internally by Facebook in 2012 before being released publicly in 2015. On Nov. 7, 2018, the GraphQL project was transferred from Facebook to the newly established GraphQL Foundation, hosted by the Linux Foundation

GraphQL servers are available for multiple languages, including Haskell, Javascript, Perl, Python, Ruby, Java, C++,11 C#, Scala, Go, Rust, Elixir, Erlang, PHP, R, and Clojure.

Graphql documentation: https://graphql.org/learn/
Apollo documentation: https://www.apollographql.com/docs/
