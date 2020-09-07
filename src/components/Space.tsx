import React from "react";
import styled from "styled-components";

interface ISpace {
  align?: "start" | "end" | "baseline" | "center";
  direction?: "vertical" | "horizontal";
  justify?: "start" | "end" | "center" | "space-around" | "space-between";
  flexWrap?: boolean;
}

const SPACE_STYLE_DIRECTION = {
  vertical: "flex-direction: column;",
  horizontal: "flex-direction: row;",
};

export default styled.div`
  display: flex;
  ${
    // justify
    ({ justify }: ISpace) => {
      return `justify-content: ${justify ?? "center"};`;
    }
  }
  ${
    // direction
    ({ direction }: ISpace) => {
      return SPACE_STYLE_DIRECTION[direction] ?? "";
    }
  }
  ${
    // align
    ({ align }: ISpace) => {
      return align ? `align-items: ${align};` : "";
    }
  }
  ${
    // flexWrap
    ({ flexWrap }: ISpace) => {
      return flexWrap ? "flex-wrap: wrap;" : "";
    }
  }
`;

function app() {
  return <div style={{ justifyContent: "" }}></div>;
}
