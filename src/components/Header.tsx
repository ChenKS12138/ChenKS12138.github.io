import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";

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
    <HeaderWrapper className={className} style={{ height }}>
      <HeaderNavigation
        style={{
          height: toTop ? "64px" : "50px",
          backgroundColor: toTop ? "transparent" : color,
        }}
      >
        <HeaderNavigationContent>
          <HeaderNavigationTitle to="/">{title}</HeaderNavigationTitle>
          <HeaderNavigationLinks>{links}</HeaderNavigationLinks>
        </HeaderNavigationContent>
      </HeaderNavigation>
      <HeaderContentContainer>
        <HeaderContentBg
          style={{ backgroundImage: `url("${backgroundSrc}")` }}
        />
        <HeaderContentContent>{content}</HeaderContentContent>
      </HeaderContentContainer>
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled.div`
  width: 100%;
  position: relative;
`;

const HeaderNavigation = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  transition: all 0.5s ease-in-out;
  z-index: 999;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  display: flex;
  align-items: center;
`;

const HeaderNavigationContent = styled.div`
  min-width: 80%;
  max-width: 850px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const HeaderNavigationTitle = styled(Link)`
  color: #ffffff;
  text-decoration: none;
  font-weight: 600;
  font-size: 20px;
`;

const HeaderNavigationLinks = styled.div`
  display: flex;
`;

const HeaderContentContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const HeaderContentBg = styled.div`
  width: 100%;
  height: 100%;
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;

  ::before {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 2;
    content: "";
  }
`;

const HeaderContentContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 4;
`;

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
