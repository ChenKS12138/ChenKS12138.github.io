/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react";
import { Helmet } from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";

import appConfig from "@/app.config";

// 需要preload的image
const imagesToPreload = [
  appConfig.headerImages.home,
  appConfig.headerImages.about,
  appConfig.headerImages.archives,
  appConfig.headerImages.detail,
  appConfig.avatar,
];

interface ISeo {
  title: string;
  description?: string;
  lang?: string;
  meta?: Array<any>;
  themeColor?: string;
}

function SEO({ description, lang, meta, themeColor, title }: ISeo) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `
  );

  const metaDescription = description || site.siteMetadata.description;

  const metas = [
    {
      name: `description`,
      content: metaDescription,
    },
    {
      property: `og:title`,
      content: title,
    },
    {
      property: `og:description`,
      content: metaDescription,
    },
    {
      property: `og:type`,
      content: `website`,
    },
    {
      name: `twitter:card`,
      content: `summary`,
    },
    {
      name: `twitter:creator`,
      content: site.siteMetadata.author,
    },
    {
      name: `twitter:title`,
      content: title,
    },
    {
      name: `twitter:description`,
      content: metaDescription,
    },
    {
      name: "theme-color",
      content: themeColor || "#ffffff",
    },
  ].concat(meta ?? []);

  const links = imagesToPreload.map(image => ({
    href: image,
    rel: "preload",
    as: "image",
  }));

  return (
    <Helmet
      htmlAttributes={{
        lang: lang ?? "zh",
      }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      meta={metas}
      link={links}
    />
  );
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
  themeColor: "#ffffff",
};
export default SEO;
