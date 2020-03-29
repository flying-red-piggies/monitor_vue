import http from './base/http-request'

export default {
  register (form) {
    return http.bodyPost('user/register', form)
  },
  login (form) {
    return http.bodyPost('/user/login', form)
  },
  info () {
    return http.queryGet('/user/info')
  },
  addProfile (form) {
    return http.bodyPost('user/addProfile', form)
  }
}
