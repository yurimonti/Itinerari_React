import axios from "axios";

const baseURL = 'http://localhost:8181';

axios.defaults.baseURL = baseURL;
axios.defaults.responseType = 'json';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

const publicInstance = axios.create();

export {publicInstance}