import{_ as e}from"./ArticleWrapper.vue_vue_type_script_setup_true_lang.2df10007.js";import{c,w as p,o as l,a as n,k as u,b as s}from"./app.83cb956a.js";import"./dayjs.min.28e220c7.js";const r="/assets/debounce2.b4b073b7.jpg",k=n("div",{class:"markdown-body"},[n("h1",null,"\u4EC0\u4E48\u662F\u51FD\u6570\u8282\u6D41\u548C\u51FD\u6570\u9632\u6296"),n("p",null,"\u8FD9\u4E24\u8005\u90FD\u662F JavaScript \u4E2D\u7684\u4E00\u4E9B\u4F18\u5316\u65B9\u6CD5\u3002\u987E\u540D\u601D\u4E49\uFF0C\u8282\u6D41\u4E0E\u9632\u6296\u90FD\u662F\u901A\u8FC7\u4E00\u5B9A\u7684\u65B9\u6CD5\uFF0C\u8F83\u5C11\u51FD\u6570\u7684\u8C03\u7528\u9891\u7387\uFF0C\u6765\u8FBE\u5230\u4F18\u5316\u7684\u76EE\u7684\u3002"),n("h2",null,"\u51FD\u6570\u9632\u6296 (Debounce)"),n("p",null,"\u4E3B\u8981\u662F\u5B9E\u73B0\uFF0C\u5F53\u4E00\u5B9A\u7684\u4E8B\u4EF6\u95F4\u9694\u5185\u8FDE\u7EED\u591A\u6B21\u89E6\u53D1\u6307\u5B9A\u7684\u4E8B\u4EF6\u540E\uFF0C\u4E8B\u4EF6\u5904\u7406\u51FD\u6570\u4E0D\u4F1A\u7ACB\u5373\u6267\u884C\u3002\u4EC5\u5728\u6700\u540E\u4E00\u6B21\u89E6\u53D1\u7684\u82E5\u5E72\u6BEB\u79D2\u540E\u6267\u884C\u4E8B\u4EF6\u5904\u7406\u51FD\u6570\u3002\u8FD9\u907F\u514D\u4E86\u4E8B\u4EF6\u5904\u7406\u51FD\u6570\u7684\u591A\u6B21\u6267\u884C\u3002"),n("h2",null,"\u51FD\u6570\u8282\u6D41 (Throttle)"),n("p",null,"\u4E3B\u8981\u662F\u5B9E\u73B0\uFF0C\u5F53\u6307\u5B9A\u4E8B\u4EF6\u88AB\u591A\u6B21\u89E6\u53D1\u540E\uFF0C\u4FDD\u8BC1\u4E8B\u4EF6\u5904\u7406\u51FD\u6570\u7684\u6267\u884C\u7684\u65F6\u95F4\u95F4\u9694\u662F\u4E00\u6837\u7684\uFF0C\u90FD\u662F\u95F4\u9694\u82E5\u4E2A\u6BEB\u79D2\u3002\u5C31\u50CF\u5B83\u7684\u540D\u5B57\u4E00\u6837\uFF0C\u662F\u4E00\u4E2A\u6C34\u6D41\u91CF\u5F88\u5C0F\u7684\u6C34\u9F99\u5934\uFF0C\u4F46\u662F\u5B83\u7684\u6D41\u91CF\u662F\u7A33\u5B9A\u7684\uFF0C\u5373\u65F6\u95F4\u5904\u7406\u51FD\u6570\u7684\u88AB\u8C03\u7528\u60C5\u51B5\u4ECE\u65F6\u95F4\u4E0A\u6765\u770B\u662F\u5747\u5300\u7684\u3002"),n("h2",null,"\u5E94\u7528\u573A\u666F"),n("p",null,[n("img",{src:u,alt:"\u65B0\u751F\u676F"})]),n("p",null,[s("\u8BF6\uFF0C\u8FD9\u662F\u5728 2019 \u6821\u79D1\u534F\u65B0\u751F\u676F\u7684\u524D\u7AEF\u9879\u76EE "),n("a",{href:"https://github.com/ChenKS12138/sast_fresh_cup_frontend"},"\u4ED3\u5E93\u5730\u5740"),s(" \u91CC\u4F7F\u7528\u5230\u7684\u3002\u5148\u6765\u8BF4\u8BF4\u8FD9\u4E2A\u9879\u76EE\u5427\uFF0C\u8FD9\u662F\u4E2A\u524D\u540E\u7AEF\u5206\u79BB\u7684\u9879\u76EE\uFF0C\u63A5\u53E3\u662F\u6211\u8BBE\u8BA1\u7684\uFF0C\u6211\u4EEC\u6240\u8981\u8BA8\u8BBA\u7684\u95EE\u9898\u662F\u51FA\u73B0\u5728\u4E86\u7B54\u9898\u9875\u3002\u7B54\u9898\u9875\u9700\u8981\u5C06\u9898\u76EE\u4ECE\u670D\u52A1\u5668\u7AEF\u83B7\u53D6\uFF0C\u5E76\u5C06\u9009\u624B\u586B\u5199\u7684\u7B54\u6848\u4F20\u9001\u5230\u670D\u52A1\u5668\u7AEF\u3002\u9898\u76EE\u83B7\u53D6\u65B9\u9762\uFF0C\u5176\u5B9E\u66F4\u51C6\u786E\u5730\u8BF4\u662F\uFF0C\u662F\u4E00\u4E9B\u6BD4\u8D5B\u7684\u57FA\u672C\u4FE1\u606F\u65B9\u9762\uFF0C\u5305\u62EC\u9898\u76EE\uFF0C\u516C\u544A\uFF0C\u622A\u81F3\u65F6\u95F4\u7B49\uFF0C\u6211\u5C31\u52A0\u4E86\u4E00\u4E2A\u63A5\u53E3\u5BF9\u8FD9\u4E9B\u4FE1\u606F\u6C42\u54C8\u5E0C\uFF0C\u5BA2\u6237\u7AEF\u8F6E\u8BE2\u8FD9\u4E2A\u63A5\u53E3\u3002 "),n("s",null,"\u7528 websocket \u53EF\u80FD\u4F1A\u66F4\u597D"),s(" \uFF0C\u4E00\u65E6\u6709\u53D8\u5316\uFF0C\u518D\u8BF7\u6C42\u5176\u4ED6\u76F8\u5173\u7684\u63A5\u53E3\u3002\u56E0\u6B64\u9898\u76EE\u662F\u4E00\u6B21\u6027\u83B7\u53D6\u7684\uFF0C\u5E76\u4E14\u53EF\u80FD\u4F1A\u6BD4\u8D5B\u4E2D\u9014\u66F4\u65B0\u3002\u800C\u5728\u63D0\u4EA4\u7B54\u6848\u65B9\u9762\uFF0C\u6211\u6CA1\u6709\u91C7\u7528\u4E00\u6B21\u6027\u63D0\u4EA4\u7684\u65B9\u5F0F\u3002\u4E3B\u8981\u662F\u6015\u54EA\u4E2A\u5927\u4F6C\u5B66\u5F1F\u81EA\u5DF1\u628A localStorage \u6E05\u9664\u4E86\u3002\u4F46\u662F\u8FD9\u5C31\u6709\u4E86\u4E00\u4E2A\u95EE\u9898\uFF0C\u65E0\u8BBA\u662F\u4F7F\u7528"),n("code",null,"setInterval"),s(" \u5B9A\u65F6\u5C06\u7B54\u6848\u53D1\u9001\u5230\u7ED9\u670D\u52A1\u5668\uFF0C\u8FD8\u662F\u53EA\u7ED9\u6587\u5B57\u8F93\u5165\u6846\u52A0\u4E00\u4E2A\u76D1\u542C\u8F93\u5165\u7684\u5904\u7406\u51FD\u6570\uFF0C\u6548\u7387\u90FD\u4E0D\u9AD8\u3002\u56E0\u6B64\u4F7F\u7528\u5728\u8FD9\u79CD\u60C5\u51B5\u4E0B\u4F7F\u7528\u8282\u6D41\u548C\u9632\u6296\u5C31\u5F88\u6709\u7528\u4E86\u3002")]),n("pre",{class:"language-javascript"},[n("code",{class:"language-javascript"},[n("span",{class:"token comment"},"// debounce.js"),s(`
`),n("span",{class:"token keyword"},"export"),s(),n("span",{class:"token keyword"},"default"),s(),n("span",{class:"token keyword"},"function"),s(),n("span",{class:"token function"},"DebounceConstructor"),n("span",{class:"token punctuation"},"("),n("span",{class:"token parameter"},[s("fn"),n("span",{class:"token punctuation"},","),s(" interval "),n("span",{class:"token operator"},"="),s(),n("span",{class:"token number"},"0")]),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
  `),n("span",{class:"token keyword"},"let"),s(" timer"),n("span",{class:"token punctuation"},";"),s(`
  `),n("span",{class:"token keyword"},"let"),s(" wraper"),n("span",{class:"token punctuation"},";"),s(`
  `),n("span",{class:"token keyword"},"function"),s(),n("span",{class:"token function"},"Debounce"),n("span",{class:"token punctuation"},"("),n("span",{class:"token parameter"},[n("span",{class:"token operator"},"..."),s("args")]),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
    `),n("span",{class:"token keyword"},"if"),s(),n("span",{class:"token punctuation"},"("),s("timer"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token function"},"clearTimeout"),n("span",{class:"token punctuation"},"("),s("timer"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),s(`
    `),n("span",{class:"token function-variable function"},"wraper"),s(),n("span",{class:"token operator"},"="),s(),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token operator"},"=>"),s(),n("span",{class:"token punctuation"},"{"),s(`
      `),n("span",{class:"token function"},"fn"),n("span",{class:"token punctuation"},"("),n("span",{class:"token operator"},"..."),s("args"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),s(`
      timer `),n("span",{class:"token operator"},"="),s(),n("span",{class:"token keyword"},"undefined"),n("span",{class:"token punctuation"},";"),s(`
    `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},";"),s(`
    timer `),n("span",{class:"token operator"},"="),s(),n("span",{class:"token function"},"setTimeout"),n("span",{class:"token punctuation"},"("),s("wraper"),n("span",{class:"token punctuation"},","),s(" interval"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),s(`
  `),n("span",{class:"token punctuation"},"}"),s(`
  `),n("span",{class:"token keyword"},"function"),s(),n("span",{class:"token function"},"Clear"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
    `),n("span",{class:"token keyword"},"if"),s(),n("span",{class:"token punctuation"},"("),s("timer "),n("span",{class:"token operator"},"!=="),s(),n("span",{class:"token keyword"},"undefined"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
      `),n("span",{class:"token function"},"clearTimeout"),n("span",{class:"token punctuation"},"("),s("timer"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),s(`
      `),n("span",{class:"token function"},"wraper"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),s(`
    `),n("span",{class:"token punctuation"},"}"),s(`
  `),n("span",{class:"token punctuation"},"}"),s(`
  `),n("span",{class:"token keyword"},"return"),s(),n("span",{class:"token punctuation"},"{"),s(`
    Debounce`),n("span",{class:"token punctuation"},","),s(`
    Clear`),n("span",{class:"token punctuation"},","),s(`
  `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},";"),s(`
`),n("span",{class:"token punctuation"},"}"),s(`
`)])]),n("p",null,[s("\u8FD9\u662F\u4E2A\u95ED\u5305\uFF0C\u4ECE\u8BBE\u8BA1\u6A21\u5F0F\u4E0A\u6765\u8BB2\u53EB\u5355\u4F8B\u6A21\u5F0F"),n("code",null,"singleton"),s(" \u3002")]),n("p",null,[s("\u56E0\u4E3A\u6211\u8FD8\u9700\u8981\u5728\u9898\u76EE\u5207\u6362\u65F6\uFF0C\u5F3A\u5236\u5904\u7406\u51FD\u6570\u6267\u884C\uFF0C\u6240\u4EE5\u591A\u4E86\u4E00\u4E2A"),n("code",null,"clear"),s(" \u3002")]),n("p",null,"\u8C03\u7528\u5904\u7684\u4EE3\u7801"),n("pre",{class:"language-javascript"},[n("code",{class:"language-javascript"},[n("span",{class:"token comment"},"// answer.vue"),s(`
`),n("span",{class:"token keyword"},"import"),s(" DebounceConstructor "),n("span",{class:"token keyword"},"from"),s(),n("span",{class:"token string"},'"debounce.js"'),n("span",{class:"token punctuation"},";"),s(`
`),n("span",{class:"token keyword"},"const"),s(),n("span",{class:"token punctuation"},"{"),s(),n("span",{class:"token literal-property property"},"Debounce"),n("span",{class:"token operator"},":"),s(" handleTyping"),n("span",{class:"token punctuation"},","),s(),n("span",{class:"token literal-property property"},"Clear"),n("span",{class:"token operator"},":"),s(" handleExecute "),n("span",{class:"token punctuation"},"}"),s(),n("span",{class:"token operator"},"="),s(),n("span",{class:"token function"},"DebounceConstructor"),n("span",{class:"token punctuation"},"("),s(`
  `),n("span",{class:"token parameter"},"val"),s(),n("span",{class:"token operator"},"=>"),s(),n("span",{class:"token punctuation"},"{"),s(`
    `),n("span",{class:"token function"},"submit"),n("span",{class:"token punctuation"},"("),s("val"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),s(`
    console`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"log"),n("span",{class:"token punctuation"},"("),s("val"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),s(`
  `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),s(`
  `),n("span",{class:"token number"},"800"),s(`
`),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),s(`
`)])]),n("p",null,[s("\u8FD9\u6837\u5C31\u5982\u6700\u4E0A\u9762\u90A3\u5F20\u56FE\u7247\u770B\u5230\u7684\u90A3\u6837\uFF0C\u9047\u5230\u4E00\u7CFB\u5217\u7684\u8F93\u5165\u65F6\uFF0C\u6BCF\u6B21\u8F93\u5165\u6846\u7684\u503C\u53D1\u751F\u6539\u53D8\u65F6\uFF0C\u90FD\u4F1A\u8C03\u7528"),n("code",null,"handleTyping"),s("\uFF0C\u53EA\u6709\u5728\u505C\u6B62\u8F93\u5165\u82E5\u5E72\u6BEB\u79D2\u540E\u624D\u4F1A\u6267\u884C\u4E8B\u4EF6\u5904\u7406\u51FD\u6570\u3002")]),n("h2",null,"\u53E6\u4E00\u79CD\u5904\u7406\u65B9\u5F0F"),n("p",null,"\u4E0A\u9762\u7684\u65B9\u6848\u662F\u91C7\u7528\u4E86\u9632\u6296\u7684\u65B9\u6CD5\u3002\u5176\u5B9E\u4E5F\u53EF\u4EE5\u91C7\u7528\u8282\u6D41\u7684\u65B9\u5F0F\u3002\u8FD9\u4E2A\u53EF\u4EE5\u4ED4\u7EC6\u7814\u7A76\u4E00\u4E0B\u3002"),n("h2",null,"\u7C7B\u4F3C\u7684\u573A\u666F"),n("p",null,[n("img",{src:r,alt:"\u641C\u7D22\u5F15\u64CE"})]),n("p",null,"\u9700\u8981\u4F7F\u7528\u5230\u8282\u6D41\u548C\u9632\u6296\u7684\u7C7B\u4F3C\u7684\u573A\u666F\u8FD8\u6709\u5F88\u591A\u3002\u50CF\u6211\u4EEC\u5728\u641C\u7D22\u5F15\u64CE\u8F93\u5165\u5173\u952E\u5B57\uFF0C\u5E95\u4E0B\u4F1A\u6709\u63D0\u793A\u6846\uFF0C\u8FD9\u4E5F\u662F\u4E2A\u5E94\u7528\u573A\u666F\u3002")],-1),_="JS\u4E2D\u7684\u51FD\u6570\u8282\u6D41\u4E0E\u51FD\u6570\u9632\u6296",b="2019-08-10T22:42:45.000Z",y=["JavaScript"],h="./debounce1.jpg",v={__name:"content",setup(i,{expose:t}){const a={title:"JS\u4E2D\u7684\u51FD\u6570\u8282\u6D41\u4E0E\u51FD\u6570\u9632\u6296",date:"2019-08-10T22:42:45.000Z",tags:["JavaScript"],coverImage:"./debounce1.jpg"};return t({frontmatter:a}),(d,m)=>{const o=e;return l(),c(o,{frontmatter:a},{default:p(()=>[k]),_:1})}}};export{h as coverImage,b as date,v as default,y as tags,_ as title};
