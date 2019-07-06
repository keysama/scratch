(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["news"],{"5b61":function(e,t,i){(function(e,i){i(t)})(0,function(e){"use strict";(function(){if("undefined"!==typeof document){var e=document.head||document.getElementsByTagName("head")[0],t=document.createElement("style"),i=" .timeline { padding: 0; position: relative; list-style: none; font-family: PingFangSC-light, Avenir, Helvetica, Arial, Hiragino Sans GB, Microsoft YaHei, sans-serif; -webkit-font-smoothing: antialiased; margin: 10px 20px; } .timeline:after { position: absolute; content: ''; left: 0; top: 0; width: 1px; height: 100%; background-color: var(--timelineTheme); } .timeline-item { position: relative; margin: 1.5em 0 0 28px; padding-bottom: 1.5em; border-bottom: 1px dotted var(--timelineTheme); } .timeline-item:last-child { border-bottom: none; } .timeline-circle { position: absolute; top: .28em; left: -34px; width: 10px; height: 10px; border-radius: 50%; border: 1px solid var(--timelineTheme); background-color: var(--timelineTheme); z-index: 1; box-sizing: content-box; } .timeline-circle.hollow { background-color: var(--timelineBg); } .timeline-title { position: relative; display: inline-block; /** * BFC inline-block 元素与其兄弟元素、子元素和父元素的外边距都不会折叠（包括其父元素和子元素） */ cursor: crosshair; margin: -.15em 0 15px 28px } .timeline-title:not(:first-child) { margin-top: 28px; } .timeline-title-circle { left: -36px; top: .15em; width: 16px; height: 16px; } .timeline-others { width: 40px; height: auto; top: .2em; left: -48px; line-height: 1; padding: 2px 0; text-align: center; border: none; background-color: var(--timelineBg); } ";t.type="text/css",t.styleSheet?t.styleSheet.cssText=i:t.appendChild(document.createTextNode(i)),e.appendChild(t)}})();var t={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("ul",{ref:"timeline",staticClass:"timeline"},[e._t("default")],2)},staticRenderFns:[],name:"Timeline",props:{timelineTheme:{type:String,default:"#dbdde0"},timelineBg:{type:String,default:"#fff"}},mounted:function(){var e=this.$refs.timeline;e.style.setProperty("--timelineTheme",this.timelineTheme),e.style.setProperty("--timelineBg",this.timelineBg)}};(function(){if("undefined"!==typeof document){var e=document.head||document.getElementsByTagName("head")[0],t=document.createElement("style"),i="";t.type="text/css",t.styleSheet?t.styleSheet.cssText=i:t.appendChild(document.createTextNode(i)),e.appendChild(t)}})();var i={name:"TimelineItemBase",props:{bgColor:{type:String,default:""},lineColor:{type:String,default:""},hollow:{type:Boolean,default:!1},fontColor:{type:String,default:"#37414a"}},data:function(){return{slotOthers:!1}},computed:{circleStyle:function(){if(this.bgColor||this.lineColor||this.hollow){var e={};return this.bgColor&&(e={"border-color":this.bgColor,"background-color":this.bgColor}),this.lineColor&&(e=Object.assign({},e,{"border-color":this.lineColor})),e}},itemStyle:function(){return{color:this.fontColor}},slotClass:function(){var e="";return this.slotOthers?e="timeline-others":this.hollow&&(e="hollow"),e}},mounted:function(){this.slotOthers=!!this.$refs.others.innerHTML}};(function(){if("undefined"!==typeof document){var e=document.head||document.getElementsByTagName("head")[0],t=document.createElement("style"),i="";t.type="text/css",t.styleSheet?t.styleSheet.cssText=i:t.appendChild(document.createTextNode(i)),e.appendChild(t)}})();var n={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("li",{staticClass:"timeline-item",style:e.itemStyle},[i("div",{ref:"others",staticClass:"timeline-circle",class:e.slotClass,style:e.circleStyle},[e._t("others")],2),e._v(" "),e._t("default")],2)},staticRenderFns:[],extends:i};(function(){if("undefined"!==typeof document){var e=document.head||document.getElementsByTagName("head")[0],t=document.createElement("style"),i="";t.type="text/css",t.styleSheet?t.styleSheet.cssText=i:t.appendChild(document.createTextNode(i)),e.appendChild(t)}})();var o={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("li",{staticClass:"timeline-title",style:e.itemStyle},[i("div",{ref:"others",staticClass:"timeline-circle timeline-title-circle",class:e.slotClass,style:e.circleStyle},[e._t("others")],2),e._v(" "),e._t("default")],2)},staticRenderFns:[],extends:i};"undefined"!==typeof window&&window.Vue&&(window.Vue.component(t.name,t),window.Vue.component(n.name,n),window.Vue.component(o.name,o)),e.Timeline=t,e.TimelineItem=n,e.TimelineTitle=o,Object.defineProperty(e,"__esModule",{value:!0})})},"7c64":function(e,t,i){"use strict";i.r(t);var n=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"container-fluid",staticStyle:{"margin-top":"40px"}},[i("div",{staticClass:"row"},[i("div",{staticClass:"col-md10 offset-md-1"},e._l(e.newsList,function(t,n){return i("timeline",{key:n,staticClass:"newsList"},[i("timeline-title",[e._v(e._s(e._f("timeFilter")(t.dateTime)))]),i("timeline-item",{attrs:{"bg-color":"#9dd8e0"}},[i("router-link",{staticClass:"item",attrs:{to:"/news/"+t.id,tag:"div"}},[i("div",{staticClass:"card bg-light text-dark"},[i("div",{staticClass:"card-header"},[e._v(e._s(t.title))]),""!=t.cover||null!=t.cover?i("div",{staticClass:"card-body"},[i("div",{staticClass:"coverBox"},[i("img",{attrs:{src:e.newsUrl+t.cover,alt:""}})])]):e._e()])])],1)],1)}))])])},o=[],l=(i("96cf"),i("3040")),r=(i("cadf"),i("551c"),i("097d"),i("51be")),s=i("aa2a"),a=i("5b61"),c=i("b7f9"),d={created:function(){this.newsUrl=r["e"],this.init()},data:function(){return{newsUrl:"",newsList:[],commentList:[],commentNum:0,commentSize:5}},methods:{init:function(){var e=Object(l["a"])(regeneratorRuntime.mark(function e(){var t;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return this.$store.commit(c["g"]),e.next=3,Object(s["b"])();case 3:if(t=e.sent,this.$store.commit(c["f"]),0!=t.data.state){e.next=8;break}return alert(t.data.text),e.abrupt("return");case 8:this.newsList=t.data.body,document.title="趣乐码-新闻中心";case 11:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},components:{Timeline:a["Timeline"],TimelineItem:a["TimelineItem"],TimelineTitle:a["TimelineTitle"]},mounted:function(){},filters:{timeFilter:function(e){var t=new Date(parseInt(e)),i=t.getFullYear(),n=t.getMonth()+1,o=t.getDate();return i+"-"+(n<10?"0"+n:n)+"-"+(o<10?"0"+o:o)}}},m=d,u=(i("a62d"),i("2877")),h=Object(u["a"])(m,n,o,!1,null,"7d39e64b",null);h.options.__file="index.vue";t["default"]=h.exports},a62d:function(e,t,i){"use strict";var n=i("cd1b"),o=i.n(n);o.a},aa2a:function(e,t,i){"use strict";i.d(t,"b",function(){return o}),i.d(t,"a",function(){return l});var n=i("365c"),o=function(){return n["a"].get("api/news/list")},l=function(e){return n["a"].get("api/news/detail/"+e)}},cd1b:function(e,t,i){}}]);
//# sourceMappingURL=news.91826ec0.js.map