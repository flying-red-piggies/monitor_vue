import http from '../base/http-request'

export default {
  getStorageUtil (userId, startTime, endTime, interval, bucketName) {
    return http.bodyPost('/oss/metric/storageUtil', {
      userId: userId,
      startTime: startTime,
      endTime: endTime,
      interval: interval,
      dimension: {
        dimension: {
          bucketName: bucketName
        }
      }
    })
  },
  getGetRequest (userId, startTime, endTime, interval, bucketName) {
    return http.bodyPost('/oss/metric/getRequest', {
      userId: userId,
      startTime: startTime,
      endTime: endTime,
      interval: interval,
      dimension: {
        bucketName: bucketName
      }
    })
  },
  getPutRequest (userId, startTime, endTime, interval, bucketName) {
    return http.bodyPost('/oss/metric/putRequest', {
      userId: userId,
      startTime: startTime,
      endTime: endTime,
      interval: interval,
      dimension: {
        bucketName: bucketName
      }
    })
  },
  getInternetTX (userId, startTime, endTime, interval, bucketName) {
    return http.bodyPost('/oss/metric/internetTX', {
      userId: userId,
      startTime: startTime,
      endTime: endTime,
      interval: interval,
      dimension: {
        bucketName: bucketName
      }
    })
  },
  getInternetRX (userId, startTime, endTime, interval, bucketName) {
    return http.bodyPost('/oss/metric/internetRX', {
      userId: userId,
      startTime: startTime,
      endTime: endTime,
      interval: interval,
      dimension: {
        bucketName: bucketName
      }
    })
  },
  getUserRequest (userId, startTime, endTime, interval) {
    return http.bodyPost('/oss/metric/userRequest', {
      userId: userId,
      startTime: startTime,
      endTime: endTime,
      interval: interval
    })
  },
  getUserTraffic (userId, startTime, endTime, interval) {
    return http.bodyPost('/oss/metric/userTraffic', {
      userId: userId,
      startTime: startTime,
      endTime: endTime,
      interval: interval
    })
  },
  getBucketRequest (userId, startTime, endTime, interval, bucketName) {
    return http.bodyPost('/oss/metric/bucketRequest', {
      userId: userId,
      startTime: startTime,
      endTime: endTime,
      interval: interval,
      dimension: {
        bucketName: bucketName
      }
    })
  },
  getBucketTraffic (userId, startTime, endTime, interval, bucketName) {
    return http.bodyPost('/oss/metric/bucketTraffic', {
      userId: userId,
      startTime: startTime,
      endTime: endTime,
      interval: interval,
      dimension: {
        bucketName: bucketName
      }
    })
  }
}
