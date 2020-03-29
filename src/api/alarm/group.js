import http from '../base/http-request'

export default {
  getGroupList (userId) {
    return http.pathGet('/alarm/contactGroup/contactGroups', userId)
  },
  addGroup (form) {
    return http.bodyPost('/alarm/contactGroup/addContactGroup', form)
  },
  refreshGroups (userId) {
    return http.paramPost('/alarm/contactGroup/refresh', {
      userId: userId
    })
  }
}
