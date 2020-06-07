import React, { ReactElement, useMemo } from "react";
import propTypes from "prop-types";
import { useWindowScroll } from "react-use";

import "./layout.less";
import Header from "@/components/header/header";
import bg from "@/images/rVtDsho.png";
import { Link } from "gatsby";

const THEME_COLOR = "#563d7c";
const TITLE = "ChenKS";
const DEFAULT_BACKGROUND_SRC = bg;

function Layout(props: {
  backgroundSrc: string;
  content: React.ReactElement;
  height: string;
  children: React.ReactElement | Array<ReactElement>;
}): React.ReactElement {
  const { backgroundSrc, content, height, children } = props;

  const { y } = useWindowScroll();

  const links = useMemo(
    () => [
      <Link className="link-item" to="/">
        Home
      </Link>,
      <Link className="link-item" to="/list">
        Archieves
      </Link>,
      <Link className="link-item" to="/about">
        About
      </Link>,
    ],
    []
  );

  return (
    <div id="app">
      <Header
        className="app-header"
        backgroundSrc={backgroundSrc}
        content={content}
        color={THEME_COLOR}
        height={height}
        title={TITLE}
        toTop={y < 30}
        links={links}
      />
      <div className="app-content-container">
        <div className="app-content">{children}</div>
      </div>
      <div className="app-footer">
        <div className="app-footer-content">footer</div>
      </div>
    </div>
  );
}

Layout.defaultProps = {
  backgroundSrc: DEFAULT_BACKGROUND_SRC,
  content: null,
  height: "600px",
  children: null,
};

Layout.propTypes = {
  backgroundSrc: propTypes.string,
  content: propTypes.element,
  height: propTypes.string,
  children: propTypes.oneOfType([
    propTypes.element,
    propTypes.arrayOf(propTypes.element),
  ]),
};

export default Layout;
