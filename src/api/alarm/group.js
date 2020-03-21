import http from '../base/http-request'

export default {
  getGroupList (userId) {
    return http.pathGet('/alarm/contactGroup/contactGroups', userId)
  }
}
