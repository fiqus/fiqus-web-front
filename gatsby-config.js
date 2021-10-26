module.exports = {
  siteMetadata: {
    siteUrl: "https://www.yourdomain.tld",
    title: "fiqus-web",
    menuLinks: [
      {
        name:"Home",
        link:"/"
      },
      {
        name:"Servicios",
        link:"/servicios"
      },
      {
        name:"Cultura",
        link:"/cultura"
      },
      {
        name:"Labs",
        link:"/labs"
      },
      {
        name:"Blog",
        link:"/blog"
      },
      {
        name:"Articles",
        link:"/articles"
      }
    ]
  },
  plugins: [
    "gatsby-plugin-styled-components",
    "gatsby-plugin-image",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-mdx",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    `gatsby-transformer-remark`,
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
      __key: "pages",
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `blog`,
        path: `${__dirname}/src/data/blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `labs`,
        path: `${__dirname}/src/data/labs`,
      },
    },
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve(`./src/components/layout/PageWrapper`),
      },
    },
    // It's really important that `gatsby-plugin-react-intl` is listed AFTER `gatsby-plugin-layout`
    {
      resolve: `gatsby-plugin-react-intl`,
      options: {
        // language JSON resource path
        path: `${__dirname}/src/intl`,
        // supported language
        languages: [`es`,`en`],
        // language file path
        defaultLanguage: `es`,
        // option to redirect to `/es` when connecting `/`
        redirect: true,
        // option for use / as defaultLangauge root path. if your defaultLanguage is `ko`, when `redirectDefaultLanguageToRoot` is true, then it will not generate `/ko/xxx` pages, instead of `/xxx`
        redirectDefaultLanguageToRoot: false,
        // paths that you don't want to genereate locale pages, example: ["/dashboard/","/test/**"], string format is from micromatch https://github.com/micromatch/micromatch
        ignoredPaths: [],
        // option to fallback to the defined language instead of the `defaultLanguage` if the user langauge is not in the list
        fallbackLanguage: `es`,
      },
    },
  
  ],
};
