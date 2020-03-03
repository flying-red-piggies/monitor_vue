import http from '../base/http-request'

export default {
  getCpuTotal (instanceId, startTime, endTime, interval) {
    return new Promise((resolve, reject) => {
      http.post('/ecs/metric/cpuTotal', {
        instanceId: instanceId,
        startTime: startTime,
        endTime: endTime,
        interval: interval
      }).then((res) => resolve(res.data))
    })
  },
  getCpuSystem (instanceId, startTime, endTime, interval) {
    return new Promise((resolve, reject) => {
      http.post('/ecs/metric/cpuSystem', {
        instanceId: instanceId,
        startTime: startTime,
        endTime: endTime,
        interval: interval
      }).then((res) => resolve(res.data))
    })
  },
  getCpuUser (instanceId, startTime, endTime, interval) {
    return new Promise((resolve, reject) => {
      http.post('/ecs/metric/cpuUser', {
        instanceId: instanceId,
        startTime: startTime,
        endTime: endTime,
        interval: interval
      }).then((res) => resolve(res.data))
    })
  },
  getLoad1m (instanceId, startTime, endTime, interval) {
    return new Promise((resolve, reject) => {
      http.post('/ecs/metric/load1m', {
        instanceId: instanceId,
        startTime: startTime,
        endTime: endTime,
        interval: interval
      }).then((res) => resolve(res.data))
    })
  },
  getLoad5m (instanceId, startTime, endTime, interval) {
    return new Promise((resolve, reject) => {
      http.post('/ecs/metric/load5m', {
        instanceId: instanceId,
        startTime: startTime,
        endTime: endTime,
        interval: interval
      }).then((res) => resolve(res.data))
    })
  },
  getLoad15m (instanceId, startTime, endTime, interval) {
    return new Promise((resolve, reject) => {
      http.post('/ecs/metric/load15m', {
        instanceId: instanceId,
        startTime: startTime,
        endTime: endTime,
        interval: interval
      }).then((res) => resolve(res.data))
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
    return new Promise((resolve, reject) => {
      http.post('/ecs/metric/diskInode', {
        instanceId: instanceId,
        startTime: startTime,
        endTime: endTime,
        interval: interval
      }).then((res) => resolve(res.data))
    })
  },
  getDiskReadRate (instanceId, startTime, endTime, interval) {
    return new Promise((resolve, reject) => {
      http.post('/ecs/metric/diskReadRate', {
        instanceId: instanceId,
        startTime: startTime,
        endTime: endTime,
        interval: interval
      }).then((res) => resolve(res.data))
    })
  },
  getDiskWriteRate (instanceId, startTime, endTime, interval) {
    return new Promise((resolve, reject) => {
      http.post('/ecs/metric/diskWriteRate', {
        instanceId: instanceId,
        startTime: startTime,
        endTime: endTime,
        interval: interval
      }).then((res) => resolve(res.data))
    })
  },
  getDiskReadIOPS (instanceId, startTime, endTime, interval) {
    return new Promise((resolve, reject) => {
      http.post('/ecs/metric/diskReadIops', {
        instanceId: instanceId,
        startTime: startTime,
        endTime: endTime,
        interval: interval
      }).then((res) => resolve(res.data))
    })
  },
  getDiskWriteIOPS (instanceId, startTime, endTime, interval) {
    return new Promise((resolve, reject) => {
      http.post('/ecs/metric/diskWriteIops', {
        instanceId: instanceId,
        startTime: startTime,
        endTime: endTime,
        interval: interval
      }).then((res) => resolve(res.data))
    })
  },
  getNetInBPS (instanceId, startTime, endTime, interval) {
    return new Promise((resolve, reject) => {
      http.post('/ecs/metric/netInBps', {
        instanceId: instanceId,
        startTime: startTime,
        endTime: endTime,
        interval: interval
      }).then((res) => resolve(res.data))
    })
  },
  getNetOutBPS (instanceId, startTime, endTime, interval) {
    return new Promise((resolve, reject) => {
      http.post('/ecs/metric/netOutBps', {
        instanceId: instanceId,
        startTime: startTime,
        endTime: endTime,
        interval: interval
      }).then((res) => resolve(res.data))
    })
  },
  getNetInPPS (instanceId, startTime, endTime, interval) {
    return new Promise((resolve, reject) => {
      http.post('/ecs/metric/netInPps', {
        instanceId: instanceId,
        startTime: startTime,
        endTime: endTime,
        interval: interval
      }).then((res) => resolve(res.data))
    })
  },
  getNetOutPPS (instanceId, startTime, endTime, interval) {
    return new Promise((resolve, reject) => {
      http.post('/ecs/metric/netOutPps', {
        instanceId: instanceId,
        startTime: startTime,
        endTime: endTime,
        interval: interval
      }).then((res) => resolve(res.data))
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
