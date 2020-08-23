import React, { useMemo, useState } from "react";
import { PageProps, graphql, navigateTo, navigate } from "gatsby";
import styled from "styled-components";

import Layout from "@/components/Layout";

import appConfig from "@/app.config";

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
            (prev, current) =>
              prev.concat(
                Array.isArray(current?.frontmatter?.tags)
                  ? current?.frontmatter?.tags
                  : []
              ),
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
      backgroundSrc={appConfig.headerImages.archives}
      height="500px"
      content={<HeaderContent>Archive</HeaderContent>}
      title="Archives"
    >
      <ListContainer>
        <TagsContainer>
          {tags.map(tag =>
            tag === currentTag ? (
              <TagSelected key={tag}>{tag}</TagSelected>
            ) : (
              <Tag
                key={tag}
                onClick={() => {
                  setCurrentTag(tag);
                }}
              >
                {tag}
              </Tag>
            )
          )}
        </TagsContainer>
        {currentTag === TAG_ALL && (
          <TotalCountContainer>Total:{totalCount}</TotalCountContainer>
        )}
        <GroupContainer>
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
              <Group key={group.year}>
                <GroupYear>{group.year}</GroupYear>
                <GroupNodesContainer>
                  {group.nodes.map(node => (
                    <Node
                      onClick={() => navigate(`/detail/${node.id}`)}
                      key={node.id}
                    >
                      <div>{node.title}</div>
                      <div>{node.MMDD}</div>
                    </Node>
                  ))}
                </GroupNodesContainer>
              </Group>
            )
          )}
        </GroupContainer>
      </ListContainer>
    </Layout>
  );
}

export default List;

const ListContainer = styled.div`
  box-sizing: border-box;
  width: 960px;
  max-width: 90%;
  margin: 0 auto;
`;

const TagsContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
`;

const Tag = styled.div`
  color: #3c4858;
  font-size: 1rem;
  line-height: 1.5;
  font-weight: 300;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
`;

const TagSelected = styled.div`
  background-color: #ff4f5e;
  color: #ffffff;
  border-radius: 0.25rem;
  padding: 0.5rem 1rem;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
`;

const TotalCountContainer = styled.div`
  margin-top: 1rem;
  font-weight: 300;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const GroupContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Group = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 20px auto;
`;

const GroupYear = styled.div`
  font-size: 1.25rem;
  font-weight: 500;
  line-height: 1.2;
  color: #3c4858;
`;

const GroupNodesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Node = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  color: #495057;
  cursor: pointer;
  padding: 0.75rem 1.25rem;
  font-weight: 300;
  font-size: 1rem;
`;

const HeaderContent = styled.div`
  font-size: 2rem;
  font-weight: 500;
  line-height: 1.2;
  color: #ffffff;
`;

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
