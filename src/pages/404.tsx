import React from "react";

import Layout from "@/layout/default/Layout";
import SEO from "@/components/seo/Seo";

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <div style={{ width: "960px", maxWidth: "80vw" }}>
      <h1>NOT FOUND</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </div>
  </Layout>
);

export default NotFoundPage;
