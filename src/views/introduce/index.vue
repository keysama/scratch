<template>
  <div class="introduce">
    <transition :name="transitionName"> 
      <router-view class="Router"></router-view>
    </transition>
  </div>
</template>

<script>
import {LOGIN,LOADING_START,LOADING_END} from '../../store/mutation_types.js';
export default {
  created(){

  },
  data(){
    return {
      transitionName: 'slide-right'  // 默认动态路由变化为slide-right
    }
  },
  methods:{

  },
  components:{
   
  },
  mounted(){
    $('.introduce').height($('.Router').height())
    setInterval(()=>{
      $('.introduce').height($('.Router').height())
    },300)
  },
　watch: {
　  '$route'(to, from){
  　　　　let isBack = this.$router.isBack  //  监听路由变化时的状态为前进还是后退
  　　　　if(isBack) {
  　　　　　this.transitionName = 'slide-right'
  　　　　}else {
  　　　　　this.transitionName = 'slide-left'
  　　　　}
  　　    this.$router.isBack = false
　　    }
　  }
};
</script>

<style lang="less" scoped>
.introduce{
  position:relative;
  width:100%;
  overflow: hidden;
}
.Router {
     position: absolute;
     width: 100%;
     transition: all .5s ease;
     top: 0;
}

.slide-left-enter,
.slide-right-leave-active {
    -webkit-transform: translate(100%, 0);
    transform: translate(100%, 0);
}

.slide-left-leave-active,
.slide-right-enter {
    -webkit-transform: translate(-100%, 0);
    transform: translate(-100% 0);
}
</style>

