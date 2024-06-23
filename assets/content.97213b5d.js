import{_ as e}from"./ArticleWrapper.5f379090.js";import{c as p,w as c,o as l,a as n,b as t,M as i}from"./app.91692cd0.js";import"./dayjs.min.28e220c7.js";const u="/assets/cross_site2.8c074ff7.jpg",r="/assets/cross_site1.2e01751a.jpg",k="/assets/cross_site3.875bb414.jpg",d=n("div",{class:"markdown-body"},[n("h1",{id:"%E4%BB%80%E4%B9%88%E6%98%AF%E8%B7%A8%E5%9F%9F",tabindex:"-1"},"\u4EC0\u4E48\u662F\u8DE8\u57DF"),n("p",null,"\u7B80\u5355\u5730\u6765\u8BF4\u5C31\u662F\u57DF A \u4E0B\u7F51\u9875\u8BD5\u56FE\u52A0\u8F7D\u57DF B \u4E0B\u7684\u8D44\u6E90\u3002\u4E00\u822C\u6765\u8BF4\uFF0C\u6D4F\u89C8\u5668\u4F1A\u963B\u6B62\u8FD9\u7C7B\u884C\u4E3A\u3002\u8FD9\u662F\u6D4F\u89C8\u5668\u7684\u540C\u6E90\u7B56\u7565\u5BFC\u81F4\u7684\u3002\u6240\u8C13\u540C\u6E90\uFF0C\u5C31\u662F\u8981\u6C42\u4E24\u4E2A URL \u7684\u534F\u8BAE\uFF0C\u57DF\u540D\uFF0C\u7AEF\u53E3\u5168\u90E8\u76F8\u540C\u3002"),n("h1",{id:"%E8%B7%A8%E5%9F%9F%E4%BC%9A%E6%9C%89%E4%BB%80%E4%B9%88%E5%BD%B1%E5%93%8D",tabindex:"-1"},"\u8DE8\u57DF\u4F1A\u6709\u4EC0\u4E48\u5F71\u54CD"),n("ul",null,[n("li",null,[n("p",null,"AJAX \u8BF7\u6C42\u53D1\u4E0D\u51FA\u53BB")]),n("li",null,[n("p",null,"DOM\u3001JS \u5BF9\u8C61\u65E0\u6CD5\u83B7\u53D6")]),n("li",null,[n("p",null,"Cookie\u3001LocalStorage \u4E5F\u65E0\u6CD5\u83B7\u53D6")])]),n("h1",{id:"%E4%B8%BA%E4%BB%80%E4%B9%88%E8%A6%81%E6%9C%89%E5%90%8C%E6%BA%90%E7%AD%96%E7%95%A5",tabindex:"-1"},"\u4E3A\u4EC0\u4E48\u8981\u6709\u540C\u6E90\u7B56\u7565"),n("p",null,[t("\u8BA9\u6211\u4EEC\u8BBE\u60F3\u4E00\u4E0B\u73B0\u5728\u6709\u4E2A\u7535\u5546\u7F51\u7AD9"),n("code",null,"www.oaboat.com"),t("\uFF0C\u5B83\u6709\u4E2A\u652F\u4ED8\u63A5\u53E3"),n("code",null,"www.oaboat.com/pay?target=749923710&amout=100"),t(" \uFF0C\u8FD9\u6837\u5C31\u53EF\u4EE5\u7ED9\u7528\u6237 id \u4E3A"),n("code",null,"749923710"),t("\u7684\u7528\u6237\u8F6C\u8D26 100 \u5143\u3002\u5982\u679C\u6709\u4E2A\u535A\u5BA2\u7F51\u7AD9 A\uFF0C\u5B83\u88AB\u690D\u5165\u4E86\u4E00\u5F20\u56FE\u7247"),n("code",null,'<img src ="http://www.oaboat.com/pay?target=749923710&amout=100" />'),t(" \u8FD9\u6837\u8BBF\u95EE\u535A\u5BA2\u7F51\u7AD9 A \u7684\u7528\u6237\u5728\u4E0D\u7ECF\u610F\u95F4\uFF0C\u8D22\u7269\u5C31\u88AB\u76D7\u53D6\u4E86")]),n("h1",{id:"xss-%E5%92%8C-csrf",tabindex:"-1"},"XSS \u548C CSRF"),n("h2",{id:"xss",tabindex:"-1"},"XSS"),n("p",null,[t("XSS \u5168\u79F0\u662F "),n("code",null,"Cross Site Scripting"),t(" \uFF0C\u4E2D\u6587\u540D\u79F0\u662F\u8DE8\u7AD9\u811A\u672C\u653B\u51FB\uFF0C\u81F3\u4E8E\u4E3A\u4EC0\u4E48\u4E0D\u53EB CSS \u662F\u4E3A\u4E86\u907F\u514D\u548C"),n("code",null,"Cascading Style Sheets"),t(" \u91CD\u540D\u3002\u8FD8\u662F\u521A\u624D\u90A3\u4E2A\u4F8B\u5B50\uFF0C\u9ED1\u5BA2\u662F\u600E\u4E48\u5C06\u690D\u5165\u56FE\u7247\u7684\u5462\uFF1F")]),n("pre",{class:"language-javascript"},[n("code",{class:"language-javascript"},[n("span",{class:"token keyword"},"const"),t(" image "),n("span",{class:"token operator"},"="),t(" document"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"createElement"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},'"img"'),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`
img`),n("span",{class:"token punctuation"},"."),t("src "),n("span",{class:"token operator"},"="),t(),n("span",{class:"token string"},'"http://www.oaboat.com/pay?target=749923710&amout=100"'),n("span",{class:"token punctuation"},";"),t(`
img`),n("span",{class:"token punctuation"},"."),t("style "),n("span",{class:"token operator"},"="),t(" display "),n("span",{class:"token operator"},"="),t(),n("span",{class:"token string"},'"none"'),n("span",{class:"token punctuation"},";"),t(`
document`),n("span",{class:"token punctuation"},"."),t("body"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"appendChild"),n("span",{class:"token punctuation"},"("),t("img"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`
`)])]),n("p",null,"\u53EA\u8981\u4ED6\u5C06\u8FD9\u6BB5\u4EE3\u7801\u5728\u8BC4\u8BBA\u533A\u8BC4\u8BBA\u51FA\u6765\u3002\u5982\u679C\u8FD9\u4E2A\u535A\u5BA2\u7F51\u7AD9\u6CA1\u6709 XSS \u9632\u8303\uFF0C\u90A3\u4E48\u6BCF\u4E2A\u6D4F\u89C8\u7684\u7528\u6237\u90FD\u4F1A\u6536\u5230\u653B\u51FB\uFF0C\u90FD\u4F1A\u6267\u884C\u4E0A\u9762\u7684\u90A3\u6BB5\u4EE3\u7801\u3002"),n("h2",{id:"csrf",tabindex:"-1"},"CSRF"),n("p",null,[t("CSRF \u5168\u79F0\u662F "),n("code",null,"Cross-site request forgery"),t(" \uFF0C\u4E2D\u6587\u540D\u79F0\u662F\u8DE8\u7AD9\u8BF7\u6C42\u4F2A\u9020\u3002\u8FD8\u662F\u521A\u624D\u90A3\u4E2A\u4F8B\u5B50\u3002\u50CF\u521A\u624D\u90A3\u4E2A\u4F8B\u5B50\u5C31\u6D89\u53CA\u5230\u4E86 CSRF\uFF0C\u6D4F\u89C8\u535A\u5BA2\u7F51\u7AD9\u5374\u8BD5\u56FE\u8BF7\u6C42\u7535\u5546\u7F51\u7AD9\u7684\u63A5\u53E3\u3002\u6B64\u65F6\u540C\u6E90\u7B56\u7565\u7684\u4F5C\u7528\u5C31\u4F53\u73B0\u51FA\u6765\u4E86\uFF0C\u7535\u5546\u7F51\u7AD9\u53EF\u4EE5\u68C0\u6D4B\u8BF7\u6C42\u4E2D\u7684 Origin \u5B57\u6BB5\uFF0C\u5224\u65AD\u662F\u5426\u540C\u6E90\uFF0C\u51B3\u5B9A\u662F\u5426\u5F02\u5E38\u3002\u5F53\u7136\u8FD9\u53EA\u662F\u4E00\u79CD\u65B9\u6CD5\uFF0C\u5E76\u4E0D\u662F\u7EDD\u5BF9\u5730\u5B89\u5168\u3002")]),n("h1",{id:"%E4%B8%80%E4%B8%AA%E6%9C%89%E6%84%8F%E6%80%9D%E7%9A%84%E8%B7%A8%E5%9F%9F%E9%97%AE%E9%A2%98",tabindex:"-1"},"\u4E00\u4E2A\u6709\u610F\u601D\u7684\u8DE8\u57DF\u95EE\u9898"),n("p",null,[n("img",{src:u,alt:"homepage"})]),n("p",null,"\u6211\u7684\u535A\u5BA2\u7684\u9996\u9875\u7684\u80CC\u666F\u56FE\u7247\u4EE5\u53CA\u4E2D\u95F4\u7684\u90A3\u4E00\u6BB5 copyright \u662F\u722C\u53D6 Bing \u5F97\u5230\u7684\u3002\u8FD9\u6837\u9B54\u6539\u8FD9\u4E2A hexo \u4E3B\u9898\u7684\u8FC7\u7A0B\u8FD8\u662F\u633A\u8270\u8F9B\u7684\uFF0C\u4E0D\u8FC7\u633A\u597D\u770B\u7684\u5C31\u662F\u4E86\uFF0C\u4E5F\u633A\u6709\u6210\u5C31\u611F\u7684\u3002"),n("h2",{id:"%E7%9B%B4%E6%8E%A5%E8%AF%B7%E6%B1%82%E8%BF%99%E4%B8%AA%E6%8E%A5%E5%8F%A3",tabindex:"-1"},"\u76F4\u63A5\u8BF7\u6C42\u8FD9\u4E2A\u63A5\u53E3"),n("p",null,[t("\u4E00\u5F00\u59CB\u6211\u662F\u5C1D\u8BD5\u5728\u535A\u5BA2\u9875\u9762\u76F4\u63A5\u8BF7\u6C42\u90A3\u4E2A"),n("a",{href:"http://cn.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1"},"Bing \u63A5\u53E3"),t("\u3002")]),n("pre",{class:"language-javascript"},[n("code",{class:"language-javascript"},[n("span",{class:"token function"},"fetch"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},'"http://cn.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1"'),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"then"),n("span",{class:"token punctuation"},"("),n("span",{class:"token parameter"},"res"),t(),n("span",{class:"token operator"},"=>"),t(`
  console`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"log"),n("span",{class:"token punctuation"},"("),t("res"),n("span",{class:"token punctuation"},")"),t(`
`),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`
`)])]),n("p",null,[n("img",{src:r,alt:"cross-site"})]),n("p",null,[t("\u7ED3\u679C\u548C\u6211\u6240\u731C\u60F3\u7684\u4E00\u6837\uFF0C\u8FD9\u6837\u8BF7\u6C42\u8FD9\u4E2A\u63A5\u53E3\u4F1A\u6709\u8DE8\u57DF\u7684\u95EE\u9898\u3002\u8FD9\u4E2A\u9700\u8981\u540E\u7AEF\u52A0\u4E0A\u4E00\u4E2A\u54CD\u5E94\u5934"),n("code",null,"Access-Control-Allow-Origin:*"),t(" \uFF0C\u8FD9\u6837\u5F53\u6D4F\u89C8\u5668\u63A5\u6536\u5230\u8FD9\u4E2A\u54CD\u5E94\u65F6\uFF0C\u624D\u4E0D\u4F1A\u88AB block\u3002\u4F46\u662F\uFF0C\u5F53\u7136\u6211\u6CA1\u529E\u6CD5\u4FEE\u6539\u8FD9\u4E2A\u63A5\u53E3\u7684\u540E\u7AEF\u4EE3\u7801\u3002")]),n("h2",{id:"%E7%94%B1%E6%88%91%E7%9A%84%E6%9C%8D%E5%8A%A1%E5%99%A8%E4%BB%A3%E7%90%86%E6%88%91%E7%9A%84%E8%AF%B7%E6%B1%82",tabindex:"-1"},"\u7531\u6211\u7684\u670D\u52A1\u5668\u4EE3\u7406\u6211\u7684\u8BF7\u6C42"),n("p",null,[t("\u6211\u60F3\u5230\u7684\u7B2C\u4E8C\u4E2A\u529E\u6CD5\u662F\uFF0C\u5C06\u8BF7\u6C42\u53D1\u5230\u6211\u81EA\u5DF1\u7684\u670D\u52A1\u5668\u4E0A\uFF0C\u518D\u7531\u6211\u7684\u670D\u52A1\u5668\u8BF7\u6C42\u8FD9\u4E2A Bing \u63A5\u53E3\uFF0C\u670D\u52A1\u5668\u6536\u5230\u54CD\u5E94\u540E\uFF0C\u518D\u8FD4\u56DE\u7ED9\u6D4F\u89C8\u5668\uFF0C\u5E76\u4E14\u589E\u52A0\u4E00\u4E2A"),n("code",null,"Access-Control-Allow-Origin:*"),t(" \uFF0C\u8FD9\u6837\u8FD9\u4E2A\u54CD\u5E94\u5C31\u4E0D\u4F1A\u88AB\u6D4F\u89C8\u5668 block \u4E86\u3002")]),n("pre",{class:"language-javascript"},[n("code",{class:"language-javascript"},[n("span",{class:"token keyword"},"const"),t(" app "),n("span",{class:"token operator"},"="),t(),n("span",{class:"token function"},"express"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`
`),n("span",{class:"token keyword"},"const"),t(),n("span",{class:"token punctuation"},"{"),t(),n("span",{class:"token keyword"},"default"),n("span",{class:"token operator"},":"),t(" axios "),n("span",{class:"token punctuation"},"}"),t(),n("span",{class:"token operator"},"="),t(),n("span",{class:"token function"},"require"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},'"axios"'),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`
`),n("span",{class:"token keyword"},"const"),t(" request "),n("span",{class:"token operator"},"="),t(),n("span",{class:"token function"},"require"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},'"request"'),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`
app`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"get"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},'"/"'),n("span",{class:"token punctuation"},","),t(),n("span",{class:"token keyword"},"async"),t(),n("span",{class:"token punctuation"},"("),n("span",{class:"token parameter"},[t("req"),n("span",{class:"token punctuation"},","),t(" res")]),n("span",{class:"token punctuation"},")"),t(),n("span",{class:"token operator"},"=>"),t(),n("span",{class:"token punctuation"},"{"),t(`
  `),n("span",{class:"token keyword"},"const"),t(),n("span",{class:"token punctuation"},"{"),t(`
    `),n("span",{class:"token literal-property property"},"data"),n("span",{class:"token operator"},":"),t(),n("span",{class:"token punctuation"},"{"),t(" images "),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),t(`
  `),n("span",{class:"token punctuation"},"}"),t(),n("span",{class:"token operator"},"="),t(),n("span",{class:"token keyword"},"await"),t(" axios"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"get"),n("span",{class:"token punctuation"},"("),t(`
    `),n("span",{class:"token string"},'"https://cn.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&nc=1541141842428&pid=hp&video=1"'),t(`
  `),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`
  `),n("span",{class:"token keyword"},"const"),t(),n("span",{class:"token punctuation"},"{"),t(" url "),n("span",{class:"token punctuation"},"}"),t(),n("span",{class:"token operator"},"="),t(" images"),n("span",{class:"token punctuation"},"["),n("span",{class:"token number"},"0"),n("span",{class:"token punctuation"},"]"),n("span",{class:"token punctuation"},";"),t(`
  `),n("span",{class:"token function"},"request"),n("span",{class:"token punctuation"},"("),n("span",{class:"token template-string"},[n("span",{class:"token template-punctuation string"},"`"),n("span",{class:"token string"},"https://cn.bing.com"),n("span",{class:"token interpolation"},[n("span",{class:"token interpolation-punctuation punctuation"},"${"),t("url"),n("span",{class:"token interpolation-punctuation punctuation"},"}")]),n("span",{class:"token template-punctuation string"},"`")]),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"pipe"),n("span",{class:"token punctuation"},"("),t("res"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`
`),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(),n("span",{class:"token comment"},"//\u7528\u4E8E\u83B7\u53D6\u56FE\u7247\u4FE1\u606F"),t(`
app`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"get"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},'"/info"'),n("span",{class:"token punctuation"},","),t(),n("span",{class:"token keyword"},"async"),t(),n("span",{class:"token punctuation"},"("),n("span",{class:"token parameter"},[t("req"),n("span",{class:"token punctuation"},","),t(" res")]),n("span",{class:"token punctuation"},")"),t(),n("span",{class:"token operator"},"=>"),t(),n("span",{class:"token punctuation"},"{"),t(`
  `),n("span",{class:"token keyword"},"const"),t(),n("span",{class:"token punctuation"},"{"),t(`
    `),n("span",{class:"token literal-property property"},"data"),n("span",{class:"token operator"},":"),t(),n("span",{class:"token punctuation"},"{"),t(" images "),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),t(`
  `),n("span",{class:"token punctuation"},"}"),t(),n("span",{class:"token operator"},"="),t(),n("span",{class:"token keyword"},"await"),t(" axios"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"get"),n("span",{class:"token punctuation"},"("),t(`
    `),n("span",{class:"token string"},'"https://cn.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&nc=1541141842428&pid=hp&video=1"'),t(`
  `),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`
  `),n("span",{class:"token keyword"},"const"),t(),n("span",{class:"token punctuation"},"{"),t(" copyright "),n("span",{class:"token punctuation"},"}"),t(),n("span",{class:"token operator"},"="),t(" images"),n("span",{class:"token punctuation"},"["),n("span",{class:"token number"},"0"),n("span",{class:"token punctuation"},"]"),n("span",{class:"token punctuation"},";"),t(`
  res`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"send"),n("span",{class:"token punctuation"},"("),t("copyright"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`
`),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(),n("span",{class:"token comment"},"//\u7528\u4E8E\u83B7\u53D6 copyright \u4FE1\u606F"),t(`
app`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"listen"),n("span",{class:"token punctuation"},"("),n("span",{class:"token number"},"8081"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`
`)])]),n("p",null,[t("\u8FD9\u4E2A\u60F3\u6CD5\u5728\u672C\u5730\u6D4B\u8BD5\u662F\u6CA1\u6709\u95EE\u9898\u7684\uFF0C\u4F46\u662F\u5728 Github Page \u4E0A\u5C31\u6709\u95EE\u9898\u4E86\u3002"),n("code",null,"https://ChenKS12138.github.io"),t(" \u662F HTTPS \u534F\u8BAE\uFF0C\u4F46\u662F\u6211\u7684\u670D\u52A1\u5668\u4E0A\u53EA\u80FD HTTP "),n("s",null,"\u4E3B\u8981\u662F\u592A\u61D2\u4E86\uFF0C\u6CA1\u6709\u5F04\u57DF\u540D\uFF0C\u66F4\u522B\u8BF4 HTTPSl \u4E86"),t(" ,\u4E00\u4E2A HTTPS \u7684\u7F51\u7AD9\u8BF7\u6C42 HTTP \u7684\u8D44\u6E90\u4F1A\u6709 "),n("code",null,"mixed content"),n("a",{href:"https://developers.google.com/web/fundamentals/security/prevent-mixed-content/what-is-mixed-content?hl=zh-cn"},"(\u6DF7\u5408\u5185\u5BB9)"),t(" \u7684\u95EE\u9898\u3002\u8BF7\u6C42\u56FE\u7247\u8D44\u6E90\u95EE\u9898\u4E0D\u662F\u5F88\u5927\uFF0C\u53EA\u662F warning\uFF0C\u4F46\u662F\u50CF iframe\u3001fetch \u8BF7\u6C42\u4F1A\u76F4\u63A5\u62A5 error\u3002\u5982\u679C\u60F3\u79FB\u9664"),n("code",null,"mixed content"),t(" \u7684\u8B66\u544A\uFF0C\u9700\u8981\u6539\u52A8\u6D4F\u89C8\u5668\u7684\u542F\u52A8\u53C2\u6570\uFF0C\u6BD4\u8F83\u9EBB\u70E6\uFF0C\u4E0D\u73B0\u5B9E\u3002")]),n("p",null,[n("img",{src:k,alt:"mixed-content"})]),n("h2",{id:"%E7%BB%A7%E7%BB%AD%E5%B0%9D%E8%AF%95%E7%9B%B4%E6%8E%A5%E8%AF%B7%E6%B1%82-bing-%E6%8E%A5%E5%8F%A3",tabindex:"-1"},"\u7EE7\u7EED\u5C1D\u8BD5\u76F4\u63A5\u8BF7\u6C42 Bing \u63A5\u53E3"),n("p",null,[t("\u540E\u9762\u6211\u4E5F\u6709\u5C1D\u8BD5\u53BB\u4F7F\u7528 "),n("code",null,"jsonp"),t(" \u3001"),n("code",null,"window.postMessage"),t(" \u8FD9\u7C7B\u7684\u65B9\u6CD5\u5C1D\u8BD5\u76F4\u63A5\u8BF7\u6C42 bing \u63A5\u53E3\uFF0C\u4F46\u662F\u8FD9\u7C7B\u7684\u65B9\u6CD5\u90FD\u5BF9\u670D\u52A1\u5668\u7AEF\u8FD4\u56DE\u7684\u5185\u5BB9\u6709\u8981\u6C42\uFF0C\u5F88\u96BE\u5B9E\u73B0\u3002")]),n("h1",{id:"jsonproxy",tabindex:"-1"},"JSONProxy"),n("p",null,[n("img",{src:i,alt:"json-proxy"})]),n("p",null,[t("\u8FD9\u4E2A\u662F\u6211\u5728\u5176\u4ED6\u4EBA\u7684\u535A\u5BA2\u4E2D\u627E\u5230\u7684\uFF0C\u8FD9\u4E2A"),n("a",{href:"https://jsonp.afeld.me/"},"\u4EE3\u7406\u5DE5\u5177"),t("\uFF0C\u5B83\u53EF\u4EE5\u4EE3\u7406\u6211\u7684\u8BF7\u6C42\u3002\u8FD9\u4E2A\u548C\u6211\u7684\u7B2C\u4E8C\u4E2A\u601D\u8DEF\u6709\u70B9\u76F8\u4F3C\u3002\u4F46\u662F\u5B83\u7684\u670D\u52A1\u5668\u6709 HTTPS\uFF0C\u4E0D\u4F1A\u6709"),n("code",null,"mixed content"),t(" \u7684\u95EE\u9898\u3002")]),n("pre",{class:"language-html"},[n("code",{class:"language-html"},[n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),t("p")]),t(),n("span",{class:"token special-attr"},[n("span",{class:"token attr-name"},"style"),n("span",{class:"token attr-value"},[n("span",{class:"token punctuation attr-equals"},"="),n("span",{class:"token punctuation"},'"'),n("span",{class:"token value css language-css"},[n("span",{class:"token property"},"font-size"),n("span",{class:"token punctuation"},":"),t(" 25px"),n("span",{class:"token punctuation"},";"),n("span",{class:"token property"},"color"),n("span",{class:"token punctuation"},":"),t("white"),n("span",{class:"token punctuation"},";"),n("span",{class:"token property"},"margin-bottom"),n("span",{class:"token punctuation"},":"),t("1rem")]),n("span",{class:"token punctuation"},'"')])]),n("span",{class:"token punctuation"},">")]),t("\u4ECA\u65E5Bing\u7F8E\u56FE"),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),t("p")]),n("span",{class:"token punctuation"},">")]),t(`
`),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),t("p")]),t(`
  `),n("span",{class:"token attr-name"},"id"),n("span",{class:"token attr-value"},[n("span",{class:"token punctuation attr-equals"},"="),n("span",{class:"token punctuation"},'"'),t("desc"),n("span",{class:"token punctuation"},'"')]),t(`
  `),n("span",{class:"token special-attr"},[n("span",{class:"token attr-name"},"style"),n("span",{class:"token attr-value"},[n("span",{class:"token punctuation attr-equals"},"="),n("span",{class:"token punctuation"},'"'),n("span",{class:"token value css language-css"},[n("span",{class:"token property"},"font-size"),n("span",{class:"token punctuation"},":"),t(" 20px"),n("span",{class:"token punctuation"},";"),n("span",{class:"token property"},"color"),n("span",{class:"token punctuation"},":"),t("white"),n("span",{class:"token punctuation"},";"),n("span",{class:"token property"},"margin-bottom"),n("span",{class:"token punctuation"},":"),t("1rem"),n("span",{class:"token punctuation"},";"),n("span",{class:"token property"},"max-width"),n("span",{class:"token punctuation"},":"),t("80%"),n("span",{class:"token punctuation"},";"),n("span",{class:"token property"},"text-align"),n("span",{class:"token punctuation"},":"),t("center"),n("span",{class:"token punctuation"},";"),n("span",{class:"token property"},"margin"),n("span",{class:"token punctuation"},":"),t(" 0 auto"),n("span",{class:"token punctuation"},";")]),n("span",{class:"token punctuation"},'"')])]),t(`
`),n("span",{class:"token punctuation"},">")]),t(`
  loading...
`),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),t("p")]),n("span",{class:"token punctuation"},">")]),t(`
`),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),t("script")]),t(),n("span",{class:"token attr-name"},"src"),n("span",{class:"token attr-value"},[n("span",{class:"token punctuation attr-equals"},"="),n("span",{class:"token punctuation"},'"'),t("http://lib.sinaapp.com/js/jquery/2.0.2/jquery-2.0.2.min.js"),n("span",{class:"token punctuation"},'"')]),n("span",{class:"token punctuation"},">")]),n("span",{class:"token script"}),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),t("script")]),n("span",{class:"token punctuation"},">")]),t(`
`),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"<"),t("script")]),n("span",{class:"token punctuation"},">")]),n("span",{class:"token script"},[n("span",{class:"token language-javascript"},[t(`
  $`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"ajax"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},"{"),t(`
    `),n("span",{class:"token literal-property property"},"method"),n("span",{class:"token operator"},":"),t(),n("span",{class:"token string"},'"get"'),n("span",{class:"token punctuation"},","),t(`
    `),n("span",{class:"token literal-property property"},"url"),n("span",{class:"token operator"},":"),t(`
      `),n("span",{class:"token string"},'"https://jsonp.afeld.me/?url=http%3A%2F%2Fcn.bing.com%2FHPImageArchive.aspx%3Fformat%3Djs%26idx%3D0%26n%3D1"'),n("span",{class:"token punctuation"},","),t(`
    `),n("span",{class:"token function-variable function"},"success"),n("span",{class:"token operator"},":"),t(),n("span",{class:"token keyword"},"function"),t(),n("span",{class:"token punctuation"},"("),n("span",{class:"token parameter"},"data"),n("span",{class:"token punctuation"},")"),t(),n("span",{class:"token punctuation"},"{"),t(`
      document`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"querySelector"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},'"#desc"'),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},"."),t("innerHTML "),n("span",{class:"token operator"},"="),t(" data"),n("span",{class:"token punctuation"},"."),t("images"),n("span",{class:"token punctuation"},"["),n("span",{class:"token number"},"0"),n("span",{class:"token punctuation"},"]"),n("span",{class:"token punctuation"},"."),t("copyright"),n("span",{class:"token punctuation"},";"),t(`
    `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),t(`
  `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`
`)])]),n("span",{class:"token tag"},[n("span",{class:"token tag"},[n("span",{class:"token punctuation"},"</"),t("script")]),n("span",{class:"token punctuation"},">")]),t(`
`)])]),n("p",null,"\u8FD9\u6837\u5C31\u5F97\u5230\u6211\u6700\u540E\u60F3\u8981\u7684\u6548\u679C\u4E86\u3002")],-1),B="\u8DE8\u57DF\u90A3\u4E9B\u4E8B",A="default description",x="2019-07-22T23:32:45.000Z",w=["Web"],b="./cross_site4.jpg",S=[{depth:1,title:"\u4EC0\u4E48\u662F\u8DE8\u57DF",children:[]},{depth:1,title:"\u8DE8\u57DF\u4F1A\u6709\u4EC0\u4E48\u5F71\u54CD",children:[]},{depth:1,title:"\u4E3A\u4EC0\u4E48\u8981\u6709\u540C\u6E90\u7B56\u7565",children:[]},{depth:1,title:"XSS \u548C CSRF",children:[{depth:2,title:"XSS",children:[]},{depth:2,title:"CSRF",children:[]}]},{depth:1,title:"\u4E00\u4E2A\u6709\u610F\u601D\u7684\u8DE8\u57DF\u95EE\u9898",children:[{depth:2,title:"\u76F4\u63A5\u8BF7\u6C42\u8FD9\u4E2A\u63A5\u53E3",children:[]},{depth:2,title:"\u7531\u6211\u7684\u670D\u52A1\u5668\u4EE3\u7406\u6211\u7684\u8BF7\u6C42",children:[]},{depth:2,title:"\u7EE7\u7EED\u5C1D\u8BD5\u76F4\u63A5\u8BF7\u6C42 Bing \u63A5\u53E3",children:[]}]},{depth:1,title:"JSONProxy",children:[]}],_=[{property:"og:title",name:"twitter:title",itemprop:"title",content:"\u8DE8\u57DF\u90A3\u4E9B\u4E8B"},{property:"og:description",name:"twitter:description",itemprop:"description",content:"default description"}],j={__name:"content",setup(g,{expose:a}){const s={title:"\u8DE8\u57DF\u90A3\u4E9B\u4E8B",description:"default description",date:"2019-07-22T23:32:45.000Z",tags:["Web"],coverImage:"./cross_site4.jpg",headings:[{depth:1,title:"\u4EC0\u4E48\u662F\u8DE8\u57DF",children:[]},{depth:1,title:"\u8DE8\u57DF\u4F1A\u6709\u4EC0\u4E48\u5F71\u54CD",children:[]},{depth:1,title:"\u4E3A\u4EC0\u4E48\u8981\u6709\u540C\u6E90\u7B56\u7565",children:[]},{depth:1,title:"XSS \u548C CSRF",children:[{depth:2,title:"XSS",children:[]},{depth:2,title:"CSRF",children:[]}]},{depth:1,title:"\u4E00\u4E2A\u6709\u610F\u601D\u7684\u8DE8\u57DF\u95EE\u9898",children:[{depth:2,title:"\u76F4\u63A5\u8BF7\u6C42\u8FD9\u4E2A\u63A5\u53E3",children:[]},{depth:2,title:"\u7531\u6211\u7684\u670D\u52A1\u5668\u4EE3\u7406\u6211\u7684\u8BF7\u6C42",children:[]},{depth:2,title:"\u7EE7\u7EED\u5C1D\u8BD5\u76F4\u63A5\u8BF7\u6C42 Bing \u63A5\u53E3",children:[]}]},{depth:1,title:"JSONProxy",children:[]}],meta:[{property:"og:title",name:"twitter:title",itemprop:"title",content:"\u8DE8\u57DF\u90A3\u4E9B\u4E8B"},{property:"og:description",name:"twitter:description",itemprop:"description",content:"default description"}]};return a({frontmatter:s}),(m,h)=>{const o=e;return l(),p(o,{frontmatter:s},{default:c(()=>[d]),_:1})}}};export{b as coverImage,x as date,j as default,A as description,S as headings,_ as meta,w as tags,B as title};