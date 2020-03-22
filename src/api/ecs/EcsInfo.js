import http from '../base/http-request'

export default {
  getInstances (userId) {
    return http.pathGet('/ecs/info/listInstances', userId)
  },
  getIds (userId) {
    return http.pathGet('/ecs/info/listInstanceIds', userId)
  },
  refreshInstances (userId) {
    return http.paramPost('/ecs/info/refreshInstances', {
      userId: userId
    })
  }
}
