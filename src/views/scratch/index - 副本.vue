<template>
  <div class="container-fluid">
    <div class="row res_top">
      <div class="offset-md-2 col-md-8 text-left reborder" :class="{'warning':info[0].state != 1 && info[0].title !=''}" style="background-color:#fdfdfd;padding-top:10px;padding-bottom:10px;box-shadow:2px 2px 5px #acacac">
        <h3>{{info[0].title}}</h3>
        <div>
            <div class="info" >
            <span>
              <i class="iconfont icon-view"></i> 点击{{info[0].clickNum}}
            </span>
            <span>
              发布时间:{{info[0].createTime | timeFilter}}
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="row res_game">
      <div class="offset-md-2 col-md-8 reborder" style="background-color:#fdfdfd;box-shadow:0 2px 5px #acacac">
        <div class="row" style="margin:10px 0">
          <div class="col-md-4 d-flex justify-content-start align-items-center" style="padding-left:25px">
            <div class="headBox">
              <img :src="userheadUrl+info[0].userhead" alt="">
            </div>
            <div class="text-left" style="padding-left:10px;">
              <span>{{info[0].nickname}}</span>
            </div>
          </div>

          <div class="col-md-4 d-flex justify-content-center align-items-end">
            <!-- <div class="info" >
              <span>
                <i class="iconfont icon-view"></i> 点击{{info[0].clickNum}}
              </span>
              <span>
                发布时间:{{info[0].createTime | timeFilter}}
              </span>
            </div> -->
          </div>
          <div class="col-md-4" style="padding-top:12px">
            <div class="row ">
              <div class="col-4 ">
                <div class="infoCard" :class="{'active':haveGood}" @click="good">
                  <i class="iconfont icon-good"></i>
                  <span>赞{{info[0].goodNum}}</span>
                </div>
              </div>
              <div class="col-4">
                <div class="infoCard" :class="{'active':haveStar}" @click="star">
                  <i class="iconfont icon-star"></i>
                  <span>收藏{{info[0].starNum}}</span>
                </div>
              </div>
              <div class="col-4">
                <div class="infoCard" @click="share">
                  <i class="iconfont icon-share"></i>
                  <span>分享</span>
                </div>
              </div>
            </div>
            
          </div>
        </div>
        <div class="row" style="display: flex;justify-content: space-between;align-items: flex-start;background-color:unset;border-top:1px solid #ececec;padding-top:10px;position:relative">
          <!-- <div style="z-index:999;height:360px;display:flex;justify-content:center;align-items:center;top:0;left:0;width:100%" v-show="gameLoad">加载中...</div> -->
          <div style="position: relative;" id="gameBox_box" >


              <div id="gameBox" @focus="focusGameBox" tabindex="0" @blur="unfocusGameBox">
                  <!-- <span style="position: absolute;font-size:14px;top:calc(50% - 7px);left:calc(50% - 21px)">加载中</span> -->
                  <!-- <iframe id="game" scrolling="no" name="game" :src="baseUrl+'scratch3.0/play?id='+$route.params.id" frameborder="0"></iframe> -->
                </div>
              <div style="width: 100%;height:100%;position:absolute;top:0;left:0;display:flex;align-items: center;justify-content: center;background-color: rgba(236, 236, 236, 0.5);cursor: pointer;" v-if="!scratch_loading && !scratch_played" @click="scratch_play">
                <img src="../../assets/img/gflag.png" alt="" style="width:20%">
              </div>
              <div style="width:100%;height: 100%;position:absolute;top:0;left:0" v-if="scratch_loading">
                  <loadingAnime style="width:100%;height: 100%;" />
              </div>
          </div>
          <div class="hidden-sm" style="flex:1;padding:0 20px">
            <div style="padding:10px 0 0 10px">
              <h4 style="color:#9d9d9d;user-select: none;">作品简介</h4>
            </div>
            <div class="described">
              {{info[0].described}}
            </div>
          </div>
        </div>
      </div>
      <div class="w-100 hidden-md" style="background-color:#ececec">
        <joystick  :edit="false" :left="stickData.left" :right="stickData.right" @hit="clickStick" @resize="stickInit"/>
      </div>
      <div class="col-md-4 res_intro hidden-md">
        <div class="row reborder" style="background-color:#fdfdfd;box-shadow:2px 2px 5px #acacac">
          <div class="col-12">
            <div style="padding:10px 0 0 10px">
              <h4 style="color:#9d9d9d;user-select: none;">作品简介</h4>
            </div>
            <div class="described">
              {{info[0].described}}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- <div class="row" style="margin-top:10px">
      <div class="col-md-8 d-flex justify-content-center flex-column align-items-center">
        <div id="gameBox">
          <iframe id="game" scrolling="no" name="game" :src="baseUrl+'scratch3.0/play?id='+$route.params.id" frameborder="0"></iframe>
        </div>
        <div class="w-100 hidden-md" style="margin-top:10px">
          <joystick  :edit="false" :left="stickData.left" :right="stickData.right" @hit="clickStick" @resize="stickInit"/>
        </div>
      </div>
      <div class="col-md-4">
        <div class="row" style="margin-top:10px">
          <div class="col-12">
            <div>
              <h2 style="color:#9d9d9d">简介</h2>
            </div>
            <div class="described">
              {{info[0].described}}
            </div>
          </div>
        </div>
      </div>
    </div> -->
    <div class="row res_comment ">
      <div class="offset-md-2 col-md-8 reborder" style="background-color:#fdfdfd;box-shadow:2px 2px 5px #acacac">
        <div style="width:95%;margin:0 auto">
          <responsiveComment
            :total="commentNum"
            :size="commentSize"
            :list="commentList"
            :headurl="userheadUrl"
            @submit="addComment"
            @next="getComment"
          >
            <div class="headBox" slot="userhead">
                <img :src="userheadUrl+$store.state.userInfo.userhead" alt="">
            </div>
          </responsiveComment>
        </div>
      </div>
    </div>
