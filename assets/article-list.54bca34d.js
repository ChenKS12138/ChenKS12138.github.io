import{d as x,u as A,B as u,C as w,D as v,e as d,a,F as _,E as m,f as h,t as r,G as C,H as D,o,c as B,w as L,s as S,I as b}from"./app.300cb24c.js";import{d as E}from"./dayjs.min.28e220c7.js";const I=i=>(C("data-v-277352e9"),i=i(),D(),i),M={class:"tag-container"},T=["data-selected"],j=["data-selected","onClick"],F={class:"articles-container"},H=I(()=>a("div",{class:"articles-divider border-t dark:border-white"},null,-1)),$={class:"text-xl"},G={class:"ml-5 mt-2 mb-8"},N={class:"flex justify-between my-3 dark:text-white"},V=x({__name:"article-list",setup(i){A({title:"\u6587\u7AE0"});const f=Array.from(u.reduce((s,e)=>{var l,t;return(t=(l=e.data)==null?void 0:l.tags)==null||t.forEach(c=>s.add(c)),s},new Set)),n=w(""),y=v(()=>n.value.length?u.filter(s=>{var e;return(e=s.data)==null?void 0:e.tags.includes(n.value)}):u),g=v(()=>y.value.map(s=>{const{path:e,data:l}=s,t=E(l.date);return{path:e,title:l.title,year:t.year(),monthAndDay:t.format("MM-DD")}})),k=v(()=>Array.from(g.value.reduce((s,e)=>(s.get(e.year)||s.set(e.year,[]),s.get(e.year).push(e),s),new Map).entries()));return(s,e)=>{const l=S("router-link");return o(),d(_,null,[a("div",M,[a("div",{class:"tag-item","data-selected":n.value==="",onClick:e[0]||(e[0]=t=>n.value="")}," ALL ",8,T),(o(!0),d(_,null,m(h(f),t=>(o(),d("div",{class:"tag-item","data-selected":n.value===t?"true":"",onClick:c=>n.value=t},r(t),9,j))),256))]),a("div",F,[a("div",null,"Total: "+r(h(u).length),1),H,(o(!0),d(_,null,m(h(k),([t,c])=>(o(),d("div",{class:"mt-2",key:t},[a("div",$,r(t),1),a("div",G,[(o(!0),d(_,null,m(c,p=>(o(),B(l,{class:"article-link",to:p.path},{default:L(()=>[a("div",N,[a("div",null,r(p.title),1),a("div",null,r(p.monthAndDay),1)])]),_:2},1032,["to"]))),256))])]))),128))])],64)}}});const J=b(V,[["__scopeId","data-v-277352e9"]]);export{J as default};