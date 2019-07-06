<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-3">
        <responsiveLeftNav class="responsiveLeftNav">
          <router-link tag="li" active-class="active" to="/mypage/production">我的作品</router-link>
          <router-link tag="li" active-class="active" to="/mypage/collect">我的收藏</router-link>
          <router-link tag="li" active-class="active" to="/mypage/detail">个人信息</router-link>
        </responsiveLeftNav>
      </div>
      <div class="col-md-9" style="margin-top:60px">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import responsiveLeftNav from '../../components/responsiveLeftNav.vue'
import {LOGIN,LOADING_START,LOADING_END} from '../../store/mutation_types.js';
export default {
  created(){

  },
  data(){
    return {

    }
  },
  methods:{

  },
  components:{
   responsiveLeftNav
  },
  mounted(){

  }
};
</script>

<style lang="less" scoped>
.responsiveLeftNav{
  margin: 0 auto;
  text-align: center;
  width: 200px;
  li{
    padding:10px 10px;
    list-style: none;
    width: 50%;
    color:#fff;
    background-color: rgba(125,172,66,0.8);
    border-radius: 10px;
    cursor: pointer;
  }
}
</style>

