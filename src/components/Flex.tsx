import React from "react";
import styled from "styled-components";

interface ICol {
  span: number;
}

const Row = styled.div`
  display: flex;
  padding: 0;
  pargin: 0;
  box-sizing: border-box;
`;

const Col = styled.div`
  flex: ${(props: ICol) => props.span ?? "auto"};
`;

export default { Row, Col };
