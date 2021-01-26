import Api from './Api'

export default {
  get (wallet) {
    return Api().post('/wallet/transactions', wallet, { headers: { Authorization: 'Bearer ' + localStorage.token } })
  },
  async create (detail) {
    return Api().post('/wallet/transaction/createReceipt', detail, { headers: { Authorization: 'Bearer ' + localStorage.token } })
  },
  async delete (receipt) {
    return Api().post('/wallet/transaction/deleteReceipt', receipt, { headers: { Authorization: 'Bearer ' + localStorage.token } })
  }
}
