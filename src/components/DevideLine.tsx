import React from "react";
import styled from "styled-components";

interface IDevideLine {
  lineWidth: string;
  lineStyle: "solid" | "dashed" | "dotted";
  lineColor: string;
  width: string;
}

export default styled.div`
  border-top-width: ${({ lineWidth }: IDevideLine) => lineWidth};
  border-top-style: ${({ lineStyle }: IDevideLine) => lineStyle};
  border-top-color: ${({ lineColor }: IDevideLine) => lineColor};
  width: ${({ width }: IDevideLine) => width};
`;
