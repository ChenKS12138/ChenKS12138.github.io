import React from "react";
import { Link } from "gatsby";

import "./header.less";

interface IHeader {
  height: string;
  toTop: boolean;
  color: string;
  title: string;
  links: Array<React.ReactElement>;
  backgroundSrc: string;
  content: React.ReactElement;
  className: string;
}

function Header({
  height,
  toTop,
  color,
  title,
  links,
  backgroundSrc,
  content,
  className,
}: IHeader) {
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
      <div className="header-content-container">
        <div
          className="header-content-bg"
          style={{ backgroundImage: `url("${backgroundSrc}")` }}
        ></div>
        <div className="header-content-content">{content}</div>
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
export default Header;
