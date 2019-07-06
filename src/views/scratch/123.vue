<template>

    <div class="container-fluid">
      <h1>测试1</h1>
      <iframe id="game" class="game" scrolling="no" name="game" :src="baseUrl+'scratch3.0/play?id='+$route.params.id" frameborder="0"></iframe>
      <h1>测试2</h1>
      <iframe scrolling="no" class="game" name="game" :src="baseUrl+'scratch3.0/play?id='+$route.params.id" frameborder="0"></iframe>
       <h1>测试3</h1>
      <iframe scrolling="no" class="game" width="100%" name="game" :src="baseUrl+'scratch3.0/play?id='+$route.params.id" frameborder="0"></iframe>
       <h1>测试4</h1>
      <iframe scrolling="no" class="game" width="300" height="225" name="game" :src="baseUrl+'scratch3.0/play?id='+$route.params.id" frameborder="0"></iframe>
       <h1>测试5</h1>
      <iframe scrolling="no" name="game" :src="baseUrl+'scratch3.0/play?id='+$route.params.id" frameborder="0"></iframe>
    </div>

</template>

<script>

import {LOADING_START,LOADING_END,PUT_GOOD,PUT_STAR,DELETE_GOOD,DELETE_STAR,PUT_VIEW} from '../../store/mutation_types.js';
import {addStar,addGood,addView,info,getStick} from '../../api/production.js';
import {putComment,getCommentNum,getComments} from '../../api/comment.js';
import {baseUrl,userheadUrl} from '../../config/env.js';
import responsiveComment from '../../components/responsiveComment';
import joystick from '../../components/joystick';
export default {
  created(){
    this.baseUrl = baseUrl;
    this.userheadUrl = userheadUrl;
    this.init();
  },
  data(){
    return {
      commentList : [],
      commentNum:0,
      commentSize:5,
      baseUrl : '',
      userheadUrl : '',
      info : [{title:''}],
      stickData : {},
      stickIni : '',
      touchS : false,
      touchClock : ''
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

      $('.game').height($(this).width()*0.75);
      document.title = `趣乐码《${this.info[0].title}》`;
      document.documentElement.scrollTop = 0;
    },
    clickStick(obj){
      clearInterval(this.touchClock);
      // this.touchS = false;
      if(obj.type == 'down'){
        // setTimeout(()=>{
        //   this.touchS = true;
        // },500)
        this.touchClock = setInterval(()=>{
          // if(this.touchS){
            window.frames['game'].my_handleKeyDown(obj.value.keycode,obj.value.key);
          // }
        },300)
        window.frames['game'].my_handleKeyDown(obj.value.keycode,obj.value.key);
      }else{
        // this.touchS = false;
        window.frames['game'].my_handleKeyUp(obj.value.keycode,obj.value.key);
      }
    },
    stickInit(object){
      this.stickIni = object;
    },
  },
  components:{
    responsiveComment,joystick
  },
  mounted(){
    $('.game').each(function(){
      $(this).height($(this).width()*0.75);
    })
    window.gameStandby = () => {
      this.$store.commit(LOADING_END);
      // $('#gameBox').css('width',window.frames['game'].document.querySelector('canvas').style.width.split('px')[0]-0+10+'px');
      //$('#gameBox').css('height',window.frames['game'].document.querySelector('canvas').style.height.split('px')[0]-0+80+'px')
    };  
  },
  filters : {
    timeFilter(value){
        var now = new Date(parseInt(value)),
            y = now.getFullYear(),
            m = now.getMonth() + 1,
            d = now.getDate();
        return y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d);
    }
  }
};
</script>

<style lang="less" scoped>

  #game{
    width:100%;
    // width:100vw;
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
//电脑
 .hidden-md{
   display: none;
 }
}
@media (max-width: 768px) {
//s手机
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
    #game{
      width:100vw;
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

