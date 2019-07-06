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
  </div>
</template>

<script>
import {baseUrl} from '../../../config/env.js';
import {getArticle} from '../../../api/chapter.js';
import {LOADING_START,LOADING_END} from '../../../store/mutation_types.js';
export default {
  created(){
      this.baseUrl = baseUrl;
      this.init();
  },
  data(){
    return {
        baseUrl : '',
        news : {}
    }
  },
  methods:{
      async init(){
          this.$store.commit(LOADING_START)
          let step1 = await getArticle(this.$route.params.id);
          this.$store.commit(LOADING_END)

          if(step1.data.state == 0){alert(step1.data.text);return}

          this.news = step1.data.body[0];


          this.news.content = this.news.content.replace(/<img src="\//g,'<img src="'+this.baseUrl);

          document.title = '趣乐码-介绍《'+this.news.title+'》';

      }
  },
  components:{
   
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

