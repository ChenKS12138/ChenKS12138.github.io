import React from "react";
import styled from "styled-components";

interface IAvatar {
  width?: number | string;
  height?: number | string;
  shadow?: boolean;
  src: string;
  alt: string;
}

export default styled.img`
  ${// width
  ({ width }: IAvatar) => {
    return width ? `width: ${width};` : "";
  }}
  ${// height
  ({ height }: IAvatar) => {
    return height ? `height: ${height};` : "";
  }}
  border-radius: 50%;
  ${// shadow
  ({ shadow }: IAvatar) => {
    return shadow
      ? `box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12) !important;`
      : "";
  }}
  @media (prefers-color-scheme: dark) {
    background-color: white;
  }
`;
