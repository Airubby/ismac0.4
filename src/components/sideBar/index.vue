<template>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        v-if="show"
        :default-active="activeMenu"
        :collapse="sidebarStatus"
        :router="true"
        :unique-opened="true"
        :collapse-transition="true"
        @select="select"
        ref="navmenu"
      >
        <sidebar-item v-for="route in navList" :key="route.path" :item="route" :base-path="route.path" @backInfo="backInfo" />
      </el-menu>
    </el-scrollbar>
</template>

<script>
import SidebarItem from './SidebarItem'
import { mapGetters } from 'vuex'
export default {
    components: { SidebarItem},
    data(){
        return{
            baseURI:'',
            show:true,
        }
    },
    mounted(){
        
    },
    computed: {
        ...mapGetters([
            'sidebarStatus','navList'
        ]),
        // routes() {
        //     let routes=[
        //         {
        //             path:'/loncom/index',
        //             name:'index',
        //             meta: { show:"true", type:'nav',limits:"add,delete,detail",icon:'icon-ic_zhuye'},
        //             component: () => import('@/views/home/index.vue'),
        //         },
        //         {
        //             path: '/loncom/control',
        //             name:'control',
        //             meta: { type:'nav',show:"true",limits:"",icon:'icon-ic_jiankong'},
        //             component: () => import('@/views/control/index.vue'),
        //             redirect:"/loncom/control/devState",
        //             children:[
        //                 {
        //                     path: '/loncom/control/devState',
        //                     name:'controlDevState',
        //                     meta: { show:"true",type:'nav',limits: ""},
        //                     component: () => import('@/views/control/devState/index.vue')
        //                 },
        //                 {
        //                     path: '/loncom/control/devState/detail',
        //                     name:'controlDevStateDetail',
        //                     meta: { show:"true",type:'fun',limits: ""},
        //                     component: () => import('@/views/control/devState/detail.vue')
        //                 },
        //                 {
        //                     path: '/loncom/control/devState/add',
        //                     name:'controlDevStateAdd',
        //                     meta: { show:"true",type:'fun',limits: ""},
        //                     component: () => import('@/views/control/devState/add.vue')
        //                 },
        //                 {
        //                     path: '/loncom/control/alarmRecord',
        //                     name:'controlAlarmRecord',
        //                     meta: {show:"true",type:'nav',limits: ""},
        //                     component: () => import('@/views/control/alarmRecord/index.vue')
        //                 },
        //                 {
        //                     path: '/loncom/control/config',
        //                     name:'controlConfig',
        //                     meta: { show:"true",type:'nav',limits: ""},
        //                     component: () => import('@/views/control/config/index.vue')
        //                 },
        //             ]
        //         },
        //         {
        //             path: '/loncom/access',
        //             name:'access',
        //             meta: {show:"true",type:'nav',limits: "",icon:'icon-ic_menjin'},
        //             component: () => import('@/views/access/index.vue'),
        //             redirect:"/loncom/access/status",
        //             children:[
        //                     {
        //                         path: '/loncom/access/status',
        //                         name:'accessStatus',
        //                         meta: {show:"true",type:'nav',limits: ""},
        //                         component: () => import('@/views/access/status/index.vue')
        //                     },
        //                     {
        //                         path: '/loncom/access/cardImpower',
        //                         name:'accessCardImpower',
        //                         meta: { show:"true",type:'nav',limits: ""},
        //                         component: () => import('@/views/access/cardImpower/index.vue')
        //                     },
        //                     {
        //                         path: '/loncom/access/cardImpower/add',
        //                         name:'accessCardImpowerAdd',
        //                         meta: { show:"true",type:'fun',limits: ""},
        //                         component: () => import('@/views/access/cardImpower/add.vue')
        //                     },
        //                     {
        //                         path: '/loncom/access/config',
        //                         name:'accessConfig',
        //                         meta: {show:"true",type:'nav',limits: ""},
        //                         component: () => import('@/views/access/config/index.vue')
        //                     },
        //                     {
        //                         path: '/loncom/access/config/add',
        //                         name:'accessConfigAdd',
        //                         meta: { show:"true",type:'fun',limits: ""},
        //                         component: () => import('@/views/access/config/add.vue')
        //                 },
        //             ]
        //         },
        //         {
        //             path: '/loncom/video',
        //             name:'video',
        //             meta: {show:"true",type:'nav',limits: "",icon:'icon-ic_shipin'},
        //             component: () => import('@/views/video/index.vue'),
        //             redirect:"/loncom/video/preview",
        //             children:[
        //                 {
        //                     path: '/loncom/video/preview',
        //                     name:'videoPreview',
        //                     meta: {show:"true",type:'nav',limits: ""},
        //                     component: () => import('@/views/video/preview/index.vue')
        //                 },
        //                 {
        //                     path: '/loncom/video/playback',
        //                     name:'videoPlayback',
        //                     meta: {show:"true",type:'nav',limits: ""},
        //                     component: () => import('@/views/video/playback/index.vue')
        //                 },
        //                 {
        //                     path: '/loncom/video/config',
        //                     name:'videoConfig',
        //                     meta: {show:"true",type:'nav',limits: ""},
        //                     component: () => import('@/views/video/config/index.vue')
        //                 },
        //             ]
        //         },
        //         {
        //             path: '/loncom/energy',
        //             name:'energy',
        //             meta: {show:"true",type:'nav',limits: "",icon:'icon-ic_nengxiao'},
        //             component: () => import('@/views/energy/index.vue'),
        //             redirect:"/loncom/energy/status",
        //             children:[
        //                 {
        //                     path: '/loncom/energy/status',
        //                     name:'energyStatus',
        //                     meta: {show:"true",type:'nav',limits: ""},
        //                     component: () => import('@/views/energy/status/index.vue')
        //                 },
        //                 {
        //                     path: '/loncom/energy/config',
        //                     name:'energyConfig',
        //                     meta: {show:"true",type:'nav',limits: ""},
        //                     component: () => import('@/views/energy/config/index.vue')
        //                 },
        //             ]
        //         },
        //         {
        //             path: '/loncom/statement',
        //             name:'statement',
        //             meta: {show:"true",type:'nav',limits: "",icon:'icon-ic_baobiao'},
        //             component: () => import('@/views/statement/index.vue'),
        //             redirect:"/loncom/statement/convention",
        //             children:[
        //                 {
        //                     path: '/loncom/statement/convention',
        //                     name:'statementConvention',
        //                     meta: {show:"true",type:'nav',limits: ""},
        //                     component: () => import('@/views/statement/convention/index.vue')
        //                 },
        //                 {
        //                     path: '/loncom/statement/plan',
        //                     name:'statementPlan',
        //                     meta: {show:"true",type:'nav',limits: ""},
        //                     component: () => import('@/views/statement/plan/index.vue')
        //                 },
        //                 {
        //                     path: '/loncom/statement/config',
        //                     name:'statementConfig',
        //                     meta: {show:"true",type:'nav',limits: ""},
        //                     component: () => import('@/views/statement/config/index.vue')
        //                 },
        //             ]
        //         },
        //         {
        //             path: '/loncom/system',
        //             name:'system',
        //             meta: {show:"true",type:'nav',limits: "",icon:'icon-ic_xitong'},
        //             component: () => import('@/views/system/index.vue'),
        //             redirect:"/loncom/system/user",
        //             children:[
        //                 {
        //                     path: '/loncom/system/user',
        //                     name:'systemUser',
        //                     meta: {show:"true",type:'nav',limits: ""},
        //                     component: () => import('@/views/system/user/index.vue')
        //                 },
        //                 {
        //                     path: '/loncom/system/information',
        //                     name:'systemInformation',
        //                     meta: {show:"true",type:'nav',limits: ""},
        //                     component: () => import('@/views/system/information/index.vue')
        //                 },
        //                 {
        //                     path: '/loncom/system/config',
        //                     name:'systemConfig',
        //                     meta: {show:"true",type:'nav',limits: ""},
        //                     component: () => import('@/views/system/config/index.vue')
        //                 },
        //             ]
        //         },
        //         {
        //             path: '/loncom/assets',
        //             name:'assets',
        //             meta: {show:"true",type:'nav',limits: "",icon:'icon-ic_zichan'},
        //             component: () => import('@/views/assets/index.vue'),
        //             redirect:"/loncom/assets/cabinet",
        //             children:[
        //                 {
        //                     path: '/loncom/assets/cabinet',
        //                     name:'assetsCabinet',
        //                     meta: {show:"true",type:'nav',limits: ""},
        //                     component: () => import('@/views/assets/cabinet/index.vue')
        //                 },
        //                 {
        //                     path: '/loncom/assets/inassets',
        //                     name:'assetsInassets',
        //                     meta: {show:"true",type:'nav',limits: ""},
        //                     component: () => import('@/views/assets/inassets/index.vue')
        //                 },
        //                 {
        //                     path: '/loncom/assets/config',
        //                     name:'assetsConfig',
        //                     meta: {show:"true",type:'nav',limits: ""},
        //                     component: () => import('@/views/assets/config/index.vue')
        //                 },
        //             ]
        //         }
        //     ];
        //     return routes
        // },
        activeMenu() {
            const route = this.$route
            const { meta, path } = route
            return path
        },
    },
    methods:{
        backInfo:function(path){
            if(this.baseURI.indexOf(path)==-1){//用包含关系判断
                console.log("!==!==!==!==")
                sessionStorage.setItem("tabIndex", ""); //选项卡用
                this.$router.push({path:path});
                this.baseURI=path;
                if(!this.sidebarStatus){ //小导航的时候就不执行下面的操作
                    this.show=false;
                    this.$nextTick(()=>{
                        this.show=true;
                    })
                }
            }
        },
        select:function(index,indexpath){
            if(indexpath.length==1){ //点击的没有子菜单的项，关闭前面的
                this.$refs.navmenu.close(this.baseURI);
                this.baseURI="";  //置空后，再点击前面展开的那项，就可以路由跳转了
            }
        }
    },
    watch:{
        
    }
}
</script>
