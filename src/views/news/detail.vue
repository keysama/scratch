<template>
  <div class="container-fluid">
      <div class="row" style="margin-top:20px">
            <div class="col-md-10 offset-md-1 articleBox">
                <div class="title">
                    <h2>{{news.title}}</h2>
                    <small>{{news.dateTime | timeFilter}}</small>
                </div>
                <div class="content" v-html="news.content">
                </div>
            </div>
      </div>
    <div class="row" v-if="false">
      <div class="col-md-8 offset-md-1" style="margin-top:50px;">
        <div style="width:95%;margin:0 auto">
          <responsiveComment
            :total="commentNum"
            :size="commentSize"
            :list="commentList"
            :headurl="userheadUrl"
            @submit="addComment"
            @next="getComment"
          >
            <div class="headBox" slot="userhead">
                <img :src="userheadUrl+$store.state.userInfo.userhead" alt="">
            </div>
          </responsiveComment>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getNews} from '../../api/news.js';
import {putNewsComment,getNewsCommentNum,getNewsComments} from '../../api/comment.js';
import {LOADING_START,LOADING_END} from '../../store/mutation_types.js';
import {baseUrl,userheadUrl} from '../../config/env.js';
import responsiveComment from '../../components/responsiveComment';
export default {
  created(){
      this.baseUrl = baseUrl;
    this.userheadUrl = userheadUrl;
      this.init();
  },
  data(){
    return {
        baseUrl : '',
        userheadUrl : '',
        news : {},
        commentList : [],
        commentNum:0,
        commentSize:5,
    }
  },
  methods:{
      async init(){
          this.$store.commit(LOADING_START)
          let step1 = await getNews(this.$route.params.id);
          let step2 = await getNewsCommentNum(this.$route.params.id);
          this.$store.commit(LOADING_END)

          if(step1.data.state == 0){alert(step1.data.text);return}

          this.news = step1.data.body;
   
          this.news.content = this.news.content.replace(/<img src="\//g,'<img src="'+this.baseUrl);
        this.commentNum = step2.data.body.total;
          document.title=`趣乐码-新闻《${this.news.title}》`;
      },
    async addComment(content,refash,mescroll){
      this.$store.commit(LOADING_START);
      let res = await putNewsComment(this.$route.params.id,content);
      this.$store.commit(LOADING_END);
      if(res.data.state == 0){alert(res.data.text);return;}
      refash();
      mescroll.resetUpScroll();
      this.commentNum+=1;
    },
    async getComment(page, mescroll){
      if (page.num === 1) this.commentList = [];
      let res = await getNewsComments(this.$route.params.id,page.num,this.commentSize);
      this.commentList=this.commentList.concat(res.data.body);
      this.$nextTick(() => {
        mescroll.endSuccess(res.data.body.length)
      })
    },
    clickStick(obj){
      if(obj.type == 'down'){
        setTimeout(()=>{
          this.touchS = true;
        },500)
        this.touchClock = setInterval(()=>{
          if(this.touchS){
            window.frames['game'].my_handleKeyDown(obj.value.keycode,obj.value.key);
          }
        },30)
        window.frames['game'].my_handleKeyDown(obj.value.keycode,obj.value.key);
      }else{
        this.touchS = false;
        clearInterval(this.touchClock);
        window.frames['game'].my_handleKeyUp(obj.value.keycode,obj.value.key);
      }
      console.log(obj)
    },
    stickInit(object){
      this.stickIni = object;
    },
  },
  components:{
   responsiveComment
  },
  mounted(){

  },
  filters : {
    timeFilter(value){
        var now = new Date(parseInt(value)),
            y = now.getFullYear(),
            m = now.getMonth() + 1,
            d = now.getDate();
        return y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d);
    }
  }
};
</script>

<style lang="less" scoped>
.articleBox{
    min-height: 300px;
    .title{
        border-bottom: 1px solid #9d9d9d;
        margin:10px auto;
    }
    .content{
        padding:20px;
        background-color: #f6f9fa;
        word-break: break-all
    }
}

</style>

