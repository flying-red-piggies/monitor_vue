import http from '../base/http-request'

export default {
  getCpuTotal (instanceId, startTime, endTime) {
    return http.post('/ecs/metric/cpuTotal', {
      instanceId: instanceId,
      startTime: startTime,
      endTime: endTime
    })
  },
  getCpuSystem (instanceId, startTime, endTime) {
    return http.post('/ecs/metric/cpuSystem', {
      instanceId: instanceId,
      startTime: startTime,
      endTime: endTime
    })
  },
  getCpuUser (instanceId, startTime, endTime) {
    return http.post('/ecs/metric/cpuUser', {
      instanceId: instanceId,
      startTime: startTime,
      endTime: endTime
    })
  },
  getLoad1m (instanceId, startTime, endTime) {
    return http.post('/ecs/metric/load1m', {
      instanceId: instanceId,
      startTime: startTime,
      endTime: endTime
    })
  },
  getLoad5m (instanceId, startTime, endTime) {
    return http.post('/ecs/metric/load5m', {
      instanceId: instanceId,
      startTime: startTime,
      endTime: endTime
    })
  },
  getLoad15m (instanceId, startTime, endTime) {
    return http.post('/ecs/metric/load15m', {
      instanceId: instanceId,
      startTime: startTime,
      endTime: endTime
    })
  },
  getMemory (instanceId, startTime, endTime) {
    return http.post('/ecs/metric/memoryUtil', {
      instanceId: instanceId,
      startTime: startTime,
      endTime: endTime
    })
  },
  getDiskInode (instanceId, startTime, endTime) {
    return http.post('/ecs/metric/diskInode', {
      instanceId: instanceId,
      startTime: startTime,
      endTime: endTime
    })
  },
  getDiskReadRate (instanceId, startTime, endTime) {
    return http.post('/ecs/metric/diskReadRate', {
      instanceId: instanceId,
      startTime: startTime,
      endTime: endTime
    })
  },
  getDiskWriteRate (instanceId, startTime, endTime) {
    return http.post('/ecs/metric/diskWriteRate', {
      instanceId: instanceId,
      startTime: startTime,
      endTime: endTime
    })
  },
  getDiskReadIOPS (instanceId, startTime, endTime) {
    return http.post('/ecs/metric/diskReadIops', {
      instanceId: instanceId,
      startTime: startTime,
      endTime: endTime
    })
  },
  getDiskWriteIOPS (instanceId, startTime, endTime) {
    return http.post('/ecs/metric/diskWriteIops', {
      instanceId: instanceId,
      startTime: startTime,
      endTime: endTime
    })
  },
  getNetInBPS (instanceId, startTime, endTime) {
    return http.post('/ecs/metric/netInBps', {
      instanceId: instanceId,
      startTime: startTime,
      endTime: endTime
    })
  },
  getNetOutBPS (instanceId, startTime, endTime) {
    return http.post('/ecs/metric/netOutBps', {
      instanceId: instanceId,
      startTime: startTime,
      endTime: endTime
    })
  },
  getNetInPPS (instanceId, startTime, endTime) {
    return http.post('/ecs/metric/netInPps', {
      instanceId: instanceId,
      startTime: startTime,
      endTime: endTime
    })
  },
  getNetOutPPS (instanceId, startTime, endTime) {
    return http.post('/ecs/metric/netOutPps', {
      instanceId: instanceId,
      startTime: startTime,
      endTime: endTime
    })
  },
  getTcpConnection (instanceId, startTime, endTime) {
    return http.post('/ecs/metric/netTcpConnection', {
      instanceId: instanceId,
      startTime: startTime,
      endTime: endTime
    })
  }
}
