(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["mypage_productions"],{"0bfb":function(t,e,n){"use strict";var i=n("cb7c");t.exports=function(){var t=i(this),e="";return t.global&&(e+="g"),t.ignoreCase&&(e+="i"),t.multiline&&(e+="m"),t.unicode&&(e+="u"),t.sticky&&(e+="y"),e}},"0c34":function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"joystick"},[n("div",{staticClass:"j-box"},[n("div",{staticClass:"j-left"},t._l(t.left,function(e,i){return n("button",{key:i,staticClass:"j-button",class:{op0:""==e.value&&!t.edit},on:{click:function(e){t.edit&&t.listen("left",i)},touchstart:function(n){n.preventDefault(),!t.edit&&t.hit("down",{keycode:e.value,key:e.name},n)},touchend:function(n){n.preventDefault(),!t.edit&&t.hit("up",{keycode:e.value,key:e.name})}}},[t._v(t._s(t._f("btnname")(e.name)))])})),n("div",{staticClass:"j-right"},t._l(t.right,function(e,i){return""!=e.value||t.edit?n("button",{key:i,staticClass:"j-button",on:{click:function(e){t.edit&&t.listen("right",i)},touchstart:function(n){n.preventDefault(),!t.edit&&t.hit("down",{keycode:e.value,key:e.name},n)},touchend:function(n){n.preventDefault(),!t.edit&&t.hit("up",{keycode:e.value,key:e.name})}}},[t._v(t._s(t._f("btnname")(e.name)))]):t._e()}))]),n("div",{directives:[{name:"show",rawName:"v-show",value:t.black,expression:"black"}],staticClass:"black"},[t._v("\n    请按下想要设置的按键\n  ")])])},a=[],s=(n("ac6a"),n("cadf"),n("551c"),n("097d"),{props:["left","right","edit"],mounted:function(){this.$emit("resize",this.resize)},data:function(){return{black:!1}},methods:{hit:function(t,e,n){this.$emit("hit",{type:t,value:e})},listen:function(t,e){var n=this;this.black=!0,document.onkeydown=function(i){i.preventDefault(),n.black=!1,console.log({area:t,value:i.keyCode,name:i.key}),27!=i.keyCode?(n.$emit("set",e,{area:t,value:i.keyCode,name:i.key}),document.onkeydown=null):n.$emit("clean",e,{area:t,value:i.keyCode,name:i.key})}},resize:function(){document.querySelectorAll(".j-left")[0].style.height=document.querySelectorAll(".j-left")[0].clientWidth+"px";var t=document.querySelectorAll(".j-right .j-button");t.forEach(function(t){t.style.height=t.clientWidth+"px"})}},filters:{btnname:function(t){switch(t){case"ArrowUp":return"↑";case"ArrowDown":return"↓";case"ArrowLeft":return"←";case"ArrowRight":return"→";case" ":return"空格";default:return t}}}}),r=s,o=(n("f576"),n("2877")),c=Object(o["a"])(r,i,a,!1,null,"8d23e314",null);c.options.__file="joystick.vue";e["a"]=c.exports},"11e9":function(t,e,n){var i=n("52a7"),a=n("4630"),s=n("6821"),r=n("6a99"),o=n("69a8"),c=n("c69a"),u=Object.getOwnPropertyDescriptor;e.f=n("9e1e")?u:function(t,e){if(t=s(t),e=r(e,!0),c)try{return u(t,e)}catch(t){}if(o(t,e))return a(!i.f.call(t,e),t[e])}},"214f":function(t,e,n){"use strict";var i=n("32e9"),a=n("2aba"),s=n("79e5"),r=n("be13"),o=n("2b4c");t.exports=function(t,e,n){var c=o(t),u=n(r,c,""[t]),l=u[0],d=u[1];s(function(){var e={};return e[c]=function(){return 7},7!=""[t](e)})&&(a(String.prototype,t,l),i(RegExp.prototype,c,2==e?function(t,e){return d.call(t,this,e)}:function(t){return d.call(t,this)}))}},"26f6":function(t,e,n){},"28a5":function(t,e,n){n("214f")("split",2,function(t,e,i){"use strict";var a=n("aae3"),s=i,r=[].push,o="split",c="length",u="lastIndex";if("c"=="abbc"[o](/(b)*/)[1]||4!="test"[o](/(?:)/,-1)[c]||2!="ab"[o](/(?:ab)*/)[c]||4!="."[o](/(.?)(.?)/)[c]||"."[o](/()()/)[c]>1||""[o](/.?/)[c]){var l=void 0===/()??/.exec("")[1];i=function(t,e){var n=String(this);if(void 0===t&&0===e)return[];if(!a(t))return s.call(n,t,e);var i,o,d,f,p,h=[],v=(t.ignoreCase?"i":"")+(t.multiline?"m":"")+(t.unicode?"u":"")+(t.sticky?"y":""),m=0,b=void 0===e?4294967295:e>>>0,g=new RegExp(t.source,v+"g");l||(i=new RegExp("^"+g.source+"$(?!\\s)",v));while(o=g.exec(n)){if(d=o.index+o[0][c],d>m&&(h.push(n.slice(m,o.index)),!l&&o[c]>1&&o[0].replace(i,function(){for(p=1;p<arguments[c]-2;p++)void 0===arguments[p]&&(o[p]=void 0)}),o[c]>1&&o.index<n[c]&&r.apply(h,o.slice(1)),f=o[0][c],m=d,h[c]>=b))break;g[u]===o.index&&g[u]++}return m===n[c]?!f&&g.test("")||h.push(""):h.push(n.slice(m)),h[c]>b?h.slice(0,b):h}}else"0"[o](void 0,0)[c]&&(i=function(t,e){return void 0===t&&0===e?[]:s.call(this,t,e)});return[function(n,a){var s=t(this),r=void 0==n?void 0:n[e];return void 0!==r?r.call(n,s,a):i.call(String(s),n,a)},i]})},"386d":function(t,e,n){n("214f")("search",1,function(t,e,n){return[function(n){"use strict";var i=t(this),a=void 0==n?void 0:n[e];return void 0!==a?a.call(n,i):new RegExp(n)[e](String(i))},n]})},"3b2b":function(t,e,n){var i=n("7726"),a=n("5dbc"),s=n("86cc").f,r=n("9093").f,o=n("aae3"),c=n("0bfb"),u=i.RegExp,l=u,d=u.prototype,f=/a/g,p=/a/g,h=new u(f)!==f;if(n("9e1e")&&(!h||n("79e5")(function(){return p[n("2b4c")("match")]=!1,u(f)!=f||u(p)==p||"/a/i"!=u(f,"i")}))){u=function(t,e){var n=this instanceof u,i=o(t),s=void 0===e;return!n&&i&&t.constructor===u&&s?t:a(h?new l(i&&!s?t.source:t,e):l((i=t instanceof u)?t.source:t,i&&s?c.call(t):e),n?this:d,u)};for(var v=function(t){t in u||s(u,t,{configurable:!0,get:function(){return l[t]},set:function(e){l[t]=e}})},m=r(l),b=0;m.length>b;)v(m[b++]);d.constructor=u,u.prototype=d,n("2aba")(i,"RegExp",u)}n("7a56")("RegExp")},"46bc":function(t,e,n){"use strict";n.r(e);var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"mypage_productions container-fluid"},[n("div",{staticClass:"row serach"},[n("div",{staticClass:"col-md-2 col-4"},[n("select",{directives:[{name:"model",rawName:"v-model",value:t.mode,expression:"mode"}],staticClass:"form-control",attrs:{id:"sel1"},on:{change:[function(e){var n=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){var e="_value"in t?t._value:t.value;return e});t.mode=e.target.multiple?n:n[0]},function(e){t.search=!1,t.keyword=""}]}},[n("option",{attrs:{value:"1"}},[t._v("全部")]),n("option",{attrs:{value:"2"}},[t._v("已发布")]),n("option",{attrs:{value:"3"}},[t._v("未发布")])])]),n("div",{staticClass:"input-group serach-box col-md-6 col-8 offset-md-4"},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.keyword,expression:"keyword"}],staticClass:"form-control",attrs:{type:"text"},domProps:{value:t.keyword},on:{input:function(e){e.target.composing||(t.keyword=e.target.value)}}}),n("div",{staticClass:"btn btn-primary btn-mini",on:{click:function(e){t.search=!0,t.mode=1}}},[t._v("搜索")])])]),n("div",{staticClass:"row content-list",staticStyle:{"margin-top":"10px"}},t._l(t.filter_productions,function(e,i){return n("div",{key:i,staticClass:"row item"},[n("div",{staticClass:"col-md-1 col-6"},[n("div",{staticClass:"cover hover",on:{click:function(n){t.fakeA("/#/play/"+e.id)}}},[n("img",{attrs:{src:t.baseUrl+"upload/cover/"+e.cover,alt:""}})])]),n("div",{staticClass:"col-md-5 col-6"},[n("div",{staticClass:"row"},[n("div",{staticClass:"col-md-6"},[n("span",{staticClass:"hover",on:{click:function(n){t.fakeA("/#/play/"+e.id)}}},[t._v(t._s(e.title))])]),n("div",{staticClass:"col-md-6 text-center state"},[n("span",{staticClass:"badge badge-pill badge-primary",class:{"badge-warning":0==e.state,"badge-danger":3==e.state,"badge-info":2==e.state},staticStyle:{padding:"6px 12px"}},[t._v(t._s(1==e.state?"已发布":0==e.state?"未发布":3==e.state?"被下架":2==e.state?"申请中":"其他"))])])])]),n("div",{staticClass:"col-md-6 func"},[n("span",{staticClass:"btn btn-light btn-mini",on:{click:function(n){t.configStick(e.id)}}},[t._v("配置")]),n("span",{staticClass:"btn btn-light btn-mini",on:{click:function(n){t.fakeA("/#/edit/"+e.id)}}},[t._v("编辑")]),n("span",{staticClass:"btn btn-light btn-mini",on:{click:function(n){t.share(e.id)}}},[t._v("分享")]),0==e.state?n("span",{staticClass:"btn btn-light btn-mini",on:{click:function(n){t.proOn(e.id)}}},[t._v("发布")]):t._e(),1==e.state?n("span",{staticClass:"btn btn-danger btn-mini",on:{click:function(n){t.proOff(e.id)}}},[t._v("下架")]):t._e(),3==e.state?n("span",{staticClass:"btn btn-info btn-mini",on:{click:function(n){t.proApply(e.id)}}},[t._v("申请")]):t._e(),n("span",{staticClass:"btn btn-light btn-mini",on:{click:function(n){t.proDelete(e.id)}}},[t._v("删除")])])])})),n("div",{staticClass:"modal",attrs:{id:"myModal","data-keyboard":"false",s:""}},[n("div",{staticClass:"modal-dialog"},[n("div",{staticClass:"modal-content"},[t._m(0),n("div",{staticClass:"modal-body"},[n("joystick",{attrs:{edit:!0,left:t.stickData.left,right:t.stickData.right},on:{set:t.setStick,resize:t.stickInit,clean:t.cleanStick}})],1),n("div",{staticClass:"modal-footer"},[n("button",{staticClass:"btn btn-success",attrs:{type:"button"},on:{click:t.save}},[t._v("保存")]),n("button",{staticClass:"btn btn-secondary",attrs:{type:"button","data-dismiss":"modal"}},[t._v("关闭")])])])])]),t._m(1)])},a=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"modal-header"},[n("h4",{staticClass:"modal-title"},[t._v("虚拟按键配置")]),n("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"modal"}},[t._v("×")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"modal fade",attrs:{id:"shareModal"}},[n("div",{staticClass:"modal-dialog"},[n("div",{staticClass:"modal-content"},[n("div",{staticClass:"modal-header"},[n("h4",{staticClass:"modal-title"},[t._v("分享到...")]),n("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"modal"}},[t._v("×")])]),n("div",{staticClass:"modal-body"},[n("div",{attrs:{id:"share"}})]),n("div",{staticClass:"modal-footer"},[n("button",{staticClass:"btn btn-secondary",attrs:{type:"button","data-dismiss":"modal"}},[t._v("关闭")])])])])])}],s=(n("386d"),n("3b2b"),n("28a5"),n("7f7f"),n("96cf"),n("3040")),r=(n("cadf"),n("551c"),n("097d"),n("51be")),o=n("d494"),c=n("dc66"),u=n("b7f9"),l=n("0c34"),d={created:function(){this.init()},data:function(){for(var t={left:[],right:[]},e=0;e<4;e++)t.left.push({name:"",value:""});for(var n=0;n<6;n++)t.right.push({name:"",value:""});return{baseUrl:"",productions:[],stickData:t,stickIni:"",stickId:"",mode:1,keyword:"",search:!1}},methods:{init:function(){var t=Object(s["a"])(regeneratorRuntime.mark(function t(){var e;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return this.baseUrl=r["b"],this.$store.commit(u["g"]),t.next=4,Object(c["g"])(this.$store.state.userInfo.id);case 4:if(e=t.sent,this.$store.commit(u["f"]),0!=e.data.state){t.next=9;break}return alert(e.data.text),t.abrupt("return");case 9:this.productions=e.data.body,document.documentElement.scrollTop=0;case 12:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}(),fakeA:function(t){window.open(t)},proOn:function(){var t=Object(s["a"])(regeneratorRuntime.mark(function t(e){var n;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return this.$store.commit(u["g"]),t.next=3,Object(c["d"])(e,1);case 3:if(n=t.sent,this.$store.commit(u["f"]),0!=n.data.state){t.next=8;break}return alert(n.data.text),t.abrupt("return");case 8:this.init();case 10:case"end":return t.stop()}},t,this)}));return function(e){return t.apply(this,arguments)}}(),proOff:function(){var t=Object(s["a"])(regeneratorRuntime.mark(function t(e){var n;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return this.$store.commit(u["g"]),t.next=3,Object(c["d"])(e,0);case 3:if(n=t.sent,this.$store.commit(u["f"]),0!=n.data.state){t.next=8;break}return alert(n.data.text),t.abrupt("return");case 8:this.init();case 10:case"end":return t.stop()}},t,this)}));return function(e){return t.apply(this,arguments)}}(),proDelete:function(){var t=Object(s["a"])(regeneratorRuntime.mark(function t(e){var n;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return this.$store.commit(u["g"]),t.next=3,Object(c["d"])(e,4);case 3:if(n=t.sent,this.$store.commit(u["f"]),0!=n.data.state){t.next=8;break}return alert(n.data.text),t.abrupt("return");case 8:this.init();case 10:case"end":return t.stop()}},t,this)}));return function(e){return t.apply(this,arguments)}}(),proApply:function(){var t=Object(s["a"])(regeneratorRuntime.mark(function t(e){var n;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return this.$store.commit(u["g"]),t.next=3,Object(c["d"])(e,2);case 3:if(n=t.sent,this.$store.commit(u["f"]),0!=n.data.state){t.next=8;break}return alert(n.data.text),t.abrupt("return");case 8:this.init();case 10:case"end":return t.stop()}},t,this)}));return function(e){return t.apply(this,arguments)}}(),configStick:function(){var t=Object(s["a"])(regeneratorRuntime.mark(function t(e){var n,i,a,s;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(c["h"])(e);case 2:if(n=t.sent,n.data.body[0])this.stickData=JSON.parse(n.data.body[0].data),console.log(JSON.parse(n.data.body[0].data));else{for(i={left:[],right:[]},a=0;a<4;a++)i.left.push({name:"",value:""});for(s=0;s<6;s++)i.right.push({name:"",value:""});this.stickData=i}this.stickId=e,$("#myModal").modal("show"),this.stickIni();case 7:case"end":return t.stop()}},t,this)}));return function(e){return t.apply(this,arguments)}}(),setStick:function(t,e){this.stickData[e.area]=this.stickData[e.area].map(function(n,i){return i==t?{name:e.name,value:e.value}:n})},cleanStick:function(t,e){this.stickData[e.area]=this.stickData[e.area].map(function(e,n){return n==t?{name:"",value:""}:e})},stickInit:function(t){this.stickIni=t},save:function(){var t=Object(s["a"])(regeneratorRuntime.mark(function t(){var e,n;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return e=JSON.stringify(this.stickData),t.next=3,Object(c["l"])(this.stickId,e);case 3:if(n=t.sent,0!=n.data.state){t.next=7;break}return alert(n.data.text),t.abrupt("return");case 7:alert("保存成功!"),$("#myModal").modal("hide");case 10:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}(),share:function(){var t=Object(s["a"])(regeneratorRuntime.mark(function t(e){var n,i,a;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return this.$store.commit(u["g"]),t.next=3,Object(c["j"])(e);case 3:if(n=t.sent,this.$store.commit(u["f"]),0!=n.data.state){t.next=8;break}return alert(n.data.text),t.abrupt("return");case 8:i=n.data.body[0],a={url:(this.baseUrl+"#/play/"+i.id).split("http://")[1],source:i.described,title:"这款小游戏还不错哦~名字叫《"+i.title+"》",description:i.described,image:this.coverUrl+i.cover,sites:["qq","wechat","qzone","weibo"],disabled:[],wechatQrcodeTitle:"微信扫一扫：分享",wechatQrcodeHelper:"<p>微信里点“发现”，扫一下</p><p>二维码便可将本文分享至朋友圈。</p>",target:"_blank"},$("#shareModal").modal("show"),socialShare("#share",a);case 13:case"end":return t.stop()}},t,this)}));return function(e){return t.apply(this,arguments)}}(),zhengze:function(t){return new RegExp(""+t,"g")}},computed:{filter_productions:function(){var t=this;return this.productions.length<=0?[]:1==this.mode?this.search?this.productions.filter(function(e){return t.zhengze(t.keyword).test(e.title)}):this.productions:2==this.mode?this.search?this.productions.filter(function(e){return t.zhengze(t.keyword).test(e.title)}):this.productions.filter(function(t){return 1==t.state}):3==this.mode?this.search?this.productions.filter(function(e){return t.zhengze(t.keyword).test(e.title)}):this.productions.filter(function(t){return 1!=t.state}):void 0}},components:{multifunctionalCard:o["a"],joystick:l["a"]},mounted:function(){}},f=d,p=(n("55e4"),n("2877")),h=Object(p["a"])(f,i,a,!1,null,"16237791",null);h.options.__file="productions.vue";e["default"]=h.exports},"52a7":function(t,e){e.f={}.propertyIsEnumerable},"556b":function(t,e,n){},"55e4":function(t,e,n){"use strict";var i=n("26f6"),a=n.n(i);a.a},"5dbc":function(t,e,n){var i=n("d3f4"),a=n("8b97").set;t.exports=function(t,e,n){var s,r=e.constructor;return r!==n&&"function"==typeof r&&(s=r.prototype)!==n.prototype&&i(s)&&a&&a(t,s),t}},"8b2e":function(t,e,n){"use strict";var i=n("556b"),a=n.n(i);a.a},"8b97":function(t,e,n){var i=n("d3f4"),a=n("cb7c"),s=function(t,e){if(a(t),!i(e)&&null!==e)throw TypeError(e+": can't set as prototype!")};t.exports={set:Object.setPrototypeOf||("__proto__"in{}?function(t,e,i){try{i=n("9b43")(Function.call,n("11e9").f(Object.prototype,"__proto__").set,2),i(t,[]),e=!(t instanceof Array)}catch(t){e=!0}return function(t,n){return s(t,n),e?t.__proto__=n:i(t,n),t}}({},!1):void 0),check:s}},"8c86":function(t,e,n){},9093:function(t,e,n){var i=n("ce10"),a=n("e11e").concat("length","prototype");e.f=Object.getOwnPropertyNames||function(t){return i(t,a)}},aae3:function(t,e,n){var i=n("d3f4"),a=n("2d95"),s=n("2b4c")("match");t.exports=function(t){var e;return i(t)&&(void 0!==(e=t[s])?!!e:"RegExp"==a(t))}},d494:function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"multifunctionalCard",style:{width:t.width+"px"}},[n("div",{staticClass:"cover",on:{click:t.doView}},[n("img",{attrs:{src:t.img,alt:""}}),n("div",{staticClass:"menu",class:{active:t.active},on:{mouseover:function(e){t.active=!0},mouseout:function(e){t.active=!1}}},[n("div",{staticClass:"view",on:{click:function(e){return e.stopPropagation(),t.doView(e)}}},[t._v("play!")]),n("div",{staticClass:"bottom"},["hide"!=t.good?n("div",{staticClass:"good",class:{active:t.haveGood},on:{click:function(e){return e.stopPropagation(),t.doGood(e)}}},[n("i",{staticClass:"iconfont icon-good"})]):t._e(),"hide"!=t.good?n("div",{staticClass:"share",on:{click:function(e){return e.stopPropagation(),t.doShare(e)}}},[n("i",{staticClass:"iconfont icon-share"})]):t._e()])])]),n("div",{staticClass:"title"},[n("span",[t._v(t._s(t.title))])]),"hide"!=t.good?n("div",{staticClass:"history"},[n("span",{staticClass:"item"},[n("i",{staticClass:"iconfont icon-good"}),t._v(t._s(t.good))])]):t._e(),n("div",{staticClass:"other"},[n("div",{staticClass:"editor"},[n("div",{staticClass:"userHead"},[n("img",{attrs:{src:t.userHead,alt:""}})]),n("div",{staticClass:"userName"},[n("span",[t._v(t._s(t.userName))])])])])])},a=[],s=(n("cadf"),n("551c"),n("097d"),{props:["sign","width","img","title","views","good","userHead","userName","haveGood"],data:function(){return{active:!1}},methods:{doView:function(){console.log("do"),this.$emit("view",this.sign)},doGood:function(){this.$emit("good",this.sign,this.haveGood)},doShare:function(){this.$emit("share",this.sign)}},mounted:function(){$(document).ready(function(){$(".cover").height(.75*$(".cover").width())})}}),r=s,o=(n("8b2e"),n("2877")),c=Object(o["a"])(r,i,a,!1,null,"f759903c",null);c.options.__file="multifunctionalCard.vue";e["a"]=c.exports},f576:function(t,e,n){"use strict";var i=n("8c86"),a=n.n(i);a.a}}]);
//# sourceMappingURL=mypage_productions.8a589d5a.js.map