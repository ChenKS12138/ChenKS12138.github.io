import React, { useCallback, useRef, useEffect } from "react";
import { PageProps } from "gatsby";

import { defineCustomElements as deckDeckGoHighlightElement } from "@deckdeckgo/highlight-code/dist/loader";

import Layout from "@/layout/default/Layout";

import appConfig from "@/app.config";
import "./detail.less";

// 配置post主题
import "@/theme/index.less";

deckDeckGoHighlightElement();

function Detail(props: PageProps) {
  const { pageContext } = props;
  const { date, headings, html, id, tags, title } = pageContext as any;

  const createDetail = useCallback(
    (children: React.ReactElement): React.ReactElement => (
      <Layout
        backgroundSrc={appConfig.headerImages.detail}
        height="400px"
        content={
          <div className="detail-header-content">
            <div className="detail-header-content-title">{title}</div>
            <div className="detail-header-content-date">{date}</div>
          </div>
        }
        title={title}
      >
        {children}
      </Layout>
    ),
    []
  );
  useEffect(() => {
    content?.current &&
      content.current
        .querySelectorAll("pre code")
        .forEach((block: Element) => hljs.highlightBlock(block));
  }, [html]);

  const content = useRef(null);

  return createDetail(
    <div className="detail-container">
      <div
        className="post-content"
        dangerouslySetInnerHTML={{ __html: html }}
        ref={content}
      ></div>
      <div className="tag-container">
        {Array.isArray(tags) &&
          tags.map((tag: string) => (
            <span className="tag" key={tag}>
              {tag}
            </span>
          ))}
      </div>
      <div className="copyright-container">
        本博客所有文章除特别声明外，均采用 CC BY-SA 3.0协议 。转载请注明出处！
      </div>
    </div>
  );
}

export default Detail;