<template>
  <div class="container-fluid">
      <div class="row" style="margin-top:20px">
            <div class="col-md-10 offset-md-1 articleBox">
                <div class="title">
                    <h2>{{match.title}}</h2>
                    <small>{{match.dateTime | timeFilter}}</small>
                </div>
                <div class="content" v-html="match.content">
                </div>
                <div class="text-right" style="margin:10px 0;">
                    <span><h2>{{match.state==1?'进行中':'已结束'}}</h2></span>
                    <span class="btn btn-success btn-lg" v-if="match.state==1" @click="joinMatch(match.id)">参加</span>
                </div>
                <div v-if="match.state==0">
                    <h2>赛事结果</h2>
                </div>
                <div class="content" v-html="match.result"  v-if="match.state==0">
                </div>
            </div>
      </div>
   <titleRow border="true">
      <div slot="left">
        <i class="iconfont icon-41"></i>参赛作品
      </div>
      <div slot="right">

      </div>
   </titleRow>
   <mescroll-vue class="playGround-hot" ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
     <div class="d-flex justify-content-start align-items-center flex-wrap" style="margin:0 auto">
      <multifunctionalCard v-for="(item,key) in dataList" :key="key" class="item"
      :sign="item.id"
      slot="item"
      :img="coverUrl+item.cover" 
      :title="item.title" 
      :views="item.clickNum" 
      :good="item.goodNum"
      :haveGood="$store.state.good.indexOf(item.id)>=0"
      :userHead="userheadUrl+item.userhead" 
      :userName="item.nickname"
      @view="goView"
      @share="goShare"
      @good="goGood"
      >
      </multifunctionalCard> 
     </div>
   </mescroll-vue>
<!-- 模态框 -->
<div class="modal fade" id="joinMatch">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
 
      <!-- 模态框头部 -->
      <div class="modal-header">
        <h4 class="modal-title">参加赛事</h4>
        <button type="button" class="close" data-dismiss="modal">&times;</button>
      </div>
 
      <!-- 模态框主体 -->
      <div class="modal-body">
        <div class="form-group">
        <label for="sel1">请选择要参赛的作品:</label>
        <select class="form-control" id="sel1" v-model="joinSelect">
            <option v-for="(item,key) in userProductions" :key="key" :value="item.id">{{item.title}}</option>
        </select>
        </div>
      </div>
 
      <!-- 模态框底部 -->
      <div class="modal-footer">
        <button type="button" class="btn btn-success" @click="confirmToJoinMatch">确定</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">关闭</button>
      </div>
 
    </div>
  </div>
</div>
  </div>
</template>

