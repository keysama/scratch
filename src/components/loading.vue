<template>
    <div class="loading" id="loading">
        <!-- <div class="spinner">
            <div class="bounce1"></div>
            <div class="bounce2"></div>
            <div class="bounce3"></div>
        </div> -->
        <!-- 正在加载... -->
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped lang="less">
.loading{
    position:fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    top:0;
    left:0;
    z-index: 9999;
    width: 100%;
    height:100%;
}
.spinner {
  width: 150px;
  text-align: center;
  width: 150px;
  height:150px;
  padding-top:60px;
  border-radius: 10px;
}
 
.spinner > div {
  width: 30px;
  height: 30px;
  background-color: #6cf;
 
  border-radius: 100%;
  display: inline-block;
  -webkit-animation: bouncedelay 1.4s infinite ease-in-out;
  animation: bouncedelay 1.4s infinite ease-in-out;
  /* Prevent first frame from flickering when animation starts */
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}
 
.spinner .bounce1 {
  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
}
 
.spinner .bounce2 {
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
}
 
@-webkit-keyframes bouncedelay {
  0%, 80%, 100% { -webkit-transform: scale(0.0) }
  40% { -webkit-transform: scale(1.0) }
}
 
@keyframes bouncedelay {
  0%, 80%, 100% {
    transform: scale(0.0);
    -webkit-transform: scale(0.0);
  } 40% {
    transform: scale(1.0);
    -webkit-transform: scale(1.0);
  }
}
</style>
