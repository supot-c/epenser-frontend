import Api from './Api'
import TransactionsService from './TransactionsService';

// const config = {
//   Authorization: 'Bearer' + this.$store.state.token
// }
export default {
  create (detail) {
    return Api().post('/wallet/create', detail, { headers: { Authorization: 'Bearer ' + localStorage.token } })
  },
  update (detail) {
    return Api().post('/wallet/update', detail, { headers: { Authorization: 'Bearer ' + localStorage.token } })
  },
  async get (user) {
    return Api().post('/wallet', user, { headers: { Authorization: 'Bearer ' + localStorage.token } })
  }
}
