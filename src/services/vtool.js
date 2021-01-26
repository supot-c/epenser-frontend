export default {
  toRoute (destination, store, route) {
    store.state.currentpage = destination
    route.push({ name: 'register' })
  }
}
