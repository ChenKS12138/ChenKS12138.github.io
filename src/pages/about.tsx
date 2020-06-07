import React, { useCallback } from "react";
import { PageProps } from "gatsby";

import Layout from "@/layout/default/Layout";
import SEO from "@/components/seo/seo";
import config from "@/app.config";

import "./about.less";

function About(props: PageProps) {
  const createAbout = useCallback(
    (children: React.ReactElement): React.ReactElement => (
      <Layout>
        <SEO title="about" />
        <div className="page-about">{children}</div>
      </Layout>
    ),
    []
  );
  const { name, avatar, intro } = config;
  console.log(intro);

  return createAbout(
    <div className="about">
      <div className="avatar-container">
        <img className="avatar" src={avatar} alt="avatar" />
      </div>
      <div className="name-container">{name}</div>
      <div className="intro-container">
        {intro.map(introItem => (
          <div key={introItem} className="intro-item">
            {introItem}
          </div>
        ))}
      </div>
    </div>
  );
}

export default About;
