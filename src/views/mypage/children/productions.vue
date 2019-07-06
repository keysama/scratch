<template>
  <div class="mypage_productions container-fluid">
    <div class="row serach">
      <div class="col-md-2 col-4" >
          <select class="form-control" id="sel1" v-model="mode" @change="search=false;keyword=''">
            <option value="1">全部</option>
            <option value="2">已发布</option>
            <option value="3">未发布</option>
          </select>
      </div>
      <div class="input-group serach-box col-md-6 col-8 offset-md-4">
        <input type="text" class="form-control" v-model="keyword">
        <div class="btn btn-primary btn-mini" @click="search=true;mode=1">搜索</div>
      </div>
    </div>
    <div class="row content-list" style="margin-top:10px">
      <div class="row item" v-for="(item,key) in filter_productions" :key="key">
        <div class="col-md-1 col-6">
          <div class="cover hover" @click="fakeA('/#/play/'+item.id)">
            <img :src="baseUrl+'upload/cover/'+item.cover" alt="">
          </div>
        </div>
        <div class="col-md-5 col-6">
          <div class="row">
            <div class="col-md-6"><span class="hover" @click="fakeA('/#/play/'+item.id)">{{item.title}}</span></div>
            <div class="col-md-6 text-center state"><span class="badge badge-pill badge-primary" :class="{'badge-warning':item.state==0,'badge-danger':item.state==3,'badge-info':item.state==2}" style="padding:6px 12px">{{item.state==1?'已发布':item.state==0?'未发布':item.state==3?'被下架':item.state==2?'申请中':'其他'}}</span></div>
          </div>
        </div>
        <div class="col-md-6 func">
          <span class="btn btn-light btn-mini" @click="configStick(item.id)">配置</span>
          <span class="btn btn-light btn-mini" @click="fakeA('/#/edit/'+item.id)">编辑</span>
          <span class="btn btn-light btn-mini" @click="share(item.id)">分享</span>
          <span class="btn btn-light btn-mini" @click="proOn(item.id)" v-if="item.state==0">发布</span>
          <span class="btn btn-danger btn-mini" @click="proOff(item.id)" v-if="item.state==1">下架</span>
          <span class="btn btn-info btn-mini" @click="proApply(item.id)" v-if="item.state==3">申请</span>
          <span class="btn btn-light btn-mini" @click="proDelete(item.id)">删除</span>
        </div>
      </div>
    </div>
  <div class="modal" id="myModal" data-keyboard="false"s>
    <div class="modal-dialog">
      <div class="modal-content">
  
        <!-- 模态框头部 -->
        <div class="modal-header">
          <h4 class="modal-title">虚拟按键配置</h4>
          <button type="button" class="close" data-dismiss="modal">&times;</button>
        </div>
  
        <!-- 模态框主体 -->
        <div class="modal-body" >
          <joystick :edit="true" :left="stickData.left" :right="stickData.right" @set="setStick" @resize="stickInit" @clean="cleanStick" />
        </div>
  
        <!-- 模态框底部 -->
        <div class="modal-footer">
          <button type="button" class="btn btn-success" @click="save">保存</button>
          <button type="button" class="btn btn-secondary" data-dismiss="modal">关闭</button>
        </div>
  
      </div>
    </div>
  </div>
