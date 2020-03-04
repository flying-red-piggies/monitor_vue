import http from '../base/http-request'

export default {
  getCpuUsage (instanceId, startTime, endTime, interval) {
    return http.post('/rds/metric/cpuUsage', {
      startTime: startTime,
      endTime: endTime,
      interval: interval,
      instanceId: instanceId
    })
  },
  getMemoryUsage (instanceId, startTime, endTime, interval) {
    return http.post('/rds/metric/memoryUsage', {
      startTime: startTime,
      endTime: endTime,
      interval: interval,
      instanceId: instanceId
    })
  },
  getDiskUsage (instanceId, startTime, endTime, interval) {
    return http.post('/rds/metric/diskUsage', {
      startTime: startTime,
      endTime: endTime,
      interval: interval,
      instanceId: instanceId
    })
  },
  getIopsUsage (instanceId, startTime, endTime, interval) {
    return http.post('/rds/metric/iopsUsage', {
      startTime: startTime,
      endTime: endTime,
      interval: interval,
      instanceId: instanceId
    })
  },
  getConnectionUsage (instanceId, startTime, endTime, interval) {
    return http.post('/rds/metric/connectionUsage', {
      startTime: startTime,
      endTime: endTime,
      interval: interval,
      instanceId: instanceId
    })
  },
  getDataDelay (instanceId, startTime, endTime, interval) {
    return http.post('/rds/metric/dataDelay', {
      startTime: startTime,
      endTime: endTime,
      interval: interval,
      instanceId: instanceId
    })
  }
}
