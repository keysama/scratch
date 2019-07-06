<template>
  <div class="mypage_productions container-fluid">
    <div class="row serach">
      <div class="col-md-2 col-4" >
          <select class="form-control">
            <option value="1">全部</option>
          </select>
      </div>
      <div class="input-group serach-box col-md-6 col-8 offset-md-4">
        <input type="text" class="form-control" v-model="keyword" @change="search=false">
        <div class="btn btn-primary btn-mini " @click="search=true">搜索</div>
      </div>
    </div>
    <div class="row content-list" style="margin-top:10px">
      <div class="row item" v-for="(item,key) in filter_productions" :key="key">
        <div class="col-md-1 col-6">
          <div class="cover" @click="fakeA('/#/play/'+item.id)">
            <img :src="baseUrl+'upload/cover/'+item.cover" alt="">
          </div>
        </div>
        <div class="col-md-5 col-6">
          <span @click="fakeA('/#/play/'+item.id)">{{item.title}}</span>
        </div>
        <div class="col-md-2 func">
          <span class="btn btn-light btn-mini" @click="share(item.id)">分享</span>
          <span class="btn btn-light btn-mini" @click="deleteStar(item.id)">删除</span>
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
import {getUserLikeProductions,info} from '../../../api/production.js';
import {DELETE_STAR,LOADING_START,LOADING_END} from '../../../store/mutation_types.js';
export default {
  created(){
      this.init()
  },
  data(){
    return {
        baseUrl:'',
        productions:[],
        keyword : '',
        search : false
    }
  },
  methods:{
      async init(){
          this.baseUrl = baseUrl;
          this.$store.commit(LOADING_START)
          let res = await getUserLikeProductions(this.$store.state.userInfo.id);
          this.$store.commit(LOADING_END)
          if(res.data.state == 0){alert(res.data.text);return};
          this.productions = res.data.body;
      },
      async deleteStar(id){
        this.$store.dispatch(DELETE_STAR,id);
        this.productions=this.productions.filter(item=>item.id!=id);
      },
      fakeA (url){
        window.open(url)
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
      if(this.search){
        return this.productions.filter(item=>this.zhengze(this.keyword).test(item.title))
      }else{
        return this.productions;
      }
    }

  },
  components:{

  },
  mounted(){

  }
};
</script>

<style lang="less" scoped>
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

