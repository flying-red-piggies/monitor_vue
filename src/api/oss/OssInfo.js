import http from '../base/http-request'

export default {
  getBuckets (userId) {
    return http.pathGet('/oss/info/listBuckets', userId)
  },
  getNames (userId) {
    return http.pathGet('/oss/info/listBucketNames', userId)
  },
  refreshBuckets (userId) {
    return http.paramPost('/oss/info/refreshBuckets', {
      userId: userId
    })
  }
}
