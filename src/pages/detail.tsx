import React from "react";
import { PageProps } from "gatsby";

import Layout from "@/layout/default/Layout";
import SEO from "@/components/seo/seo";

function Detail(props: PageProps) {
  return (
    <Layout>
      <SEO title="Detail" />
      <div>detail</div>
    </Layout>
  );
}

export default Detail;
