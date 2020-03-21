import http from '../base/http-request'

export default {
  getCpuUsage (userId, instanceId, startTime, endTime, interval) {
    return http.bodyPost('/rds/metric/cpuUsage', {
      userId: userId,
      startTime: startTime,
      endTime: endTime,
      interval: interval,
      instanceId: instanceId
    })
  },
  getMemoryUsage (userId, instanceId, startTime, endTime, interval) {
    return http.bodyPost('/rds/metric/memoryUsage', {
      userId: userId,
      startTime: startTime,
      endTime: endTime,
      interval: interval,
      instanceId: instanceId
    })
  },
  getDiskUsage (userId, instanceId, startTime, endTime, interval) {
    return http.bodyPost('/rds/metric/diskUsage', {
      userId: userId,
      startTime: startTime,
      endTime: endTime,
      interval: interval,
      instanceId: instanceId
    })
  },
  getIopsUsage (userId, instanceId, startTime, endTime, interval) {
    return http.bodyPost('/rds/metric/iopsUsage', {
      userId: userId,
      startTime: startTime,
      endTime: endTime,
      interval: interval,
      instanceId: instanceId
    })
  },
  getConnectionUsage (userId, instanceId, startTime, endTime, interval) {
    return http.bodyPost('/rds/metric/connectionUsage', {
      userId: userId,
      startTime: startTime,
      endTime: endTime,
      interval: interval,
      instanceId: instanceId
    })
  },
  getDataDelay (userId, instanceId, startTime, endTime, interval) {
    return http.bodyPost('/rds/metric/dataDelay', {
      userId: userId,
      startTime: startTime,
      endTime: endTime,
      interval: interval,
      instanceId: instanceId
    })
  }
}
