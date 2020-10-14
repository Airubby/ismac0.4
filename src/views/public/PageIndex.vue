<template>
	<component :is="currentComponent"></component>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
	components:{},
	computed:{
        ...mapGetters([
            'currentComponent'
        ]),
	},
	methods:{
		
	},
	watch:{
		
	}
}
</script>
