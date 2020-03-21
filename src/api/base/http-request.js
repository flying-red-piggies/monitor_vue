import axios from 'axios'
axios.defaults.baseURL = '/api'
axios.defaults.withCredentials = true

export default {
  queryGet (url, params) {
    let configObj = {}
    Object.assign(configObj, {
      withCredentials: true
    })
    if (params !== undefined) {
      configObj['params'] = params
    }
    return axios.get(url, configObj)
  },
  pathGet (url, pathVariable) {
    return axios.get(`${url}/${pathVariable}`, {
      withCredentials: true
    })
  },
  bodyPost (url, data) {
    return axios.post(url, data, {
      withCredentials: true
    })
  }
}
