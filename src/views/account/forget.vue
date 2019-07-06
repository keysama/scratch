<template>
        <div class="container-fluid">
                <div class="row">
                    <div class="col-md-7 offset-md-2">
                        <div class="responsiveLogin">
                            <div class="row line">
                                <div class="col-md-4 d-flex align-items-center justify-content-end title hidden-sm"></div>
                                <div class="col-md-8 text-center">
                                        <h3>修改密码</h3>
                                </div> 
                            </div>
                            <div class="row line">
                                <div class="col-md-4 d-flex align-items-center justify-content-end title hidden-sm">手机号码:</div>
                                <div class="col-md-8">
                                    <input type="text" class="form-control" placeholder="手机号码" v-model="phone">
                                </div> 
                            </div>
                            <div class="row line">
                                <div class="col-md-4 d-flex align-items-center justify-content-end title hidden-sm">验证码:</div>
                                <div class="col-6 col-md-4 ">
                                    <input type="text" class="form-control" v-model="verify" placeholder="验证码">
                                </div>
                                <div class="col-6 col-md-4"><button class="btn btn-primary" :class="{'btn-light':cdown !== false}" @click="getVerify">{{cdown === false?'获取验证码':'发送成功'+cdown}}</button></div>
                            </div>
                            <div class="row line">
                                <div class="col-md-4 d-flex align-items-center justify-content-end title hidden-sm">新密码:</div>
                                <div class="col-md-8">
                                    <input type="password" class="form-control" placeholder="新密码" v-model="password">
                                </div> 
                            </div>
                            <div class="row line">
                                <div class="col-md-4 d-flex align-items-center justify-content-end title hidden-sm">确认密码:</div>
                                <div class="col-md-8">
                                    <input type="password" class="form-control" placeholder="确认密码" v-model="password2">
                                </div> 
                            </div>
                            <div class="row line">
                                <div class="col-md-4 d-flex align-items-center justify-content-end title hidden-sm"></div>
                                <div class="col-md-8">
                                    <span class="btn btn-lg w-100 btn-primary" :class="{'disabled':!pass_password}" @click="saveChange">保存</span>
                                </div> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
      </template>
      
<script>
import {phoneVerify,checkPhoneVerify,editPassword,checkPhoneRepeat} from '../../api/account.js';
import {LOGIN,LOADING_START,LOADING_END} from '../../store/mutation_types.js';
export default {
    data(){
        return {
            password : '',
            password2 : '',
            phone : '',
            verify : '',
            cdown : false
        }
    },
    computed:{
        pass_password(){
            return this.password == this.password2 && this.password != '';
        }
    },
    methods:{
        async getVerify(){
            if(this.phone.length != 11){
                alert('手机号码不合法！');
                return;
            }
            
            let checkPhoneRepeat_res = await checkPhoneRepeat(this.phone);
            if(checkPhoneRepeat_res.data.state == 1){
                alert('未注册的手机号');
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
            if(this.verify.length != 4){
                alert('验证码错误');
                return;
            }
            this.$store.commit(LOADING_START);
            
            let res = await checkPhoneVerify(this.verify);
            
            this.$store.commit(LOADING_END);
            if(res.data.state == 0){alert(res.data.text);return};
        },
        async saveChange(){
            this.checkVerify();
            let res = await editPassword(this.phone,this.password,this.verify);
            if(res.data.state == 0){alert(res.data.text);return};
            alert('修改成功，去登陆')
            this.$router.push('/login')
        }
    }
};
</script>
<style scoped lang="less">
          .responsiveLogin{
    width: 60%;
    margin:0 auto;
    margin-top:50px;
}
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
      