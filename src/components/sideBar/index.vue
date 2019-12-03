<template>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activePath"
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
        }
    },
    mounted(){
        
    },
    computed: {
        ...mapGetters([
            'sidebarStatus','navList'
        ]),
        activePath() {
            this.$forceUpdate();
            const route = this.$route
            const { meta, path } = route
            if(this.baseURI==""){
                for(let i=0;i<route.matched.length;i++){
                    if(route.matched[i].path==path){
                        if(route.matched[i].parent){
                            this.baseURI=route.matched[i].parent.path;
                        }
                    }
                }
            }
            if (meta.activePath) {  //详情页等添加activePath
                return meta.activePath
            }
            return path
        },
    },
    methods:{
        backInfo:function(path){
            console.log(path)
            if(this.baseURI.indexOf(path)==-1){//用包含关系判断
                console.log("!==!==!==!==")
                sessionStorage.setItem("tabIndex", ""); //选项卡用
                this.$router.push({path:path});
                this.baseURI=path;
                this.$nextTick(function(){
                    this.$refs.navmenu.close(this.baseURI);
                    this.$refs.navmenu.open(this.baseURI);
                })
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
