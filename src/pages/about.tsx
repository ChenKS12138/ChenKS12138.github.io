import React, { useCallback } from "react";
import { PageProps } from "gatsby";
import styled from "styled-components";

import { Layout } from "@/components/index";
import config from "@/app.config";

function About(props: PageProps) {
  const createAbout = useCallback(
    (children: React.ReactElement): React.ReactElement => (
      <Layout
        backgroundSrc={config.headerImages.about}
        height="500px"
        title="About"
      >
        <PageAboutWrapper>{children}</PageAboutWrapper>
      </Layout>
    ),
    []
  );
  const { name, avatar, intro, associations, links } = config;

  return createAbout(
    <AboutWrapper>
      <AvatarContainer>
        <Avatar src={avatar} alt="avatar" />
      </AvatarContainer>
      <NameContainer>{name}</NameContainer>
      <IntroContainer>
        {intro.map(introItem => (
          <IntroItem key={introItem}>{introItem}</IntroItem>
        ))}
      </IntroContainer>
      {associations && (
        <AssociationContainer>
          {associations.map(association => (
            <a target="_blank" href={association.url} key={association.url}>
              <AssociationItem alt={association.url} src={association.icon} />
            </a>
          ))}
        </AssociationContainer>
      )}
      {links && (
        <LinkContainer>
          <LinkContainerTitle>LINKS</LinkContainerTitle>
          <LinkContent>
            {links.map(link => (
              <LinkItem target="_blank" href={link.link} key={link.link}>
                <LinkItemImage src={link.avatar} alt="" />
                <LinkItemName>{link.name}</LinkItemName>
              </LinkItem>
            ))}
          </LinkContent>
        </LinkContainer>
      )}
    </AboutWrapper>
  );
}

const PageAboutWrapper = styled.div`
  margin-top: -20px;
`;

const AboutWrapper = styled.div`
  width: 960px;
  max-width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  margin-top: -100px;
`;

const AvatarContainer = styled.div`
  width: 160px;
  height: 160px;
`;

const Avatar = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12) !important;
`;

const NameContainer = styled.div`
  font-size: 1.75rem;
  color: #3c4858;
  line-height: 1.2;
  font-weight: 600;
  margin-top: 10px;
`;

const IntroContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

const IntroItem = styled.div`
  color: #3c4858;
  font-size: 1rem;
  line-height: 2.5;
  text-align: center;
  font-weight: 300;
`;

const AssociationContainer = styled.div`
  display: flex;
  margin-top: 30px;
`;

const AssociationItem = styled.img`
  width: 25px;
  height: 25px;
  margin: 0 5px;
`;

const LinkContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-top: solid 2px #808080;
  margin-top: 30px;
  padding-top: 30px;
`;

const LinkContainerTitle = styled.div`
  font-size: 20px;
  font-weight: 800;
  color: #3c4858;
  margin-bottom: 20px;
`;

const LinkContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const LinkItem = styled.a`
  text-decoration: none;
  display: flex;
  align-items: center;
  margin: 5px 5px;
`;

const LinkItemImage = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 15px;
  margin-right: 3px;
`;

const LinkItemName = styled.div`
  font-size: 1rem;
  color: #3c4858;
`;

export default About;
