const zhLang={
    "testLanguage":"动态添加语言,看告警记录中重新赋值了testLanguage"
}
const enLang={
    "testLanguage":"DongTaiLanguage-Home"
}
export default {
    created() {
        // this.$i18n.setLocaleMessage('zh',Object.assign(this.$i18n.getLocaleMessage('zh'),zhLang))
        // this.$i18n.setLocaleMessage('en',Object.assign(this.$i18n.getLocaleMessage('en'),enLang))
        this.$i18n.setLocaleMessage('zh',Object.assign(this.$store.getters.languageZh,zhLang))
        this.$i18n.setLocaleMessage('en',Object.assign(this.$store.getters.languageEn,enLang))
    }
}