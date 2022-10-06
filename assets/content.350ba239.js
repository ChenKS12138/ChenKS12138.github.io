import{_ as c}from"./ArticleWrapper.vue_vue_type_script_setup_true_lang.8e0480e5.js";import{c as p,w as u,o as e,a as n,b as t,m as l}from"./app.c042c741.js";import"./dayjs.min.28e220c7.js";const i="/assets/goroutine-env.21737bb0.png",k="/assets/goroutine-bench1.f36832fc.png",r=n("div",{class:"markdown-body"},[n("h1",null,"\u524D\u8A00"),n("p",null,[t("\u6211\u7684\u4E3B\u529B\u5F00\u53D1\u8BED\u8A00\u662F"),n("code",null,"JavaScript"),t("\uFF0C\u4F46\u662F js \u5BF9\u591A\u7EBF\u7A0B\u7684\u652F\u6301\u5E76\u4E0D\u662F\u7279\u522B\u597D\u3002\u5728\u5165\u95E8"),n("code",null,"golang"),t("\u540E\uFF0C\u4E86\u89E3\u5230\u4E86"),n("code",null,"go\u534F\u7A0B"),t("\u548C"),n("code",null,"channel"),t("\uFF0C\u60F3\u8BD5\u4E00\u8BD5\u591A\u7EBF\u7A0B\u3002"),n("code",null,"go"),t("\u539F\u751F\u5BF9\u5E76\u53D1\u5F88\u53CB\u597D\uFF0C\u6211\u8FD9\u91CC\u662F\u5E0C\u671B\u5C1D\u8BD5\u4F7F\u7528"),n("code",null,"go\u534F\u7A0B"),t("\u4F18\u5316\u5927\u6570\u7EC4\u6C42\u548C\u3002")]),n("h1",null,"\u5BF9\u6BD4"),n("p",null,"\u8FDB\u884C\u5BF9\u6BD4\u7684\u4E24\u4E2A\u51FD\u6570"),n("ol",null,[n("li",null,[n("code",null,"func sum1(bigArray []int) int"),t(" \u4F7F\u7528\u666E\u901A\u7684\u6570\u7EC4\u6C42\u548C")]),n("li",null,[n("code",null,"func sum2(bigArray []int)int"),t("\u5C06\u6570\u7EC4\u5206\u5272\u6210\u82E5\u5E72\u4E2A\u6570\u7EC4\uFF0C\u5728\u4E0D\u540C\u7684"),n("code",null,"go\u534F\u7A0B"),t("\u8FDB\u884C\u6C42\u548C\uFF0C\u6240\u6709\u7684"),n("code",null,"go\u534F\u7A0B"),t("\u90FD\u5F97\u5230\u7ED3\u679C\u540E\uFF0C\u518D\u8FDB\u884C\u6C42\u548C")])]),n("pre",{class:"language-go"},[n("code",{class:"language-go"},[n("span",{class:"token keyword"},"package"),t(` main

`),n("span",{class:"token keyword"},"import"),t(),n("span",{class:"token punctuation"},"("),t(`
	`),n("span",{class:"token string"},'"math/rand"'),t(`
	`),n("span",{class:"token string"},'"fmt"'),t(`
	`),n("span",{class:"token string"},'"sync"'),t(`
	`),n("span",{class:"token string"},'"time"'),t(`
`),n("span",{class:"token punctuation"},")"),t(`

`),n("span",{class:"token keyword"},"func"),t(),n("span",{class:"token function"},"main"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},"{"),t(`
	`),n("span",{class:"token keyword"},"for"),t(" i"),n("span",{class:"token operator"},":="),n("span",{class:"token number"},"1000"),n("span",{class:"token punctuation"},";"),t("i"),n("span",{class:"token operator"},"<"),n("span",{class:"token number"},"10000000000"),n("span",{class:"token punctuation"},";"),t("i"),n("span",{class:"token operator"},"*="),n("span",{class:"token number"},"2"),t(),n("span",{class:"token punctuation"},"{"),t(`
		duration1`),n("span",{class:"token punctuation"},","),t("duration2"),n("span",{class:"token punctuation"},","),t("result1"),n("span",{class:"token punctuation"},","),t("result2 "),n("span",{class:"token operator"},":="),t(),n("span",{class:"token function"},"runBenchmark"),n("span",{class:"token punctuation"},"("),t("i"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`
		fmt`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Println"),n("span",{class:"token punctuation"},"("),t("i"),n("span",{class:"token punctuation"},","),t("duration1"),n("span",{class:"token punctuation"},","),t("duration2"),n("span",{class:"token punctuation"},","),t("result1"),n("span",{class:"token punctuation"},","),t("result2"),n("span",{class:"token punctuation"},")"),t(`
	`),n("span",{class:"token punctuation"},"}"),t(`
`),n("span",{class:"token punctuation"},"}"),t(`


`),n("span",{class:"token keyword"},"func"),t(),n("span",{class:"token function"},"runBenchmark"),n("span",{class:"token punctuation"},"("),t("amout "),n("span",{class:"token builtin"},"int"),n("span",{class:"token punctuation"},")"),t(),n("span",{class:"token punctuation"},"("),n("span",{class:"token builtin"},"int64"),n("span",{class:"token punctuation"},","),n("span",{class:"token builtin"},"int64"),n("span",{class:"token punctuation"},","),n("span",{class:"token builtin"},"int64"),n("span",{class:"token punctuation"},","),n("span",{class:"token builtin"},"int64"),n("span",{class:"token punctuation"},")"),t(),n("span",{class:"token punctuation"},"{"),t(`
	bigArray `),n("span",{class:"token operator"},":="),n("span",{class:"token function"},"createBigArray"),n("span",{class:"token punctuation"},"("),t("amout"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`
	stop1 `),n("span",{class:"token operator"},":="),t(),n("span",{class:"token function"},"createTimer"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`
	result1 `),n("span",{class:"token operator"},":="),t(),n("span",{class:"token function"},"sum1"),n("span",{class:"token punctuation"},"("),t("bigArray"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`
	duration1 `),n("span",{class:"token operator"},":="),t(),n("span",{class:"token function"},"stop1"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`
	stop2 `),n("span",{class:"token operator"},":="),n("span",{class:"token function"},"createTimer"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`
	result2 `),n("span",{class:"token operator"},":="),t(),n("span",{class:"token function"},"sum2"),n("span",{class:"token punctuation"},"("),t("bigArray"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`
	duration2 `),n("span",{class:"token operator"},":="),t(),n("span",{class:"token function"},"stop2"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`
	`),n("span",{class:"token keyword"},"return"),t(" duration1"),n("span",{class:"token punctuation"},","),t("duration2"),n("span",{class:"token punctuation"},","),t("result1"),n("span",{class:"token punctuation"},","),t("result2"),n("span",{class:"token punctuation"},";"),t(`
`),n("span",{class:"token punctuation"},"}"),t(`

`),n("span",{class:"token keyword"},"func"),t(),n("span",{class:"token function"},"createBigArray"),n("span",{class:"token punctuation"},"("),t("size "),n("span",{class:"token builtin"},"int"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},"["),n("span",{class:"token punctuation"},"]"),n("span",{class:"token builtin"},"int"),n("span",{class:"token punctuation"},"{"),t(`
	rand`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Seed"),n("span",{class:"token punctuation"},"("),t("time"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Now"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Unix"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`
	list `),n("span",{class:"token operator"},":="),t(),n("span",{class:"token function"},"make"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},"["),n("span",{class:"token punctuation"},"]"),n("span",{class:"token builtin"},"int"),n("span",{class:"token punctuation"},","),t("size"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`
	`),n("span",{class:"token keyword"},"for"),t(" i"),n("span",{class:"token operator"},":="),n("span",{class:"token number"},"0"),n("span",{class:"token punctuation"},";"),t("i"),n("span",{class:"token operator"},"<"),t("size"),n("span",{class:"token punctuation"},";"),t("i"),n("span",{class:"token operator"},"++"),n("span",{class:"token punctuation"},"{"),t(`
		list`),n("span",{class:"token punctuation"},"["),t("i"),n("span",{class:"token punctuation"},"]"),t(),n("span",{class:"token operator"},"="),t(" rand"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Int"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),t(`
	`),n("span",{class:"token punctuation"},"}"),t(`
	`),n("span",{class:"token keyword"},"return"),t(" list"),n("span",{class:"token punctuation"},";"),t(`
`),n("span",{class:"token punctuation"},"}"),t(`

`),n("span",{class:"token keyword"},"func"),t(),n("span",{class:"token function"},"createTimer"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),t(),n("span",{class:"token keyword"},"func"),t(),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),t(),n("span",{class:"token builtin"},"int64"),t(),n("span",{class:"token punctuation"},"{"),t(`
	startTime `),n("span",{class:"token operator"},":="),t(" time"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Now"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"UnixNano"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),t(`
	`),n("span",{class:"token keyword"},"return"),t(),n("span",{class:"token keyword"},"func"),t(),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),t(),n("span",{class:"token builtin"},"int64"),t(),n("span",{class:"token punctuation"},"{"),t(`
		`),n("span",{class:"token keyword"},"return"),t(" time"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Now"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"UnixNano"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),t(),n("span",{class:"token operator"},"-"),t(` startTime
	`),n("span",{class:"token punctuation"},"}"),t(`
`),n("span",{class:"token punctuation"},"}"),t(`

`),n("span",{class:"token keyword"},"func"),t(),n("span",{class:"token function"},"sum1"),n("span",{class:"token punctuation"},"("),t("bigArray "),n("span",{class:"token punctuation"},"["),n("span",{class:"token punctuation"},"]"),n("span",{class:"token builtin"},"int"),n("span",{class:"token punctuation"},")"),t(),n("span",{class:"token builtin"},"int64"),t(),n("span",{class:"token punctuation"},"{"),t(`
	sum `),n("span",{class:"token operator"},":="),t(),n("span",{class:"token function"},"int64"),n("span",{class:"token punctuation"},"("),n("span",{class:"token number"},"0"),n("span",{class:"token punctuation"},")"),t(`
	`),n("span",{class:"token keyword"},"for"),t(),n("span",{class:"token boolean"},"_"),n("span",{class:"token punctuation"},","),t("value "),n("span",{class:"token operator"},":="),t(),n("span",{class:"token keyword"},"range"),n("span",{class:"token punctuation"},"("),t("bigArray"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},"{"),t(`
		sum `),n("span",{class:"token operator"},"+="),t(),n("span",{class:"token function"},"int64"),n("span",{class:"token punctuation"},"("),t("value"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`
	`),n("span",{class:"token punctuation"},"}"),t(`
	`),n("span",{class:"token keyword"},"return"),t(" sum"),n("span",{class:"token punctuation"},";"),t(`
`),n("span",{class:"token punctuation"},"}"),t(`

`),n("span",{class:"token keyword"},"func"),t(),n("span",{class:"token function"},"sum2"),n("span",{class:"token punctuation"},"("),t("bigArray "),n("span",{class:"token punctuation"},"["),n("span",{class:"token punctuation"},"]"),n("span",{class:"token builtin"},"int"),n("span",{class:"token punctuation"},")"),n("span",{class:"token builtin"},"int64"),t(),n("span",{class:"token punctuation"},"{"),t(`
	SmallArraySize `),n("span",{class:"token operator"},":="),t(),n("span",{class:"token function"},"len"),n("span",{class:"token punctuation"},"("),t("bigArray"),n("span",{class:"token punctuation"},")"),n("span",{class:"token operator"},"/"),n("span",{class:"token number"},"100"),n("span",{class:"token punctuation"},";"),t(`
	sum`),n("span",{class:"token operator"},":="),n("span",{class:"token function"},"int64"),n("span",{class:"token punctuation"},"("),n("span",{class:"token number"},"0"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`
	chanGroupSize `),n("span",{class:"token operator"},":="),t(),n("span",{class:"token function"},"len"),n("span",{class:"token punctuation"},"("),t("bigArray"),n("span",{class:"token punctuation"},")"),n("span",{class:"token operator"},"/"),t("SmallArraySize"),n("span",{class:"token punctuation"},";"),t(`
	sumChan `),n("span",{class:"token operator"},":="),t(),n("span",{class:"token function"},"make"),n("span",{class:"token punctuation"},"("),n("span",{class:"token keyword"},"chan"),t(),n("span",{class:"token builtin"},"int64"),n("span",{class:"token punctuation"},","),t("chanGroupSize"),n("span",{class:"token operator"},"+"),n("span",{class:"token number"},"1"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`
	waitGroup `),n("span",{class:"token operator"},":="),t(),n("span",{class:"token function"},"new"),n("span",{class:"token punctuation"},"("),t("sync"),n("span",{class:"token punctuation"},"."),t("WaitGroup"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`
	`),n("span",{class:"token keyword"},"for"),t(" i"),n("span",{class:"token operator"},":="),n("span",{class:"token number"},"0"),n("span",{class:"token punctuation"},";"),t("i"),n("span",{class:"token operator"},"<"),t("chanGroupSize"),n("span",{class:"token punctuation"},";"),t("i"),n("span",{class:"token operator"},"++"),n("span",{class:"token punctuation"},"{"),t(`
		waitGroup`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Add"),n("span",{class:"token punctuation"},"("),n("span",{class:"token number"},"1"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`
		`),n("span",{class:"token keyword"},"go"),t(),n("span",{class:"token function"},"sumRoutine"),n("span",{class:"token punctuation"},"("),t("bigArray"),n("span",{class:"token punctuation"},"["),t("i"),n("span",{class:"token operator"},"*"),t("SmallArraySize"),n("span",{class:"token punctuation"},":"),n("span",{class:"token punctuation"},"("),t("i"),n("span",{class:"token operator"},"+"),n("span",{class:"token number"},"1"),n("span",{class:"token punctuation"},")"),n("span",{class:"token operator"},"*"),t("SmallArraySize"),n("span",{class:"token punctuation"},"]"),n("span",{class:"token punctuation"},","),t(" sumChan"),n("span",{class:"token punctuation"},","),t(" waitGroup"),n("span",{class:"token punctuation"},")"),t(`
	`),n("span",{class:"token punctuation"},"}"),t(`
	waitGroup`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Wait"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),t(`
	`),n("span",{class:"token keyword"},"for"),t(" i"),n("span",{class:"token operator"},":="),n("span",{class:"token number"},"0"),n("span",{class:"token punctuation"},";"),t("i"),n("span",{class:"token operator"},"<"),t("chanGroupSize"),n("span",{class:"token punctuation"},";"),t("i"),n("span",{class:"token operator"},"++"),t(),n("span",{class:"token punctuation"},"{"),t(`
		sum`),n("span",{class:"token operator"},"+="),t(),n("span",{class:"token operator"},"<-"),t(" sumChan"),n("span",{class:"token punctuation"},";"),t(`
	`),n("span",{class:"token punctuation"},"}"),t(`
	`),n("span",{class:"token keyword"},"return"),t(" sum"),n("span",{class:"token punctuation"},";"),t(`
`),n("span",{class:"token punctuation"},"}"),t(`

`),n("span",{class:"token keyword"},"func"),t(),n("span",{class:"token function"},"sumRoutine"),n("span",{class:"token punctuation"},"("),t("smallArray "),n("span",{class:"token punctuation"},"["),n("span",{class:"token punctuation"},"]"),n("span",{class:"token builtin"},"int"),n("span",{class:"token punctuation"},","),t("ch "),n("span",{class:"token keyword"},"chan"),t(),n("span",{class:"token builtin"},"int64"),n("span",{class:"token punctuation"},","),t("wg "),n("span",{class:"token operator"},"*"),t("sync"),n("span",{class:"token punctuation"},"."),t("WaitGroup"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},"{"),t(`
	`),n("span",{class:"token keyword"},"defer"),t(" wg"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Done"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),t(`
	sum `),n("span",{class:"token operator"},":="),n("span",{class:"token function"},"int64"),n("span",{class:"token punctuation"},"("),n("span",{class:"token number"},"0"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`
	`),n("span",{class:"token keyword"},"for"),t(),n("span",{class:"token boolean"},"_"),n("span",{class:"token punctuation"},","),t("value "),n("span",{class:"token operator"},":="),t(),n("span",{class:"token keyword"},"range"),n("span",{class:"token punctuation"},"("),t("smallArray"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},"{"),t(`
		sum `),n("span",{class:"token operator"},"+="),n("span",{class:"token function"},"int64"),n("span",{class:"token punctuation"},"("),t("value"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},";"),t(`
	`),n("span",{class:"token punctuation"},"}"),t(`
	ch `),n("span",{class:"token operator"},"<-"),t(" sum"),n("span",{class:"token punctuation"},";"),t(`
`),n("span",{class:"token punctuation"},"}"),t(`
`)])]),n("h1",null,"\u8FDB\u884C\u6D4B\u8BD5"),n("p",null,[t("\u9996\u5148\u6211\u5728\u81EA\u5DF1\u7684\u7B14\u8BB0\u672C\u4E0A\u8DD1\u4E86\u4E00\u4E0B\uFF0C\u6548\u679C\u4F3C\u4E4E\u4E0D\u662F\u7279\u522B\u660E\u663E\uFF0C\u5F53\u6570\u636E\u89C4\u6A21\u6BD4\u8F83\u5C0F\u65F6\uFF0C\u4F7F\u7528"),n("code",null,"go\u534F\u7A0B"),t("\u4EA7\u751F\u7684\u5F00\u9500\u76F8\u6BD4\u591A\u7EBF\u7A0B\u5E26\u6765\u7684\u6027\u80FD\u63D0\u5347\u4F1A\u6BD4\u8F83\u5927\u3002")]),n("p",null,[n("img",{src:i,alt:"env-mbp"})]),n("pre",null,[n("code",null,`\u6570\u636E\u89C4\u6A21 sum1\u51FD\u6570\u8017\u65F6(ns) sum2\u51FD\u6570\u8017\u65F6(ns)
1000	1000	257000
2000	2000	196000
4000	3000	123000
8000	19000	566000
16000	24000	574000
32000	21000	106000
64000	46000	101000
128000	92000	117000
256000	161000	164000
512000	710000	354000
1024000	633000	380000
2048000	1855000	746000
4096000	3779000	1430000
8192000	9285000	7126000
16384000	17107000	7522000
32768000	37100000	16824000
65536000	71186000	28741000
131072000	153552000	55689000
262144000	349672000	125364000
524288000	3370025000	221678000
`)]),n("p",null,[n("img",{src:k,alt:"bench1"})]),n("hr"),n("p",null,"\u540E\u9762\u6211\u4F7F\u7528\u4E86\u4E00\u53F0 8 \u6838 16GB \u5185\u5B58\u7684\u4E91\u670D\u52A1\u5668\u8FDB\u884C\u6D4B\u8BD5\uFF0C\u6548\u679C\u5C31\u6BD4\u8F83\u660E\u663E\u4E86\u3002sum2 \u51FD\u6570\u7684\u8017\u65F6\u660E\u663E\u964D\u4F4E\u3002"),n("pre",null,[n("code",null,`processor	: 6
vendor_id	: GenuineIntel
cpu family	: 6
model		: 85
model name	: Intel(R) Xeon(R) Platinum 8255C CPU @ 2.50GHz
stepping	: 5
microcode	: 0x1
cpu MHz		: 2494.140
cache size	: 36608 KB
physical id	: 0
siblings	: 8
core id		: 6
cpu cores	: 8
apicid		: 6
initial apicid	: 6
fpu		: yes
fpu_exception	: yes
cpuid level	: 13
wp		: yes
`)]),n("pre",null,[n("code",null,`\u6570\u636E\u89C4\u6A21 sum1\u51FD\u6570\u8017\u65F6(ns) sum2\u51FD\u6570\u8017\u65F6(ns)
1000	975	184791
2000	1744	136564
4000	2452	77209
8000	4462	148065
16000	13041	151411
32000	17729	99903
64000	34824	88240
128000	72507	88009
256000	153425	118217
512000	307149	128954
1024000	716739	218762
2048000	1498043	340398
4096000	3121459	741179
8192000	6512778	1440240
16384000	12999638	2841228
32768000	25421817	5573615
65536000	52787702	11216755
131072000	102977136	22564239
262144000	212568740	48269912
524288000	408104714	90059294
`)]),n("p",null,[n("img",{src:l,alt:"bench2"})]),n("h1",null,"\u5206\u6790"),n("p",null,[t("\u5728\u6C42\u548C\u6570\u7EC4\u89C4\u6A21\u6570\u636E\u89C4\u6A21\u6BD4\u8F83\u5927\uFF0C\u8FD0\u884C\u7684\u673A\u5668\u6838\u5FC3\u6570\u6BD4\u8F83\u591A\u7684\u65F6\u5019\uFF0C\u4F7F\u7528"),n("code",null,"go\u534F\u7A0B"),t("\u662F\u53EF\u4EE5\u63D0\u5347\u6570\u7EC4\u6C42\u548C\u7684\u6548\u7387\u7684\u3002"),n("code",null,"go\u534F\u7A0B"),t("\u548C\u7CFB\u7EDF\u7684\u8FDB\u7A0B\u5E76\u4E0D\u662F\u4E00\u4E00\u5BF9\u5E94\u7684\uFF0C\u521B\u5EFA\u4E00\u4E2A"),n("code",null,"go\u534F\u7A0B"),t("\u672C\u8EAB\u7684\u5F00\u9500\u4E5F\u6BD4\u521B\u5EFA\u4E00\u4E2A\u7EBF\u7A0B\u5C0F\u3002\u5BF9\u5927\u6570\u7EC4\u6C42\u548C\u53EA\u662F\u4E00\u79CD\u573A\u666F\uFF0C\u4E5F\u6709\u5F88\u591A\u5176\u4ED6\u7C7B\u4F3C\u7684\u573A\u666F\u53EF\u4EE5\u5229\u7528"),n("code",null,"go\u534F\u7A0B"),t("\u8FDB\u884C\u4F18\u5316\u3002")])],-1),w="\u4F7F\u7528go\u534F\u7A0B\u4F18\u5316\u6C42\u548C\u7B97\u6CD5",h="2020-07-27T13:11:04.000Z",_=["go","\u968F\u7B14"],A="./goroutine-bench2.png",z={__name:"content",setup(m,{expose:a}){const s={title:"\u4F7F\u7528go\u534F\u7A0B\u4F18\u5316\u6C42\u548C\u7B97\u6CD5",date:"2020-07-27T13:11:04.000Z",tags:["go","\u968F\u7B14"],coverImage:"./goroutine-bench2.png"};return a({frontmatter:s}),(d,f)=>{const o=c;return e(),p(o,{frontmatter:s},{default:u(()=>[r]),_:1})}}};export{A as coverImage,h as date,z as default,_ as tags,w as title};
