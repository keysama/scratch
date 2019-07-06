<template>
  <div id="app">
   <responsiveNav>
     <div slot="logo" class="slot_logo">
       <a href="#/index"><img class="hover" src="./assets/img/logo.png" alt="" ></a>
     </div>
     <div slot="navs" class="slot_navs">
       <li class="dropdown-toggle bg-info hover" data-toggle="dropdown" style="color:#fff" v-if="$route.fullPath.indexOf('scratch3.0')>=0 || $route.fullPath.indexOf('edit')>=0">
         编辑
          <div class="dropdown-menu" style="background-color:#fff;">
            <span class="dropdown-item text-primary hover" @click="openWithComputer">从电脑中上传</span>
            <span class="dropdown-item text-primary hover" @click="saveForComputer">保存到电脑</span>
            <span class="dropdown-item text-info hover" @click="savePro">{{editMode?'保存修改':'保存新作品'}}</span>
            <span class="dropdown-item text-warning hover" @click="jiasu">打开加速模式</span>
          </div>
       </li>
       <router-link active-class="active" class="hover" to="/index" tag="li">首页</router-link>
       <router-link active-class="active" v-if="$store.state.userInfo!=''" class="hover" to="/mypage" tag="li">个人中心</router-link>
       <router-link active-class="active" class="hover" to="/scratch3.0" target=”_blank” tag="a">在线创作</router-link>
       <router-link active-class="active" class="hover" to="/introduce" tag="li">课程介绍</router-link>
       <router-link active-class="active" class="hover" to="/news" tag="li">新闻中心</router-link>
       <router-link active-class="active" class="hover" to="/match" tag="li">赛事</router-link>
     </div>
     <div slot="user" class="slot_user">
       <router-link v-show="$store.state.userInfo==''" to="/login" tag="span" class="myBtn hover">登陆/注册</router-link>
         <div class="userBox" v-show="$store.state.userInfo!=''">
           <router-link to="/mypage" tag="div" class="userHead dropdown-toggle" data-toggle="dropdown-menu" data-hover="dropdown-menu">
             <img :src="userheadUrl+$store.state.userInfo.userhead" alt="">
              <div class="dropdown-menu dropdown-menu-right">
                <router-link class="dropdown-item" to="/mypage/detail">个人信息</router-link>
                <router-link class="dropdown-item" to="/message">我的消息</router-link>
                <router-link class="dropdown-item" to="/mypage/production">我的作品</router-link>
                <div class="dropdown-divider"></div>
                <span class="dropdown-item" @click="logout">退出登录</span>
              </div>
           </router-link>
            
         </div>
     </div>
   </responsiveNav>
   <router-view></router-view>
    <pageFooter v-if="$route.fullPath.indexOf('scratch3.0')<0 && $route.fullPath.indexOf('edit')<0"></pageFooter>

   <loading v-if="$store.state.loading"></loading>

   <div class="modal fade" id="saveModal">
    <div class="modal-dialog">
      <div class="modal-content">
   
        <!-- 模态框头部 -->
        <div class="modal-header">
          <h4 class="modal-title">保存作品</h4>
          <button type="button" class="close" data-dismiss="modal">&times;</button>
        </div>
   
        <!-- 模态框主体 -->
        <div class="modal-body">
          <div class="form-group">
            <span>标题</span>
            <input type="text" class="form-control" autocomplete="off" id="title" v-model="title">
          </div>
          <div class="form-group">
            <span>简介</span>
            <textarea class="form-control" rows="5" id="introduce" resize="no" v-model="intro"></textarea>
          </div>
          <div class="form-grop">
            <span >封面</span>
            <div style="width:200px;height:150px;background-color: #ccc;margin:0 auto;position: relative;">
              <input type="file" id="cover" style="width:100%;height:100%;opacity: 0;position: absolute;cursor: pointer;" @change="putCover">
              <img :src="cover.indexOf('base64')>=0?cover:baseUrl+'upload/cover/'+cover" alt="" style="width:200px;height: 150px">
            </div>
          </div>
        </div>
   
        <!-- 模态框底部 -->
        <div class="modal-footer">
            <button type="button" class="btn btn-success" @click="putNewProject" data-dismiss="modal">保存</button>
          <button type="button" class="btn btn-secondary" data-dismiss="modal">关闭</button>
        </div>
   
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import {LOGOUT,INIT_PRO,EDIT_PRO,CLEAR_PRO,} from './store/mutation_types.js';
import {baseUrl,userheadUrl} from './config/env.js';
import loading from './components/loading';
import responsiveNav from './components/responsiveNav';
import pageFooter from './components/pageFooter';
import {savePro} from './api/production';
export default {
  created(){
    $(document).ready(function(){
        $('.dropdown-toggle').hover(function(){
          $(this).find('.'+$(this).attr('data-toggle')).show();
        },function(){
          $(this).find('.'+$(this).attr('data-toggle')).hide();
        })
    })
    this.init();
  },
  data(){
    return {
      baseUrl: '',
      userheadUrl : '',
      hoverHead:false,
      title : '',
      intro : '',
      cover : '',
      id : ''
    }
  },
  methods:{
    async init(){
      this.userheadUrl = userheadUrl;
      this.baseUrl = baseUrl;
    },
    logout(){
      this.$store.commit(LOGOUT);
    },
    fakeA(url){
      window.open(url);
    },
    openWithComputer(){
      window.openWithComputer();
    },
    saveForComputer(){
      window.saveForComputer();
    },
    saveForMyProject(){
      window.saveForMyPro();
    },
    jiasu(){
      window.jiasu();
    },
    savePro(){
      //封面
      this.title = this.$store.state.newPro.title;
      this.intro = this.$store.state.newPro.described;
      this.id = this.$store.state.newPro.id;
      this.cover = this.$store.state.newPro.cover;

      $('#saveModal').modal('show')
    },
    async putNewProject(){
      var formData = new FormData();
      var sb3 = await window.frames[0].autoDown();
      var blob = new Blob( [sb3], {type : "text/xml"});
      //获取sb3文件 blob
      formData.append("data", blob);
      formData.append("title", this.title);
      formData.append("intro", this.intro);
      formData.append("id", this.id);
      formData.append("pic", this.cover);

      let step1 = await savePro(formData);
      alert('保存成功！去发布吧！')
      window.location.href = '/#/mypage/production';
    },
    putCover(e){
      this.pic = e.target.files[0];
      var reader=new FileReader();
      reader.onload=(ev) => {
          this.cover = ev.target.result;
      }
      reader.readAsDataURL(this.pic);
    }
  },
  components:{
    responsiveNav,pageFooter,loading
  },
  computed:{
    editMode(){
      return this.$route.path.indexOf('edit')>=0;
    }
  }
};
</script>

<style lang="less" scoped>
#app{
  background-color: #ececec;
}
.hover{
  cursor: pointer;
}
.myBtn{
    background-color: #787f89;
    color: #fff;
    padding:8px 16px;
    border-radius: 20px;
    font-size: 14px;
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
.slot_user{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
  .userBox{
    cursor: pointer;
    position: relative;
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .userHead{
      height: 50px;
      width: 50px;
      border-radius: 50%;
      overflow: hidden;
      img{
        width: 100%;
      }
    }
  }
}

.slot_navs{
  li,a{
      list-style: none;
      color: #fff;
      padding:8px 16px;
      border-radius: 20px;
      font-size: 14px;
      margin-right:20px;
  }
  .active{
    list-style: none;
    background-color: #e36926;
    color: #fff;
    padding:8px 16px;
    border-radius: 20px;
    font-size: 14px;
    margin-right:20px;
    box-shadow: 0 5px 10px #ccc;
  }
}
@media (max-width: 767px) {
  .myBtn{
    box-shadow: 0 5px 10px #ccc;
  }
  .slot_navs{
    li,a{
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