<!-- 模态框 -->
  <div class="modal fade" id="shareModal">
    <div class="modal-dialog">
      <div class="modal-content">
  
        <!-- 模态框头部 -->
        <div class="modal-header">
          <h4 class="modal-title">分享到...</h4>
          <button type="button" class="close" data-dismiss="modal">&times;</button>
        </div>
  
        <!-- 模态框主体 -->
        <div class="modal-body">
          <div id="share"></div>
        </div>
  
        <!-- 模态框底部 -->
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">关闭</button>
        </div>
  
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import {baseUrl} from '../../../config/env.js';
import multifunctionalCard from '../../../components/multifunctionalCard';
import {getProductions,changeState,saveStick,getStick,info} from '../../../api/production.js';
import {LOGIN,LOADING_START,LOADING_END} from '../../../store/mutation_types.js';
import joystick from '../../../components/joystick';
export default {
  created(){
      this.init()
  },
  data(){
    let stickData = {
      left : [],
      right : []
    }
    for(let i=0;i<4;i++){
      stickData.left.push({name:'',value:''})
    }
    for(let i=0;i<6;i++){
      stickData.right.push({name:'',value:''})
    }
    return {
        baseUrl:'',
        productions:[],
        stickData : stickData,
        stickIni : '',
        stickId : '',
        mode : 1,
        keyword : '',
        search : false
    }
  },
  methods:{
      async init(){
          this.baseUrl = baseUrl;
          this.$store.commit(LOADING_START)
          let res = await getProductions(this.$store.state.userInfo.id);
          this.$store.commit(LOADING_END)
          if(res.data.state == 0){alert(res.data.text);return};
          this.productions = res.data.body;
          document.documentElement.scrollTop = 0;
      },
      fakeA (url){
        window.open(url)
      },
      async proOn(id){
        this.$store.commit(LOADING_START);
        let res = await changeState(id,1);
        this.$store.commit(LOADING_END);
        if(res.data.state == 0){alert(res.data.text);return};
        this.init();
      },
      async proOff(id){
        this.$store.commit(LOADING_START);
        let res = await changeState(id,0);
        this.$store.commit(LOADING_END);
        if(res.data.state == 0){alert(res.data.text);return};
        this.init();
      },
      async proDelete(id){
        this.$store.commit(LOADING_START);
        let res = await changeState(id,4);
        this.$store.commit(LOADING_END);
        if(res.data.state == 0){alert(res.data.text);return};
        this.init();
      },
      async proApply(id){
        this.$store.commit(LOADING_START);
        let res = await changeState(id,2);
        this.$store.commit(LOADING_END);
        if(res.data.state == 0){alert(res.data.text);return};
        this.init();
      },
      async configStick(id){
        let step1 = await getStick(id);
        if(step1.data.body[0]){
          this.stickData = JSON.parse(step1.data.body[0].data);
          console.log(JSON.parse(step1.data.body[0].data))
        }else{
          let stickData = {
            left : [],
            right : []
          }
          for(let i=0;i<4;i++){
            stickData.left.push({name:'',value:''})
          }
          for(let i=0;i<6;i++){
            stickData.right.push({name:'',value:''})
          }
          this.stickData = stickData;
        }
        this.stickId = id;
        $('#myModal').modal('show');
        this.stickIni();
      },
      setStick(id,data){
        this.stickData[data.area]=this.stickData[data.area].map((item,key)=>{
          if(key==id){
            return {name:data.name,value:data.value}
          }else{
            return item;
          }
        })
      },
      cleanStick(id,data){
        this.stickData[data.area]=this.stickData[data.area].map((item,key)=>{
          if(key==id){
            return {name:'',value:''}
          }else{
            return item;
          }
        })
      },
      stickInit(object){
        this.stickIni = object;
      },
      async save(){
        let result = JSON.stringify(this.stickData);
        let res = await saveStick(this.stickId,result);
        if(res.data.state == 0){alert(res.data.text);return};
        alert('保存成功!');
        $('#myModal').modal('hide');
      },
      async share(id){
        this.$store.commit(LOADING_START)
        let step1 = await info(id);
        this.$store.commit(LOADING_END)
        if(step1.data.state == 0){alert(step1.data.text);return};
        let pro = step1.data.body[0];
        let $config = {
            url                 : (this.baseUrl+'#/play/'+pro.id).split('http://')[1],// 网址，默认使用 window.location.href
            source              : pro.described, // 来源（QQ空间会用到）, 默认读取head标签：<meta name="site" content="http://overtrue" />
            title               : '这款小游戏还不错哦~名字叫《'+pro.title+'》', // 标题，默认读取 document.title 或者 <meta name="title" content="share.js" />
            description         : pro.described, // 描述, 默认读取head标签：<meta name="description" content="PHP弱类型的实现原理分析" />
            image               : this.coverUrl+pro.cover, // 图片, 默认取网页中第一个img标签
            sites               : ['qq','wechat','qzone','weibo'], // 启用的站点
            disabled            : [], // 禁用的站点
            wechatQrcodeTitle   : '微信扫一扫：分享', // 微信二维码提示文字
            wechatQrcodeHelper  : '<p>微信里点“发现”，扫一下</p><p>二维码便可将本文分享至朋友圈。</p>',
            target : '_blank' //打开方式
        };
        $('#shareModal').modal('show');
        socialShare('#share',$config);
      },
      zhengze(key){
        return new RegExp("" + key + "","g");
      }
  },
  computed:{
    filter_productions(){
      if(this.productions.length<=0){
        return []
      }
      if(this.mode==1){
        if(this.search){
          return this.productions.filter(item=>this.zhengze(this.keyword).test(item.title))
        }
        return this.productions;
      }

      if(this.mode==2){
        if(this.search){
          return this.productions.filter(item=>this.zhengze(this.keyword).test(item.title))
        }
        return this.productions.filter(item=>item.state == 1)
      }

      if(this.mode==3){
        if(this.search){
          return this.productions.filter(item=>this.zhengze(this.keyword).test(item.title))
        }
        return this.productions.filter(item=>item.state != 1)
      }

    }
  },
  components:{
   multifunctionalCard,joystick
  },
  mounted(){

  }
};
</script>

<style lang="less" scoped>
a{
  color: #0e0e0e;
}
.hover{
  cursor: pointer;
}
.mypage_productions{
  border:1px solid #ececec;
  border-radius: 10px;
  min-height: 100%;
}
.serach{
  padding:5px 0;
  background-color: #ececec;
}
.content-list{
  border-top:1px solid #ececec;
}
.item{
  width:90% ;
  margin:10px auto;
  border-bottom:1px solid #ececec;
  padding:10px 0;
  background-color: #f6f9fa;
  .cover{
    overflow: hidden;

    border-radius: 5px;
    img{
      width:100%;
    }
  }
  .state{
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 50px;
  }
  .func{
    margin-top:10px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    span{
      font-size: 12px;
    }
  }

}
#shareModal{
  padding-top:100px;
}
</style>

