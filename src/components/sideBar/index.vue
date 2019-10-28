<template>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        v-if="show"
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
            show:true,
        }
    },
    mounted(){
        
    },
    computed: {
        ...mapGetters([
            'sidebarStatus','navList'
        ]),
        activePath() {
            const route = this.$route
            const { meta, path } = route
            if (meta.activePath) {  //详情页等添加activePath
                return meta.activePath
            }
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
