<template>
  <div class="container-fluid" style="width:100%">
      <div style="width:100%;height:calc(100% + 20px);padding-bottom:40px;position:fixed;top:55px;left:0;z-index:99;">
        <iframe :src="baseUrl+'scratch3.0'" frameborder="0" style="width:100%;height:calc(100% + 15px)" name="scratch_create"></iframe>
      </div>

      
  </div>
</template>

<script>

import {LOADING_START,LOADING_END,CLEAR_PRO} from '../../store/mutation_types.js';
import {baseUrl,userheadUrl} from '../../config/env.js';
export default {
  created(){
    this.baseUrl = baseUrl;
  },
  data(){
    return {
      baseUrl : '',
    }
  },
  computed:{

  },
  methods:{
    async init(){
      this.$store.commit(CLEAR_PRO);
    }
  },
  components:{
    
  },
  mounted(){
    window.gameStandby = () => {
      this.$store.commit(LOADING_END);

      // window.frames['scratch_create'].iiinit({
      //     title:"",
      //     desc:"",
      //     id:'',
      //     picname:''
      // });
      console.log('ok')
      window.openWithComputer = () => {
        window.frames['scratch_create'].diannaoshangchuan();
      },
      window.saveForComputer = () => {
        window.frames['scratch_create'].baocundiannao();
      },
      window.saveForMyPro = () => {
        window.frames['scratch_create'].baocunzuoping();
      },
      window.jiasu = () => {
        window.frames['scratch_create'].jiasu();
      }
    }
  }
};
</script>

<style lang="less" scoped>

</style>

