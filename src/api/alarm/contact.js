import http from '../base/http-request'

export default {
  getContactList (userId) {
    return http.pathGet('/alarm/contact/contacts', userId)
  },
  addContact (form) {
    return http.bodyPost('/alarm/contact/addContact', form)
  },
  refreshContacts (userId) {
    return http.paramPost('/alarm/contact/refresh', {
      userId: userId
    })
  }
}
