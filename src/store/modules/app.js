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
        tempUrl:"",
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
        SET_TEMPURL:(state, tempUrl) => {
            state.tempUrl = tempUrl
        },
    },
    actions: {
        setwsData({commit},wsData){
            commit('setwsData',wsData)
        },
        setSendMsg({commit},sendMsg){
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
        setTempUrl({ commit }, tempUrl) {
            commit('SET_TEMPURL', tempUrl)
        },
    }

}

export default app
