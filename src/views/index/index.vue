<template>
  <div>
   <div class="banner">
    <Slick :options="slickOptions" ref="slick" class="slick">
      <a class="slide_item" :href="'http://'+item.link" v-for="(item,key) in sliders" :key="key" target="_blank"><img :src="sliderUrl+item.img" alt=""></a>
    </Slick>
   </div>
   
   <titleRow border="true" style="color:#e36926">
      <div slot="left">
        <i class="iconfont icon-41"></i>龙虎榜
      </div>
      <div slot="right"></div>
   </titleRow>
   <div class="playGround-rank container-fluid">
      <multifunctionalCard v-for="(item,key) in hotPro" :key="key" class="item"
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
   <titleRow border="true" style="color:#fdaf17">
      <div slot="left">
        <i class="iconfont icon-41"></i>热门作品
      </div>
      <div slot="right">
        <div class="input-group search">
					<input type="text" class="form-control" v-model="keyword" style="border-radius:20px;margin-right:10px">
					<span class="input-group-btn">
						<button class="btn" type="button" @click="search" style="border-radius:10px">
							搜索
						</button>
					</span>
				</div>
      </div>
   </titleRow>
   <!-- <div style="position:relative"> -->
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
   <!-- </div> -->

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
import {getSliders,getConfig,getHotProductions,getNewProductions} from '../../api/home.js';
import {info} from '../../api/production.js';
import {baseUrl,sliderUrl,coverUrl,userheadUrl} from '../../config/env.js';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slick from 'vue-slick';
import playGround from '../../components/playGround';
import titleRow from '../../components/titleRow';
import multifunctionalCard from '../../components/multifunctionalCard';
import {LOADING_START,LOADING_END,DELETE_GOOD,PUT_GOOD} from '../../store/mutation_types.js';
import MescrollVue from 'mescroll.js/mescroll.vue';
export default {
  created(){
    // document.scrollTop = 0;
    this.init();
  },
  data(){
    let isMobile = false;
    if(document.documentElement.clientWidth <= 767){
      
    }
    return {
      baseUrl: '',
      userheadUrl : '',
      sliderUrl : '',
      coverUrl : '',
      sliders : [],
      hotPro : [],
      newPro : [],
      config: '',
      slickOptions : {
        arrows:false,
        centerMode: true,
        dots: true,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        variableWidth: true,
        adaptiveHeight: true
      },
      mescroll : '',
      mescrollDown: {
        isLock : true
      },
      dataList : [],
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
      },
      keyword : ''
    }
  },
  methods:{
    async init(){
      this.baseUrl = baseUrl;
      this.sliderUrl = sliderUrl;
      this.coverUrl = coverUrl;
      this.userheadUrl = userheadUrl;
      // this.$store.commit(LOADING_START)

      let step1 = await getSliders();
      let step2 = await getConfig();
      let step3 = await getHotProductions(step2.data.body.hotnum)
      let step4 = await getNewProductions(step2.data.body.newnum)
      if(step1.data.state == 0){alert(step1.data.text);return};
      if(step2.data.state == 0){alert(step2.data.text);return};
      if(step3.data.state == 0){alert(step3.data.text);return};
      if(step4.data.state == 0){alert(step4.data.text);return};
      // this.$store.commit(LOADING_END)

      this.sliders = step1.data.body;
      this.config = step2.data.body;
      this.slickOptions.autoplaySpeed = parseInt(this.config.sliderTime);
      this.hotPro = step3.data.body;
      this.newPro = step4.data.body;
      this.$nextTick(()=>{
        $('.slick').slick(this.slickOptions);   
      })

    },
    search(){
      this.$router.push('search/'+this.keyword)
    },
    goView(sign){
      // this.$router.push('play/'+sign)
      // let Link = window.open('about:blank');
      this.$router.push('/play/'+sign)
      //  window.open('/#/play/'+sign,'_self')
    },
    async goShare(sign){
      this.$store.commit(LOADING_START)
      let pro = await info(sign);
      this.$store.commit(LOADING_END)
      if(pro.data.state == 0){alert(pro.data.text);return};

      this.share(pro.data.body[0])
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
    hotScroll(e){
      console.log('scrollTop',e.srcElement.scrollTop)
      console.log('heihgt',e)
    },
    mescrollInit (mescroll) {
      this.mescroll = mescroll;
    },
    upCallback (page, mescroll) {
      if (page.num === 1) this.dataList = [];
      setTimeout(()=>{
          let stemp=setInterval(()=>{
            if(this.newPro.length>=0){
              this.$nextTick(() => {
                clearInterval(stemp)
                let start = (page.num-1) * page.size;
                let end = page.num * page.size;
                let data = this.newPro.slice(start,end);
                console.log('start',start)
                console.log('end',end)
                console.log('data',data)
                data.forEach(item=>{
                  this.dataList.push(item)
                })
                console.log('this.mescrollUp.dataList',this.dataList)
                this.$nextTick(() => {
                  mescroll.endSuccess(data.length)
                })
              })
            }
          },500)
      },1000)
      console.log('up',page)
    },
    share(pro){
      console.log(pro)
      let $config = {
          url                 : this.baseUrl+'#/play/'+pro.id,// 网址，默认使用 window.location.href
          source              : pro.described || '', // 来源（QQ空间会用到）, 默认读取head标签：<meta name="site" content="http://overtrue" />
          title               : '趣乐码《'+pro.title+'》', // 标题，默认读取 document.title 或者 <meta name="title" content="share.js" />
          description         : pro.described || '', // 描述, 默认读取head标签：<meta name="description" content="PHP弱类型的实现原理分析" />
          image               : this.coverUrl+pro.cover, // 图片, 默认取网页中第一个img标签
          sites               : ['qq','wechat','qzone','weibo'], // 启用的站点
          disabled            : [], // 禁用的站点
          wechatQrcodeTitle   : '微信扫一扫：分享', // 微信二维码提示文字
          wechatQrcodeHelper  : '<p>微信里点“发现”，扫一下</p><p>二维码便可将本文分享至朋友圈。</p>',
          target : '_blank' //打开方式
      };
      $('#shareModal').modal('show');
      socialShare('#share',$config);
    }
  },
  components:{
    Slick,playGround,titleRow,multifunctionalCard,MescrollVue
  },
  mounted(){
    if(document.documentElement.clientWidth <= 767){
      $('.slide_item img').css('width',document.documentElement.clientWidth-20+'px')
      $('.playGround-rank .item').css('width',document.documentElement.clientWidth-80+'px');
      $('.playGround-hot .item').css('width',document.documentElement.clientWidth-80+'px')
    }   
  }
};
</script>

<style lang="less" scoped>
.hover{
  cursor: pointer;
}
.slick{
  padding:10px 0;
  .slick-list{
    padding: 0 !important;
  }
}
.myBtn{
    background-color: darken(#6cf, 22%);
    color: #fff;
    padding:8px 16px;
    border-radius: 20px;
    font-size: 1.2rem;
}
.banner{
  padding:20px 20px;
  margin:20px 10px 0 10px;
  .slide_item{
    padding:0 20px;
    img{
      max-height: 200px;
      border-radius: 10px;
    }
  }
}

.playGround-rank{
  width: 100%;
  padding:10px;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  .item{
    width: 17%;
    display:inline-block;
    margin:0 auto;
    margin-top:20px;
  }
}
.playGround-hot{
  text-align: center;
  height:500px;
  width: 100%;
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
#shareModal{
  padding-top:100px;
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
  .banner{
    padding:0;
    margin:0;
    .slide_item{
      padding:0 20px;
      img{
        
      }
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