<script>
import titleRow from '../../components/titleRow';
import multifunctionalCard from '../../components/multifunctionalCard';
import MescrollVue from 'mescroll.js/mescroll.vue';
import {baseUrl,coverUrl,userheadUrl} from '../../config/env.js';
import {getMatch,getMatchProductions,join} from '../../api/match.js';
import {getProductions} from '../../api/production.js';
import {LOADING_START,LOADING_END,DELETE_GOOD,PUT_GOOD} from '../../store/mutation_types.js';
export default {
  created(){
      this.baseUrl = baseUrl;
      this.init();
  },
  data(){
    return {
        baseUrl: '',
        userheadUrl : '',
        coverUrl : '',
        match : {},
        mescroll : '',
        mescrollDown: {},
        dataList : [],
        joinSelect : '',
        userProductions : [],
        mescrollUp :{
            callback: this.upCallback,
            page: {
                num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
                size: 10 // 每页数据的数量
            },
            noMoreSize: 5, // 如果列表已无数据,可设置列表的总数量要大于等于5条才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看
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
            this.baseUrl = baseUrl;
            this.coverUrl = coverUrl;
            this.userheadUrl = userheadUrl;
            this.$store.commit(LOADING_START);
            let step1 = await getMatch(this.$route.params.id);
            this.$store.commit(LOADING_END)

            if(step1.data.state == 0){alert(step1.data.text);return}

            this.match = step1.data.body;
            this.match.content = this.match.content.replace(/<img src="\//g,'<img src="'+this.baseUrl);
            this.match.result = this.match.result.replace(/<img src="\//g,'<img src="'+this.baseUrl);
      },
    mescrollInit (mescroll) {
      this.mescroll = mescroll;
    },
    async upCallback (page, mescroll) {
        if (page.num === 1) this.dataList = [];
        let productions = await getMatchProductions(this.$route.params.id,page.num,page.size);
        
        productions.data.body.forEach(item=>{
            this.dataList.push(item)
        });
        this.$nextTick(() => {
            mescroll.endSuccess(productions.data.body.length)
        })
    },
    goView(sign){
      window.open('/#/play/'+sign)
    },
    goShare(sign){
      alert('分享'+sign)
    },
    goGood(sign,haveGood){
      if(haveGood){
        this.$store.dispatch(DELETE_GOOD,sign);
        this.localGoodPull(sign)
      }else{
        this.$store.dispatch(PUT_GOOD,sign);
        this.localGoodAdd(sign)
      }
    },
    localGoodAdd(id){
      this.hotPro.forEach((item,key)=>{
        if(item.id==id){
           this.hotPro[key].goodNum+=1;
        }
      })
      this.newPro.forEach((item,key)=>{
        if(item.id==id){
           this.newPro[key].goodNum+=1;
        }
      })
    },
    localGoodPull(id){
      this.hotPro.forEach((item,key)=>{
        if(item.id==id){
           this.hotPro[key].goodNum-=1;
        }
      })
      this.newPro.forEach((item,key)=>{
        if(item.id==id){
           this.newPro[key].goodNum-=1;
        }
      })
    },
    async joinMatch(id){
        if(!this.$store.state.userInfo){
            alert('请登录后操作');
            return;
        }
        this.$store.commit(LOADING_START)
        let res = await getProductions(this.$store.state.userInfo.id);
        this.$store.commit(LOADING_END)
        if(res.data.state == 0){alert(res.data.text);return};
        this.userProductions = res.data.body;
        $('#joinMatch').modal('show');
    },
    async confirmToJoinMatch(){
        if(!confirm(`确认以作品<${this.userProductions.filter(item=>item.id==this.joinSelect)[0].title}>参赛？`)){
            return;
        }else if(this.joinSelect==''){
            alert('没有选择作品')
        }else{
            let res = await join(this.$route.params.id,this.$store.state.userInfo.id,this.joinSelect);
            if(res.data.state == 0){alert(res.data.text);return};
            alert('参加成功!');
            $('#joinMatch').modal('hide');
        }
    } 
  },
  components:{
    titleRow,multifunctionalCard,MescrollVue
  },
  mounted(){
    if(document.documentElement.clientWidth <= 767){
      $('.playGround-hot .item').css('width',document.documentElement.clientWidth-80+'px')
    }
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
.hover{
  cursor: pointer;
}
.myBtn{
    background-color: darken(#6cf, 22%);
    color: #fff;
    padding:8px 16px;
    border-radius: 20px;
    font-size: 1.2rem;
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

.playGround-rank{
  text-align: center;
  width: 90%;
  padding:10px;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  .item{
    width: 17%;
    margin-top:20px;
    display:inline-block;
    margin:0 auto;
  }
}
.playGround-hot{
  text-align: center;
  height:500px;
  width: 90%;
  padding:10px;
  margin:0 auto;
  .item{
    width: 17%;
    margin:0 auto;
    margin-top:20px;
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
  li{
      list-style: none;
      color: #fff;
      padding:8px 16px;
      border-radius: 20px;
      font-size: 1.2rem;
      margin-right:20px;
  }
  .active{
    list-style: none;
    background-color: darken(#6cf, 22%);
    color: #fff;
    padding:8px 16px;
    border-radius: 20px;
    font-size: 1.2rem;
    margin-right:20px;
    box-shadow: 0 5px 10px #ccc;
  }
}
@media (max-width: 767px) {
  .myBtn{
    box-shadow: 0 5px 10px #ccc;
  }
  .slot_navs{
    li{
        color: #000;
    }
  }
  .search{
    padding-right: 0;
    width: 160px;
  }
  .playGround-hot{
    .item{
      width: 45%;
    }
  }
  .playGround-rank{
    .item{
      width: 45%;
    }
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

