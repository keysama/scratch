<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-7 offset-md-2">
                <responsiveLogin @login="login" @wechatLogin="wechatLogin"></responsiveLogin>
                <!-- <button class="btn btn-success" style="margin:0 auto">微信登陆</button> -->
            </div>
        </div>
    </div>
</template>

<script>
import {LOGIN,LOADING_START,LOADING_END} from '../../store/mutation_types.js';
import {login,getGood,getStar,wechatLogin} from '../../api/account.js';
import responsiveNav from '../../components/responsiveNav';
import pageFooter from '../../components/pageFooter';
import responsiveLogin from '../../components/responsiveLogin';
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

    },
    async login(data){
      this.$store.commit(LOADING_START);

      let res = await login(data);
      this.$store.commit(LOADING_END);
      if(res.data.state == 0){alert(res.data.text);return};

      let uid = res.data.body.id;

      let res2 = await getGood(uid);
      if(res2.data.state == 0){alert(res2.data.text);return};

      let good = res2.data.body;

      let res3 = await getStar(uid);
      if(res3.data.state == 0){alert(res3.data.text);return};

      let star = res3.data.body;

      let data2 = {
        userInfo : res.data.body,
        good : good,
        star : star
      }
      this.$store.commit(LOGIN,data2)
      this.$router.push('/index');
    },

    async wechatLogin(){
      let res = await wechatLogin();
    }
  },
  components:{
    responsiveNav,pageFooter,responsiveLogin
  },
  mounted(){

  }
};
</script>

<style lang="less" scoped>
.responsiveLogin{
    width: 60%;
    margin:0 auto;
    margin-top:50px;
}
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

.playGround-rank{
  text-align: center;
  width: 90%;
  padding:10px;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  .item{
    width: 17%;
    margin-top:20px;
  }
}
.playGround-hot{
  text-align: center;
  max-height:550px;
  overflow-y: scroll;
  width: 90%;
  padding:10px;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  .item{
    width: 17%;
    margin-top:20px;
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
  .search{
    padding-right: 0;
    width: 160px;
  }
}
@media (min-width: 768px) {
  .search{
    padding-right:60px;
  }
}
i{
  font-size: unset;
  margin: 0 10px;
}
</style>

