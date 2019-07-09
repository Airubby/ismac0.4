<template>
    <div class="content">
        <iframe :src="url" class="content" frameborder="0" scrolling="yes" id="myIframe"></iframe> 
    </div>
</template>

<script>
export default {
    created() {
        
    },
    mounted() {
        
    },
    data(){
        return{
            url:'bigScreen/index/page.html',
            //:src="`${publicPath}tx.jpg`"
        }
    },
    computed: {
        
    },
	methods: {
       
	},
    watch: {
        url:function(val){
            console.log(val)
        }
    },
    components: {
        
    }
}
</script>
