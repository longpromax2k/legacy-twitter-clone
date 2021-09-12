const state = {
  username: "",
};

const mutations = {
};

const actions = {
  updateUsername(username) {
    console.log("updated" + username);
  }
};

const getters = {
  username: (state) => {
    return state.username;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
