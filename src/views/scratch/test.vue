<template>
<div class="tt">
  <div class="list"> 
    <ul>
      <li  v-for="(item,key) in list" :key="key">{{item.title}}</li>
    </ul>
  </div>
  <div class="dd">
    <div class="info">123</div>
    <div class="title">番剧</div>
    <div class="box">
      <div class="item">
        <span>连载动画</span>
      </div>
      <div class="item">
        <span>完结动画</span>
      </div>
    </div>
  </div>
</div>

</template>

<script>
export default {
  data(){
    return{
      list : [
        {
          title : '直播'
        },
        {
          title : '番剧'
        },
        {
          title : '音乐'
        }

      ]
    }
  }
};
</script>

<style lang="less" scoped>
.tt{
  background-color: #ececec;
}
.list{
  background-color: #f6f9fa;
  width:50px;
  font-size: 12px;
  ul{
    width:100%;
    padding:0;
    list-style: none;
    li{
      width:100%;
      display: block;
      text-align: center;
      padding:5px 0;
      user-select: none;
      cursor: pointer;
      transition: 0.3s ease all;
    }
    li:hover{
      color: #fff;
      background-color: #00a1d6;
    }
  }
}
.dd{
  background-color: #fff;
  
}
</style>

