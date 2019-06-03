<template>
    <div>
    </div>
</template>

<script>
export default {
    name: 'home',
    created() {
        
    },
    mounted() {
        this.$r.post("/getMockData",{params:{"tew":'12321'}},r=>{
            console.log(r)
        })
        this.$r.get("/getInfo",{params:{"tew":'12321'}},r=>{
            console.log(r)
        })
    },
    data(){
        return{
            data:''
        }
    },
	methods: {
		
	},
    components: {
        
    }
}
</script>
