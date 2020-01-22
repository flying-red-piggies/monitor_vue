import http from '../base/http-request'

export default {
  getInstances () {
    return http.get('/ecs/info/listInstances', {
    })
  }
}
