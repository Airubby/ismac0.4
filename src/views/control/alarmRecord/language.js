const zhLang={
    "testLanguage":"动态添加语言,重新赋值了首页中的testLanguage"
}
const enLang={
    "testLanguage":"DongTaiLanguage-Alarm"
}
export default {
    created() {
        this.$i18n.setLocaleMessage('zh',Object.assign(this.$i18n.getLocaleMessage('zh'),zhLang))
        this.$i18n.setLocaleMessage('en',Object.assign(this.$i18n.getLocaleMessage('en'),enLang))
    }
}