import React from "react";
import styled from "styled-components";

interface IText {
  color?: string;
  fontWeight?: number | string;
  fontSize?: string;
  lineHeight?: string;
  textDecoration?: string;
}

export default styled.span`
  ${
    // color
    ({ color }: IText) => {
      return color ? `color: ${color};` : "";
    }
  }
  ${
    // fontWeight
    ({ fontWeight }: IText) => {
      return fontWeight ? `font-weight: ${fontWeight};` : "";
    }
  }
  ${
    // fontSize
    ({ fontSize }: IText) => {
      return fontSize ? `font-size: ${fontSize};` : "";
    }
  }
  ${
    // lineHeight
    ({ lineHeight }: IText) => {
      return lineHeight ? `line-height: ${lineHeight};` : "";
    }
  }
  ${
    // textDecoration
    ({ textDecoration }: IText) => {
      return textDecoration ? `text-decoration: ${textDecoration};` : "";
    }
  }
  @media (prefers-color-scheme: dark) {
    color: white;
  }
`;
