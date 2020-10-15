<template>
    <div class="content">
        <div class="loncom_sidebar" id="sidebar">
            <div class="loncom_sidebar_top">
                <div class="loncom_fl">
                    <div class='prelative'>
                    <router-link to="/" id="smalllogo" class="smalllogo"><img :src="'images/'+$theme+'/smallLogo.png'" v-if="$theme"></router-link>
                    <router-link to="/" id="logo" class="logo"><img :src="'images/'+$theme+'/logo.png'" v-if="$theme"></router-link>
                    </div>
                </div>
                <span class="loncom_fr loncom_navbtn" @click="navclick()" ref="navbtn">
                    <i class="icon-top_unfold top-icon-color" id="top_fold"></i>
                </span>
            </div>
            <div class="loncom_sidebar_list" ref="sidebar_list">
                <ul class="loncom_nav_ul">
                    <li v-for="item in navList" v-if="navList.length>0" class="navli">
                        <a class="loncom_navmenu" @click="change($event,item.path)" :data-path="item.path">
                            <em class="aem"><i :class="item.meta.icon" ></i></em>
                            <div class="loncom_menu">
                                <span>{{$t("navbar."+item.name)}}</span>
                                <i class="loncom_menui el-icon-arrow-right" v-if="item.children&&item.children.length>0"></i>
                            </div>
                        </a>
                        <template v-if="item.children&&item.children.length>0">
                            <dl class="loncom_morenav">
                                <template v-for="initem in item.children">
                                    <dd v-if="initem.meta.type=='nav'">
                                        <router-link :to="{'name':initem.name}" class="childRouter" @click.native="changeChild($event,initem.path)">
                                            <span>{{$t("navbar."+initem.name)}}</span>
                                        </router-link>
                                    </dd>
                                </template>
                            </dl>
                        </template>
                    </li>
                </ul>
            </div>
        </div>
        <div class="loncom_sidebar_right" id="content">
            <div class="loncom_right_top">
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
                            <div class="box_con_me"><img src="images/me.png"><span>admin</span></div>
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

