import React, { useCallback } from "react";
import { graphql, PageProps, navigate } from "gatsby";
import styled from "styled-components";

import { Layout } from "@/components";
import { useBingInfo } from "@/utils";
import appConfig from "@/app.config";

export default function Index(props: PageProps) {
  const { data } = props;
  const [responseData, error] = useBingInfo();

  const createIndex = useCallback(
    (children: React.ReactElement): React.ReactElement => (
      <Layout
        backgroundSrc={
          (responseData &&
            `https://cn.bing.com${responseData?.images?.[0].url}`) ??
          appConfig.headerImages.about
        }
        content={
          <HeaderContent>{responseData?.images?.[0]?.copyright}</HeaderContent>
        }
        title="HomePage"
      >
        <div>{children}</div>
      </Layout>
    ),
    [responseData, error]
  );

  // 无文章判断
  if (!(data as any)?.allMarkdownRemark?.nodes?.length)
    return createIndex(
      <ArchivesEmpty>
        <ArchivesEmptyTip>暂无文章</ArchivesEmptyTip>
      </ArchivesEmpty>
    );

  return createIndex(
    <ArchivesContainer>
      {(data as any).allMarkdownRemark.nodes.map((item: any) => {
        const {
          id,
          excerpt,
          frontmatter: { date, index_img: indexImage, tags, title },
        } = item;
        const publicURL = indexImage?.publicURL;
        return (
          <ArchiveItem key={id}>
            <ArchiveItemContent onClick={() => navigate(`/detail/${id}`)}>
              {publicURL && (
                <ArchiveItemImage
                  style={{ backgroundImage: `url("${publicURL}")` }}
                />
              )}
              <ArchiveItemRight>
                <ArchiveItemTitle>{title}</ArchiveItemTitle>
                <ArchiveItemIntro>{excerpt}</ArchiveItemIntro>
                <ArchiveItemOtherInfo>
                  <ArchiveItemMeta>{date}</ArchiveItemMeta>
                  <ArchiveItemMeta>
                    {Array.isArray(tags) ? tags.join(" ") : ""}
                  </ArchiveItemMeta>
                </ArchiveItemOtherInfo>
              </ArchiveItemRight>
            </ArchiveItemContent>
          </ArchiveItem>
        );
      })}
      <ArchiveItemMeta
        onClick={() => {
          navigate("/list");
        }}
        style={{ cursor: "pointer" }}
      >
        查看全部
      </ArchiveItemMeta>
    </ArchivesContainer>
  );
}

const ArchivesEmpty = styled.div`
  min-width: 80vw;
`;

const ArchivesEmptyTip = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #3c4858;
  font-weight: 600;
  font-size: 25px;
`;

const ArchivesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 960px;
  max-width: 100%;
`;

const ArchiveItem = styled.div`
  width: 100%;
  margin: 20px auto;
  padding-bottom: 30px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  @media (prefers-color-scheme: dark) {
    border-bottom-color: #6c757d;
  }
`;

const ArchiveItemContent = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: space-evenly;
  @media screen and (max-width: 770px) {
    flex-direction: column;
  }
`;

const ArchiveItemImage = styled.div`
  width: 30%;
  height: 160px;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  overflow: hidden;
  box-shadow: 0 12px 15px 0 rgba(0, 0, 0, 0.24),
    0 17px 50px 0 rgba(0, 0, 0, 0.19) !important;
  @media screen and (max-width: 770px) {
    width: 100%;
  }
  @media (prefers-color-scheme: dark) {
    background-color: white;
  }
`;

const ArchiveItemRight = styled.div`
  width: 65%;
  @media screen and (max-width: 770px) {
    width: 100%;
  }
`;

const ArchiveItemTitle = styled.div`
  color: #3c4858;
  font-weight: 700;
  font-size: 1.5rem;
  line-height: 2;
  @media (prefers-color-scheme: dark) {
    color: white;
  }
`;
const ArchiveItemIntro = styled.div`
  font-size: 1rem;
  color: #3c4858;
  line-height: 1.5;
  overflow: hidden;
  @media (prefers-color-scheme: dark) {
    color: white;
  }
`;

const ArchiveItemOtherInfo = styled.div`
  margin-top: 10px;
  display: flex;
  align-items: center;
  @media (prefers-color-scheme: dark) {
    color: #e9ecef;
  }
`;

const ArchiveItemMeta = styled.div`
  font-size: 1rem;
  color: #3c4858;
  line-height: 1.5;
  margin: 0 5px;
  @media (prefers-color-scheme: dark) {
    color: white;
  }
`;

const HeaderContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 20px;
  color: #ffffff;
  text-align: center;
  user-select: none;
  max-width: 80vw;
  width: 600px;
  font-weight: 300;
  @media (prefers-color-scheme: dark) {
    color: white;
  }
`;

export const query = graphql`
  {
    allMarkdownRemark(
      sort: { order: DESC, fields: frontmatter___date }
      limit: 15 # filter: { frontmatter: { tags: { nin: "leetcode" } } }
    ) {
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
