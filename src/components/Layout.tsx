import React, { ReactElement, useMemo } from "react";
import { useWindowScroll } from "react-use";
import { Link } from "gatsby";
import styled from "styled-components";

import { Header, SEO, GlobalStyle } from "@/components";
import { useImageColor } from "@/utils";

import "normalize.css";

import appConfig from "@/app.config";

const ANALIZE_URL =
  "https://busuanzi.ibruce.info/busuanzi?jsonpCallback=BusuanziCallback_476857951214";

const THEME_COLOR = "#563d7c";
const TITLE = "ChenKS";
const DEFAULT_BACKGROUND_SRC = appConfig.headerImages.about;

interface ILayout {
  backgroundSrc: string;
  content: React.ReactElement;
  height: string;
  children: React.ReactElement | Array<ReactElement>;
  title: string;
}

function Layout({
  backgroundSrc,
  content,
  height,
  children,
  title,
}: ILayout): React.ReactElement {
  const { y } = useWindowScroll();
  // 主题色根据顶部图片颜色变化
  const headerColor = useImageColor(backgroundSrc);
  const links = useMemo(
    () => [
      <AppLinkItem to="/" key="homepage">
        Home
      </AppLinkItem>,
      <AppLinkItem to="/list" key="list">
        Archives
      </AppLinkItem>,
      <AppLinkItem to="/about" key="about">
        About
      </AppLinkItem>,
    ],
    []
  );

  return (
    <AppWrapper>
      <GlobalStyle />
      <SEO title={title} themeColor={headerColor} />
      <AppHeader
        backgroundSrc={backgroundSrc}
        content={content}
        color={headerColor}
        height={height}
        title={TITLE}
        toTop={y < 30}
        links={links}
      />
      <AppContentContainer>
        <AppContent>{children}</AppContent>
      </AppContentContainer>
      {/* <footer className="app-footer">
        footer
      </footer> */}
    </AppWrapper>
  );
}

const AppWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: rgb(235, 235, 235);
`;

const AppHeader = styled(Header)`
  width: 100%;
`;

const AppContentContainer = styled.div`
  position: relative;
  top: -50px;
  max-width: 90%;
  z-index: 4;
  margin: 0 auto;
  border-radius: 8px;
  background-color: rgb(255, 255, 255);
  box-shadow: 0 12px 15px 0 rgba(0, 0, 0, 0.24),
    0 17px 50px 0 rgba(0, 0, 0, 0.19);
`;

const AppContent = styled.div`
  max-width: 100%;
  min-height: 500px;
  padding: 20px;
  position: relative;
`;

const AppLinkItem = styled(Link)`
  user-select: none;
  color: white;
  font-size: 14px;
  text-decoration: none;
  margin: 0 5px;
`;

Layout.defaultProps = {
  backgroundSrc: DEFAULT_BACKGROUND_SRC,
  content: null,
  height: "600px",
  children: null,
  title: "ChenKS",
};
export default Layout;
