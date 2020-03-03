<template>
    <div class="bgfffcontent" id="three-dom">
       
    </div>
</template>

<script>
import ThreeMap from './ThreeMap.js';
import axios from 'axios';
import { decrypt } from './decrypt';
export default {
    created() {
        axios.get('/map/china.json').then(data => {
            let result=data.data;
            //解密
            const mapData = decrypt.decode(result);
            // console.log(mapData);
        })
    },
    mounted() {
        this.$nextTick(function(){
            this.$emit("routerLoading")
        })
        let props={dom:"three-dom"}
        // const Map = new ThreeMap(props);
        axios.get('/map/changsa.json').then(data => {
            let result=data.data;
            //解密
            const mapData = decrypt.decode(result);
            const map = new ThreeMap(props,result);
            // console.log(mapData);
        })
    },
    data(){
        return{
            
        }
    },
	methods: {
        

	},
    components: {
        
    }
}
</script>
