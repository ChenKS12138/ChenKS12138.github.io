module.exports = {
  assetPrefix: `https://cdn.jsdelivr.net/gh/ChenKS12138/ChenKS12138.github.io/`,
  siteMetadata: {
    title: `ChenKS`,
    description: `Homepage|ChenKS`,
    author: `@ChenKS12138`,
    siteUrl: "https://blog.cattchen.top",
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    "gatsby-plugin-cname",
    {
      resolve: `gatsby-plugin-styled-components`,
      options: {
        // Add any options here
      },
    },
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
            resolve: `gatsby-remark-copy-linked-files`,
            options: {
              ignoreFileExtensions: [`png`, `jpg`, `jpeg`, `bmp`, `tiff`],
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: "language-",
              inlineCodeMarker: null,
              aliases: {},
              showLineNumbers: true,
              noInlineHighlight: true,
              languageExtensions: [
                {
                  language: "superscript",
                  extend: "javascript",
                  definition: {
                    superscript_types: /(SuperType)/,
                  },
                  insertBefore: {
                    function: {
                      superscript_keywords: /(superif|superelse)/,
                    },
                  },
                },
              ],
              prompt: {
                user: "root",
                host: "localhost",
              },
            },
          },
          // {
          //   resolve: `gatsby-remark-highlight-code`,
          //   theme: "dracula",
          //   terminal: "carbon",
          // },
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
    // {
    //   resolve: "gatsby-plugin-purgecss",
    //   options: {
    //     purgeCSSOptions: {
    //       safelist: ["markdown-body"],
    //     },
    //   },
    // },
    `gatsby-plugin-split-css`,
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        host: "https://blog.cattchen.top",
        sitemap: "https://blog.cattchen.top/sitemap.xml",
        policy: [{ userAgent: "*", allow: "/" }],
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      query: `
      {
        allSitePage {
          nodes {
            path
          }
        }
        site {
          host
          buildTime
        }
      }`,
      options: {
        sitemapSize: 5000,
      },
      resolveSiteUrl: ({ site, allSitePage }) => {
        //Alternatively, you may also pass in an environment variable (or any location) at the beginning of your `gatsby-config.js`.
        return site.site.host;
      },
      serialize: ({ site, allSitePage }) =>
        allSitePage.nodes.map(node => {
          return {
            url: `${site.site.host}${node.path}`,
            changefreq: `daily`,
            priority: 0.7,
            lastmod: site.site.buildTime,
          };
        }),
    },
  ],
};
