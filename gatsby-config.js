module.exports = {
  assetPrefix: `https://cdn.jsdelivr.net/gh/ChenKS12138/ChenKS12138.github.io/`,
  siteMetadata: {
    title: `ChenKS`,
    description: `Homepage|ChenKS`,
    author: `@ChenKS12138`,
    siteUrl: "https://blog.cattchen.top",
  },
  plugins: [
    "gatsby-plugin-cname",
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/posts`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `assets`,
        path: `${__dirname}/assets`,
      },
    },
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-highlight-code`,
            theme: "dracula",
            terminal: "carbon",
          },
        ],
      },
    },
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `ChenKS`,
        short_name: `ChenKS`,
        start_url: `/`,
        background_color: `#663399`,
        // theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/favicon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-less`,
    {
      resolve: `gatsby-plugin-typescript`,
      options: {
        isTSX: true, // defaults to false
        jsxPragma: `React`, // defaults to "React"
        allExtensions: true, // defaults to false
      },
    },
    `gatsby-plugin-purgecss`,
    `gatsby-plugin-split-css`,
  ],
};
