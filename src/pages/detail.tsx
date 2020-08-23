import React, { useCallback, useRef, useEffect } from "react";
import { PageProps } from "gatsby";
import styled from "styled-components";

import { Layout } from "@/components/index";

// 配置post主题
import DefaultTheme from "@/theme/DefaultTheme";

import appConfig from "@/app.config";

function Detail(props: PageProps) {
  const { pageContext } = props;
  const { date, headings, html, id, tags, title } = pageContext as any;

  const createDetail = useCallback(
    (children: React.ReactElement): React.ReactElement => (
      <Layout
        backgroundSrc={appConfig.headerImages.detail}
        height="400px"
        content={
          <DetailHeaderContent>
            <div>{title}</div>
            <DetailHeaderContentDate>{date}</DetailHeaderContentDate>
          </DetailHeaderContent>
        }
        title={title}
      >
        <DefaultTheme />
        {children}
      </Layout>
    ),
    []
  );

  return createDetail(
    <DetailContainer>
      <div
        className="post-content"
        dangerouslySetInnerHTML={{ __html: html }}
      ></div>
      <TagContainer>
        {Array.isArray(tags) &&
          tags.map((tag: string) => <Tag key={tag}>{tag}</Tag>)}
      </TagContainer>
      <CopyrightContainer>
        本博客所有文章除特别声明外，均采用 CC BY-SA 3.0协议 。转载请注明出处！
      </CopyrightContainer>
    </DetailContainer>
  );
}

const DetailContainer = styled.div`
  width: 960px;
  max-width: 100%;
  overflow-wrap: break-word;
`;

const CopyrightContainer = styled.div`
  max-width: 100%;
  margin: 0 4rem;
  padding: 10px;
  margin-top: 50px;
  background-color: #faf4e0;
  border-left-color: rgb(194, 164, 66);
  border-left-width: 6px;
  border-left-style: solid;
  border-radius: 5px;
  color: #3c4858;
  font-size: 20px;
  line-height: 30px;
  @media screen and (max-width: 770px) {
    margin: 40px 10px;
  }
`;

const TagContainer = styled.div`
  padding: 40px 4rem;
  border-top: solid 1px rgba(0, 0, 0, 0.1);
  @media screen and (max-width: 770px) {
    padding: 40px 10px;
  }
`;

const Tag = styled.span`
  background-color: #e0e0e0;
  font-weight: 800;
  padding: 0.25em 0.4em;
  border-radius: 0.125rem;
  font-size: 0.9rem;
  margin: 0 5px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  ::before {
    content: "# ";
  }
`;

const DetailHeaderContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 30px;
  color: #ffffff;
  text-align: center;
  user-select: none;
  max-width: 80vw;
  width: 600px;
  font-weight: 600;
`;

const DetailHeaderContentDate = styled.div`
  ont-weight: 400;
  font-size: 18px;
  margin-top: 30px;
`;

export default Detail;
