<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-7 offset-md-2">
                <responsiveRegiste @checkUsername="checkUsername" @registe="registe" :passUsername="pass_username" @phoneVerify="phone_ver" :passPhoneVer="pass_phoneVer" :verifyCount="cdown" @checkVerify="checkVer"></responsiveRegiste>
            </div>
        </div>
    </div>
</template>

<script>
import {chackUsernameRepeat,registe,checkPhoneVerify,phoneVerify,checkPhoneRepeat} from '../../api/account.js';
import responsiveNav from '../../components/responsiveNav';
import pageFooter from '../../components/pageFooter';
import responsiveRegiste from '../../components/responsiveRegiste';
export default {
  created(){
    this.init();
  },
  data(){
    return {
      pass_username : false,
      pass_phone : false,
      cdown : false,
      pass_phoneVer : false
    }
  },
  methods:{
    async init(){

    },
    async checkUsername(name){
      let res = await chackUsernameRepeat(name);
      if(res.data.state == 0){alert(res.data.text);return;}
      this.pass_username = res.data.body;
    },
    async registe(data){
      let res = await registe(data);
      if(res.data.state == 0){alert(res.data.text);return;}
      alert('注册成功！去登陆');
      this.$router.push('/login');
    },
    async phone_ver(number){
      if(this.cdown !== false){
        return;
      }
      let res0 = await checkPhoneRepeat(number);
      if(res0.data.state == 0){alert(res0.data.text);return;}

      let res = await phoneVerify(number);
      if(res.data.state != 1){alert(res.data.text);return};
      this.countDown();
    },
    countDown(){
      let num = 59;
      this.cdown = num;
      let clock = setInterval(()=>{
        num -= 1;
        this.cdown = num;
        if(num<=0){
          this.cdown = false;
          clearInterval(clock);
        }
      },1000)
    },
    async checkVer(verify){
      let res = await checkPhoneVerify(verify);
      this.pass_phoneVer = true;
    }
  },
  components:{
    responsiveNav,pageFooter,responsiveRegiste
  },
  mounted(){

  }
};
</script>

<style lang="less" scoped>
.responsiveRegiste{
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

