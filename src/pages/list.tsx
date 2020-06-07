import React from "react";
import { PageProps } from "gatsby";

import Layout from "@/layout/default/Layout";
import SEO from "@/components/seo/seo";

function List(props: PageProps) {
  return (
    <Layout>
      <SEO title="List" />
      <div>list</div>
    </Layout>
  );
}

export default List;
