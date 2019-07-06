<template>
    <div class="container-fluid text-center">
        登陆中
    </div>
</template>

<script>
import {LOGIN} from '../../store/mutation_types.js';
import {login} from '../../api/account';
import {getGood,getStar} from '../../api/account.js';
export default {
  created(){
    this.init();
  },
  methods: {
      async init(){
        let res = await login({
            phone : this.$route.params.u,
            password : this.$route.params.p,
        });
        console.log(res)
        if(res.data.state == 0){alert(res.data.text);return};

        let uid = res.data.body.id;

        let res2 = await getGood(uid);
        if(res2.data.state == 0){alert(res2.data.text);return};

        let good = res2.data.body;

        let res3 = await getStar(uid);
        if(res3.data.state == 0){alert(res3.data.text);return};

        let star = res3.data.body;

        let data2 = {
            userInfo : res.data.body,
            good : good,
            star : star
        }
        this.$store.commit(LOGIN,data2)
        this.$router.replace('/index');
      }
  },
  data(){
    return {

    }
  },
};
</script>

<style lang="less" scoped>

</style>

