<template>
    <div class="bgfffcontent">
        <div class="breadcrumb">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>{{$t("navbar.system")}}</el-breadcrumb-item>
                <el-breadcrumb-item>{{$t("navbar.systemUser")}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="public_content" id="three-dom">
            
        </div>
    </div>
</template>

<script>
import * as THREE from 'three'
import axios from 'axios';
var OrbitControls = require('three-orbit-controls')(THREE)
// import {MTLLoader,OBJLoader} from 'three-obj-mtl-loader'
// import {CSS2DRenderer,CSS2DObject} from 'three-css2drender'
// let OrbitControls = require('three-orbit-controls')(THREE)
export default {
    created() {
        console.log(THREE)
        // let orbitControls = new OrbitControls(camera);
    },
    mounted() {
        this.init();
    },
    data(){
        return{
            camera:"",
            scene:"",
            renderer:"",
            geometry:"",
            materail:"",
            mesh:""
        }
    },
	methods: {
        //初始化渲染场景
        initRenderer:function(){
            //antialias是否开启反锯齿，设置为true开启反锯齿
            this.renderer=new THREE.WebGLRenderer({antialias : true});
            let dom=document.getElementById("three-dom");
            this.renderer.setSize(dom.offsetWidth,dom.offsetHeight);
            dom.appendChild(this.renderer.domElement);
        },
        //初始化相机
        initCamera:function(){
            //fov可视角度70；aspect通常设置为canvas的宽高比
            this.camera=new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,0.01,1000);
            this.camera.position.z=1;
        },
        //初始化场景
        initScene:function(){
            this.scene=new THREE.Scene();
            this.scene.background = new THREE.Color(0xAAAAAA);
        },
        //初始化物体
        initObj:function(){
            // this.geometry=new THREE.BoxGeometry(0.2,0.2,0.2);
            // this.materail=new THREE.MeshNormalMaterial();
            // this.mesh=new THREE.Mesh(this.geometry,this.materail);
            // this.scene.add(this.mesh);
            axios.get('/three/scene.json').then(data => {
                let result=data.data;
                let loader = new THREE.ObjectLoader();
                let obj = loader.parse(result);
                this.group = obj;
                this.scene.add(obj)
            })
            
        },
        setControl:function() {
            this.controls = new OrbitControls(this.camera);
            this.controls.update();
        },
        //渲染
        render:function(){
            this.animate();
        },
        animate:function(){
            requestAnimationFrame(this.animate)
            // this.mesh.rotation.x+=0.01;
            // this.mesh.rotation.y+=0.02;
            this.renderer.render(this.scene,this.camera);
        },
        init:function(){
            this.initRenderer();
            this.initCamera();
            this.initScene();
            this.initObj();
            this.render();
            this.setControl();
        }

	},
    components: {
        
    }
}
</script>
