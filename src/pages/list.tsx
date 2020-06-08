import React from "react";
import { PageProps } from "gatsby";

import Layout from "@/layout/default/Layout";
import SEO from "@/components/seo/Seo";

import bg from "@/images/OLJxbaR.jpg";

import "./list.less";

function List(props: PageProps) {
  return (
    <Layout backgroundSrc={bg}>
      <SEO title="List" />
      <div className="list-container">list</div>
    </Layout>
  );
}

export default List;
