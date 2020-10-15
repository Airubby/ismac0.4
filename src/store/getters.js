const getters = {
    language: state => state.app.language,
    languageZh: state => state.app.languageZh,
    languageEn: state => state.app.languageEn,
    getWSData: state => state.app.wsData,
    AjaxUrl: state => state.app.AjaxUrl,
    loginUrl: state => state.app.loginUrl,
    
    token: state => state.user.token,
    config: state=>state.user.config,
    currentConfig:state=>state.user.currentConfig,
    currentComponent:state=>state.user.currentComponent,

    getTheme: state => state.theme.theme,
    showTheme:state=>state.theme.show,
}
export default getters
