import http from '../base/http-request'

export default {
  getInstances (userId) {
    return http.pathGet('/rds/info/listInstances', userId)
  }
}
