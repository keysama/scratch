import axios from './index.js';

export const getChapterList = ()=>{
	return axios.get('api/chapter/list')
};
export const getArticle = (id)=>{
	return axios.get('api/chapter/article/'+id)
};