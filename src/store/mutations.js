import {
    LOGIN,
    LOGOUT,
    LOADING_START,
    LOADING_END,
    PUT_GOOD,
    DELETE_GOOD,
    PUT_STAR,
    DELETE_STAR,
    PUT_VIEW,
    INIT_PRO,
    CLEAR_PRO,
    EDIT_PRO
} from "./mutation_types.js"

import {setStore, getStore} from "../config/tools.js"//对Local Storeage的操作
export default {
	[LOGIN](state,data){
        //存到state
        state.userInfo=data.userInfo;
        state.good=data.good;
        state.star=data.star;
        //存到缓存
        setStore("userInfo",data.userInfo);
        setStore("good",data.good);
        setStore("star",data.star);
    },
    [LOGOUT](state){
        state.userInfo="";
        window.localStorage.removeItem("userInfo")
    },
    [LOADING_START](state){
        state.loading=true;
    },
    [LOADING_END](state){
        state.loading=false;
    },
    [PUT_GOOD](state,pro){
        state.good.push(pro);
        setStore("good",state.good);
    },
    [DELETE_GOOD](state,pro){
        state.good.splice(state.good.indexOf(pro), 1);
        setStore("good",state.good);
    },
    [PUT_STAR](state,pro){
        state.star.push(pro);
        setStore("star",state.star);
    },
    [DELETE_STAR](state,pro){
        state.star.splice(state.star.indexOf(pro), 1);
        setStore("star",state.star);
    },
    [PUT_VIEW](state,pro){
        if(pro instanceof Array){
            state.view = pro;
        }else{
            state.view.push(pro);
        }
        setStore("view",state.view);
    },
    [INIT_PRO](state,pro){
        Object.keys(state.newPro).forEach(item=>{
            state.newPro[item] = pro[item]
        });
    },
    [EDIT_PRO](state,obj){
        Object.keys(obj).forEach(item=>{
            state.newPro[item] = obj[item]
        })
    },
    [CLEAR_PRO](state){
        state.newPro = {
            title : '',
            described : '',
            id : '',
            pic : '',
            cover : 'default_cover.jpg',
            file : ''
        }
    }
}