<template>
  <div class="responsiveRegiste">
    <div class="row line">
        <div class="col-md-4 d-flex align-items-center justify-content-end title hidden-sm"></div>
        <div class="col-md-8 text-center">
             <h3>用户注册</h3>
        </div> 
    </div>
    <div class="row line">
        <div class="col-md-4 d-flex align-items-center justify-content-end title hidden-sm">昵称:</div>
        <div class="col-md-8">
            <input type="text" class="form-control" placeholder="请输入昵称" :class="{'has-danger':!pass_nickname}" @change="inputName" v-model="nickname">
        </div> 
    </div>
    <div class="row line">
        <div class="col-md-4 d-flex align-items-center justify-content-end title hidden-sm">手机号:</div>
        <div class="col-md-8">
            <input type="text" class="form-control" placeholder="请输入手机号" :class="{'has-danger':!pass_phone}" v-model="phone">
        </div> 
    </div>
    <div class="row line">
        <div class="col-md-4 d-flex align-items-center justify-content-end title hidden-sm">手机验证码:</div>
        <div class="col-8 col-md-6 ">
            <input type="text" class="form-control" placeholder="收到的验证码" :class="{'has-danger':!pass_phoneVerify}" v-model="verify" @change="checkPhoneVerify">
        </div>
        <div class="col-4 col-md-2 text-center d-flex align-items-center justify-content-center">
            <div class="btn btn-info" :class="{'btn-light':verifyCount!=false}" @click="checkVerify">{{verifyCount==false?'发送':'重试'+verifyCount}}</div>
        </div>
    </div>
    <div class="row line">
        <div class="col-md-4 d-flex align-items-center justify-content-end title hidden-sm" >密码:</div>
        <div class="col-md-8">
            <input type="password" class="form-control" placeholder="请输入密码" v-model="password">
        </div> 
    </div>
    <div class="row line form-group">
        <div class="col-md-4 d-flex align-items-center justify-content-end title hidden-sm" >确认密码:</div>
        <div class="col-md-8">
            <input type="password" class="form-control" :class="{'has-danger':!pass_password}" placeholder="确认密码" v-model="password2">
        </div> 
    </div>
    <div class="row line">
        <div class="col-md-4 d-flex align-items-center justify-content-end title hidden-sm"></div>
        <div class="col-md-8">
            <span class="btn btn-lg w-100 btn-primary" :class="{'disabled':!pass_registe}" @click="registe">注册</span>
        </div> 
    </div>
    <div class="row line">
        <div class="col-md-4 d-flex align-items-center justify-content-end title hidden-sm"></div>
        <div class="col-md-8">
            <router-link to="/login" tag="span" class="btn btn-lg w-100 btn-light">←返回登陆</router-link>
        </div> 
    </div>
  </div>
</template>

<script>
export default {
    props:{
        passUsername : {
            default : 'true'
        },
        passPhoneVer : {
            default : false
        },
        verifyCount : {
            default : false
        },
        passVerify : {
            default : false
        },
        passPhoneVer : {
            default : false
        }
    },
    data(){
        return {
            nickname: '',
            password: '',
            password2: '',
            phone: '',
            verify : ''
        }
    },
    computed:{
        pass_password(){
            return this.password == '' || this.password == this.password2;
        },
        pass_nickname(){
            return this.passUsername == true || this.nickname == '';
        },
        pass_phone(){
            return this.phone.length == 11 || this.phone == '';
        },
        pass_registe(){
            return !(!this.pass_phoneVerify || !this.pass_phone || !this.pass_password || this.password == '' || !this.pass_nickname || this.nickname == '' || this.phone == '' || this.verify == '');
        },
        pass_phoneVerify(){
            return this.verify == '' || this.passPhoneVer
        }
    },
    methods :{
        inputName(e){
            this.$emit('checkUsername',e.target.value)
        },
        registe(){
            if(!this.pass_registe){return};
            let data = {
                nickname : this.nickname,
                phone : this.phone,
                password : this.password,
                password2 : this.password2,
                verify : this.verify
            }
            this.$emit('registe',data)
        },
        checkVerify(){
            if(this.phone.length != 11){
                return;
            }
            if(this.verifyCount!=false){
                return;
            }
            this.$emit('phoneVerify',this.phone)
        },
        checkPhoneVerify(){
            if(this.verify.length != 4){
                return;
            }
            this.$emit('checkVerify',this.verify)
        }
    }
};
</script>
<style scoped lang="less">
.has-danger{
    border-color: #ff8080;
    box-shadow:0 0 0 0.2rem rgba(131, 51, 51, 0.255);
}
.text-center{
    text-align: center
}
.responsiveRegiste{
    min-height: 400px;
    .line{
        margin-top:40px;
    }
}
/* 手机 */
@media (max-width: 767px) { 
    .hidden-sm{
        display: none !important;
    }
}
 /* 电脑 */
@media (min-width: 768px){
    .hidden-md{
        display: none !important;
    }
}
</style>
