/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react";
import PropTypes from "prop-types";
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

function SEO(props: {
  description: string;
  lang: string;
  meta: Array<any>;
  title: string;
  themeColor: string;
}) {
  const { description, lang, meta, title, themeColor } = props;
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
  ].concat(meta);

  const links = imagesToPreload.map(image => ({
    href: image,
    rel: "preload",
    as: "image",
  }));

  return (
    <Helmet
      htmlAttributes={{
        lang,
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

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
  themeColor: PropTypes.string,
};

export default SEO;