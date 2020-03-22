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
  },
  refreshRules (userId, namespace) {
    return http.paramPost('/alarm/rule/refresh', {
      userId: userId,
      namespace: namespace
    })
  },
  addRule (form) {
    return http.bodyPost('/alarm/rule/addRule', form)
    // return http.bodyPost('/alarm/rule/addRule', {
    //   userId: userId,
    //   ruleId: ruleId,
    //   ruleName: ruleName,
    //   resources: resources,
    //   metricName: metricName,
    //   namespace: namespace,
    //   period: period,
    //   times: times,
    //   statistics: statistics,
    //   comparisonOperator: comparisonOperator,
    //   threshold: threshold,
    //   warn: warn
    //   contactGroups: contactGroups,
    //   webhook: webhook
    // })
  }
}
