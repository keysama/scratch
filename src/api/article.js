import axios from './index.js';

export const getarticleList = (chapter) => {
	return axios.get('api/article/list/'+chapter)
};
