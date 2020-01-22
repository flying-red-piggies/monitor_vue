import http from '../base/http-request'

export default {
  getBuckets () {
    return http.get('/oss/info/listBuckets', {
    })
  }
}
