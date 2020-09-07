import React, { useMemo, useState } from "react";
import { PageProps, graphql, navigateTo, navigate } from "gatsby";
import styled from "styled-components";

import { Layout, Text, Space, DevideLine, BoxContainer } from "@/components";

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
      content={
        <Text fontSize="2rem" fontWeight="500" lineHeight="1.2" color="#ffffff">
          Archive
        </Text>
      }
      title="Archives"
    >
      <BoxContainer margin="0 auto" width="960px" maxWidth="90%">
        <Space flexWrap justify="start">
          {tags.map(tag => (
            <Space key={tag} direction="vertical">
              <BoxContainer
                onClick={() => {
                  setCurrentTag(tag);
                }}
                key={tag}
                padding="0.5rem 1rem"
                style={{
                  cursor: "pointer",
                  transition: "all 0.2s ease-in-out",
                }}
              >
                {tag === currentTag ? (
                  <TagSelected>
                    <BoxContainer padding="0.5rem 0.5rem">
                      <Text color="#ffffff">{tag}</Text>
                    </BoxContainer>
                  </TagSelected>
                ) : (
                  <BoxContainer padding="0.5rem 0.5rem">
                    <Text
                      color="#3c4858"
                      fontSize="1rem"
                      lineHeight="1.5"
                      fontWeight="300"
                    >
                      {tag}
                    </Text>
                  </BoxContainer>
                )}
              </BoxContainer>
            </Space>
          ))}
        </Space>
        {currentTag === TAG_ALL && (
          <BoxContainer marginTop="1rem" paddingBottom="1rem">
            <Text fontWeight="300" color="#3c4858">
              Total:{totalCount}
            </Text>
          </BoxContainer>
        )}
        <DevideLine
          width="100%"
          lineWidth="1px"
          lineStyle="solid"
          lineColor="rgba(0, 0, 0, 0.1)"
        />
        <Space direction="vertical" align="start">
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
              <BoxContainer margin="20px auto" width="100%" key={group.year}>
                <Space direction="vertical">
                  <Text
                    fontSize="1.25rem"
                    fontWeight="500"
                    lineHeight="1.2"
                    color="#3c4858"
                  >
                    {group.year}
                  </Text>
                  <Space direction="vertical" align="start">
                    {group.nodes.map(node => (
                      <BoxContainer
                        padding="0.75rem 1.25rem"
                        width="100%"
                        key={node.id}
                      >
                        <Space
                          style={{
                            cursor: "pointer",
                          }}
                          align="center"
                          onClick={() => navigate(`/detail/${node.id}`)}
                          justify="space-between"
                        >
                          <Text
                            color="#495057"
                            fontWeight="300"
                            fontSize="1rem"
                          >
                            {node.title}
                          </Text>
                          <Text
                            color="#495057"
                            fontWeight="300"
                            fontSize="1rem"
                          >
                            {node.MMDD}
                          </Text>
                        </Space>
                      </BoxContainer>
                    ))}
                  </Space>
                </Space>
              </BoxContainer>
            )
          )}
        </Space>
      </BoxContainer>
    </Layout>
  );
}

export default List;

const TagSelected = styled.div`
  background-color: #ff4f5e;
  border-radius: 0.25rem;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
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
