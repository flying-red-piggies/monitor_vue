import http from './base/http-request'

export default {
  getMetricNames (namespace) {
    return http.pathGet('/common/listMetricNames', namespace)
  },
  getStatistics (metricName) {
    return http.pathGet('/common/listStatistics', metricName)
  },
  getOperators () {
    return http.queryGet('/common/listOperators')
  }
}
