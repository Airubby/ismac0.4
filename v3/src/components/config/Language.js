export const zhLang={
    "uploadInfo":"文件上传中..."
}
export const enLang={
    "uploadInfo":"Upload..."
}
export default {
    created() {
        this.$i18n.setLocaleMessage('zh',Object.assign(this.$i18n.getLocaleMessage('zh'),zhLang))
        this.$i18n.setLocaleMessage('en',Object.assign(this.$i18n.getLocaleMessage('en'),enLang))
    }
}