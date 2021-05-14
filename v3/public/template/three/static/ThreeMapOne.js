import Vue from 'vue'
// var THREE = require('three') //正确
import * as THREE from 'three';
// import * as d3 from 'd3-geo';
var OrbitControls = require('three-orbit-controls')(THREE)
import { CSS2DRenderer, CSS2DObject } from "three-css2drender"
// import air from './kongtiao.png';
import cabinet from './cabinet.png';
// import cabinet from './hvdc.png';
import air from './lietougui.png';
// import air from './guankonggui.png';
import transparent from './transparent.png'
export default class ThreeMap {
    constructor(props,mapData) {
        this.props=props;
        this.data=new Array();
        this.mapData=mapData;
        this.labelRenderer;
        this.divIdArray=new Array();
        this.dom=document.getElementById(this.props.dom);
        this.init();
    }

    init() {
        this.initRenderer();
        this.initCamera();
        this.initScene();
        this.render();
        // this.setHelper();
        this.setControl();
        // this.drawMultiPolygon(); //引用test1.json
        this.drawbox();
        //引用china.json
        // this.drawMap(); 
        // this.drawLines();
       
        this.dom.addEventListener('click', this.mouseClickEvent.bind(this))
      this.dom.addEventListener('mousemove', this.mouseMousemoveEvent.bind(this))
        // this.dom.addEventListener('mousemove', this.mouseHoverEvent.bind(this))
    }

    //初始化渲染场景
    initRenderer() {
        console.log(this.props)
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(this.dom.offsetWidth,this.dom.offsetHeight);
        
        this.dom.appendChild(this.renderer.domElement);
    }
    //初始化相机
    initCamera() {
        this.camera = new THREE.PerspectiveCamera(45, this.dom.offsetWidth / this.dom.offsetHeight, 0.1, 1000);
        //向上的一个坐标系
        // this.camera.up.x = 0;
        // this.camera.up.y = 1;
        // this.camera.up.z = 0;
        this.camera.position.set(0.5, 5, 7);
        this.camera.lookAt(0, 0, 0)
    }
    //初始化场景
    initScene() {
        this.scene = new THREE.Scene();
        this.scene.background = "transparent";
        var ambientLight=new THREE.AmbientLight(0xffffff);
        ambientLight.position.set(0,10,0);
        var spotLight = new THREE.SpotLight(0xffffff);
        spotLight.position.set(0, 50, 0);
        this.scene.add(spotLight);
        this.scene.add(ambientLight);
    }
    //渲染
    render() {
        this.animate()
    }
    animate() {
        requestAnimationFrame(this.animate.bind(this));
        this.renderer.render(this.scene, this.camera);
        if(this.labelRenderer!=null){
       // this.labelRenderer.render(this.scene, this.camera)
    }
    }
     guid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0,
                v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
   
