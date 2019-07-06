<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-8 offset-md-2" style="margin-top:20px">
        <mescroll-vue class="matchBox" ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
          <div class="scroll">
            <div class="row item" v-for="(item,key) in dataList" :key="key">
              <div class="col-md-6 left">
                <router-link :to="'/match/'+item.id" class="coverBox" tag="div">
                  <img :src="matchCoverUrl+item.cover" alt="">
                </router-link>
              </div>
              <div class="col-md-6 right">
                <div class="title"><h4>{{item.title}}</h4></div>
                <div class="info"><span>{{item.date}}</span><span style="margin-left:10px">({{item.state==1?'进行中':'已结束'}})</span></div>
                <div class="introduce">{{item.introduce}}</div>
                <div class="func">
                  <router-link :to="'/match/'+item.id" class="btn btn-success btn-sm" v-if="item.state==1">参加</router-link>
                  <router-link :to="'/match/'+item.id" class="btn btn-info btn-sm" v-if="item.state==0">查看</router-link>
                </div>
              </div>
            </div>
          </div>
        </mescroll-vue>
      </div>
    </div>
  </div>
</template>

<script>
import {matchCoverUrl} from '../../config/env.js';
import {getMatchList} from '../../api/match.js';
import MescrollVue from 'mescroll.js/mescroll.vue';
import {LOADING_START,LOADING_END} from '../../store/mutation_types.js';
export default {
  created(){
    this.matchCoverUrl = matchCoverUrl;
    this.init();
  },
  data(){
    return {
      matchCoverUrl : '',
      mescroll : '',
      mescrollDown: {},
      dataList : [],
    }
  },
  computed:{
      mescrollUp (){
        return {
          callback: this.upCallback,
          page: {
            num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
            size: 5 // 每页数据的数量
          },
          noMoreSize: 3, // 如果列表已无数据,可设置列表的总数量要大于等于5条才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看
          toTop: { // 配置回到顶部按钮
            src: 'mescroll-totop.png'
          },
          lazyLoad: {
            use: true // 是否开启懒加载,默认false
          }
        }
      }
  },
  methods:{
    async init(){
   
    },
    mescrollInit (mescroll) {
      this.mescroll = mescroll;
    },
    async upCallback (page, mescroll) {
      if(page.num == 1) {this.dataList = []};
      let res = await getMatchList(page);
      res.data.body.forEach(item=>{
        this.dataList.push(item)
      })
      mescroll.endSuccess(res.data.body.length)
    }
  },
  components:{
   MescrollVue
  },
  mounted(){
    $('.matchBox').height($(window).height())
  }
};
</script>

<style lang="less" scoped>
.matchBox{
  padding:0 20px;
  .item{
    min-height:200px;
    margin:30px auto;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 0 10px #9d9d9d;
    transition: .3s ease transform;
    .left{
      width:100%;
      padding:0;
      .coverBox{
        width:100%;
        margin:0 auto;
        max-height: 350px;
        cursor: pointer;
        img{
          width:100%
        }
      }
    }
    .right{
      width:100%;
      padding:10px 20px;
      position:relative;
      .func{
        display: flex;
        justify-content: flex-end;
        align-items: center;
      }
      .introduce{
        white-space: warp;
        word-break: break-all;
      }
      .info{
        font-size:12px;
      }
    }
  }
  .item:active{
    transform: scale(.95)
  }
}
</style>

