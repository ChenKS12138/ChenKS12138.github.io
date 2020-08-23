import React from "react";
import styled from "styled-components";

import { GlobalStyle, SEO, Layout } from "@/components/index";

function NotFoundPage() {
  return (
    <Layout>
      <SEO title="404: Not found" />
      <NotFoundTextWrapper>
        <h1>糟糕~没有找到这个页面 :(</h1>
        <p>似乎不能理解输入的路径，请点击回到主页查看更多的文章</p>
      </NotFoundTextWrapper>
    </Layout>
  );
}

const NotFoundTextWrapper = styled.div`
  width: 960px;
  max-width: 80vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default NotFoundPage;
