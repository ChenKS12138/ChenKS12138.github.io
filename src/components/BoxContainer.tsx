import React from "react";
import styled from "styled-components";

interface IBoxContainer {
  // margin
  margin?: string;
  marginTop?: string;
  marginBottom?: string;
  marginLeft?: string;
  marginRight?: string;

  // padding
  padding?: string;
  paddingTop?: string;
  paddingBottom?: string;
  paddingLeft?: string;
  paddingRight?: string;

  // border
  border?: string;
  borderTop?: string;
  borderBottom?: string;
  borderLeft?: string;
  borderRight?: string;

  // width & maxWidth
  width?: number | string;
  maxWidth?: number | string;
}

export default styled.div`
  position: relative;
  ${
    // margin
    ({ margin }: IBoxContainer) => {
      return margin ? `margin: ${margin};` : "";
    }
  }

  ${
    // marginTop
    ({ marginTop }: IBoxContainer) => {
      return marginTop ? `margin-top: ${marginTop};` : "";
    }
  }

  ${
    // marginBottom
    ({ marginBottom }: IBoxContainer) => {
      return marginBottom ? `margin-bottom: ${marginBottom};` : "";
    }
  }
  ${
    // marginLeft
    ({ marginLeft }: IBoxContainer) => {
      return marginLeft ? `margin-left: ${marginLeft};` : "";
    }
  }

  ${
    // marginRight
    ({ marginRight }: IBoxContainer) => {
      return marginRight ? `margin-right: ${marginRight};` : "";
    }
  }

  ${
    // padding
    ({ padding }: IBoxContainer) => {
      return padding ? `padding: ${padding};` : "";
    }
  }
  ${
    // paddingTop
    ({ paddingTop }: IBoxContainer) => {
      return paddingTop ? `padding-top: ${paddingTop};` : "";
    }
  }

  ${
    // paddingBottom
    ({ paddingBottom }: IBoxContainer) => {
      return paddingBottom ? `padding-bottom: ${paddingBottom};` : "";
    }
  }

  ${
    // paddingLeft
    ({ paddingLeft }: IBoxContainer) => {
      return paddingLeft ? `padding-left: ${paddingLeft};` : "";
    }
  }
  ${
    // paddingRight
    ({ paddingRight }: IBoxContainer) => {
      return paddingRight ? `padding-right: ${paddingRight};` : "";
    }
  }

  ${
    // border
    ({ border }: IBoxContainer) => {
      return border ? `border: ${border};` : "";
    }
  }

  ${
    // borderTop
    ({ borderTop }: IBoxContainer) => {
      return borderTop ? `border-top: ${borderTop};` : "";
    }
  }
  ${
    // borderBottom
    ({ borderBottom }: IBoxContainer) => {
      return borderBottom ? `border-bottom: ${borderBottom};` : "";
    }
  }

  ${
    // borderLeft
    ({ borderLeft }: IBoxContainer) => {
      return borderLeft ? `border-left: ${borderLeft};` : "";
    }
  }

  ${
    // borderRight
    ({ borderRight }: IBoxContainer) => {
      return borderRight ? `border-right: ${borderRight};` : "";
    }
  }

  ${
    // width
    ({ width }: IBoxContainer) => {
      return width ? `width: ${width};` : "";
    }
  }
  ${
    // max-width
    ({ maxWidth }: IBoxContainer) => {
      return maxWidth ? `max-width: ${maxWidth};` : "";
    }
  }
  @media (prefers-color-scheme: dark) {
    color: white;
  }
`;
