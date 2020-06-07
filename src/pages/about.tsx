import React from "react";
import { PageProps } from "gatsby";

import Layout from "@/layout/default/Layout";
import SEO from "@/components/seo/seo";

function About(props: PageProps) {
  return (
    <Layout>
      <SEO title="About" />
      <div>about</div>
    </Layout>
  );
}

export default About;
