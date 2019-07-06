<template>
  <div class="container-fluid articlesPage">
      <div class="row" style="margin-top:20px">
        <div class="col-md-10 offset-md-1 articles">
          <router-link tag="div" :to="'/introduce/article/'+item.id" class="item" v-for="(item,key) in articleList" :key="key">
            <span ># {{key+1}} <span style="margin-left:10px"> {{item.title}}</span></span>
          </router-link>
        </div>
      </div>
<!-- 模态框 -->
<div class="modal fade" id="article">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <!-- 模态框头部 -->
      <div class="modal-header">
        <h4 class="modal-title">{{selectArticle.title}}</h4>
        <button type="button" class="close" data-dismiss="modal">&times;</button>
      </div>
 
      <!-- 模态框主体 -->
      <div class="modal-body" style="word-break: break-all;" v-html="selectArticle.content">
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
import {getarticleList} from '../../../api/article.js';
import {baseUrl} from '../../../config/env.js';
import {LOGIN,LOADING_START,LOADING_END} from '../../../store/mutation_types.js';
export default {
  created(){
      this.baseUrl = baseUrl;
      this.init();
  },
  data(){
    return {
        baseUrl : '',
        articleList : [],
        selectArticle : {}
    }
  },
  methods:{
      async init(){
        this.$store.commit(LOADING_START);
        let step1 = await getarticleList(this.$route.params.id);
        this.$store.commit(LOADING_END);
        if(step1.data.state == 0){alert(step1.data.text);return};
        this.articleList = step1.data.body;
        this.articleList = this.articleList.map(item=>{
            let stemp = item;
            stemp.content = stemp.content.replace(/<img src="\//g,'<img src="'+this.baseUrl);
            return stemp;
        })
        document.title=`趣乐码-课程介绍`;
      },
      showArticle (key){
          this.selectArticle=this.articleList[key];
          $('#article').modal('show');
      }
  },
  components:{
   
  },
  mounted(){
    $(document).ready(()=>{
      $('.introduce').height($('.articlesPage').height())
    })
  }
};
</script>

<style lang="less" scoped>
.articles{
  min-height:400px;
  padding:10px 20px;
  .item{
    min-height: 80px;
    font-weight: 700;
    border-radius: 20px;
    padding:10px 20px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    color:#000;
    margin:20px auto;
    box-shadow: 0 0 10px #9d9d9d;
    transform: scale(1);
    transition: .2s ease transform;
    cursor: pointer;
  }
}
</style>