<!-- 模态框 -->
  <div class="modal fade" id="shareModal">
    <div class="modal-dialog">
      <div class="modal-content">
  
        <!-- 模态框头部 -->
        <div class="modal-header">
          <h4 class="modal-title">分享到...</h4>
          <button type="button" class="close" data-dismiss="modal">&times;</button>
        </div>
  
        <!-- 模态框主体 -->
        <div class="modal-body">
          <div id="share"></div>
          <button class="btn btn-success" v-show="isWx" @click="wxShare_friend">分享到微信好友</button>
          <button class="btn btn-success" id="wx_s">分享到微信朋友圈</button>
        </div>
  
        <!-- 模态框底部 -->
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">关闭</button>
        </div>
  
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import loadingAnime from '../../components/loadingAnime' 
import {LOADING_START,LOADING_END,PUT_GOOD,PUT_STAR,DELETE_GOOD,DELETE_STAR,PUT_VIEW} from '../../store/mutation_types.js';
import {addStar,addGood,addView,info,getStick} from '../../api/production.js';
import {putComment,getCommentNum,getComments} from '../../api/comment.js';
import {baseUrl,userheadUrl} from '../../config/env.js';
import responsiveComment from '../../components/responsiveComment';
import joystick from '../../components/joystick';

export default {
  created(){
    if(!window.localStorage.getItem('refresh') || window.localStorage.getItem('refresh') === 'false'){
      window.localStorage.setItem('refresh', 'true');
      window.location.reload()
    }
    this.baseUrl = baseUrl;
    this.userheadUrl = userheadUrl;

    if(document.querySelector('#lib')){
      document.body.removeChild(document.querySelector('#lib'));
      document.body.removeChild(document.querySelector('#player'));
    }
    let s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = '/lib.min.js';
    s.id = 'lib'
    document.body.appendChild(s);

    let s2 = document.createElement('script');
    s2.type = 'text/javascript';
    s2.src = '/player.js';
    s2.id = 'player'
    document.body.appendChild(s2);
    
    this.init();
    console.log('created')
    window.scratch_loading = true;
    let niubi = setInterval(() => {
      if(window.scratch_standby){
        clearInterval(niubi);
        window.scratch_standby();
      }
    },100)
  },
  data(){
    return {
      commentList : [],
      commentNum: 0,
      commentSize: 5,
      baseUrl: '',
      userheadUrl: '',
      info: [{title: ''}],
      stickData: {},
      stickIni: '',
      touchS: false,
      touchClock: '',
      gameLoad: true,
      scratch_loading: true,
      scratch_played: false,
      isWx: false,
    }
  },
  computed:{
    haveGood(){

      return this.$store.state.good.indexOf(parseInt(this.$route.params.id)) >= 0;
    },
    haveStar(){
      return this.$store.state.star.indexOf(parseInt(this.$route.params.id)) >= 0;
    }
  },
  methods:{
    async init(){
      
      this.$store.commit(LOADING_START);
      let res = await info(this.$route.params.id);
      let res2 = await getCommentNum(this.$route.params.id);
      let res3 = await getStick(this.$route.params.id);

      if(res.data.body.length <=0 ){
        alert('不存在的作品');
        window.location="/";
        return;
      }
      if(res.data.body[0].state != 1 && res.data.body[0].creater != this.$store.state.userInfo.id){
        alert('这个作品还没上架！');
        window.location="/";
        return;
      }
      if(res.data.state == 0){alert(res.data.text);return;}
      if(res2.data.state == 0){alert(res2.data.text);return;}
      if(res3.data.state == 0){alert(res3.data.text);return;}
      if(res3.data.body[0]){
        this.stickData = JSON.parse(res3.data.body[0].data);
      }else{
        this.stickData = false;
      }
      this.$nextTick(()=>{
        this.stickIni();
      })
      this.info = res.data.body;
      this.commentNum = res2.data.body.total;
      this.$store.dispatch(PUT_VIEW,parseInt(this.$route.params.id));

      document.title = `趣乐码《${this.info[0].title}》`;
      document.documentElement.scrollTop = 0;

      var ua = window.navigator.userAgent.toLowerCase();//获取判断用的对象
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        this.isWx = true;
        $.ajax({
          url: "/api/wechat/get_wx_jssdk",
          type: 'post',
          data: { urlhref:location.href.split('#')[0] },
          success: function(jsons) {
              console.log('jsons',jsons)
              var data = jsons;
              wx.config({
                  debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                  appId: data.appID, // 必填，公众号的唯一标识
                  timestamp: data.timestamp, // 必填，生成签名的时间戳
                  nonceStr: data.nonceStr, // 必填，生成签名的随机串
                  signature: data.signature, // 必填，签名，见附录1
                  jsApiList: [
                          'updateTimelineShareData',
                          'updateAppMessageShareData'
                      ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
              });

              // wx.error(function(){
              //   alert('not ready')
              // })

              // wx.checkJsApi({
              //     jsApiList: ['updateTimelineShareData',
              //             'updateAppMessageShareData'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
              //     success: function(resd) {
              //       console.log(resd)
              //     // 以键值对的形式返回，可用的api值true，不可用为false
              //     // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
              //     }
              // });
          }
      });
      wx.ready(function(){
        document.querySelector('#wx_s').onclick = () => {
          var imgurl = 'https://www.168qlm.com/img/logo.f0905ea4.png';
          var title = '123';
          var desc = '321';
          wx.updateTimelineShareData({
              title: title, // 分享标题
              link: 'https://www.168qlm.com', // 分享链接
              imgUrl: imgurl, // 分享图标
              success: function () {
                  // 用户确认分享后执行的回调函数
              },
              cancel: function () {
                  // 用户取消分享后执行的回调函数
              }
          });
        }
      })


    }
    },
    async good(){
      if(this.haveGood){
        this.$store.dispatch(DELETE_GOOD,this.$route.params.id);
        this.info[0].goodNum-=1;
      }else{
        this.$store.dispatch(PUT_GOOD,this.$route.params.id);
        this.info[0].goodNum+=1;
      }
    },
    async star(){
      if(this.haveStar){
        this.$store.dispatch(DELETE_STAR,this.$route.params.id);
        this.info[0].starNum-=1;
      }else{
        this.$store.dispatch(PUT_STAR,this.$route.params.id);
        this.info[0].starNum+=1;
      }
    },
    share(){
      let pro = this.info[0];
      let $config = {
          url                 : (this.baseUrl+'#/play/'+pro.id).split('http://')[1],// 网址，默认使用 window.location.href
          source              : pro.described, // 来源（QQ空间会用到）, 默认读取head标签：<meta name="site" content="http://overtrue" />
          title               : '这款小游戏还不错哦~名字叫《'+pro.title+'》', // 标题，默认读取 document.title 或者 <meta name="title" content="share.js" />
          description         : pro.described, // 描述, 默认读取head标签：<meta name="description" content="PHP弱类型的实现原理分析" />
          image               : this.coverUrl+pro.cover, // 图片, 默认取网页中第一个img标签
          sites               : ['qq','wechat','qzone','weibo'], // 启用的站点
          disabled            : [], // 禁用的站点
          wechatQrcodeTitle   : '微信扫一扫：分享', // 微信二维码提示文字
          wechatQrcodeHelper  : '<p>微信里点“发现”，扫一下</p><p>二维码便可将本文分享至朋友圈。</p>',
          target : '_blank' //打开方式
      };
      $('#shareModal').modal('show');
      socialShare('#share',$config);
    },
    async addComment(content,refash,mescroll){
      this.$store.commit(LOADING_START);
      let res = await putComment(this.$route.params.id,content);
      this.$store.commit(LOADING_END);
      if(res.data.state == 0){alert(res.data.text);return;}
      refash();
      mescroll.resetUpScroll();
      this.commentNum+=1;
    },
    async getComment(page, mescroll){
      if (page.num === 1) this.commentList = [];
      let res = await getComments(this.$route.params.id,page.num,this.commentSize);
      this.commentList=this.commentList.concat(res.data.body);
      this.$nextTick(() => {
        mescroll.endSuccess(res.data.body.length)
      })
      // setTimeout(()=>{
      //   window.test-=1;
      //   [1,2,3,4,5].forEach(item=>{
      //     this.commentList.push(item)
      //   })
        // this.$nextTick(() => {
        //   mescroll.endSuccess(window.test)
        // })
      // },1000)
    },
    clickStick(obj){
      // alert(JSON.stringify(obj))
      // alert(JSON.stringify(window.my_handleKeyDown))
      // alert(JSON.stringify(window.my_handleKeyUp))
      clearInterval(this.touchClock);
      // this.touchS = false;
      if(obj.type == 'down'){
        // setTimeout(()=>{
        //   this.touchS = true;
        // },500)
        // this.touchClock = setInterval(()=>{
          // if(this.touchS){
            // window.my_handleKeyDown(obj.value.keycode,obj.value.key);
          // }
        // },300)
        window.my_handleKeyDown(obj.value.keycode,obj.value.key);
      }else{
        // this.touchS = false;
        window.my_handleKeyUp(obj.value.keycode,obj.value.key);
      }
    },
    stickInit(object){
      this.stickIni = object;
    },
    focusGameBox(){
//禁止滚轮
      if(document.body.clientWidth <= 767){return}
      $(document).bind('mousewheel', function(event, delta) {return false;});

      var top=$(document).scrollTop();
      $(document).on('scroll.unable',function (e){
        $(document).scrollTop(top);
      })
    },
    unfocusGameBox(){
      $(document).unbind('mousewheel')
      $(document).unbind("scroll.unable");
    },
    scratch_play(){
      this.scratch_played = true;
      window.scratch_vm.greenFlag();
    },
    wxShare_timeline(){
        var imgurl = 'https://www.168qlm.com/img/logo.f0905ea4.png';
        var title = '123';
        var desc = '321';
        wx.updateTimelineShareData({
            title: title, // 分享标题
            link: location.href, // 分享链接
            imgUrl: imgurl, // 分享图标
            success: function () {
                // 用户确认分享后执行的回调函数
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });
    },
    wxShare_friend(){
        var imgurl = 'https://www.168qlm.com/img/logo.f0905ea4.png';
        var title = 'test微信分享';
        var desc = 'test微信分享test微信分享test微信分享';
        wx.updateAppMessageShareData({
            title, // 分享标题
            desc,
            link: 'https://www.168qlm.com/#/play/79', // 分享链接
            imgUrl: imgurl, // 分享图标
            success: function () {
              alert('succ')
                // 用户确认分享后执行的回调函数
            },
            cancel: function () {
              alert('err')
                // 用户取消分享后执行的回调函数
            }
        });
    }
  },
  components:{
    responsiveComment,joystick,loadingAnime
  },
  mounted(){
    window.gameBoxStandby = true;
    document.addEventListener('gesturestart', function (event) {
      event.preventDefault();
    });



    window.scratch_loop = setInterval(()=>{
      if(window.scratch_loading && window.scratch_loading == 'end'){
        clearInterval(window.scratch_loop);
        this.scratch_loading = false;
      }
    },300)

    // window.gameLoadCk = setInterval(() => {
    //   if(document.querySelector('.stage_stage_DTWo5')){
    //     clearInterval(window.gameLoadCk);
    //     console.log('set')
    //     // document.querySelector('.stage_stage_DTWo5').style.height = $('#gameBox').width() * .75 + 'px';
    //     // document.querySelector('.stage_stage_DTWo5').width = $('#gameBox').width() - 1;
    //     // document.querySelector('.stage_stage_DTWo5').height = $('#gameBox').width() * .75;
    //     // document.querySelector('.stage_stage-wrapper_35Uar').style['min-height'] = 'unset';
    //     this.gameLoad = false;
    //   }
    // },500)
    this.$store.commit(LOADING_END);
    // window.gameStandby = () => {
    //   this.$store.commit(LOADING_END);
      // $('#gameBox').css('width',window.frames['game'].document.querySelector('canvas').style.width.split('px')[0]-0+10+'px');
      //$('#gameBox').css('height',window.frames['game'].document.querySelector('canvas').style.height.split('px')[0]-0+80+'px')
    // };  
  },
  filters : {
    timeFilter(value){
        var now = new Date(parseInt(value)),
            y = now.getFullYear(),
            m = now.getMonth() + 1,
            d = now.getDate();
        return y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d);
    }
  },
  destroyed(){
    console.log('destroyed');
    window.localStorage.setItem('refresh', 'false');
    window.scratch_vm && window.scratch_vm.stopAll();
  }
};
</script>

