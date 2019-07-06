<template>
  <div class="responsiveLeftNav">
      <slot></slot>
  </div>
</template>

<script>
export default {
    data(){
        return {
            active : false
        }
    }
};
</script>
<style scoped lang="less">
.re-nav{
 
}
// 淡入淡出动画
.fade-enter-active, .fade-leave-active {
  transition: opacity ease .3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

/* 手机 */
@media (max-width: 767px) { 
    .responsiveLeftNav{
        position: absolute;
        top:0;
        height: 60px;
        left:0;
        width: 100% !important;
        display: flex;
        justify-content: space-around;
        align-items: center;
        padding:0;
        li{
            color:#fff;
            display: flex;
            justify-content: center;
            align-items: center;
            margin:0 5px;
        }
        .active{
            background-color: #e36926;
        }
    }
}
 /* 电脑 */
@media (min-width: 768px)
{ 
    .responsiveLeftNav{
        min-height: 500px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        padding-top:50px;
        
        li{
            margin:10px auto;
            
        }
        .active{
            background-color: #e36926;
        }
    }
}
</style>
