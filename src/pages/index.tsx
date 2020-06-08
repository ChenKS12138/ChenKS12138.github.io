import React, { Props, useCallback } from "react";
import { Link, graphql, PageProps } from "gatsby";
import useAxios from "axios-hooks";

import Layout from "@/layout/default/Layout";
import SEO from "@/components/seo/Seo";

import "./index.less";

const BACKGROUND_BING = "https://open.saintic.com/api/bingPic/";

const BACKGROUND_BING_INFO =
  "https://jsonp.afeld.me/?url=http%3A%2F%2Fcn.bing.com%2FHPImageArchive.aspx%3Fformat%3Djs%26idx%3D0%26n%3D1";

export default function Index(props: PageProps) {
  const { data } = props;
  const [{ data: responseData, error }] = useAxios(BACKGROUND_BING_INFO);

  const createIndex = useCallback(
    (children: React.ReactElement): React.ReactElement => (
      <Layout
        backgroundSrc={BACKGROUND_BING}
        content={
          <div className="index-header-content">
            {responseData?.images[0]?.copyright || error || "loading..."}
          </div>
        }
      >
        <SEO title="homepage" />
        <div className="page-index">{children}</div>
      </Layout>
    ),
    [responseData, error]
  );

  // 无文章判断
  if (!(data as any)?.allMarkdownRemark?.nodes?.length)
    return createIndex(
      <div className="archieves-empty">
        <div className="archieves-empty-tip">暂无文章</div>
      </div>
    );

  return createIndex(
    <div className="archieves-container">
      {(data as any).allMarkdownRemark.nodes.map((item: any) => {
        const {
          id,
          excerpt,
          frontmatter: { date, index_img: indexImage, tags, title },
        } = item;
        const publicURL = indexImage?.publicURL;
        return (
          <div className="archieve-item" key={id}>
            <Link to={`/detail/${id}`} style={{ textDecoration: "none" }}>
              <div className="archieve-item-content">
                {publicURL && (
                  <div
                    className="archieve-item-image"
                    style={{ backgroundImage: `url("${publicURL}")` }}
                  />
                )}
                <div className="archieve-item-right">
                  <div className="archieve-item-title">{title}</div>
                  <div className="archieve-item-intro">{excerpt}</div>
                  <div className="archieve-item-otherinfo">
                    <div className="archieve-item-date">{date}</div>
                    <div className="archieve-item-tags">{tags.join(" ")}</div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export const query = graphql`
  {
    allMarkdownRemark(sort: { order: DESC, fields: frontmatter___date }) {
      nodes {
        id
        excerpt(pruneLength: 150, truncate: true)
        frontmatter {
          date(formatString: "YYYY-MM-DD")
          title
          tags
          index_img {
            publicURL
          }
        }
      }
    }
  }
`;
