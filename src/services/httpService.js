import axios from 'axios';
import Cookies from 'js-cookie';

const instance = axios.create({
  // baseURL: `${process.env.REACT_APP_API_BASE_URL}`,
  // baseURL: 'https://kachabazar-combine-backend.vercel.app/api/',
   baseURL: 'http://localhost:4000/',
  timeout: 50000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
instance.interceptors.request.use(function (config) {
  // Do something before request is sent
  let adminInfo;
  if (Cookies.get('zenithQuark')) {
    adminInfo = JSON.parse(Cookies.get('adminInfo'));
  }

  let company;

  if (Cookies.get('company')) {
    company = Cookies.get('company');
  }

  // console.log('Admin Http Services Cookie Read : ' + company);
  // let companyName = JSON.stringify(company);

  return {
    ...config,
    headers: {
      authorization: adminInfo ? `Bearer ${adminInfo.token}` : null,
      company: company ? company : null,
    },
  };
});

const responseBody = (response) => response.data;

const requests = {
  get: (url, body, headers) =>
    instance.get(url, body, headers).then(responseBody),

  post: (url, body) => instance.post(url, body).then(responseBody),

  put: (url, body, headers) =>
    instance.put(url, body, headers).then(responseBody),

  patch: (url, body) => instance.patch(url, body).then(responseBody),

  delete: (url, body) => instance.delete(url, body).then(responseBody),
};

export default requests;
