<template>
    <div class="content" id="three-dom">
        
    </div>
</template>
<script>
module.exports = {
    props:["templateData","templateUrl"],
    created() {
        
    },
    mounted() {
        let props={dom:"three-dom"}
        this.$axios.get('/three/scene.json').then(result => {
            this.map = new this.$ThreeMap(props,result);
        })
    },
    data(){
        return{
            map:""
        }
    },
	methods: {
        
	},
}
</script>
<style lang="less" scoped>
    .content{
        overflow: hidden;
    }
</style>
