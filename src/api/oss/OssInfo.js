import http from '../base/http-request'

export default {
  getBuckets (userId) {
    return http.pathGet('/oss/info/listBuckets', userId)
  }
}