<script>
export default {
    // inject:['reload'],  点击刷新的时候右侧主体框刷新就可以，不用整个刷新，
    created() {
        this.getCheck();
        this.setBaseUrl();
    },
    mounted() {
        // this.$r.post("/getMockData",{},r=>{
        //     console.log(r)
        // })
        // this.$r.get("/getInfo",{},r=>{
        //     console.log(r)
        // })
        this.init();
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
         //点击导航收缩时判断用
        setBaseUrl:function(){
            this.baseURI=window.document.location.href.split("#")[1]; 
        },
        setActive:function(){
            let nav=this.$el.querySelectorAll(".loncom_navmenu");
            for(let i=0;i<nav.length;i++){
                nav[i].classList.remove("router-link-active");
                if(this.baseURI.indexOf(nav[i].getAttribute("data-path"))!=-1){
                    nav[i].classList.add("router-link-active");
                }
            }
        },
        //去掉loncom_navmenu上的active状态
        removeActive:function(className){
            let nav=this.$el.querySelectorAll(".loncom_navmenu");
            for(let i=0;i<nav.length;i++){
                nav[i].classList.remove(className);
            }
        },
        changeChild:function(event,path){
            sessionStorage.setItem("tabIndex", ""); //选项卡用
            this.baseURI=path;
            this.reload();  //刷新效果
            if(this.navbtn!='open'){
                this.setActive();
            }
        },
        //控制展开收缩用，如果默认一直展开一个导航就不需要判断change
        change:function(event,path){
            let theChild=event.target;
            while(theChild.className.indexOf("loncom_navmenu")==-1){
                theChild=theChild.parentNode;
            }
            if(this.baseURI.indexOf(path)!=-1){//用包含关系判断
                console.log("=======")
                if(this.$route.path!=this.baseURI){  //仍然跳转到原来的页面
                    this.$router.push({path:this.baseURI});
                }
                if(theChild.getAttribute("class")&&theChild.getAttribute("class").indexOf("childHidden")!=-1){
                    theChild.classList.remove("childHidden");
                }else{
                    theChild.classList.add("childHidden");
                }
                
            }else{
                console.log("!==!==!==!==")
                sessionStorage.setItem("tabIndex", ""); //选项卡用
                this.removeActive("childHidden");
                this.removeActive("router-link-active");
                theChild.classList.add("router-link-active");
                this.$router.push({path:path});
                this.baseURI=path;
            }
            
        },
        init:function(){
            if(sessionStorage.navInfo){
                this.navbtn=sessionStorage.navInfo;
            }else{
                sessionStorage.navInfo = "open";
            }
            if(this.navbtn==='open'){
                this.$el.querySelector(".loncom_nav_ul").setAttribute("class","loncom_nav_ul openactive");
                this.$el.querySelector("#sidebar").style.width="200px";
                this.$el.querySelector("#content").style.paddingLeft="200px";
                this.$el.querySelector("#smalllogo").style.left="-60px";
                this.$el.querySelector("#logo").style.left="0px";
            }else{
                this.$el.querySelector(".loncom_nav_ul").setAttribute("class","loncom_nav_ul closeactive");
                this.$el.querySelector("#sidebar").style.width="60px";
                this.$el.querySelector("#content").style.paddingLeft="60px";
                this.$el.querySelector("#smalllogo").style.left="0px";
                this.$el.querySelector("#logo").style.left="-200px";
            }
            //初始化active状态
            this.setActive();
        },
		//大小导航切换
        navclick:function(){
            if(this.navbtn=='open'){
                this.$el.querySelector("#top_fold").setAttribute("class","icon-top_fold top-icon-color");
                this.$el.querySelector(".loncom_nav_ul").setAttribute("class","loncom_nav_ul closeactive");
                this.$el.querySelector("#sidebar").style.width="60px";
                this.$el.querySelector("#sidebar").style.transition="all 0.4s ease-in";
                this.$el.querySelector("#content").style.paddingLeft="60px";
                this.$el.querySelector("#content").style.transition="all 0.4s ease-in";
                this.$el.querySelector("#smalllogo").style.left="0";
                this.$el.querySelector("#smalllogo").style.transition="all 0.4s ease-in";
                this.$el.querySelector("#logo").style.left="-200px";
                this.$el.querySelector("#logo").style.transition="all 0.4s ease-in";
                this.navbtn='close';
            }else{
                this.$el.querySelector("#top_fold").setAttribute("class","icon-top_unfold top-icon-color");
                this.$el.querySelector(".loncom_nav_ul").setAttribute("class","loncom_nav_ul openactive");
                this.$el.querySelector("#sidebar").style.width="200px";
                this.$el.querySelector("#sidebar").style.transition="all 0.4s ease-in";
                this.$el.querySelector("#content").style.paddingLeft="200px";
                this.$el.querySelector("#content").style.transition="all 0.4s ease-in";
                this.$el.querySelector("#smalllogo").style.left="-60px";
                this.$el.querySelector("#smalllogo").style.transition="all 0.4s ease-in";
                this.$el.querySelector("#logo").style.left="0";
                this.$el.querySelector("#logo").style.transition="all 0.4s ease-in";
                this.navbtn='open';
                //大导航为收缩状态切换到小导航的时候，如果再展开到大导航的时候，如果要大导航为展开状态就去掉childHidden样式，如果还是保留原来的收缩状态就不使用这个
                this.removeActive("childHidden");  
                
            }
            sessionStorage.navInfo = this.navbtn;
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
            this.$router.push({name:'controlAlarmRecord'});
            this.$nextTick(function(){
                this.removeActive("childHidden");
                this.setBaseUrl();
                this.setActive();
            })
        },

	},
    // watch: {
    //     $route(to,from){
    //         sessionStorage.setItem("tabIndex", ""); //点击切换 去除 tabs 的状态，这样进去 带有tabs 的页面 就是 默认的 first，到新增页面 返回来就在first中，不符合
    //     },
    // },
    components: {
        
    }
}
</script>
