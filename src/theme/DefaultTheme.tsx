import React from "react";
import { createGlobalStyle } from "styled-components";
export default createGlobalStyle`
  .post-content {
    padding: 0 4rem;
    color: #3c4858;
    @media screen and (max-width: 770px) {
      padding: 0 0;
    }
  }

  .post-content a {
    color: #34495e;
    font-weight: 550;
    text-decoration: underline;
  }

  .post-content p {
    /* text-indent: 30px; */
    font-size: 20px;
    line-height: 30px;
  }

  @media only screen and (max-width: 990px) {
    .post-content {
      padding: 0 .8rem;
    }
  }

  .post-content img {
    max-width: 100%;
  }

  .post-content h1, h2, h3, h4, h5, h6 {
    font-weight: 600;
    padding-top: 50px;
    margin-top: -50px;
  }

  .post-content h1 {
    margin-top: 20px;
  }

  .post-content h2 {
    margin-top: 15px;
    text-emphasis: 5px;
  }

  .post-content h3 {
    margin-top: 12px;
    text-indent: 15px;
  }

  .post-content h4 {
    margin-top: 8px;
    text-indent: 23px;
  }

  .post-content h5 {
    margin-top: 4px;
    text-indent: 28px;
  }

  .post-content h6 {
    text-indent: 31px;
  }

  .post-content h1::before, h2::before, h3::before, h4::before, h5::before, h6::before {
    content: "# ";
    color: #0e5796;
  }

  p code {
    font-size: 87.5%;
    color: #e83e8c;
    word-break: break-word;
  }

  li {
    line-height: 2;
  }
  pre {
    background: rgb(224 223 218);
    padding: 14px;
    border-radius: 4px
  }
`;
