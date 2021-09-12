import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import username from './store-username'

export default function () {
  const Store = new Vuex.Store({
    modules: {
      username
    },

    strict: process.env.DEV
  })

  return Store
}


// import state from './state'
// import * as getters from './getters'
// import * as mutations from './mutations'
// import * as actions from './actions'

// export default {
//   namespaced: true,
//   state,
//   getters,
//   mutations,
//   actions
// }
