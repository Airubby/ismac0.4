<template>
    <div class="app-wrapper" :class="classObj">
        <div class="sidebar-container">
            <div class="loncom_sidebar_top">
                <router-link to="/" v-if="sidebarStatus"><img :src="'/images/'+$theme+'/smallLogo.png'" v-if="$theme" style="width:54px;"></router-link>
                <router-link to="/" v-if="!sidebarStatus"><img :src="'/images/'+$theme+'/logo.png'" v-if="$theme"></router-link>
            </div>
            <div class="loncom_sidebar_list">
                <sidebar @backFn="reload"/>
            </div>
        </div>
        <div class="main-container loncom_sidebar_right">
            <div class="loncom_right_top">
                <div class="loncom_fl loncom_navbtn" @click="toggleClick()">
                    <i class="top-icon-color" :class="{'icon-top_unfold':!sidebarStatus,'icon-top_fold':sidebarStatus}"></i>
                </div>
                <div class="loncom_right_top_box">
                    <el-popover
                        placement="bottom"
                        trigger="hover">
                        <div class="loncom_index_user_info" style="width:200px;height: 150px;">
                            <h2>
                                <span>账户信息</span>
                            </h2>
                            <ul>
                                <li>
                                    <label>账号：</label><div class="loncom_dis_inline">{{loginInfo.userid}}</div>
                                </li>
                                <li>
                                    <label>电话：</label><div class="loncom_dis_inline">{{loginInfo.phone}}</div>
                                </li>
                                <li>
                                    <label>邮箱：</label><div class="loncom_dis_inline">{{loginInfo.email}}</div>
                                </li>
                            </ul>
                        </div>
                        <div class="box_con" slot="reference">
                            <div class="box_con_me"><img src="/images/me.png"><span>admin</span></div>
                        </div>
                    </el-popover>
                </div>
                <!--
                <div class="loncom_right_top_box">
                    <div class="box_con">
                        <div class="box_con_me"><img src="images/me.png"><span>admin</span></div>
                    </div>
                </div>
                -->
                <div class="loncom_right_top_box">
                    <div class="box_con" @click="enterAlarm()">
                        <el-badge :value="200" :max="99" class="item">
                            <i class="el-icon-bell top-icon-color"></i>
                        </el-badge>
                    </div>
                </div>
                <div class="loncom_right_top_box">
                    <div class="box_con">
                        <el-dropdown>
                            <i class="el-icon-magic-stick top-icon-color"></i>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item :class="{'themeActive':$theme=='default'}"><span @click="changeTheme('default')">优雅白</span></el-dropdown-item>
                                <el-dropdown-item :class="{'themeActive':$theme=='black'}"><span @click="changeTheme('black')">炫酷黑</span></el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                </div>
                <div class="loncom_right_top_box">
                    <div class="box_con">
                        <i class="el-icon-full-screen top-icon-color" @click="switcFullScreen"></i>
                    </div>
                </div>
                <div class="loncom_right_top_box" v-if="check">
                    <div class="box_con">
                        <i class="el-icon-view top-icon-color" @click="enterFullScreen"></i>
                    </div>
                </div>
                
            </div>
            <div class="loncom_content">
                <router-view v-if="isRouterAlive"/>
            </div>
        </div>
    </div>
    
</template>
<style lang="less" scoped>
    .loncom_sidebar_top{
        width: 100%;
        height: 64px;
        display: table;
        a{
            transition: all 0.6s;
            display: table-cell;
            vertical-align: middle;
        }
    }
    .loncom_sidebar_list{
        width: 100%;
        height: calc(100% - 64px);
    }
    .loncom_navbtn{
        width: 20px;
        height: 20px;
        position: absolute;
        left: 10px;
        top: 15px;
    }
</style>
<script>
import  Sidebar from '@/components/sidebar/index.vue'
import { mapGetters } from 'vuex'
export default {
    // inject:['reload'],  点击刷新的时候右侧主体框刷新就可以，不用整个刷新，
    created() {
        this.getCheck();
    },
    mounted() {
        // this.$r.post("/getMockData",{},r=>{
        //     console.log(r)
        // })
        // this.$r.get("/getInfo",{},r=>{
        //     console.log(r)
        // })
        //加载完成了去掉根节点的loading;
        this.$nextTick(function(){
            this.$emit("routerLoading")
        })
    },
    data(){
        return{
            visible:false,
            navbtn:'open',
            baseURI:'',
            isRouterAlive:true,
            loginInfo:{
                userid:"admin",
                phone:"15252525252",
                email:"123@qq.com"
            }
        }
    },
    computed: {
        ...mapGetters([
            'sidebarStatus'
        ]),
        classObj() {
            return {
                hideSidebar: this.sidebarStatus,
                openSidebar: !this.sidebarStatus,
            }
        },
        navList: {
            get() {
                return this.$store.getters.navList
            },
        },
        check:{
            get(){
                return this.$store.getters.isview
            },
        }
    },
	methods: {
        toggleClick() {
            this.$store.dispatch('toggleSideBar')
        },
        getCheck:function(){
            this.$r.post('/getCheck',{},r=>{
                console.log(r)
                if(r.err_code=='0'){
                    this.$store.dispatch('setIsview',r.data);
                }
            })
        },
        reload(){
            this.isRouterAlive=false;
            this.$nextTick(function(){
                this.isRouterAlive=true;
            })
        },
       
        changeTheme:function(theme){
            this.$store.dispatch('setTheme',theme);
            sessionStorage.setItem("theme", theme);
        },
        switcFullScreen:function(){
			this.$tool.switcFullScreen();
		},
        enterFullScreen:function(){
            this.$router.push({path:'/bigHome'});
        },
        enterAlarm:function(){
            sessionStorage.setItem("tabIndex", ""); //选项卡用
            // this.$router.push({name:'controlAlarmRecord'});
            this.$router.push({name:'accessConfig'});
            this.$nextTick(function(){
                this.reload();  //如果跳转的页面带tab的时候 就 reload刷新就可以  在第一个去了
            })
        },

	},
    // watch: {
    //     $route(to,from){
    //         sessionStorage.setItem("tabIndex", ""); //点击切换 去除 tabs 的状态，这样进去 带有tabs 的页面 就是 默认的 first，到新增页面 返回来就在first中，不符合
    //     },
    // },
    components: {
        Sidebar
    }
}
</script>
