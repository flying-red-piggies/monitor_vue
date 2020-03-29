import axios from 'axios'
import qs from 'qs'
axios.defaults.baseURL = '/api'
// axios.defaults.withCredentials = true
axios.interceptors.request.use(
  config => {
    let token = sessionStorage.getItem('token')
    console.log('http request' + token)
    if (token) {
      config.headers.common['Authorization'] = token
    }
    return config
  }, err => {
    return Promise.reject(err)
  }
)

export default {
  queryGet (url, params) {
    let configObj = {}
    // Object.assign(configObj, {
    //   withCredentials: true
    // })
    if (params !== undefined) {
      params.preventCache = new Date()
      configObj['params'] = params
    }
    return axios.get(url, configObj)
  },
  pathGet (url, pathVariable) {
    return axios.get(`${url}/${pathVariable}`, {
      params: {
        preventCache: new Date()
      }
      // withCredentials: true
    })
  },
  bodyPost (url, data) {
    return axios.post(url, data, {
      // withCredentials: true
    })
  },
  paramPost (url, data) {
    return axios.post(url, qs.stringify(data), {
      // withCredentials: true
    })
  }
}
