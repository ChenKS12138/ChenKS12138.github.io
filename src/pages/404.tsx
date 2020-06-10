import React from "react";

import Layout from "@/layout/default/Layout";
import SEO from "@/components/seo/Seo";

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <div
      style={{
        width: "960px",
        maxWidth: "80vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1>糟糕~没有找到这个页面 :(</h1>
      <p>似乎不能理解输入的路径，请点击回到主页查看更多的文章</p>
    </div>
  </Layout>
);

export default NotFoundPage;
