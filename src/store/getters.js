const getters = {
  language: state => state.app.language,
  languageZh: state => state.app.languageZh,
  languageEn: state => state.app.languageEn,
  getWSData: state => state.app.wsData,
  sendMsg:state=>state.app.sendMsg,
  AjaxUrl: state => state.app.AjaxUrl,
  loginUrl: state => state.app.loginUrl,
  isview:state=>state.app.viewState,
  sidebarStatus:state=>state.app.sidebarStatus,
  baseURI:state=>state.app.baseURI,
  infoFlag:state=>state.app.infoFlag,
  
  token: state => state.user.token,
  addRouters: state => state.user.addRouters,
  limits:state=>state.user.limits,
  navList: state => state.user.navList,
  
  getTheme: state => state.theme.theme,
  showTheme:state=>state.theme.show,
}
export default getters
