import http from '../base/http-request'

export default {
  getStorageUtil (startTime, endTime, bucketName) {
    return http.post('/oss/metric/storageUtil', {
      startTime: startTime,
      endTime: endTime,
      bucketName: bucketName
    })
  },
  getGetRequest (startTime, endTime, bucketName) {
    return http.post('/oss/metric/getRequest', {
      startTime: startTime,
      endTime: endTime,
      bucketName: bucketName
    })
  },
  getPutRequest (startTime, endTime, bucketName) {
    return http.post('/oss/metric/putRequest', {
      startTime: startTime,
      endTime: endTime,
      bucketName: bucketName
    })
  },
  getInternetTX (startTime, endTime, bucketName) {
    return http.post('/oss/metric/internetTX', {
      startTime: startTime,
      endTime: endTime,
      bucketName: bucketName
    })
  },
  getInternetRX (startTime, endTime, bucketName) {
    return http.post('/oss/metric/internetRX', {
      startTime: startTime,
      endTime: endTime,
      bucketName: bucketName
    })
  }
}
