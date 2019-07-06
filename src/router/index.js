import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes.js";
import store from "../store/index.js";
import {LOGIN,LOADING_START,LOADING_END,PUT_VIEW} from "../store/mutation_types.js";
import {status} from "../api/account";

Vue.use(VueRouter);
const router = new VueRouter({
  routes
});

router.beforeEach(async (to,from,next)=>{
    $('#respond').removeClass('respond-active');
    document.documentElement.scrollTop = document.body.scrollTop = 0;
    window.myClose && window.myClose();
    document.title="琪琪猫";
	if(store.state.userInfo==""){
    // alert('state为空')
		if(window.localStorage.userInfo && window.localStorage.userInfo != 'null'){
            // alert('localStorage不为空')
            store.commit(LOADING_START)
            let res = await status(JSON.parse(window.localStorage.userInfo).id);
            store.commit(LOADING_END)
            if(res.data.state != 0){
                // alert('state登陆了')
                console.log('登陆')
                let good = [];
                let star = [];
                if(window.localStorage.good){good = JSON.parse(window.localStorage.good)};
                if(window.localStorage.star){star = JSON.parse(window.localStorage.star)};
                let data = {
                    userInfo : JSON.parse(window.localStorage.userInfo),
                    good : good,
                    star : star
                }
                store.commit(LOGIN,data);
            }else{
                window.localStorage.removeItem("userInfo")
            }
		}
	}
	next();
})

router.beforeEach(async (to,from,next)=>{
	if(store.state.view.length<=0){
        if(window.localStorage.view){
            store.commit(PUT_VIEW,JSON.parse(window.localStorage.view));
        }
	}
	next();
})

router.beforeEach((to,from,next)=>{
    window.location.href = '/#'+to.fullPath;
    if(to.meta.checkLogin){
        if(store.state.userInfo){
            next()
        }else{
            if(window.localStorage.userInfo){
                store.commit(LOGIN,JSON.parse(window.localStorage.userInfo));
                next();
            }else{
                next("/login")
            }
        }
    }else{
        next()
	}
})

export default router;
