import React, { ReactElement, useMemo } from "react";
import { useWindowScroll } from "react-use";
import { Link } from "gatsby";

import Header from "@/components/header/header";
import { useImageColor } from "@/utils/customHooks";

import "normalize.css";

import "./layout.less";
import SEO from "@/components/seo/Seo";

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
      <Link className="link-item" to="/" key="homepage">
        Home
      </Link>,
      <Link className="link-item" to="/list" key="list">
        Archives
      </Link>,
      <Link className="link-item" to="/about" key="about">
        About
      </Link>,
    ],
    []
  );

  return (
    <div id="app">
      <SEO title={title} themeColor={headerColor} />
      <Header
        className="app-header"
        backgroundSrc={backgroundSrc}
        content={content}
        color={headerColor}
        height={height}
        title={TITLE}
        toTop={y < 30}
        links={links}
      />
      <div className="app-content-container">
        <div className="app-content">{children}</div>
      </div>
      {/* <footer className="app-footer">
        footer
      </footer> */}
    </div>
  );
}

Layout.defaultProps = {
  backgroundSrc: DEFAULT_BACKGROUND_SRC,
  content: null,
  height: "600px",
  children: null,
  title: "ChenKS",
};
export default Layout;
