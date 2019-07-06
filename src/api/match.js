import axios from './index.js';

export const getMatchList = () => {
	return axios.get('api/match/list')
};

export const getMatch = (id) => {
	return axios.get('api/match/detail/'+id)
};

export const getMatchProductions = (id,page,num) => {
	return axios.get(`api/match/productions/${id}/${page}/${num}`)
};

export const join = (match,user,pro) => {
	return axios.put(`api/match/join`,{match,user,pro})
};