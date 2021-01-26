import Api from './Api'

export default {
  get (receipt) {
    return Api().post('/wallet/transaction', receipt, { headers: { Authorization: 'Bearer ' + localStorage.token } })
  },
  async create (detail) {
    return Api().post('/wallet/transaction/create', detail, { headers: { Authorization: 'Bearer ' + localStorage.token } })
  },
  async delete (transaction) {
    return Api().post('/wallet/transaction/delete', transaction, { headers: { Authorization: 'Bearer ' + localStorage.token } })
  }
}
