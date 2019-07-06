<template>
  <div class="vueComment">
     <div class="comment-sub">
         <slot name=userhead></slot>
         <div class="inputBox">
             <div class="textarea" contenteditable="true" placeholder="请输入评论..." @input="inputComment=$event.target.innerHTML"></div>
         </div>
     </div>
     <div class="comment-sub-btn">
         <div class="tips">
            <div class="info"></div>
         </div>
         <div class="btns">
            <div class="cancel" @click="cancel">取消</div>
            <div class="submit" :class="{'active':inputComment.length>0}" @click="submit">发送</div>
         </div>
     </div>
     <div class="top_info">{{total}} 条评论</div>
        <div class="replayList">
            <mescroll-vue :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
                <div class="scroll-page">
                    <div class="item" v-for="(item,key) in list" :key="key">
                        <div class="headBox">
                            <img :src="headurl+item.userhead" alt="">
                        </div>
                        <div class="right">
                            <div class="editor">
                                <span class="username">{{item.nickname}}</span>
                                <span class="createTime">{{item.dateTime | timeFilter}}</span>
                            </div>
                            <div class="content" v-html="item.content">
                            </div>
                        </div>
                    </div>
                </div>
            </mescroll-vue>
        </div>
  </div>
</template>

<script>
import MescrollVue from 'mescroll.js/mescroll.vue';
export default {
    created(){
        window.num = 10;
    },
    props:['total','size','list','headurl'],
    data(){
        return {
            inputComment : '',
            mescroll : '',
            mescrollDown: { use : false},
        }
    },
    methods:{
        mescrollInit (mescroll) {
        this.mescroll = mescroll;
        },
        upCallback (page, mescroll) {
            this.$emit('next',page,mescroll)
        },
        cancel(){
            this.inputComment = '';
            document.querySelector('.textarea').innerHTML = '';
        },
        submit(){
            if(this.inputComment.length>0){
                this.$emit('submit',this.inputComment,this.refash,this.mescroll)
            }
        },
        refash(){
            this.cancel();
        }
    },
    computed:{
        mescrollUp(){
            return {
                callback: this.upCallback,
                    page: {
                    num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
                    size: this.size // 每页数据的数量
                },
                noMoreSize: 2, // 如果列表已无数据,可设置列表的总数量要大于等于5条才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看
                toTop: { // 配置回到顶部按钮
                    src: 'mescroll-totop.png'
                },
                lazyLoad: {
                    use: true // 是否开启懒加载,默认false
                },
                loadFull: {
                    use: true, //列表数据过少,不足以滑动触发上拉加载,是否自动加载下一页,直到满屏或者无更多数据为止;默认false,因为可通过调高page.size避免这个情况
                    delay: 500 //延时执行的毫秒数; 延时是为了保证列表数据或占位的图片都已初始化完成,且下拉刷新上拉加载中区域动画已执行完毕;
                },
            }
        }
    },
    components:{
        MescrollVue
    },
    filters : {
        timeFilter(value){
            var now = new Date(parseInt(value)),
                y = now.getFullYear(),
                m = now.getMonth() + 1,
                d = now.getDate();
            return y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d);
        }
    }
};
</script>
<style scoped lang="less">
.vueComment{
    width:100%;
    overflow: hidden;
    margin-top:60px;
    .top_info{
        color:#9d9d9d;
        font-size: 14px;
        margin-top:5px;
        margin-bottom: 5px;
    }
    .comment-sub{
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        width:100%;
        .headBox{
            width: 40px;
            height:40px;
            border-radius: 50%;
            overflow: hidden;
            margin-right: 15px;
            img{
                width: 100%;
            }
        }
        .inputBox{
            width:calc(100% - 55px);
            .textarea{
                width:100%;
                background-color: none;
                border: none;
                border-bottom: 1px solid #ececec;
                resize:none;
                outline:none;
                height: auto;
                cursor: text;
                font-size: 14px;
                padding:5px 0;
                transition: .3s ease border;
            }
            .textarea:empty:before{
                content: attr(placeholder);
                color:#bbb;
            }
            .textarea:focus:before{
                content:none;
            }
            .textarea:focus{
                border-bottom: 1px solid #5d5d5d;
            }
        }
    }
    .comment-sub-btn{
        padding-left:55px;
        display: flex;
        margin-bottom:10px;
        justify-content: space-between;
        align-items: center;
        .tips{
            font-size: 12px;
            color:rgba(17, 17, 17, 0.6);
        }
        .btns{
            display: flex;
            justify-content: center;
            align-items: center;
            .cancel{
                color:rgba(17, 17, 17, 0.8);
                background-color: #fff;
                padding:8px 16px;
                font-size: 14px;
                border-radius: 5px;
                cursor: pointer;
            }
            .submit{
                color:#fff;
                background-color: rgb(167, 223, 255);
                padding:8px 16px;
                font-size: 14px;
                margin-left:8px;
                border-radius: 5px;
                cursor: pointer;
            }
            .active{
                background-color: rgb(0, 155, 233);
            }
        }

    }
    .replayList{
        margin:10px 0;
        height: 430px;
        .scroll-page{
           height:100%;
            .item{
                display: flex;
                justify-content: flex-start;
                align-items: flex-start;
                margin:30px 0;
                .headBox{
                    width: 40px;
                    height:40px;
                    border-radius: 50%;
                    overflow: hidden;
                    margin-right: 15px;
                    img{
                        width: 100%;
                    }
                }
                .right{
                    font-size: 14px;
                    width:100%;
                    .editor{
                        .username{
                            margin-right: 10px;
                        }
                    }
                }
            }
        }
    }
}
</style>
