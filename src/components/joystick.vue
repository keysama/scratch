<template>
    <div class="joystick">
      <div class="j-box">
        <div class="j-left">
          <button class="j-button" v-for="(item,key) in left" :key="key" @click="edit?listen('left',key):''" @touchstart.prevent="!edit?hit('down',{'keycode':item.value,'key':item.name},$event):''" @touchend.prevent="!edit?hit('up',{'keycode':item.value,'key':item.name}):''" :class="{'op0':item.value == '' && !edit}" >{{item.name | btnname}}</button>
        </div>
        <div class="j-right">
          <button class="j-button" v-for="(item,key) in right" :key="key" @click="edit?listen('right',key):''" @touchstart.prevent="!edit?hit('down',{'keycode':item.value,'key':item.name},$event):''" @touchend.prevent="!edit?hit('up',{'keycode':item.value,'key':item.name}):''" v-if="item.value != '' || edit">{{item.name | btnname}}</button>
        </div>
      </div>
      <div class="black" v-show="black">
        请按下想要设置的按键
      </div>
    </div>
</template>

<script>
export default {
    props:['left','right','edit'],
    mounted(){
      this.$emit('resize',this.resize);
    },
    data(){
      return{
        black : false
      }
    },
    methods:{
      hit(type,value,e){
        this.$emit('hit',{'type':type,'value':value})
      },
      listen(erea,id){
        this.black = true;
        document.onkeydown = (event) =>{
            event.preventDefault();
    　　　　 this.black = false;
            console.log({area:erea,value:event.keyCode,name:event.key})
            if(event.keyCode == 27){
              this.$emit('clean',id,{area:erea,value:event.keyCode,name:event.key});
              return;
            }
            this.$emit('set',id,{area:erea,value:event.keyCode,name:event.key})
            document.onkeydown = null;
    　　}
      },
      resize(){
        document.querySelectorAll('.j-left')[0].style.height = document.querySelectorAll('.j-left')[0].clientWidth + 'px';
        let r_buttons = document.querySelectorAll('.j-right .j-button');
        r_buttons.forEach(item => {
          item.style.height = item.clientWidth + 'px';
        });
      }
    },
    filters:{
      btnname(name){
        switch(name){
          case 'ArrowUp' : return '↑';break;
          case 'ArrowDown' : return '↓';break;
          case 'ArrowLeft' : return '←';break;
          case 'ArrowRight' : return '→';break;
          case ' ' : return '空格';break;
          default : return name;
        }
      }
    }
}
</script>

<style scoped lang="less">
.op0{
  opacity: 0;
}
.joystick{
  width:100%;
  padding:5px;
  background-color: #ececec;
  border-radius: 10px;
  position: relative;
  .j-box{
    display: flex;
    justify-content: between;
    align-items: center;
    .j-button{
      width:40%;
      height:40%;
      background-color: #999;
      box-shadow: 0 0 10px #9d9d9d;
      border-radius: 50%;
      display: flex;
      border:none;
      justify-content: center;
      align-items: center;
      user-select: none;
      cursor: pointer;
    }
    .j-button:focus{
      outline : none;
    }
    // .j-button:active{
    //   transform: scale(.95)
    // }
    .j-left{
      width:100%;
      position: relative;
      .j-button{
        position: absolute;
        left: 0;
        top:0;
      }
      .j-button:nth-child(1){
        left:30%;
      }
      .j-button:nth-child(2){
        left:0;
        top:30%;
      }
      .j-button:nth-child(3){
        left:60%;
        top:30%;
      }
      .j-button:nth-child(4){
        left:30%;
        top:60%;
      }
    }
    .j-right{
      width:100%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      flex-wrap: wrap-reverse;
      position: relative;
      .j-button{
        width:40%;
        margin:2px auto;
      }
    }
  }
  .black{
    position: absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background-color: #000;
    opacity: .8;
    display: flex;
    justify-content: center;
    align-items: center;
    color:#fff;
  }
}
</style>
