import React from "react";
import propTypes from "prop-types";
import { Link } from "gatsby";

import "./header.less";

function Header(props: {
  height: string;
  toTop: boolean;
  color: string;
  title: string;
  links: Array<React.ReactElement>;
  backgroundSrc: string;
  content: React.ReactElement;
  className: string;
}) {
  const {
    height,
    toTop,
    color,
    title,
    links,
    backgroundSrc,
    content,
    className,
  } = props;

  return (
    <div className={"header " + className} style={{ height }}>
      <div
        className="header-navigation"
        style={{
          height: toTop ? "64px" : "50px",
          backgroundColor: toTop ? "transparent" : color,
        }}
      >
        <div className="header-navigation-content">
          <Link to="/" className="header-navigation-title">
            {title}
          </Link>
          <div className="header-navigation-links">{links}</div>
        </div>
      </div>
      <div
        className="header-content"
        style={{ backgroundImage: `url('${backgroundSrc}')` }}
      >
        {content}
      </div>
    </div>
  );
}

Header.defaultProps = {
  toTop: true,
  color: "#563d7c",
  height: "500px",
  backgroundSrc: "",
  title: "Title",
  links: [],
  content: null,
  className: "",
};

Header.propTypes = {
  toTop: propTypes.bool,
  color: propTypes.string,
  height: propTypes.string,
  backgroundSrc: propTypes.string,
  title: propTypes.string,
  links: propTypes.arrayOf(propTypes.element),
  content: propTypes.element,
  className: propTypes.string,
};

export default Header;
