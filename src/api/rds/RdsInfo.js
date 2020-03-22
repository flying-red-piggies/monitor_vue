import http from '../base/http-request'

export default {
  getInstances (userId) {
    return http.pathGet('/rds/info/listInstances', userId)
  },
  getIds (userId) {
    return http.pathGet('/rds/info/listInstanceIds', userId)
  },
  refreshInstances (userId) {
    return http.paramPost('/rds/info/refreshInstances', {
      userId: userId
    })
  }
}