    setHelper() {
        //红色x,绿色y,蓝色z
        const axesHelper = new THREE.AxisHelper(5);
        this.scene.add(axesHelper);
    }
    setControl() {
        this.controls = new OrbitControls(this.camera,this.dom);
        this.controls.update();
    }
    drawbox(){
        const tgroup = new THREE.Group();
        let loader = new THREE.ObjectLoader();
        // let obj = loader.parse(this.mapData);
        // console.log(obj)
        // this.group = obj;
        // this.scene.add(obj)

        let _this=this;
        var textureLoader=new THREE.TextureLoader();
        this.textures = {};
        this.textures["air"]=new THREE.TextureLoader().load(air);
        this.textures["cabinet"]=new THREE.TextureLoader().load(cabinet);
         this.textures["transparent"]=new THREE.TextureLoader().load(transparent);
        let mapData=this.mapData;
        let data=this.mapData.object.children[0].children;
        for(let i=0;i<data.length;i++){
            for(let j=0;j<mapData.materials.length;j++){
                if(data[i].material==mapData.materials[j].uuid){
                    textureLoader.load(mapData.materials[j].map,function(texture){
                        for(let n=0;n<mapData.geometries.length;n++){
                            if(data[i].geometry==mapData.geometries[n].uuid){
                                if(mapData.geometries[n].type=="PlaneBufferGeometry"){
                                  
                                    var geometry=new THREE.PlaneBufferGeometry(mapData.geometries[n].width,mapData.geometries[n].height);  
                                    mapData.materials[j].map=mapData.materials[j].map?texture:"";
                                    var materail=new THREE.MeshBasicMaterial(mapData.materials[j]);
                                    var mesh=new THREE.Mesh(geometry,materail);
                                    var mirrorMatrix = new THREE.Matrix4().fromArray(data[i].matrix);
                                    mesh.applyMatrix(mirrorMatrix);

                                    _this.scene.add(mesh);
                                }
                            }
                        }
                    });
                }
            }
        }
        let contwidth=8.76;//总宽度 除去 两边0.24 每一边0.12;
        var order="left";//渲染顺序
        var json=[
            {type:"cabinet"},{type:"cabinet"},{type:"cabinet"},{type:"cabinet"},{type:"cabinet"},
            {type:"cabinet"},{type:"cabinet"},{type:"cabinet"},{type:"cabinet"},{type:"cabinet"},
            {type:"cabinet"},{type:"air"},{type:"cabinet"},{type:"cabinet"},{type:"cabinet"},
            {type:"air"},{type:"cabinet"}]
        let model=32;//机柜总数
        let left=0.01//间距
        let cwidth=contwidth-(left*(model-1));//计算总宽
        let width=cwidth/(model);//计算机柜宽度
        let y=(contwidth/2)-(width/2);//Y轴移位
       
        var loader11 = new THREE.FontLoader();
           var option={
            size: 0.1, //字体大小
            height: 0.01,  //字体的深度
            curveSegments: 12,  //曲线控制点数
            bevelEnabled: false,  //斜角
            bevelThickness: 10,  //斜角的深度
            bevelSize: 8,  //斜角的大小
            bevelSegments: 5  //斜角段数
          }
          //创建法向量材质
          var fontmeshMaterial = new THREE.MeshNormalMaterial({
            flatShading: THREE.FlatShading,
            transparent: true,
            opacity: 0.9
        });
        loader11.load( '/three/helvetiker_regular.typeface.json', //加载好字体后创建三维文字
        function ( font ) { 
            if(order=="left"){
                y=(contwidth/2)+(width/2)-contwidth;//Y轴移位
            }else{
                y=(contwidth/2)-(width/2);//Y轴移位
            }
            for(let i=0;i<json.length;i++){
                if(order=="left"){
                    var xxxx=width;
                    if(json[i].type=="cabinet"){
                        xxxx=(width*2)+(left);
                    }
                    if(i==0){
                        if(json[i].type=="cabinet"){
                            y=y+(width/2)+(left/2);
                        }else{
                            y=y;
                        }
                    }else{
                        if(json[i].type=="cabinet"){
                            if(json[i-1].type=="cabinet"){
                                y=y+(width*2+left)+left;
                            }else{
                                y=y+width+((width+left)/2)+left;
                            }
                        }else{
                            if(json[i-1].type=="cabinet"){
                                y=y+width+((width+left)/2)+left;
                            }else{
                                y=y+width+left;
                            }
                        }
                    }
                }else{
                    var xxxx=width;
                    if(json[i].type=="cabinet"){
                        xxxx=(width*2)+(left);
                    }
                    if(i==0){
                        if(json[i].type=="cabinet"){
                            y=y-(width/2)-(left/2);
                        }else{
                            y=y;
                        }
                    }else{
                        if(json[i].type=="cabinet"){
                            if(json[i-1].type=="cabinet"){
                                y=y-(width*2+left)-left;
                            }else{
                                y=y-width-((width+left)/2)-left;
                            }
                        }else{
                            if(json[i-1].type=="cabinet"){
                            y=y-width-((width+left)/2)-left;
                            }else{
                            y=y-width-left;
                            }
                        }
                    }
                }
                
                _this.newCabinet(json[i].type,width,y,"机柜"+i,xxxx,tgroup);
            }
            _this.group=tgroup;
        
        // _this.initLabe();
        },
    //加载进度
    function ( xhr ) {
        console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
    },
    //出现错误
    function (err) {
        console.log(err);
    });
    }
    newCabinet(type,width,y,title,cabinetwidth,tgroup){
        var geometry=new THREE.BoxGeometry(
            cabinetwidth ,
            3.6,
            3.1); 
        var materail=new THREE.MeshBasicMaterial(this.mapData.materials[this.mapData.materials.length-1]);
     
        var mesh=new THREE.Mesh(geometry,materail);
        var mirrorMatrix = new THREE.Matrix4().fromArray([1,0,0,0,0,1,0,0,0,0,1,0,y,0,0,1]);
        mesh.material.type="MeshBasicMaterial";
        mesh.material.color.set(0xfffffff);
        mesh.material.map=this.textures[type];
        mesh.material.transparent=true;
        mesh.applyMatrix(mirrorMatrix);
        mesh.code=type;
        mesh.material.map=this.textures[type];
        tgroup.children.push(mesh);
        
        if(type=="cabinet"){
            geometry=new THREE.BoxGeometry(
                cabinetwidth,
                3.6,
                2.98);
            var geometryleft=new THREE.BoxGeometry(
                0.05 ,
                3.6,
                2.98);    
            var meshleft=new THREE.Mesh(geometryleft,materail.clone());//创建左边挡板
            var mirrorMatrixleft = new THREE.Matrix4().fromArray([1,0,0,0,0,1,0,0,0,0,1,0,y-(cabinetwidth/2),0,0,1]);
            meshleft.material.type="MeshBasicMaterial";
            meshleft.material.color.set(0xfffffff);
            meshleft.material.map=this.textures[type];
            meshleft.material.transparent=true;
            meshleft.applyMatrix(mirrorMatrixleft);
            meshleft.code=type;
            meshleft.material.map=this.textures[type];
            this.scene.add(meshleft);

            var meshrigth=new THREE.Mesh(geometryleft,materail.clone());//创建右边挡板
            var mirrorMatrixright = new THREE.Matrix4().fromArray([1,0,0,0,0,1,0,0,0,0,1,0,y+(cabinetwidth/2),0,0,1]);
            meshrigth.material.type="MeshBasicMaterial";
            meshrigth.material.color.set(0xfffffff);
            meshrigth.material.map=this.textures[type];
            meshrigth.material.transparent=true;
            meshrigth.applyMatrix(mirrorMatrixright);
            meshrigth.code=type;
            meshrigth.material.map=this.textures[type];
            this.scene.add(meshrigth);

            var  geometryplan=new THREE.PlaneGeometry(
                    width,
                    0.18,
                0.2);//创建展示空间、负载数值面板组件
            var mesh2=new THREE.Mesh(geometryplan,materail.clone());//创建新的网格对象
            mesh2.material.type="MeshBasicMaterial";
            mesh2.material.side=2;//两边
            mesh2.visible=false;
            mesh2.material.color.set(0xfffffff);//设置颜色
            mesh2.material.map=new THREE.CanvasTexture(this.getTextCanvas("111"));//生成文字图片题图
            mesh2.uuid=this.guid();
            mirrorMatrix = new THREE.Matrix4().fromArray([1,0,0,0,0,1,0,0,0,0,1,0,y,0,1.55,1]);//面板矩阵
            mesh2.applyMatrix(mirrorMatrix);
            this.scene.add(mesh2);
            tgroup.children.push(mesh2);
            this.data.push({"key":mesh.uuid,"datakey":mesh2.uuid});
        }else{
            this.data.push({"key":mesh.uuid});
        }
       
   
   
  var mesh2=new THREE.Mesh(geometry.clone(),materail.clone());//创建新的网格对象
    mesh2.applyMatrix(mirrorMatrix);
     geometry=new THREE.PlaneGeometry(
         width,
         0.18,
      0.2);//创建机柜名称展示面板
   var materials2=new THREE.MeshBasicMaterial(this.mapData.materials[this.mapData.materials.length-1]);
    var mesh2=new THREE.Mesh(geometry,materials2);//创建新的网格对象
    mesh2.material.type="MeshBasicMaterial";
    mesh2.material.side=2;//两边
    mesh2.material.color.set(0xfffffff);//设置颜色
    mesh2.material.map=new THREE.CanvasTexture(this.getTextCanvas(title));//生成文字图片题图
    mesh2.material.opacity=0.8;
    mesh2.material.transparent =  mesh2.material.opacity < 1 ;
    mirrorMatrix = new THREE.Matrix4().fromArray([1,0,0,0,0,1,0,0,0,0,1,0,y,1.85,1.55,1]);//面板矩阵
    mesh2.applyMatrix(mirrorMatrix);
    this.scene.add(mesh);
    this.scene.add(mesh2);
}
getTextCanvas(text){ //创建文字图片
        var width=100, height=60; 
        var canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        var ctx = canvas.getContext('2d');
       //ctx.fillStyle = '#C3C3C3';
        //  ctx.fillRect(0, 0, width, height);
        ctx.font = 35+'px "';
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(text, width/2,height/2); 
        return canvas;
        }
    
