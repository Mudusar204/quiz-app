import axios from 'axios';

const baseURL = axios.create({
  baseURL: 'https://quizapi.io/api',
});

export default baseURL;
