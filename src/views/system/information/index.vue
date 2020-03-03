<template>
    <div class="bgfffcontent">
        <div class="breadcrumb">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>{{$t("navbar.system")}}</el-breadcrumb-item>
                <el-breadcrumb-item>{{$t("navbar.systemInformation")}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="public_content" id="three-dom">
        </div>
    </div>
</template>

<script>
import ThreeMap from './ThreeMap.js';
import axios from 'axios';
import { decrypt } from './decrypt';
import ThreeMapLightBar from './ThreeMapLightBar';
export default {
    created() {
        
    },
    mounted() {
        let props={dom:"three-dom"}
        // const Map = new ThreeMap(props);
        // axios.get('/map/test1.json').then(data => {
        //     let result=data.data;
        //     // console.log(result);
        //     const Map = new ThreeMap(props,result);
        // })
        // axios.get('/map/changsa.json').then(data => {
        //     let result=data.data;
        //     //解密
        //     const mapData = decrypt.decode(result);
        //     const map = new ThreeMap(props,result);
        //     // console.log(mapData);
        // })
        axios.get('/map/china.json').then(data => {
            let result=data.data;
            //解密
            const mapData = decrypt.decode(result);
            const map = new ThreeMapLightBar(props,result);
            const lightBarData = [
                { name: '海南省', value: 60 },
                { name: '北京市', value: 100 },
                { name: '山东省', value: 80 },
                { name: '海南省', value: 100 },
                { name: '四川省', value: 100 },
                { name: '台湾', value: 70 },
                { name: '黑龙江省', value: 80 },
                { name: '湖北省', value: 70 },
                { name: '内蒙古自治区', value: 50 },
                { name: '西藏自治区', value: 50 },
                { name: '新疆维吾尔自治区', value: 63 },
                { name: '甘肃省', value: 63 },
                { name: '山西省', value: 83 },
                { name: '上海市', value: 73 },
                { name: '福建省', value: 63 },
                { name: '广东省', value: 53 },
                { name: '云南省', value: 43 },
                { name: '辽宁省', value: 63 },
                { name: '青海省', value: 90 }
            ];
            console.log(map)
            map.drawLightBar(lightBarData);
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
