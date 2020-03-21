import http from '../base/http-request'

export default {
  getRuleList (userId) {
    return http.pathGet('/alarm/rule/rules', userId)
  },
  getEcsRuleList (userId) {
    return http.queryGet('/alarm/rule/rules', {
      userId: userId,
      namespace: 'ECS'
    })
  },
  getRdsRuleList (userId) {
    return http.queryGet('/alarm/rule/rules', {
      userId: userId,
      namespace: 'RDS'
    })
  },
  getOssRuleList (userId) {
    return http.queryGet('/alarm/rule/rules', {
      userId: userId,
      namespace: 'OSS'
    })
  }
}
