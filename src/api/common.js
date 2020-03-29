import http from './base/http-request'

export default {
  getRegions () {
    return http.queryGet('/common/regions')
  },
  refreshRegions (userId) {
    return http.paramPost('/common/refreshRegions', {
      userId: userId
    })
  },
  getResources (userId) {
    return http.paramPost('common/resources', {
      userId: userId
    })
  },
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
