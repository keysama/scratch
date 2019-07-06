<template>
  <div class="container-fluid" style="min-height:400px">
      <div class="row">
        <div class="col-md-6 d-flex justify-content-start flex-column align-items-center">
          <div class="userheadBox" @click="chooseHead">
            <img :src="headStemp==''?(userheadUrl+$store.state.userInfo.userhead):headStemp" alt="" id="headurl">
          </div>
          <div class="func" style="margin-top:10px;" v-show="headStemp != ''">
            <span class="btn btn-success btn-sm" @click="saveHead">保存</span>
            <span class="btn btn-danger btn-sm" @click="cancleHead">取消</span>
          </div>
          <div style="display:none"><input type="file" id="uploadHead" name="userhead" @change="fileHandle"></div>
          <div class="username" style="margin-top:10px">
            <input :disabled="!namefocus" :class="{'focus':namefocus}" type="text" v-model="username">
            <span @click="namefocus=true" class="btn btn-info btn-sm" style="margin-left:5px" v-show="!namefocus">修改</span>
            <span @click="saveName()" class="btn btn-success btn-sm" style="margin-left:5px" v-show="namefocus">保存</span>
          </div>
          <div class="phone d-flex justify-content-center w-100" style="margin-top:40px">
              <div class="title text-left" style="padding-right:10px">手机号码:</div>
              <div class="info text-left" style="padding-left:10px">
                <span>{{$store.state.userInfo.phone != ''?$store.state.userInfo.phone:'未绑定'}}</span>
                <span class="btn btn-sm btn-info" data-toggle="modal" data-target="#phone" style="margin-left:20px">{{$store.state.userInfo.phone == ''?'去绑定':'修改绑定'}}</span>
              </div>
          </div>
        </div>
        <div class="col-md-6 d-flex justify-content-center">

        </div>
      </div>
<!-- 模态框 -->
<div class="modal fade" id="phone">
  <div class="modal-dialog">
    <div class="modal-content">
 
      <!-- 模态框头部 -->
      <div class="modal-header">
        <h4 class="modal-title">手机绑定</h4>
        <button type="button" class="close" data-dismiss="modal">&times;</button>
      </div>
 
      <!-- 模态框主体 -->
      <div class="modal-body">
        <div class="form-inline d-flex justify-content-center">
            <div style="margin-right:20px;width:80px">手机号码:</div>
            <input class="form-control" type="text" v-model="newPhone">
            <span class="btn btn-primary btn-sm" :class="{'btn-light':cdown !== false}" style="margin-left:10px" @click="getVerify">{{cdown === false?'获取验证码':'发送成功'+cdown}}</span>
        </div>
        <div class="form-inline d-flex justify-content-center" style="margin-top:20px">
            <div style="margin-right:20px;width:80px;">验 证 码:</div>
            <input class="form-control" type="text" v-model="phoneVerify">
            <span class="btn btn-primary btn-sm" style="margin-left:10px" @click="checkVerify">验证手机号</span>
        </div>
      </div>
 
      <!-- 模态框底部 -->
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">关闭</button>
      </div>
 
    </div>
  </div>
</div>
<!-- 模态框 -->
  </div>
</template>

<script>
import {editUserhead,editUserName,phoneVerify,checkPhoneVerify,editPhone} from '../../../api/account.js';
import {LOGIN,LOADING_START,LOADING_END} from '../../../store/mutation_types.js';
import {userheadUrl} from '../../../config/env.js';
export default {
  created(){
    this.userheadUrl = userheadUrl;
    this.username = this.$store.state.userInfo.nickname
  },
  data(){
    return {
      userheadUrl : '',
      namefocus : false,
      headStemp : '',
      username : '',
      newPhone : '',
      phoneVerify : '',
      cdown : false
    }
  },
  methods:{
    chooseHead(){
      $('#uploadHead').click();
    },
    fileHandle(event){
        var reads= new FileReader();
        var f=event.target.files[0];
        reads.readAsDataURL(f);
        this.$store.commit(LOADING_START)
        reads.onload= (e) => {
          this.$store.commit(LOADING_END)
          this.headStemp = e.target.result
        };
    },
    dataURLToBlob(dataurl){
      var arr = dataurl.split(',');
      var mime = arr[0].match(/:(.*?);/)[1];
      var bstr = atob(arr[1]);
      var n = bstr.length;
      var u8arr = new Uint8Array(n);
      while(n--){
          u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], {type:mime});
    },
    cancleHead(){
      this.headStemp = ''
    },
    async saveHead(){
      this.$store.commit(LOADING_START)
      let userhead = this.dataURLToBlob(this.headStemp);
      let form = new FormData();
      form.append('userhead',userhead);
      let res = await editUserhead(form);

      let data = {
        userInfo : res.data.body,
        good : this.$store.state.good,
        star : this.$store.state.star
      }
      this.$store.commit(LOGIN,data);
      this.headStemp = '';
      this.$store.commit(LOADING_END)
      
    },
    async saveName(){
      if(this.username == this.$store.state.userInfo.nickname){
        this.namefocus = false;
        return;
      }
      this.$store.commit(LOADING_START)
      let res = await editUserName(this.username);
      this.$store.commit(LOADING_END)

      if(res.data.state == 0){alert(res.data.text);return}
      let data = {
        userInfo : res.data.body,
        good : this.$store.state.good,
        star : this.$store.state.star
      }
      this.$store.commit(LOGIN,data);
      this.namefocus = false;
      
    },
    async getVerify(){
      if(this.newPhone.length != 11){
        alert('手机号码不合法！');
        return;
      }
      if(this.cdown !== false){
        return;
      }
      let res = await phoneVerify(this.newPhone);
      if(res.data.state != 1){alert(res.data.text);return};
      this.countDown();
    },
    countDown(){
      let num = 59;
      let clock = setInterval(()=>{
        this.cdown = num;
        num -= 1;
        if(num<=0){
          this.cdown = false;
          clearInterval(clock);
        }
      },1000)
    },
    async checkVerify(){
      this.$store.commit(LOADING_START);
      let res = await checkPhoneVerify(this.phoneVerify);
      let res2 = await editPhone(this.phoneVerify,this.newPhone);
      this.$store.commit(LOADING_END);
      if(res.data.state == 0){alert(res.data.text);return};
      if(res2.data.state == 0){alert(res2.data.text);return};

      let data = {
        userInfo : res2.data.body,
        good : this.$store.state.good,
        star : this.$store.state.star
      }
      this.$store.commit(LOGIN,data);
      this.namefocus = false;

      alert('修改成功');
      this.newPhone = '';
      this.phoneVerify = '';
      $('#phone').modal('hide');
    }
  },
  components:{
   
  },
  mounted(){

  }
};
</script>

<style lang="less" scoped>
.userheadBox{
  width:100px;
  height:100px;
  overflow: hidden;
  border-radius: 50%;
  position: relative;
  cursor: pointer;
  img{
    width:100%;
  }
}
.userheadBox:hover{
  opacity: .9;
}
.phone{
  font-size: 18px;
  font-weight: 400;
}
.username{
  text-align: center;
  cursor: pointer;
  input{
    text-align: left;
    border: none;
    outline:none;
    padding:2px 10px;
    border-radius: 5px;
    font-size: 16px;
    font-weight: 600;
    background-color: #fff;
    width:100px;
  }
  .focus{
    border: 1px solid #ececec;
  }
}
</style>

