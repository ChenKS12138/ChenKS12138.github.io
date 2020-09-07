import React from "react";
import styled from "styled-components";

import { SEO, Layout, Space, BoxContainer } from "@/components";

function NotFoundPage() {
  return (
    <Layout>
      <SEO title="404: Not found" />
      <BoxContainer width="960px" maxWidth="80vw">
        <Space direction="vertical" align="center">
          <h1>糟糕~没有找到这个页面 :(</h1>
          <p>似乎不能理解输入的路径，请点击回到主页查看更多的文章</p>
        </Space>
      </BoxContainer>
    </Layout>
  );
}

export default NotFoundPage;
