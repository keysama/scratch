<template>
  <div class="container-fluid box">
        <mescroll-vue :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
            <div class="scroll-page">
                <div class="item" v-for="(item,key) in list" :key="key">
                    <div class="left">
                        <div class="headbox">
                            <img :src="userheadUrl+item.userhead" alt="">
                        </div>
                    </div>
                    <div class="right">
                        <div class="top">
                            <div> <span class="nickname">{{item.nickname}}</span><span class="time">{{item.dateTime | timeFilter}}</span></div>
                            <div class="production">评论了<a :href="'/#/play/'+item.pro" target="_blank">{{item.title}}</a></div>
                        </div>
                        <div class="bottom">
                            <div>{{item.content}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </mescroll-vue>
  </div>
</template>

<script>
import MescrollVue from 'mescroll.js/mescroll.vue';
import {getMessage} from '../../../api/account.js';
import {userheadUrl} from '../../../config/env.js';
export default {
  created(){
      this.userheadUrl = userheadUrl;
  },
  data(){
    return {
        userheadUrl : '',
        inputComment : '',
        mescroll : '',
        mescrollDown: {},
        numPerPage : 5,
        list : []
    }
  },
  methods:{
    mescrollInit (mescroll) {
        this.mescroll = mescroll;
    },
    async upCallback (page, mescroll) {
        if (page.num === 1) this.list = [];

        let res = await getMessage('reply',page.num,this.numPerPage);

        this.list=this.list.concat(res.data.body);

        this.$nextTick(() => {
            mescroll.endSuccess(res.data.body.length)
        })
    },
  },
  computed:{
    mescrollUp(){
        return {
            callback: this.upCallback,
            page: {
                num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
                size: this.numPerPage // 每页数据的数量
            },
            noMoreSize: this.numPerPage/2, // 如果列表已无数据,可设置列表的总数量要大于等于5条才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看
            toTop: { // 配置回到顶部按钮
                src: 'mescroll-totop.png'
            },
            lazyLoad: {
                use: true // 是否开启懒加载,默认false
            },
            loadFull: {
                use: true, //列表数据过少,不足以滑动触发上拉加载,是否自动加载下一页,直到满屏或者无更多数据为止;默认false,因为可通过调高page.size避免这个情况
                delay: 500 //延时执行的毫秒数; 延时是为了保证列表数据或占位的图片都已初始化完成,且下拉刷新上拉加载中区域动画已执行完毕;
            },
        }
    }
  },
  components:{
      MescrollVue
  },
  mounted(){

  },
  filters : {
    timeFilter(value){
        var now = new Date(parseInt(value)),
            y = now.getFullYear(),
            m = now.getMonth() + 1,
            d = now.getDate();
        return y + "年" + (m < 10 ? "0" + m : m) + "月" + (d < 10 ? "0" + d : d) + '日';
    }
  }
};
</script>

<style lang="less" scoped>
.box{
    height: 500px;
    .scroll-page{
        height:100%;
        .item{
            width:90%;
            margin:0 auto;
            background-color: #fff;
            margin-bottom:10px;
            border-radius: 5px;
            box-shadow: 0 0 5px #9d9d9d;
            padding:10px 20px;
            display: flex;
            align-items: flex-start;
            .left{
                padding-right: 20px;
                .headbox{
                    width:60px;
                    height:60px;
                    overflow: hidden;
                    border-radius: 50%;
                    img{
                        width:100%;
                    }
                }
            }
            .right{
                width:100%;
                .top{
                    height:60px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    .nickname{
                        font-weight: 700;
                        font-size: 14px;
                    }
                    .time{
                        color:#999;
                        font-size: 12px;
                        margin:0 10px;
                    }
                }
                .bottom{
                    background-color: #f4f4f4;
                    width:100%;
                    margin:10px 0;
                    padding:5px 10px;
                    color:#999;
                    font-size: 14px;
                }
            }

        }
    }
}
</style>

