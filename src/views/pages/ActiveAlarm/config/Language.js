const zhLang={
    "AllDev":"接入设备总数"
}
const enLang={
    "AllDev":"Total number of access devices"
}
export default {
    created() {
        this.$i18n.setLocaleMessage('zh',Object.assign(this.$i18n.getLocaleMessage('zh'),zhLang))
        this.$i18n.setLocaleMessage('en',Object.assign(this.$i18n.getLocaleMessage('en'),enLang))
    }
}