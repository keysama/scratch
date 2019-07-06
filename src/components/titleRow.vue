<template>
  <div class="titleRow" :class="{'title-border':border=='true'}">
      <div class="left">
          <slot name="left"></slot>
      </div>
      <div class="right">
          <slot name="right"></slot>
      </div>
  </div>
</template>

<script>
export default {
    props:['border'],
    data(){
        return {
           
        }
    }
};
</script>
<style scoped lang="less">
.titleRow{
    background-color: #fff;
    margin:20px 20px 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding:10px 5px;
    border-radius: 20px;
    .left{
        font-size: 26px;
    }
}
.title-border{
    border-bottom: 1px solid #ececec;
}
</style>
