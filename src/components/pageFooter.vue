<template>
  <div class="pageFooter container-fluid">
      <div class="row">
        <div class="col-md-6">
          <div class="d-flex justify-content-center align-items-center w-100 h-100" v-html="left">

          </div>
        </div>
        <div class="col-md-6">
          <div class="d-flex justify-content-center align-items-center w-100 h-100" v-html="right">
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import {getFootContent} from '../api/home';
export default {
  created(){
    this.init();
  },
  data(){
    return {
      left : 'loading...',
      right : 'loading...'
    }
  },
  methods:{
    async init(){
      let res1 = await getFootContent();
      this.left = res1.data.body.filter(item=>item.name=='left')[0].content;
      this.right = res1.data.body.filter(item=>item.name=='right')[0].content;
    }
  }
};
</script>
<style scoped lang="less">
.pageFooter{
  border-top:1px solid #ececec;
  margin-top:50px;
  .row{
    min-height: 200px;
  }
}
</style>
