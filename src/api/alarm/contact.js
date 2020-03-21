import http from '../base/http-request'

export default {
  getContactList (userId) {
    return http.pathGet('/alarm/contact/contacts', userId)
  }
}
