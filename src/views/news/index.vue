<template>
  <div class="container-fluid" style="margin-top:40px;">
    <div class="row">
      <div class="col-md10 offset-md-1">
        <timeline class="newsList" v-for="(item,key) in newsList" :key="key">
          <timeline-title>{{item.dateTime | timeFilter}}</timeline-title>
          <timeline-item bg-color="#9dd8e0">
            <router-link :to="'/news/'+item.id" tag="div" class="item">
              <div class="card bg-light text-dark">
                <div class="card-header">{{item.title}}</div>
                <div class="card-body" v-if="item.cover != '' || item.cover !=null">
                  <div class="coverBox">
                    <img :src="newsUrl+item.cover" alt="">
                  </div>
                </div> 
              </div>
            </router-link>
          </timeline-item>
        </timeline>
      </div>
    </div>

  </div>
</template>

<script>
import {newsUrl} from '../../config/env.js';
import {getNewsList} from '../../api/news.js';
import { Timeline, TimelineItem, TimelineTitle } from 'vue-cute-timeline'
import {LOGIN,LOADING_START,LOADING_END} from '../../store/mutation_types.js';
export default {
  created(){
    this.newsUrl = newsUrl;
    this.init();
  },
  data(){
    return {
      newsUrl : '',
      newsList : [],
      commentList : [],
      commentNum:0,
      commentSize:5,
    }
  },
  methods:{
      async init(){
        this.$store.commit(LOADING_START);
        let step1 = await getNewsList();
        this.$store.commit(LOADING_END);
        if(step1.data.state == 0){alert(step1.data.text);return};
        this.newsList = step1.data.body;
        document.title=`趣乐码-新闻中心`
      },
  },
  components:{
   Timeline, TimelineItem, TimelineTitle
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
.newsList{
  margin-top:-10px;
  .item{
    transition: .3s ease transform;
    cursor: pointer;
    .card{
      border-radius: 10px;
    }
    .coverBox{
      max-width: 500px;
      max-height: 300px;
      overflow: hidden;
      text-align: center;
      margin:0 auto;
      img{
        width:100%;
      }
    }
  }
  .item:hover{
    transform: scale(.98)
  }
}
</style>

