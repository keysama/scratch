let baseUrl = ''; //api请求发送的域名
let AxiosWithCredentials = false;

if (process.env.NODE_ENV == 'development') {
    document.domain = 'localhost';
    baseUrl = 'http://localhost:8089/';
    AxiosWithCredentials = true;
}else if(process.env.NODE_ENV == 'production'){
    // baseUrl = 'http://111.230.249.243/';
    baseUrl = 'http://111.230.249.243/';
    AxiosWithCredentials = true;
    // document.domain = 'localhost';
    // baseUrl = 'http://localhost:8089/';
    // AxiosWithCredentials = true;
}
let userheadUrl = baseUrl + 'upload/head/';
let sliderUrl = baseUrl + 'upload/slider/';
let coverUrl = baseUrl + 'upload/cover/';
let newsUrl = baseUrl + 'upload/news_cover/'
let matchCoverUrl = baseUrl + 'upload/match_cover/'

window.saveOk = () => {
    window.location = '/#/mypage/production';
  }
  
export {
    baseUrl,
    AxiosWithCredentials,
    userheadUrl,
    sliderUrl,
    coverUrl,
    newsUrl,
    matchCoverUrl
    
}