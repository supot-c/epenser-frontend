import Api from '@/services/Api'

export default {
  register (credentials) {
    return Api().post('register', credentials)
  },
  login (credentials) {
    return Api().post('login', credentials)
  },
  verify () {
    return Api().post('verify', {},{headers: { Authorization: 'Bearer ' + localStorage.token}})
  },
  verify_reset (token) {
    return Api().post('verify_reset', token)
  },
  forget (email) {
    return Api().post('forget', email)
  },
  reset (information) {
    return Api().post('reset', information, {headers: { Authorization: 'Bearer ' + information.token, task: 'reset_password' }})
  }
}
