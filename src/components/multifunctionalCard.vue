<template>
  <div class="multifunctionalCard" :style="{width:width+'px'}">
      <div class="cover" @click="doView">
          <img :src="img" alt="" >
          <div class="menu" :class="{'active':active}" @mouseover="active=true" @mouseout="active=false">
              <div class="view" @click.stop="doView">play!</div>
              <div class="bottom">
                  <div class="good" :class="{'active':haveGood}" @click.stop="doGood" v-if="good!='hide'"><i class="iconfont icon-good"></i></div>
                  <div class="share" @click.stop="doShare" v-if="good!='hide'"><i class="iconfont icon-share"></i></div>
              </div>
          </div>
      </div>
      <div class="title">
          <span>{{title}}</span>
      </div>
      <div class="history" v-if="good!='hide'">
          <span class="item"><i class="iconfont icon-good"></i>{{good}}</span>
          <!-- <span class="item"><i class="iconfont icon-view"></i>{{views}}</span> -->
      </div>
      <div class="other">
          <div class="editor">
              <div class="userHead">
                  <img :src="userHead" alt="">
              </div>
              <div class="userName">
                  <span>{{userName}}</span>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    props:['sign','width','img','title','views','good','userHead','userName','haveGood'],
    data(){
        return {
            active : false
        }
    },
    methods:{
        doView(){
            console.log('do')
            this.$emit('view',this.sign)
        },
        doGood(){
            this.$emit('good',this.sign,this.haveGood)
        },
        doShare(){
            this.$emit('share',this.sign)
        }
    },
    mounted(){
        $(document).ready(()=>{
            $('.cover').height($('.cover').width()*0.75)
        })
    }
};
</script>
<style scoped lang="less">
.multifunctionalCard{
    box-shadow: 0 0 10px #ececec;
    border-radius: 5px;
    overflow: hidden;
    background-color: #fff;
    .cover{
        position: relative;
        width: 100%;
        height:148.5px;
        overflow: hidden;
        img{
            width:100%;
            transform-origin: center center;
            transition: .5s ease all;
        }
        .menu{
            position: absolute;
            top:0;
            left:0;
            height: 100%;
            width:100%;
            color:#fff;
            opacity: 0;
            cursor: pointer;
            transition: .3s all ease;
            .view{
                height: 50%;
                background-color:#6cf;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size:25px;
                transition:.3s ease all;
            }
            .view:hover{
                font-size:40px;
            }
            .bottom{
                height: 50%;
                display: flex;
                overflow: hidden;
                .good{
                    flex: 1;
                    color:#fff;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    i{
                        font-size:25px;
                        transition: .3s ease all;
                    }
                }
                .good:hover{
                    i{
                        font-size: 50px;
                    }
                }
                .active{
                    color:rgb(36, 204, 255);
                    background-color: unset;
                }
                .share{
                    flex: 1;
                    color:#fff;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    i{
                        font-size:25px;
                        transition: .3s ease all;
                    }
                }
                .share:hover{
                    i{
                        font-size: 50px;
                    }
                }
            }
        }
        .active{
            opacity: .8;
        }
    }
    .cover:hover{
        img{
            transform: scale(1.2)
        }
    }
    .title{
        color:#222;
        padding-top:5px;
        padding-left: 5px;
        height:32px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow:ellipsis;
        font-weight: 400;
        font-size: 16px;
        text-align: left;
    }
    .history{
        font-size: 12px;
        padding:0 5px;
        display: flex;
        justify-content: flex-start;
        color: #9ba3ab;
        margin-bottom: 10px;
        .item{
            margin-right:10px;
            .iconfont{
                font-size: 12px;
            }
            i{
                margin-right: 5px;
            }
        }
    }
    .other{
        padding:10px 5px;
        box-sizing: border-box;
        border-top:1px solid #ececec;
        .editor{
            width: 100%;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            .userHead{
                width:25px;
                height:25px;
                border-radius: 50%;
                overflow: hidden;
                margin-right: 10px;
                display: flex;
                justify-content: center;
                align-items: center;
                img{
                    height: 100%;
                }
            }

        }
    }
}
@media (max-width: 767px) {
    .cover{
        .menu{
            display:none;
        }
    }
}
//   <multifunctionalCard 
//    width="200" 
//    img="http://placehold.it/2000x1000" 
//    title="Color Hop" 
//    views="12" 
//    good="66" 
//    userHead="http://placehold.it/2000x1000" 
//    userName="kada12321321">
//    </multifunctionalCard>
</style>
