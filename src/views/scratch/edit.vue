<template>
  <div class="container-fluid">
     <div style="width:100%;height:calc(100% + 20px);padding-bottom:40px;position:fixed;top:55px;left:0;z-index:99;">
        <iframe :src="baseUrl+'scratch3.0'" frameborder="0" style="width:100%;height:100%" name="scratch_edit"></iframe>
      </div>

      
  </div>
</template>

<script>

import {LOADING_START,LOADING_END,EDIT_PRO} from '../../store/mutation_types.js';
import {baseUrl,userheadUrl} from '../../config/env.js';
import {info} from '../../api/production.js';
export default {
  created(){
    // this.$store.commit(LOADING_START);
    this.baseUrl = baseUrl;
  },
  data(){
    return {
      baseUrl : '',
      projectInfo : ''
    }
  },
  computed:{

  },
  methods:{
    async init(){
      let res = await info(this.$route.params.id);
      if(res.data.state == 0){alert(res.data.text);return};
      this.projectInfo = res.data.body[0];

      if(this.projectInfo.creater != this.$store.state.userInfo.id){
        alert('无权限');
        window.close();
        return;
      }

      window.frames[0].autoLoad(this.baseUrl+'upload/files/'+this.projectInfo.file)

      this.$store.commit(EDIT_PRO,this.projectInfo)
      this.$store.commit(LOADING_END);
      console.log(123)
    }
  },
  components:{
    
  },
  mounted(){
    window.gameStandby = () => {
      this.init();

      // window.frames['scratch_edit'].iiinit({
      //     title:"",
      //     desc:"",
      //     id:'',
      //     picname:''
      // });

      window.openWithComputer = () => {
        window.frames['scratch_edit'].diannaoshangchuan();
      },
      window.saveForComputer = () => {
        window.frames['scratch_edit'].baocundiannao();
      },
      window.saveForMyPro = () => {
        window.frames['scratch_edit'].baocunzuoping();
      },
      window.jiasu = () => {
        window.frames['scratch_edit'].jiasu();
      }
    }
  }
};
</script>

<style lang="less" scoped>

</style>

