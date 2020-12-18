import Cookies from 'js-cookie'

const app = {
  state: {
    wsData:{},
    sendMsg:"", //存储当前的send的信息，如果断开了，再连接上的时候，再次发送订阅信息
    AjaxUrl:Cookies.get('AjaxUrl')||'',
    loginUrl:Cookies.get('loginUrl')||'',
    // 中英文
    language: Cookies.get('language') || 'zh',
    languageZh: {},
    languageEn: {},
    viewState:'',
    sidebarStatus:Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : false,
    baseURI:'',
    infoFlag:true,  //多个接口提示请重新登录的时候判断，第一个提示了就置位false；
    metaInfo: {
      title: "小微vue-cli3",
      keywords: "vue-cli3",
      description: "小微vue-cli3"
    }
  },
  mutations: {
    setwsData(state,wsData){
        state.wsData=wsData;
    },
    SET_SENDMSG(state,sendMsg){
        state.sendMsg=sendMsg;
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
      state.languageZh = language
    },
    SET_LANGUAGEEN: (state, language) => {
      state.languageEn = language
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
    SET_BASEURL:(state,path)=>{
      state.baseURI=path;
    },
    SET_INFOFLAG:(state,flag)=>{
      state.infoFlag=flag;
    },
    CAHNGE_META_INFO(state, metaInfo) {
      state.metaInfo = metaInfo;
    },

  },
  actions: {
    setwsData({commit},wsData){
        commit('setwsData',wsData)
    },
    setSendMsg(state,sendMsg){
        commit('SET_SENDMSG',sendMsg)
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
    setLanguageZh({ commit }, language) {
      commit('SET_LANGUAGEZH', language)
    },
    setLanguageEn({ commit }, language) {
      commit('SET_LANGUAGEEN', language)
    },

    setIsview({commit},viewState){
      commit('SET_VIEW', viewState)
    },

    toggleSideBar({ commit }) {
      commit('TOGGLE_SIDEBAR')
    },
    setBaseUrl({ commit },path) {
      commit('SET_BASEURL',path)
    },
    setInfoFlag({ commit },flag) {
      commit('SET_INFOFLAG',flag)
    },
    //动态修改title keywords description
    changeMetaInfo({commit},metaInfo){
      commit('CAHNGE_META_INFO',metaInfo)
    }
  }

}

export default app