    //绘制网格
    getAreaMesh(points) {
        // console.log('---' + points);
        const shape = new THREE.Shape(); //实例一个形状

        //const [x0, y0] = points[0];
        points.forEach((p, i) => {
                //console.log(p);
                const [x, y] = p;
                if (i === 0) {
                    shape.moveTo(x, y);
                } else if (i === points.length - 1) {
                    shape.quadraticCurveTo(x, y, x, y) //二次曲线
                } else {
                    shape.lineTo(x, y, x, y);
                }
            })
            //几何体
        const geometry = new THREE.ExtrudeGeometry(
            shape, { depth: 10, bevelEnabled: false } //启用斜角
        );
        //材质
        const material = new THREE.MeshBasicMaterial({
            color: '#007cff',
            transparent: true,
            opacity: 0.5,
        });

        //合并成一个网格模型

        const mesh = new THREE.Mesh(geometry, material)
        console.log(mesh)
        return mesh;
    }

    change(uuid,flag){
        console.log(this.group)
        console.log(uuid)

        for(let i=0;i<this.group.children.length;i++){
            console.log(this.group.children[i].uuid)
            if(uuid==this.group.children[i].uuid){
                if(flag){
                    this.group.children[i].material.color.set("#ff0000");
                }else{
                    this.group.children[i].material.color.set("#333333");
                }
                
            }
        }
    }
    updatedata(uuid,flag){
        console.log(this.group)
        console.log(uuid)

        for(let i=0;i<this.group.children.length;i++){
            console.log(this.group.children[i].uuid)
            if(uuid==this.group.children[i].uuid){
                this.group.children[i].material.color.set("#ff0000");
                this.group.children[i].position.y=0;
                this.group.children[i].scale.set(1,0.5,1);
               var y= this.group.children[i].position.y;
               this.group.children[i].position.y=y-3.6*(1-0.5)/2;
                
            }
        }
    }
    mouseMousemoveEvent(event){
       for(let i=0;i< this.group.children.length;i++) {
            let divid=this.group.children[i].uuid+"_text";
            let div = document.getElementById(divid);
            if(div!=null){
                div.style.display="";
                console.log(this.group.children[i])
                div.style.left=this.transPosition(this.group.children[i].position).x + 'px';
                let posi=new THREE.Vector3(this.group.children[i].position.x,(this.group.children[i].position.y)*2,this.group.children[i].position.z-(3.6/2));
                div.style.top=this.transPosition(posi).y-100 + 'px';
            }
        }
    }
    //type 1 机柜  2负载
    switch(type){
        if(type=="1"){//机柜
            for(let i=0;i<this.data.length;i++){
                if(this.data[i].datakey!=null){
                  var obj= this.getUuidObj(this.data[i].key);
                if(obj!=null){
                    obj.material.map=this.textures["cabinet"];
                    obj.position.y=0;
                    obj.scale.set(1,1,1);
                    var y= obj.position.y;
                    obj.position.y=y-3.6*(1-1)/2;
                }
                var obj= this.getUuidObj(this.data[i].datakey);
                   if(obj!=null){
                    obj.visible=false;
                   }
                }
            }
        }else if(type=="2"){//负载
            for(let i=0;i<this.data.length;i++){
                if(this.data[i].datakey!=null){
                  var obj= this.getUuidObj(this.data[i].key);
                if(obj!=null){
                    obj.material.map=this.textures["transparent"];
                    obj.position.y=0;
                    obj.scale.set(1,0.01,1);
                    var y= obj.position.y;
                    obj.position.y=y-3.6*(1)/2;
                }
                var obj= this.getUuidObj(this.data[i].datakey);
                   if(obj!=null){
                    obj.position.y=0;
                        obj.material.opacity=0.8;
                        obj.material.transparent =  obj.material.opacity < 1 ;
                        obj.position.y=y-3.6*(1)/2+0.1;
                        obj.material.map=new THREE.CanvasTexture(this.getTextCanvas(0+"%"));//生成文字图片题图
                        obj.material.map.needsUpdate = true;
                        obj.visible=true;
                   }
                }
            }
        }

    }
    mouseClickEvent(event) {
        console.log(event)
        console.log(this.group)
        if (!this.raycaster)
            this.raycaster = new THREE.Raycaster();
        if (!this.mouse)
            this.mouse = new THREE.Vector2();

        // 将鼠标位置归一化为设备坐标。x 和 y 方向的取值范围是 (-1 to +1)
        this.mouse.x = (event.offsetX / this.dom.offsetWidth) * 2 - 1;
        this.mouse.y = -(event.offsetY / this.dom.offsetHeight) * 2 + 1;

        // 通过摄像机和鼠标位置更新射线
        this.raycaster.setFromCamera(this.mouse, this.camera);

        // 计算物体和射线的焦点
        const intersects = this.raycaster.intersectObjects(this.group.children);
        console.log(intersects)
        // if(intersects.length>0){
        //     intersects[0].object.position.y=0;
        //     intersects[0].object.scale.set(1 ,0.4, 1);
        //     let y=intersects[0].object.position.y;
        //     intersects[0].object.position.y = y-3.6*(1-0.4)/2;
        //     //intersects[0].object.material.color.set(0x66ff00,1);
        //     // intersects[0].object.material.color.set("#ff0000");
        // }
         
        if(intersects.length>0){
            for(var i=0;i<this.group.children.length;i++) {
               if(intersects[0].object.uuid==this.group.children[i].uuid && (this.group.children[i].code=="cabinet" || this.group.children[i].code=="air")){//只针对机柜和空调类型进行下一步操作
              //  intersects[0].object.material.color.set(0x66ff00,1);//设置点击模型的颜色
               // intersects[0].object.map=new THREE.CanvasTexture(this.getTextCanvas("你好"));
               // this.updatevalue(intersects[0].object.uuid,Math.ceil(Math.random()*100));
               // this.cubeLabe(intersects[0].object);//展示机柜的展示框
              
        //        intersects[0].object.position.y=0;
        //        intersects[0].object.scale.set(1,0.6,1);
        //       var y= this.group.children[i].position.y;
        //       intersects[0].object.position.y=y-3.6*(1-0.6)/2;
        //       //intersects[0].object.material.type="LineDashedMaterial";
        //       //intersects[0].object.material.color.set(0x66ff00);
        //       intersects[0].object.material.map=this.textures["transparent"];
        //     //  intersects[0].object.material.fog=true;
        //     //   ntersects[0].object.material.opacity=0.5;
        //    // intersects[0].object.material.transparent = true;
        //           for(let j=0;j<this.data.length;j++){
        //            if( intersects[0].object.uuid==this.data[j].key){
        //             var obj= this.getUuidObj(this.data[j].datakey);
        //             if(obj!=null){
        //                 obj.position.y=0;
        //                 obj.material.opacity=0.8;
        //                 obj.material.transparent =  obj.material.opacity < 1 ;
        //                 obj.position.y=y-3.6*(1)/2+0.1;
        //                 obj.material.map=new THREE.CanvasTexture(this.getTextCanvas(0.6+"%"));//生成文字图片题图
        //                 obj.material.map.needsUpdate = true;
        //                 obj.visible=true;
        //             }
        //            }
        //           }
                   continue;
               }
               this.group.children[i].material.color.set(0xfffffff);
            }
           }else{
         //   this.cubeLabe(null);//隐藏所有的展示框
           }
          
       
    }
    getUuidObj(uuid){
         for(let i=0;i<this.group.children.length;i++){
             if(this.group.children[i].uuid==uuid){
                 return this.group.children[i];
             }
         }
         return null;
    }

    
    

