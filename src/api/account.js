import axios from './index.js';

export const chackUsernameRepeat = (name)=>{
	return axios.get('api/account/exist/'+name)
};

export const registe = (data)=>{
	return axios.put('api/account/user',data)
};

export const phoneVerify = (phone)=>{
	return axios.put('api/verify/phone',{phone})
};

export const checkVerify = (data)=>{
	return axios.post('api/verify/check',data)
};

export const checkLogin = ()=>{
	return axios.get('api/verify/checkLogin')
};

export const login = (data)=>{
	return axios.post('api/account/login',data)
};

export const logout = ()=>{
	return axios.post('api/account/logout')
};

export const status = (id)=>{
	return axios.get('api/account/status/'+id)
};

export const editInfo = (data)=>{
	return axios.post('api/account/editInfo',data)
};

export const editPass = (data)=>{
	return axios.post('api/account/editPass',data)
};

export const getAmount = (id)=>{
	return axios.post('api/account/getAmount',{id:id})
};

export const getGood = (user)=>{
	return axios.get('api/account/good/'+user)
};
export const getStar = (user)=>{
	return axios.get('api/account/star/'+user)
};

export const editUserhead = (form) => {
	return axios.post('api/account/userhead',form,{
		headers:{'Content-Type':'multipart/form-data'}
	  })
}

export const editUserName = (username)=>{
	return axios.post('api/account/username',{username})
};

export const checkPhoneVerify = (verify)=>{
	return axios.get('api/verify/verifyCheck/'+verify)
};

export const editPhone = (verify,phone)=>{
	return axios.post('api/account/phone',{verify,phone})
};

export const getMessage = (type,page,num)=>{
	return axios.get('api/account/message/'+type+'/'+page+'/'+num)
};

export const checkPhoneRepeat = (phone) => {
	return axios.get('api/verify/repeat/'+phone)
}

export const wechatLogin = () => {
	window.location = '/api/wechat/wechat_login'
}

export const editPassword = (phone,password,verify) => {
	return axios.post('api/account/forget/',{phone,password,verify})
}