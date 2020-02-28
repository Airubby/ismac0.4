const theme = {
  state: {
    theme:'',
    show:true,
  },
  mutations: {
    setTheme(state,themeName){
      state.theme=themeName;
    },
    setShow(state,flag){
      state.show=flag;
    },
  },
  actions: {
    setTheme({ commit }, themeName) {
      commit('setTheme', themeName)
    },
    setShow({ commit }, flag) {
      commit('setShow', flag)
    },
  }

}

export default theme
