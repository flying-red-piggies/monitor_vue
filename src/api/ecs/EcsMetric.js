import http from '../base/http-request'

export default {
  getCpuTotal (userId, instanceId, startTime, endTime, interval) {
    return new Promise((resolve, reject) => {
      http.bodyPost('/ecs/metric/cpuTotal', {
        userId: userId,
        instanceId: instanceId,
        startTime: startTime,
        endTime: endTime,
        interval: interval
      }).then((res) => resolve(res.data))
    })
  },
  getCpuSystem (userId, instanceId, startTime, endTime, interval) {
    return new Promise((resolve, reject) => {
      http.bodyPost('/ecs/metric/cpuSystem', {
        userId: userId,
        instanceId: instanceId,
        startTime: startTime,
        endTime: endTime,
        interval: interval
      }).then((res) => resolve(res.data))
    })
  },
  getCpuUser (userId, instanceId, startTime, endTime, interval) {
    return new Promise((resolve, reject) => {
      http.bodyPost('/ecs/metric/cpuUser', {
        userId: userId,
        instanceId: instanceId,
        startTime: startTime,
        endTime: endTime,
        interval: interval
      }).then((res) => resolve(res.data))
    })
  },
  getLoad1m (userId, instanceId, startTime, endTime, interval) {
    return new Promise((resolve, reject) => {
      http.bodyPost('/ecs/metric/load1m', {
        userId: userId,
        instanceId: instanceId,
        startTime: startTime,
        endTime: endTime,
        interval: interval
      }).then((res) => resolve(res.data))
    })
  },
  getLoad5m (userId, instanceId, startTime, endTime, interval) {
    return new Promise((resolve, reject) => {
      http.bodyPost('/ecs/metric/load5m', {
        userId: userId,
        instanceId: instanceId,
        startTime: startTime,
        endTime: endTime,
        interval: interval
      }).then((res) => resolve(res.data))
    })
  },
  getLoad15m (userId, instanceId, startTime, endTime, interval) {
    return new Promise((resolve, reject) => {
      http.bodyPost('/ecs/metric/load15m', {
        userId: userId,
        instanceId: instanceId,
        startTime: startTime,
        endTime: endTime,
        interval: interval
      }).then((res) => resolve(res.data))
    })
  },
  getMemory (userId, instanceId, startTime, endTime, interval) {
    return http.bodyPost('/ecs/metric/memoryUtil', {
      userId: userId,
      instanceId: instanceId,
      startTime: startTime,
      endTime: endTime,
      interval: interval
    })
  },
  getDiskInode (userId, instanceId, startTime, endTime, interval) {
    return new Promise((resolve, reject) => {
      http.bodyPost('/ecs/metric/diskInode', {
        userId: userId,
        instanceId: instanceId,
        startTime: startTime,
        endTime: endTime,
        interval: interval
      }).then((res) => resolve(res.data))
    })
  },
  getDiskReadRate (userId, instanceId, startTime, endTime, interval) {
    return new Promise((resolve, reject) => {
      http.bodyPost('/ecs/metric/diskReadRate', {
        userId: userId,
        instanceId: instanceId,
        startTime: startTime,
        endTime: endTime,
        interval: interval
      }).then((res) => resolve(res.data))
    })
  },
  getDiskWriteRate (userId, instanceId, startTime, endTime, interval) {
    return new Promise((resolve, reject) => {
      http.bodyPost('/ecs/metric/diskWriteRate', {
        userId: userId,
        instanceId: instanceId,
        startTime: startTime,
        endTime: endTime,
        interval: interval
      }).then((res) => resolve(res.data))
    })
  },
  getDiskReadIOPS (userId, instanceId, startTime, endTime, interval) {
    return new Promise((resolve, reject) => {
      http.bodyPost('/ecs/metric/diskReadIops', {
        userId: userId,
        instanceId: instanceId,
        startTime: startTime,
        endTime: endTime,
        interval: interval
      }).then((res) => resolve(res.data))
    })
  },
  getDiskWriteIOPS (userId, instanceId, startTime, endTime, interval) {
    return new Promise((resolve, reject) => {
      http.bodyPost('/ecs/metric/diskWriteIops', {
        userId: userId,
        instanceId: instanceId,
        startTime: startTime,
        endTime: endTime,
        interval: interval
      }).then((res) => resolve(res.data))
    })
  },
  getNetInBPS (userId, instanceId, startTime, endTime, interval) {
    return new Promise((resolve, reject) => {
      http.bodyPost('/ecs/metric/netInBps', {
        userId: userId,
        instanceId: instanceId,
        startTime: startTime,
        endTime: endTime,
        interval: interval
      }).then((res) => resolve(res.data))
    })
  },
  getNetOutBPS (userId, instanceId, startTime, endTime, interval) {
    return new Promise((resolve, reject) => {
      http.bodyPost('/ecs/metric/netOutBps', {
        userId: userId,
        instanceId: instanceId,
        startTime: startTime,
        endTime: endTime,
        interval: interval
      }).then((res) => resolve(res.data))
    })
  },
  getNetInPPS (userId, instanceId, startTime, endTime, interval) {
    return new Promise((resolve, reject) => {
      http.bodyPost('/ecs/metric/netInPps', {
        userId: userId,
        instanceId: instanceId,
        startTime: startTime,
        endTime: endTime,
        interval: interval
      }).then((res) => resolve(res.data))
    })
  },
  getNetOutPPS (userId, instanceId, startTime, endTime, interval) {
    return new Promise((resolve, reject) => {
      http.bodyPost('/ecs/metric/netOutPps', {
        userId: userId,
        instanceId: instanceId,
        startTime: startTime,
        endTime: endTime,
        interval: interval
      }).then((res) => resolve(res.data))
    })
  },
  getTcpConnection (userId, instanceId, startTime, endTime, interval) {
    return http.bodyPost('/ecs/metric/netTcpConnection', {
      userId: userId,
      instanceId: instanceId,
      startTime: startTime,
      endTime: endTime,
      interval: interval
    })
  }
}
