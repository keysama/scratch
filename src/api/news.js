import axios from './index.js';

export const getNewsList = () => {
	return axios.get('api/news/list')
};

export const getNews = (id) => {
	return axios.get('api/news/detail/'+id)
};
