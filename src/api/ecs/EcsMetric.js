import http from '../base/http-request'

export default {
  getCpuTotal (instanceId, startTime, endTime, interval) {
    return http.post('/ecs/metric/cpuTotal', {
      instanceId: instanceId,
      startTime: startTime,
      endTime: endTime,
      interval: interval
    })
  },
  getCpuSystem (instanceId, startTime, endTime, interval) {
    return http.post('/ecs/metric/cpuSystem', {
      instanceId: instanceId,
      startTime: startTime,
      endTime: endTime,
      interval: interval
    })
  },
  getCpuUser (instanceId, startTime, endTime, interval) {
    return http.post('/ecs/metric/cpuUser', {
      instanceId: instanceId,
      startTime: startTime,
      endTime: endTime,
      interval: interval
    })
  },
  getLoad1m (instanceId, startTime, endTime, interval) {
    return http.post('/ecs/metric/load1m', {
      instanceId: instanceId,
      startTime: startTime,
      endTime: endTime,
      interval: interval
    })
  },
  getLoad5m (instanceId, startTime, endTime, interval) {
    return http.post('/ecs/metric/load5m', {
      instanceId: instanceId,
      startTime: startTime,
      endTime: endTime,
      interval: interval
    })
  },
  getLoad15m (instanceId, startTime, endTime, interval) {
    return http.post('/ecs/metric/load15m', {
      instanceId: instanceId,
      startTime: startTime,
      endTime: endTime,
      interval: interval
    })
  },
  getMemory (instanceId, startTime, endTime, interval) {
    return http.post('/ecs/metric/memoryUtil', {
      instanceId: instanceId,
      startTime: startTime,
      endTime: endTime,
      interval: interval
    })
  },
  getDiskInode (instanceId, startTime, endTime, interval) {
    return http.post('/ecs/metric/diskInode', {
      instanceId: instanceId,
      startTime: startTime,
      endTime: endTime,
      interval: interval
    })
  },
  getDiskReadRate (instanceId, startTime, endTime, interval) {
    return http.post('/ecs/metric/diskReadRate', {
      instanceId: instanceId,
      startTime: startTime,
      endTime: endTime,
      interval: interval
    })
  },
  getDiskWriteRate (instanceId, startTime, endTime, interval) {
    return http.post('/ecs/metric/diskWriteRate', {
      instanceId: instanceId,
      startTime: startTime,
      endTime: endTime,
      interval: interval
    })
  },
  getDiskReadIOPS (instanceId, startTime, endTime, interval) {
    return http.post('/ecs/metric/diskReadIops', {
      instanceId: instanceId,
      startTime: startTime,
      endTime: endTime,
      interval: interval
    })
  },
  getDiskWriteIOPS (instanceId, startTime, endTime, interval) {
    return http.post('/ecs/metric/diskWriteIops', {
      instanceId: instanceId,
      startTime: startTime,
      endTime: endTime,
      interval: interval
    })
  },
  getNetInBPS (instanceId, startTime, endTime, interval) {
    return http.post('/ecs/metric/netInBps', {
      instanceId: instanceId,
      startTime: startTime,
      endTime: endTime,
      interval: interval
    })
  },
  getNetOutBPS (instanceId, startTime, endTime, interval) {
    return http.post('/ecs/metric/netOutBps', {
      instanceId: instanceId,
      startTime: startTime,
      endTime: endTime,
      interval: interval
    })
  },
  getNetInPPS (instanceId, startTime, endTime, interval) {
    return http.post('/ecs/metric/netInPps', {
      instanceId: instanceId,
      startTime: startTime,
      endTime: endTime,
      interval: interval
    })
  },
  getNetOutPPS (instanceId, startTime, endTime, interval) {
    return http.post('/ecs/metric/netOutPps', {
      instanceId: instanceId,
      startTime: startTime,
      endTime: endTime,
      interval: interval
    })
  },
  getTcpConnection (instanceId, startTime, endTime, interval) {
    return http.post('/ecs/metric/netTcpConnection', {
      instanceId: instanceId,
      startTime: startTime,
      endTime: endTime,
      interval: interval
    })
  }
}