<style lang="less" scoped>
#gameBox_box{
  width:480px;
}
#gameBox{
  width:480px;
  /* max-width: 480px; */
  min-height: 320px;
  overflow: hidden;
  border:1px solid #fff;
  position: relative;
  /* border-radius: 10px;
  box-shadow: 0 0 20px #9d9d9d; */
}
.infoCard{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 14px;
  background-color: #fff;
  width:80%;
  box-shadow: 0 0 10px #ececec;
  padding:5px 0;
  border-radius: 5px;
  margin:0 auto;
  cursor: pointer;
}
.info{
  font-size: 12px;
}
.active{
  background-color: #6cf;
  color:#fff;
}
.described{
  background-color: #fff;
  min-height:300px;
  border-radius: 10px;
  padding:10px 20px;
  margin-top:20px;
  margin-bottom: 10px;
}
.headBox{
  width:60px;
  height:60px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  img{
    width:100%;
  }
}

.res_top{
  margin:40px 15px 0 15px;
}
.res_game{
  margin:15px;
}
.reborder{
  border-radius: 5px;
}
.res_intro{
  margin:0;
  padding:0 30px;
}
.res_comment{
  margin:15px;
}
@media (min-width: 767px) {
/* 电脑 */
 .hidden-md{
   display: none;
 }
}
@media (max-width: 768px) {
/* s手机 */
.hidden-sm{
   display: none;
 }
#gameBox_box{
  width:100%;
}
#gameBox{
width:100%;
}
.reborder{
  border-radius: unset;
}
  .res_top{
    margin:0;
  }
  .container-fluid{
    padding:0;
    overflow: hidden;
  }
  .res_game{
    margin:15px 0 20px 0;
  }
  .res_intro{
    margin:20px 0 0 0;
    padding:0;
  }
  .res_comment{
    margin:0;
  }
  #gameBox{
    #game{
      width:100vw;
    }
  }
}
#shareModal{
  padding-top:100px;
}
.warning{
  background-color: #fedf51 !important;
  position: relative;
}
.warning::after{
  content : '未上架';
  position: absolute;
  top:5px;
  right:5px;
  font-size: 12px;
  color:#fedf51;
  background-color: #fff;
  padding:2px 5px;
  border-radius: 2px;
}
</style>

