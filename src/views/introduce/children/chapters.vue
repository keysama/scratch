<template>
  <div class="container-fluid chaptersPage">
      <div class="row" style="margin-top:20px">
        <div class="col-md-10 offset-md-1 chapters">
          <router-link :to="'/introduce/chapters/'+item.id" tag="div" class="item" v-for="(item,key) in chapterList" :key="key">
            <span >{{item.title}}</span>
          </router-link>
        </div>
      </div>
  </div>
</template>

<script>
import {getChapterList} from '../../../api/chapter.js';
import {LOGIN,LOADING_START,LOADING_END} from '../../../store/mutation_types.js';
export default {
  created(){
    this.init();
  },
  data(){
    return {
      chapterList : []
    }
  },
  methods:{
    async init(){
      document.title = "";

      this.$store.commit(LOADING_START);
      let step1 = await getChapterList();
      this.$store.commit(LOADING_END);
      if(step1.data.state == 0){alert(step1.data.text);return};
      this.chapterList = step1.data.body;

      document.title=`趣乐码-课程介绍`
    }
  },
  components:{
   
  },
  mounted(){
    $(document).ready(()=>{
      $('.introduce').height($('.chaptersPage').height())
    })
  }
};
</script>

<style lang="less" scoped>
.chapters{
  min-height:400px;
  padding:0 20px;
  .item{
    min-height: 80px;
    font-weight: 700;
    border-radius: 20px;
    padding:10px 20px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    color:#fff;
    margin:20px auto;
    box-shadow: 0 5px 10px #9d9d9d;
    transform: scale(1);
    transition: .2s ease transform;
    cursor: pointer;
  }
  .item:active{
    transform: scale(.98);
  }
  .item:nth-child(1){
    background-color: rgb(27, 255, 103);
  }
  .item:nth-child(2){
    background-color: rgb(28, 202, 255);
  }
  .item:nth-child(3){
    background-color: rgb(0, 106, 177);
  }
  .item:nth-child(4){
    background-color: rgb(234, 255, 41);
  }
  .item:nth-child(5){
    background-color: rgb(255, 173, 41);
  }
  .item:nth-child(6){
    background-color: rgb(255, 55, 5);
  }
  .item:nth-child(7){
    background-color: rgb(184, 0, 0);
  }
}

</style>

