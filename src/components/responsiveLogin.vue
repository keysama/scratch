<template>
  <div class="responsiveLogin">
    <div class="row line">
        <div class="col-md-4 d-flex align-items-center justify-content-end title hidden-sm"></div>
        <div class="col-md-8 text-center">
             <h3>用户登陆</h3>
        </div> 
    </div>
    <div class="row line">
        <div class="col-md-4 d-flex align-items-center justify-content-end title hidden-sm">用户名:</div>
        <div class="col-md-8">
            <input type="text" class="form-control" placeholder="请输入用户名" v-model="username">
        </div> 
    </div>
    <div class="row line">
        <div class="col-md-4 d-flex align-items-center justify-content-end title hidden-sm">密码:</div>
        <div class="col-md-8">
            <input type="password" class="form-control" placeholder="请输入密码" v-model="password">
        </div> 
    </div>
    <div class="row line">
        <div class="col-md-12 text-right pointer"><router-link to="/forget" tag="span">忘记密码？</router-link></div>
    </div>
    <div class="row line">
        <div class="col-md-4 d-flex align-items-center justify-content-end title hidden-sm"></div>
        <div class="col-md-8">
            <span class="btn btn-lg w-100 btn-primary" :class="{'disabled':!pass_login}" @click="login">登陆</span>
        </div> 
    </div>
    <div class="row line" v-if="is_wechat">
        <div class="col-md-4 d-flex align-items-center justify-content-end title hidden-sm"></div>
        <div class="col-md-8">
            <span class="btn btn-lg w-100 btn-success" @click="wechatlogin">微信登陆</span>
        </div> 
    </div>
    <div class="row line">
        <div class="col-md-4 d-flex align-items-center justify-content-end title hidden-sm"></div>
        <div class="col-md-8">
            <router-link to="/registe" tag="span" class="btn btn-lg w-100 btn-light">去注册→</router-link>
        </div> 
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return {
            username : '',
            password : ''
        }
    },
    computed:{
        pass_login(){
            return this.username != '' && this.password != '';
        },
        is_wechat(){
            return navigator.userAgent.toLowerCase().match(/MicroMessenger/i)=="micromessenger";
        }
    },
    methods:{
        login(){
            if(!this.pass_login){return};
            let data = {
                phone : this.username,
                password : this.password
            }
            this.$emit('login',data)
        },
        wechatlogin(){
            var ua = navigator.userAgent.toLowerCase(); 
            if(ua.match(/MicroMessenger/i)=="micromessenger"){
                this.$emit('wechatLogin')
            }
        }
    }
};
</script>
<style scoped lang="less">
.pointer{
    cursor: pointer;
}
.text-center{
    text-align: center
}
.responsiveLogin{
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
