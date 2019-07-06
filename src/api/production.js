import axios from './index.js';

export const getProductions = (userId)=>{
	return axios.get('api/production/list/'+userId)
};

export const getUserLikeProductions = (userId)=>{
	return axios.get('api/production/like/'+userId)
};

export const info = (pro)=>{
	return axios.get('api/production/info/'+pro)
};

export const addStar = (pro)=>{
	return axios.put('api/production/star',{production:pro})
};

export const addGood = (pro)=>{
	return axios.put('api/production/good',{production:pro})
};

export const addShare = (pro)=>{
	return axios.put('api/production/share',{production:pro})
};

export const deleteStar = (pro)=>{
	return axios.delete('api/production/star/'+pro)
};

export const deleteGood = (pro)=>{
	return axios.delete('api/production/good/'+pro)
};

export const changeState = (id,state)=>{
	return axios.post('api/production/state',{id:id,state:state})
};

export const addView = (id)=>{
	return axios.put('api/production/view/'+id)
};

export const saveStick = (pro,data)=>{
	return axios.post('api/production/stick',{pro,data})
};

export const getStick = (pro)=>{
	return axios.get('api/production/stick/'+pro)
};

export const searchPro = (keyword)=>{
	return axios.get('api/production/search/'+keyword)
};

export const savePro = (form) => {
	return axios.post('api/scratch/saveForm',form,{
		headers:{'Content-Type':'multipart/form-data'}
	  })
}