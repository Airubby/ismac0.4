// var THREE = require('three') //正确
import * as THREE from 'three';
import * as d3 from 'd3-geo';
var OrbitControls = require('three-orbit-controls')(THREE)
export default class ThreeMap {
    constructor(props,mapData) {
        this.props=props;
        this.mapData=mapData;
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
        
        this.dom.addEventListener('click', this.mouseEvent.bind(this))
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
        this.camera = new THREE.PerspectiveCamera(50, this.dom.offsetWidth / this.dom.offsetHeight, 0.1, 1000);
        //向上的一个坐标系
        // this.camera.up.x = 0;
        // this.camera.up.y = 1;
        // this.camera.up.z = 0;
        this.camera.position.set(-0.265, 4.472, -6.809);
        this.camera.rotation.set(-146.70 ,-1.46 ,-178.78);
        // this.camera.lookAt(0, 0, 0)
    }
    //初始化场景
    initScene() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xffffff);
        var ambientLight=new THREE.AmbientLight(0x000000);
        ambientLight.position.set(0,10,0);
        this.scene.add(ambientLight);
    }
    //渲染
    render() {
        this.animate()
    }
    animate() {
        requestAnimationFrame(this.animate.bind(this));
        this.renderer.render(this.scene, this.camera);
    }
    setHelper() {
        //红色x,绿色y,蓝色z
        const axesHelper = new THREE.AxisHelper(5);
        this.scene.add(axesHelper);
    }
    setControl() {
        this.controls = new OrbitControls(this.camera);
        this.controls.update();
    }
    drawbox(){
        // const group = new THREE.Group();
        let loader = new THREE.ObjectLoader();
        let obj = loader.parse(this.mapData);
        this.group = obj;
        this.scene.add(obj)
        
        // var textureLoader=new THREE.TextureLoader();
        // var crateTexture=textureLoader.load(pic1);

        // var crate=new THREE.Mesh(
        //       new THREE.BoxGeometry(30,30,30),
        //       new THREE.MeshBasicMaterial({
        //           color:0xffffff,
        //           map:crateTexture
        //       })
        // )

        // this.scene.add(crate);
        
        // const group = new THREE.Group();
        // // var faceMaterial=new THREE.MeshNormalMaterial();
        // // var faceMaterial=new THREE.MeshPhongMaterial( { 
        // //     ambient: 0x050505, color: 0x0033ff, specular: 0x555555, shininess: 30 ,
        // //     map: THREE.ImageUtils.loadTexture('http://wow.techbrood.com/uploads/1702/crate.jpg') 
        // // } );
        // var faceMaterial = new THREE.MeshBasicMaterial({
        //     //map: texture,
        //     map: new THREE.TextureLoader().load(pic1), ////颜色贴图
        //     color: '#ffffff',
        //     transparent: true,
        //     opacity: 1,
        //     depthTest: false, //深度测试属性
        //     blending: THREE.AdditiveBlending, //滤镜选择
        //     side: THREE.DoubleSide
        // })
        // var cubeGeom = new THREE.BoxGeometry(29, 29, 29);
        // var cube = new THREE.Mesh(cubeGeom, faceMaterial);  
        // group.add(cube)
        // this.scene.add(cube)

      
    }
    drawMultiPolygon() {
        //console.log(this.mapData);
        this.vector3Json = [];
        this.mapData.features.forEach(element => {
            const areas = element.geometry.coordinates;
            areas.forEach(a => {
                const areaData = { coordinates: [] };
                a.forEach((point, index) => {
                    if (point[0] instanceof Array) {
                        areaData.coordinates[index] = [];
                        point.forEach(pointInner => {
                            //console.log(pointInner);
                            areaData.coordinates[index].push(this.lnglatToVector(pointInner))
                        })
                    }
                    this.vector3Json.push(areaData);
                })
            })
        });
        console.log('vector3json', this.vector3Json)
        //绘制模块
        const group = new THREE.Group();
        this.vector3Json.forEach(provinces => {
            provinces.coordinates.forEach(area => {
                const mesh = this.getAreaMesh(area);
                group.add(mesh);
            })
        });
        this.scene.add(group);
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

    //经纬度转三维坐标
    lnglatToVector(lnglat) {
        if (!this.projection) {
            this.projection = d3
                .geoMercator() //获取墨卡托坐标方法
                .center([112.946332, 28.236672])
                .scale(400)
                //.rotate(Math.PI / 4)
                .translate([0, 0]);
        }
        //const projection = d3.geoMercator().center([108.904496, 32.668849]).scale(80);
        const [y, x] = this.projection([...lnglat]);
        let z = 0;
        return [y, x, z];
    }
    mouseEvent(event) {
        console.log(event)
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
        // this.group.children.forEach(mesh => {
        //     // mesh.material.color.set('#005fc3');
        //     // mesh.material.color.set('#005fc3');
        // })
        // for (var i = 0; i < intersects.length; i++) {
        //     console.log(intersects[i])
        //     intersects[i].object.material.color.set(0xff0000);
        // }
    }
}