<template>
  <div class="re-nav">
        <div class="logo">
            <slot name="logo"></slot>
        </div>
        <transition name="fade">
                <div id="black" class="black hidden-md" @click="active=false" v-show="active"></div>
        </transition>
        <div id="respond" class="respond" :class="{'respond-active':active}">
            <div class="menuBtn hidden-md" @click="active=true">
                <span class="line"></span>
                <span class="line"></span>
                <span class="line"></span>
            </div>
            <div class="navs">
                <slot name="navs"></slot>
            </div>
            <div class="user">
                <slot name="user"></slot>
            </div>
        </div>
        <div class="clear"></div>
  </div>
</template>

<script>
export default {
    data(){
        return {
            active : false
        }
    },
    mounted(){
        window.myClose = ()=> {
            this.active = false;
        }
    }
};
</script>
<style scoped lang="less">
.re-nav{
    background-color: rgba(125,172,66,0.8);
    box-shadow: 0 5px 10px #ececec;
    padding:5px 20px;
    background-image: url(data:image/png;base64,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);
    .logo{
        min-width: 50px;
        height: 45px;
        float: left;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        img{
            max-width: 100%;
            height:35px;
        }
    }
    .respond{
        float: right;
        z-index: 999;
        .navs{
            width: 80%;
            height: 45px;
            float: left;
            display: flex;
            align-items: center;
            .slot_navs{
                padding-left:80px;
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: flex-start;
            }
        }
        .user{
            width:20%;  
            height: 45px;
            display: flex;
            align-items: center;
            justify-content: space-around;
            float: right;
        }
    }
    .clear{
        clear: both;
    }
    .black{
        background-color: rgba(8, 0, 2,0.5);
        height: 100%;
        width: 100%;
        position: fixed;
        top:0;
        left:0;
        transition: opacity .3s;
        z-index:999;
   
    }
    .respond-active{
        box-shadow: 4px 0 20px #000;
        right:0;
    }
    .menuBtn{
        width: 40px;
        height: 35px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        padding:4px 6px;
        border-radius: 5px;
        box-shadow: 0 0 5px solid #ececec;
        background-color: #d1df4c;
        position: absolute;
        border:1px solid #d1df4c;
        top:10px;
        left:-50px;
        .line{
            display: block;
            border-bottom: 3px solid #fefefe;
            width: 100%;
            height: 1px;
        }
    }
}
// 淡入淡出动画
.fade-enter-active, .fade-leave-active {
  transition: opacity ease-out .3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

/* 手机 */
@media (max-width: 767px) { 
    .hidden-sm{
        display: none !important;
    }
    .logo{
        width:60%;
    }
    .respond{
        width:60%;
        height: 100% !important;
        position: fixed;
        padding:10px 20px;
        top:0;
        right:-60%;
        background-color: #fff;
        transition: 0.3s ease-out all;
        border-top-left-radius: 15px;
        border-bottom-left-radius: 15px;
        .user{
            position: absolute;
            top:0;
            left:0;
            width:100% !important;
            height:15% !important;
            border-bottom: 1px solid #ccc;
        }
        .navs{
            position: absolute;
            top:15%;
            left:0;
            width:100% !important;
            height:70% !important;
            display: block !important;
            .slot_navs{
                padding-top:20px;
                padding-left: 0 !important;
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                height: 80%;
                li,a{
                    width:80%;
                    text-align: center;
                    margin-right:0;
                    margin-top:20px;
                }
            }   
        }
    }
 }
 /* 电脑 */
@media (min-width: 768px)
{ 
    .re-nav{
        box-shadow: 0 0 15px #333;
        .hidden-md{
            display: none !important;
        }
        .logo{
            width:15%;
        }
        .respond{
            width:85%;
            .navs{
                .slot_navs{
                    li,a{
                        box-shadow: none;
                    }
                }
            }
        }
    }
}
</style>
