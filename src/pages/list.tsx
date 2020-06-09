import React, { useMemo, useState } from "react";
import { PageProps, graphql, navigateTo, navigate } from "gatsby";

import Layout from "@/layout/default/Layout";

import bg from "@/images/OLJxbaR.jpg";

import "./list.less";

interface FrontMatter {
  date: string;
  tags: Array<string>;
  title: string;
}

interface ArchiveItem {
  frontmatter: FrontMatter;
  id: string;
}

const TAG_ALL = "ALL";

function List(props: PageProps) {
  const { data } = props;
  const [currentTag, setCurrentTag] = useState(TAG_ALL);

  const totalCount: number = (data as any).allMarkdownRemark.totalCount;
  const nodes: Array<ArchiveItem> = (data as any).allMarkdownRemark.nodes;

  const tags = useMemo(
    () =>
      Array.from(
        new Set(
          nodes.reduce(
            (prev, current) => prev.concat(current.frontmatter.tags),
            [TAG_ALL]
          )
        )
      ),
    [nodes]
  );

  const groups = nodes.reduce((prevGroup, current) => {
    const {
      frontmatter: { date, title, tags },
      id,
    } = current;
    const [year, MMDD] = date.split(" ");
    const targetGroup = prevGroup.find(x => x.year === year);
    const currentNode = { MMDD, title, tags, id };

    if (currentTag !== TAG_ALL && !tags.includes(currentTag)) return prevGroup;

    if (targetGroup) {
      targetGroup.nodes.push(currentNode);
    } else {
      prevGroup.push({
        year,
        nodes: [currentNode],
      });
    }
    return prevGroup;
  }, []);

  return (
    <Layout
      backgroundSrc={bg}
      height="500px"
      content={<div className="list-header-content">Archive</div>}
      title="Archives|ChenKS"
    >
      <div className="list-container">
        <div className="tags-container">
          {tags.map(tag => (
            <div
              className={`tag ${tag === currentTag ? "tag-selected" : ""}`}
              key={tag}
              onClick={() => setCurrentTag(tag)}
            >
              {tag}
            </div>
          ))}
        </div>
        {currentTag === TAG_ALL && (
          <div className="total-count-container">Total:{totalCount}</div>
        )}
        <div className="group-container">
          {groups.map(
            (group: {
              year: string;
              nodes: Array<{
                id: string;
                title: string;
                tags: Array<string>;
                MMDD: string;
              }>;
            }) => (
              <div className="group" key={group.year}>
                <div className="group-year">{group.year}</div>
                <div className="group-nodes-container">
                  {group.nodes.map(node => (
                    <div
                      className="node"
                      onClick={() => navigate(`/detail/${node.id}`)}
                      key={node.id}
                    >
                      <div className="node-title">{node.title}</div>
                      <div className="node-date">{node.MMDD}</div>
                    </div>
                  ))}
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </Layout>
  );
}

export default List;

export const query = graphql`
  {
    allMarkdownRemark {
      totalCount
      nodes {
        id
        frontmatter {
          date(formatString: "YYYY MM-DD")
          tags
          title
        }
      }
    }
  }
`;
