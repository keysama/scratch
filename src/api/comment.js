import axios from './index.js';

export const putComment = (production,content)=>{
	return axios.put('api/comment/new',{production,content})
};

export const getCommentNum = (pro)=>{
	return axios.get('api/comment/num/'+pro)
};

export const getComments = (pro,page,num)=>{
	return axios.get('api/comment/list/'+pro+'/'+page+'/'+num)
};

export const putNewsComment = (production,content)=>{
	return axios.put('api/comment/news',{production,content})
};

export const getNewsCommentNum = (news)=>{
	return axios.get('api/comment/newsNum/'+news)
};

export const getNewsComments = (news,page,num)=>{
	return axios.get('api/comment/newslist/'+news+'/'+page+'/'+num)
};
