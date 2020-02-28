<template>
    <div class="bgfffcontent">
        <div class="breadcrumb">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>{{$t("navbar.system")}}</el-breadcrumb-item>
                <el-breadcrumb-item>{{$t("navbar.systemUser")}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="public_content">
            
        </div>
    </div>
</template>

<script>
import * as THREE from 'three'
import {MTLLoader,OBJLoader} from 'three-obj-mtl-loader'
import {CSS2DRenderer,CSS2DObject} from 'three-css2drender'
let OrbitControls = require('three-orbit-controls')(THREE)
export default {
    created() {
        console.log(THREE)
        // let orbitControls = new OrbitControls(camera);
    },
    mounted() {
        
    },
    data(){
        return{
            camera:"",
            scene:"",
            render:"",
            geometry:"",
            materail:"",
            mesh:""
        }
    },
	methods: {
        
	},
    components: {
        
    }
}
</script>
