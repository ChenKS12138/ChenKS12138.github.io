(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{"0qtJ":function(e,t,a){"use strict";a.r(t),a.d(t,"query",(function(){return l}));a("Z2Ku"),a("L9s1"),a("dRSK"),a("KKXr"),a("rGqo"),a("yt8O"),a("Btvt"),a("T39b"),a("XfO3"),a("HEwt");var n=a("q1tI"),r=a.n(n),c=a("Wbzz"),i=a("Z+rF"),o=a("nwxG"),s=a.n(o);a("AhK/");t.default=function(e){var t=e.data,a=Object(n.useState)("ALL"),o=a[0],l=a[1],d=t.allMarkdownRemark.totalCount,u=t.allMarkdownRemark.nodes,m=Object(n.useMemo)((function(){return Array.from(new Set(u.reduce((function(e,t){return e.concat(t.frontmatter.tags)}),["ALL"])))}),[u]),f=u.reduce((function(e,t){var a=t.frontmatter,n=a.date,r=a.title,c=a.tags,i=t.id,s=n.split(" "),l=s[0],d=s[1],u=e.find((function(e){return e.year===l})),m={MMDD:d,title:r,tags:c,id:i};return"ALL"===o||c.includes(o)?(u?u.nodes.push(m):e.push({year:l,nodes:[m]}),e):e}),[]);return r.a.createElement(i.a,{backgroundSrc:s.a,height:"500px",content:r.a.createElement("div",{className:"list-header-content"},"Archive"),title:"Archives"},r.a.createElement("div",{className:"list-container"},r.a.createElement("div",{className:"tags-container"},m.map((function(e){return r.a.createElement("div",{className:"tag "+(e===o?"tag-selected":""),key:e,onClick:function(){return l(e)}},e)}))),"ALL"===o&&r.a.createElement("div",{className:"total-count-container"},"Total:",d),r.a.createElement("div",{className:"group-container"},f.map((function(e){return r.a.createElement("div",{className:"group",key:e.year},r.a.createElement("div",{className:"group-year"},e.year),r.a.createElement("div",{className:"group-nodes-container"},e.nodes.map((function(e){return r.a.createElement("div",{className:"node",onClick:function(){return Object(c.navigate)("/detail/"+e.id)},key:e.id},r.a.createElement("div",{className:"node-title"},e.title),r.a.createElement("div",{className:"node-date"},e.MMDD))}))))})))))};var l="1447436773"},"AhK/":function(e,t,a){},nwxG:function(e,t,a){e.exports=a.p+"static/OLJxbaR-3d79a01860a24fc09b3d8b2ae49f3e53.jpg"}}]);
//# sourceMappingURL=component---src-pages-list-tsx-a872baba29ec6a48f048.js.map