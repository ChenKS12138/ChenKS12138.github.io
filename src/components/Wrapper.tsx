import React from "react";
import styled from "styled-components";

interface ICommonWrapper {
  width?: number | string;
  maxWidth?: number | string;
}

export default styled.div`
  ${// width
  ({ width }: ICommonWrapper) => {
    return width ? `width: ${width};` : "";
  }}
  ${// max-width
  ({ maxWidth }: ICommonWrapper) => {
    return maxWidth ? `max-width: ${maxWidth}` : "";
  }}
`;
