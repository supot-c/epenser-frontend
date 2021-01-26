import Api from './Api'

export default {
  async get () {
    return Api().get('/store', { headers: { Authorization: 'Bearer ' + localStorage.token } })
  },
  async create (store) {
    return Api().post('/store/create',store, { headers: { Authorization: 'Bearer ' + localStorage.token } })
  }
}
