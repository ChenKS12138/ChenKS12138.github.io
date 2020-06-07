import React from "react";
import { Link, graphql, PageProps } from "gatsby";

import Layout from "@/layout/default/Layout";
import SEO from "@/components/seo/seo";

function Index(props: PageProps) {
  return (
    <Layout>
      <SEO title="homepage" />
      <div style={{ height: "1000px" }}>homepage</div>
    </Layout>
  );
}

export default Index;

export const query = graphql`
  {
    allMarkdownRemark {
      totalCount
    }
  }
`;
