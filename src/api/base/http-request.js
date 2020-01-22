import axios from 'axios'
axios.defaults.baseURL = '/api'
axios.defaults.withCredentials = true

export default {
  get (url, params) {
    let configObj = {}
    Object.assign(configObj, {
      withCredentials: true
    })
    if (params !== undefined) {
      configObj['params'] = params
    }
    return axios.get(url, configObj)
  },
  post (url, data) {
    return axios.post(url, data, {
      withCredentials: true
    })
  }
}
