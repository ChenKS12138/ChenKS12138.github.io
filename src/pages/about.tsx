import React, { useCallback } from "react";
import { PageProps, Link } from "gatsby";

import {
  Layout,
  Text,
  Space,
  Avatar,
  DevideLine,
  BoxContainer,
} from "@/components";
import config from "@/app.config";

function About(props: PageProps) {
  const createAbout = useCallback(
    (children: React.ReactElement): React.ReactElement => (
      <Layout
        backgroundSrc={config.headerImages.about}
        height="500px"
        title="About"
      >
        <BoxContainer>
          <BoxContainer marginTop="-20px">
            <Space>{children}</Space>
          </BoxContainer>
        </BoxContainer>
      </Layout>
    ),
    []
  );
  const { name, avatar, intro, associations, links } = config;

  return createAbout(
    <BoxContainer marginTop="-100px" width="960px" maxWidth="90%">
      <Space direction="vertical" align="center">
        <Avatar width="160px" height="160px" src={avatar} alt="avatar" />
        <BoxContainer marginTop="10px">
          <Text fontSize="1.75rem" color="#3c4858" fontWeight="600">
            {name}
          </Text>
        </BoxContainer>
        <BoxContainer marginTop="20px">
          <Space direction="vertical" align="center">
            {intro.map(introItem => (
              <Text
                key={introItem}
                color="#3c4858"
                fontSize="1rem"
                lineHeight="2.5"
                fontWeight="300"
              >
                {introItem}
              </Text>
            ))}
          </Space>
        </BoxContainer>
        {associations && (
          <Space>
            {associations.map(association => (
              <Link target="_blank" to={association.url} key={association.url}>
                <BoxContainer margin="0 5px">
                  <Avatar
                    width="25px"
                    height="25px"
                    alt={association.url}
                    src={association.icon}
                  />
                </BoxContainer>
              </Link>
            ))}
          </Space>
        )}
        {links && (
          <>
            <DevideLine
              lineColor="#808080"
              lineStyle="solid"
              lineWidth="2px"
              width="100%"
            />
            <BoxContainer marginTop="15px">
              <Space direction="vertical" align="center">
                <BoxContainer marginBottom="20px">
                  <Text fontSize="20px" fontWeight="800" color="#3c4858">
                    LINKS
                  </Text>
                </BoxContainer>
                <Space align="center" wrap>
                  {links.map(link => (
                    <BoxContainer margin="5px 5px">
                      <Link
                        style={{ textDecoration: "none" }}
                        target="_blank"
                        to={link.link}
                        key={link.link}
                      >
                        <Space direction="horizontal" align="center">
                          <BoxContainer marginRight="3px">
                            <Avatar
                              width="30px"
                              height="30px"
                              src={link.avatar}
                              alt=""
                            />
                          </BoxContainer>
                          <Text fontSize="1rem" color="#3c4858">
                            {link.name}
                          </Text>
                        </Space>
                      </Link>
                    </BoxContainer>
                  ))}
                </Space>
              </Space>
            </BoxContainer>
          </>
        )}
      </Space>
    </BoxContainer>
  );
}

export default About;
