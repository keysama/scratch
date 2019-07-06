import axios from './index.js';

export const getSliders = ()=>{
	return axios.get('api/slider/list');
};

export const getConfig = ()=>{
	return axios.get('api/config/all');
};

export const getHotProductions = (num)=>{
	return axios.get('api/production/hot/'+num);
};

export const getNewProductions = (num)=>{
	return axios.get('api/production/new/'+num);
};

export const getFootContent = ()=>{
	return axios.get('api/config/foot');
};