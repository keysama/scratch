<template>
  <div id="index">
   <responsiveNav>
     <div slot="logo" class="slot_logo">
       <img src="../../assets/img/logo.png" alt="">
     </div>
     <div slot="navs" class="slot_navs">
       <router-link to="#" tag="li" class="active">首页</router-link>
       <router-link to="#" tag="li">个人中心</router-link>
       <router-link to="#" tag="li">在线创作</router-link>
       <router-link to="#" tag="li">课程介绍</router-link>
       <router-link to="#" tag="li">新闻中心</router-link>
       <router-link to="#" tag="li">赛事</router-link>
     </div>
     <div slot="user" class="slot_user">
       <router-link to="/login" tag="span" class="myBtn hover">登陆/注册</router-link>
     </div>
   </responsiveNav>
    registe
    <pageFooter></pageFooter>
  </div>
</template>

<script>
import responsiveNav from '../../components/responsiveNav';
import pageFooter from '../../components/pageFooter';

export default {
  created(){
    this.init();
  },
  data(){
    return {

    }
  },
  methods:{
    async init(){

    }
  },
  components:{
    responsiveNav,pageFooter
  },
  mounted(){

  }
};
</script>

<style lang="less" scoped>
.hover{
  cursor: pointer;
}
.myBtn{
    background-color: darken(#6cf, 22%);
    color: #fff;
    padding:8px 16px;
    border-radius: 20px;
    font-size: 1.2rem;
}
.banner{
  margin-top: 20px;
  .slide_item{
    padding:0 20px;
    img{
      max-height: 200px;
      border-radius: 10px;
    }
  }
}
.slot_navs{
  li{
      list-style: none;
      color: #fff;
      padding:8px 16px;
      border-radius: 20px;
      font-size: 1.2rem;
      margin-right:20px;
  }
  .active{
    list-style: none;
    background-color: darken(#6cf, 22%);
    color: #fff;
    padding:8px 16px;
    border-radius: 20px;
    font-size: 1.2rem;
    margin-right:20px;
    box-shadow: 0 5px 10px #ccc;
  }
}
@media (max-width: 767px) {
  .myBtn{
    box-shadow: 0 5px 10px #ccc;
  }
  .slot_navs{
    li{
        color: #000;
    }
  }
}
@media (min-width: 768px) {
    
}
i{
  font-size: unset;
  margin: 0 10px;
}
</style>

