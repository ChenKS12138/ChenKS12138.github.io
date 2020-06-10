import React, { Props, useCallback } from "react";
import { graphql, PageProps, navigate } from "gatsby";
import useAxios from "axios-hooks";

import Layout from "@/layout/default/Layout";

import "./index.less";

import appConfig from "@/app.config";

const BACKGROUND_BING_INFO =
  "https://jsonp.afeld.me/?url=http%3A%2F%2Fcn.bing.com%2FHPImageArchive.aspx%3Fformat%3Djs%26idx%3D0%26n%3D1";

export default function Index(props: PageProps) {
  const { data } = props;
  const [{ data: responseData, error }] = useAxios(BACKGROUND_BING_INFO);

  const createIndex = useCallback(
    (children: React.ReactElement): React.ReactElement => (
      <Layout
        backgroundSrc={appConfig.headerImages.home}
        content={
          <div className="index-header-content">
            {responseData?.images[0]?.copyright || error || "loading..."}
          </div>
        }
        title="HomePage"
      >
        <div className="page-index">{children}</div>
      </Layout>
    ),
    [responseData, error]
  );

  // 无文章判断
  if (!(data as any)?.allMarkdownRemark?.nodes?.length)
    return createIndex(
      <div className="archives-empty">
        <div className="archives-empty-tip">暂无文章</div>
      </div>
    );

  return createIndex(
    <div className="archives-container">
      {(data as any).allMarkdownRemark.nodes.map((item: any) => {
        const {
          id,
          excerpt,
          frontmatter: { date, index_img: indexImage, tags, title },
        } = item;
        const publicURL = indexImage?.publicURL;
        return (
          <div className="archive-item" key={id}>
            <div
              className="archive-item-content"
              onClick={() => navigate(`/detail/${id}`)}
            >
              {publicURL && (
                <div
                  className="archive-item-image"
                  style={{ backgroundImage: `url("${publicURL}")` }}
                />
              )}
              <div className="archive-item-right">
                <div className="archive-item-title">{title}</div>
                <div className="archive-item-intro">{excerpt}</div>
                <div className="archive-item-otherinfo">
                  <div className="archive-item-date">{date}</div>
                  <div className="archive-item-tags">{tags.join(" ")}</div>
                </div>
              </div>
            </div>
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