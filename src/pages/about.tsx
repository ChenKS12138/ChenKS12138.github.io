import React, { useCallback } from "react";
import { PageProps, Link } from "gatsby";

import Layout from "@/layout/default/Layout";
import config from "@/app.config";

import bg from "@/images/rVtDsho.png";

import "./about.less";

function About(props: PageProps) {
  const createAbout = useCallback(
    (children: React.ReactElement): React.ReactElement => (
      <Layout backgroundSrc={bg} height="500px" title="About|ChenKS">
        <div className="page-about">{children}</div>
      </Layout>
    ),
    []
  );
  const { name, avatar, intro, associations, links } = config;

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
      {associations && (
        <div className="association-container">
          {associations.map(association => (
            <a href={association.url} key={association.url}>
              <img
                className="association-item"
                alt={association.url}
                src={association.icon}
              />
            </a>
          ))}
        </div>
      )}
      {links && (
        <div className="links-container">
          <div className="links-container-title">LINKS</div>
          <div className="links-content">
            {links.map(link => (
              <a href={link.link} className="link-item" key={link.link}>
                <img src={link.avatar} alt="" className="link-item-image" />
                <div className="link-item-name">{link.name}</div>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default About;
