const getters = {
    language: state => state.app.language,
    languageZh: state => state.app.languageZh,
    languageEn: state => state.app.languageEn,
    getWSData: state => state.app.wsData,
    sendMsg:state=>state.app.sendMsg,
    AjaxUrl: state => state.app.AjaxUrl,
    loginUrl: state => state.app.loginUrl,
    tempUrl: state=>state.app.tempUrl,
    
    token: state => state.user.token,
    config: state=>state.user.config,
    currentConfig:state=>state.user.currentConfig,
    currentComponent:state=>state.user.currentComponent,
    languageApi:state=>state.user.languageApi,

    getTheme: state => state.theme.theme,
    showTheme:state=>state.theme.show,
}
export default getters
