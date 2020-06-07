import React, { Props, useCallback } from "react";
import { Link, graphql, PageProps } from "gatsby";

import Layout from "@/layout/default/Layout";
import SEO from "@/components/seo/seo";

import "./index.less";

export default function Index(props: PageProps) {
  const { data } = props;

  const craeteIndex = useCallback(
    (children: React.ReactElement): React.ReactElement => (
      <Layout>
        <SEO title="homepage" />
        <div className="page-index">{children}</div>
      </Layout>
    ),
    []
  );

  // 无文章判断
  if (!(data as any)?.allMarkdownRemark?.nodes?.length)
    return craeteIndex(
      <div className="archieves-empty">
        <div className="archieves-empty-tip">暂无文章</div>
      </div>
    );

  return craeteIndex(
    <div className="archieves-container">
      {(data as any).allMarkdownRemark.nodes.map((item: any) => {
        const {
          id,
          excerpt,
          frontmatter: { date, index_img: indexImage, tags, title },
        } = item;
        const publicURL = indexImage?.publicURL;
        return (
          <Link to="/detail" style={{ textDecoration: "none" }}>
            <div className="archieve-item" key={id}>
              {publicURL && (
                <div
                  className="archieve-item-image"
                  style={{ backgroundImage: `url('${publicURL}')` }}
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
