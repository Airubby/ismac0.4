import Cookies from 'js-cookie'

const app = {
  state: {
    wsData:{},
    AjaxUrl:Cookies.get('AjaxUrl')||'',
    loginUrl:Cookies.get('loginUrl')||'',
    // 中英文
    language: Cookies.get('language') || 'zh',
    languagezh: {},
    languageen: {},
    viewState:'',
    sidebarStatus:Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
  },
  mutations: {
    setwsData(state,wsData){
        state.wsData=wsData;
    },
    setAjaxUrl(state,ajaxUrl){
        state.AjaxUrl=ajaxUrl;
        Cookies.set('AjaxUrl', ajaxUrl)
    },
    setLoginUrl(state,loginUrl){
        state.loginUrl=loginUrl;
        Cookies.set('loginUrl', loginUrl)
    },
    // 中英文
    SET_LANGUAGE: (state, language) => {
      state.language = language
      Cookies.set('language', language)
    },
    SET_LANGUAGEZH: (state, language) => {
      state.languagezh = language
    },
    SET_LANGUAGEEN: (state, language) => {
      state.languageen = language
    },

    SET_VIEW: (state, viewState) => {
      state.viewState = viewState
    },
    TOGGLE_SIDEBAR: state => {
      state.sidebarStatus = !state.sidebarStatus
      if (state.sidebarStatus) {
        Cookies.set('sidebarStatus', 1)
      } else {
        Cookies.set('sidebarStatus', 0)
      }
    },

  },
  actions: {
    setwsData({commit},wsData){
        commit('setwsData',wsData)
    },
    setAjaxUrl({commit},ajaxUrl){
        commit('setAjaxUrl',ajaxUrl)
    },
    setLoginUrl({commit},loginUrl){
        commit('setLoginUrl',loginUrl)
    },
    // 中英文
    setLanguage({ commit }, language) {
      commit('SET_LANGUAGE', language)
    },
    setLanguagezh({ commit }, language) {
      commit('SET_LANGUAGEZH', language)
    },
    setLanguageen({ commit }, language) {
      commit('SET_LANGUAGEEN', language)
    },

    setIsview({commit},viewState){
      commit('SET_VIEW', viewState)
    },

    toggleSideBar({ commit }) {
      commit('TOGGLE_SIDEBAR')
    },


  }

}

export default app
