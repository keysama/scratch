<template>
  <div class="container-fluid box">
    <div class="row">
      <div class="col-md-3">
        <responsiveLeftNav class="responsiveLeftNav">
          <!-- <router-link tag="li" active-class="active" to="/message/index">消息</router-link> -->
          <router-link tag="li" active-class="active" to="/message/index">回复我的</router-link>
          <router-link tag="li" active-class="active" to="/message/good">收到的赞</router-link>
        </responsiveLeftNav>
      </div>
      <div class="col-md-9" style="padding-top:60px;background-color:#ececec">
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
    if(!this.$store.state.userInfo){
      alert('未登录');
      this.$router.replace('/login')
    }
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
    background-color: #6cf;
    border-radius: 10px;
    cursor: pointer;
  }
}
.box{
  background-color: #ececec;
}
</style>

