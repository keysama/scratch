import Vue from "vue"
import Vuex from "vuex"
import mutations from "./mutations"
import actions from "./actions"
import getters from "./getters"

Vue.use(Vuex)

const state = {
    userInfo : "",//用户登录信息
	loading : false,//loading动画
	good : [],
	star : [],
	view : [],
	newPro : {
		title : '',
		described : '',
		id : '',
		cover : 'default_cover.jpg',
		file : ''
	}
}

export default new Vuex.Store({
	state,
	getters,
	actions,
	mutations
})