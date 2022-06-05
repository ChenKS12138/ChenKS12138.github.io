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
          "gatsby-remark-mermaid",
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
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.nodes.map(node => {
                const result = Object.assign({}, node.frontmatter, {
                  description: node.excerpt,
                  date: node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + node.fields.slug,
                  guid: site.siteMetadata.siteUrl + node.fields.slug,
                  image_url:
                    node.frontmatter.index_img &&
                    node.frontmatter.index_img.publicURL,
                  custom_elements: [
                    {
                      "content:encoded": node.html.replace(
                        /[^\x09\x0A\x0D\x20-\xFF\x85\xA0-\uD7FF\uE000-\uFDCF\uFDE0-\uFFFD]/gm,
                        ""
                      ),
                    },
                  ],
                });
                return result;
              });
            },
            query: `
              {
                allMarkdownRemark(
                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                  nodes {
                    excerpt
                    html
                    fields { 
                      slug 
                    }
                    frontmatter {
                      title
                      date
                      index_img {
                        publicURL
                      }
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "ChenKS RSS Feed",
            // optional configuration to insert feed reference in pages:
            // if `string` is used, it will be used to create RegExp and then test if pathname of
            // current page satisfied this regular expression;
            // if not provided or `undefined`, all pages will have feed reference inserted
            match: "^/blog/",
            // optional configuration to specify external rss feed, such as feedburner
            link: "https://blog.cattchen.top",
          },
        ],
      },
    },
    `gatsby-plugin-slug`,
  ],
};
