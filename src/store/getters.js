const getters = {
  language: state => state.app.language,
  languagezh: state => state.app.languagezh,
  languageen: state => state.app.languageen,
  getWSData: state => state.app.wsData,
  AjaxUrl: state => state.app.AjaxUrl,
  loginUrl: state => state.app.loginUrl,
  isview:state=>state.app.viewState,
  sidebarStatus:state=>state.app.sidebarStatus,
  baseURI:state=>state.app.baseURI,
  
  token: state => state.user.token,
  addRouters: state => state.user.addRouters,
  limits:state=>state.user.limits,
  navList: state => state.user.navList,
  
  getTheme: state => state.theme.theme,
}
export default getters
