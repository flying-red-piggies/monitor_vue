import http from '../base/http-request'

export default {
  getStorageUtil (startTime, endTime, interval, bucketName) {
    return http.post('/oss/metric/storageUtil', {
      startTime: startTime,
      endTime: endTime,
      interval: interval,
      bucketName: bucketName
    })
  },
  getGetRequest (startTime, endTime, interval, bucketName) {
    return http.post('/oss/metric/getRequest', {
      startTime: startTime,
      endTime: endTime,
      interval: interval,
      bucketName: bucketName
    })
  },
  getPutRequest (startTime, endTime, interval, bucketName) {
    return http.post('/oss/metric/putRequest', {
      startTime: startTime,
      endTime: endTime,
      interval: interval,
      bucketName: bucketName
    })
  },
  getInternetTX (startTime, endTime, interval, bucketName) {
    return http.post('/oss/metric/internetTX', {
      startTime: startTime,
      endTime: endTime,
      interval: interval,
      bucketName: bucketName
    })
  },
  getInternetRX (startTime, endTime, interval, bucketName) {
    return http.post('/oss/metric/internetRX', {
      startTime: startTime,
      endTime: endTime,
      interval: interval,
      bucketName: bucketName
    })
  },
  getUserRequest (startTime, endTime, interval) {
    return http.post('/oss/metric/userRequest', {
      startTime: startTime,
      endTime: endTime,
      interval: interval
    })
  },
  getUserTraffic (startTime, endTime, interval) {
    return http.post('/oss/metric/userTraffic', {
      startTime: startTime,
      endTime: endTime,
      interval: interval
    })
  },
  getBucketRequest (startTime, endTime, interval, bucketName) {
    return http.post('/oss/metric/bucketRequest', {
      startTime: startTime,
      endTime: endTime,
      interval: interval,
      bucketName: bucketName
    })
  },
  getBucketTraffic (startTime, endTime, interval, bucketName) {
    return http.post('/oss/metric/bucketTraffic', {
      startTime: startTime,
      endTime: endTime,
      interval: interval,
      bucketName: bucketName
    })
  }
}
