import axios from 'axios';

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_PROXY_CORS}https://www.food2fork.com/api`,
});

export default instance;