    //更新数据
    updatevalue(uuiddata,value){
        var obj=this.getUuidObj(uuiddata.key);//获取机柜
        obj.position.y=0;
        obj.scale.set(1,value/100,1);
        var y= obj.position.y;
        obj.position.y=y-3.6*(1-value/100)/2;
        obj=this.getUuidObj(uuiddata.datakey);//获取机柜
        obj.material.map=new THREE.CanvasTexture(this.getTextCanvas(value+"%"));//生成文字图片题图
        obj.material.map.needsUpdate = true;
    }

//三维坐标转屏幕坐标
 transPosition (position) {
    let world_vector = new THREE.Vector3(position.x, position.y, position.z);
    let vector = world_vector.project(this.camera);
    let halfWidth = window.innerWidth / 2,
        halfHeight = window.innerHeight / 2;
    return {
        x: Math.round(vector.x * halfWidth + halfWidth),
        y: Math.round(-vector.y * halfHeight + halfHeight)
    };
}
    mouseHoverEvent(event){
        console.log(event)
        console.log(this.group)
        if (!this.raycaster)
            this.raycaster = new THREE.Raycaster();
        if (!this.mouse)
            this.mouse = new THREE.Vector2();

        // 将鼠标位置归一化为设备坐标。x 和 y 方向的取值范围是 (-1 to +1)
        this.mouse.x = (event.offsetX / this.dom.offsetWidth) * 2 - 1;
        this.mouse.y = -(event.offsetY / this.dom.offsetHeight) * 2 + 1;

        // 通过摄像机和鼠标位置更新射线
        this.raycaster.setFromCamera(this.mouse, this.camera);

        // 计算物体和射线的焦点
        const intersects = this.raycaster.intersectObjects(this.group.children);
    }
}