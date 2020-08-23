import React, { useCallback } from "react";
import { graphql, PageProps, navigate } from "gatsby";
import useAxios from "axios-hooks";
import styled from "styled-components";

import Layout from "@/components/Layout";

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
          <HeaderContent>
            {responseData?.images[0]?.copyright || error || "loading..."}
          </HeaderContent>
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
`;
const ArchiveItemIntro = styled.div`
  font-size: 1rem;
  color: #3c4858;
  line-height: 1.5;
`;

const ArchiveItemOtherInfo = styled.div`
  margin-top: 10px;
  display: flex;
  align-items: center;
`;

const ArchiveItemMeta = styled.div`
  font-size: 1rem;
  color: #3c4858;
  line-height: 1.5;
  margin: 0 5px;
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
`;

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
