<template>
    <div class="content">
        <div class="loncom_sidebar" id="sidebar">
            <div class="loncom_sidebar_top">
                <div class="loncom_fl">
                    <router-link to="/" class="loncom_logo"><img :src="'images/'+$theme+'/logo.png'" v-if="$theme"></router-link>
                </div>
                <span class="loncom_fr loncom_navbtn" @click="navclick" ref="navbtn">
                    <img :src="'images/'+$theme+'/top_change.svg'" v-if="$theme">
                </span>
            </div>
            <div class="loncom_sidebar_list" ref="sidebar_list">
                <el-scrollbar class="scrollbar">
                    <ul class="loncom_nav_ul">
                        <li v-for="item in navList" v-if="navList.length>0" class="navli">
                            <div class="loncom_nav" @click="change($event)">
                                <div class="loncom_nav_con" v-if="item.children">
                                    <em v-if="navbtn=='close'">
                                        <router-link :to="{'name':item.name}" class="aem">
                                            <img :src="'images/'+$theme+'/'+item.meta.icon" v-if="$theme">
                                        </router-link>
                                    </em>
                                    <em v-else class="aem"><img :src="'images/'+$theme+'/'+item.meta.icon" v-if="$theme"></em>
                                    <div class="loncom_menu showhide">
                                        <span>{{$t("navbar."+item.name)}}</span>
                                        <i class="loncom_menui el-icon-arrow-down"></i>
                                    </div>
                                </div>
                                <div class="loncom_nav_con" v-else>
                                    <router-link :to="{'name':item.name}">
                                        <em class="aem"><img :src="'images/'+$theme+'/'+item.meta.icon" v-if="$theme"></em>
                                        <div class="loncom_menu showhide">
                                            <span>{{$t("navbar."+item.name)}}</span>
                                        </div>
                                    </router-link>
                                </div>
                            </div>
                            <template v-if="item.children">
                                <dl class="loncom_morenav showhide">
                                    <template v-for="initem in item.children">
                                        <dd v-if="initem.meta.type=='nav'">
                                            <router-link :to="{'name':initem.name}">
                                                <span>{{$t("navbar."+initem.name)}}</span>
                                            </router-link>
                                        </dd>
                                    </template>
                                </dl>
                            </template>
                        </li>
                    </ul>
                </el-scrollbar>
            </div>
        </div>
        <div class="loncom_sidebar_right" id="content">
            <div class="loncom_right_top">
                <div class="loncom_right_top_box">
                    <div class="box_con">
                        <el-dropdown>
                            <div class="box_con_me"><img src="images/me.png"><span>admin</span></div>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item> 退 出 </el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                </div>
                <div class="loncom_right_top_box">
                    <div class="box_con">
                        <el-badge :value="200" :max="99" class="item">
                            <i class="el-icon-bell"></i>
                        </el-badge>
                    </div>
                </div>
                
            </div>
            <div class="loncom_content">
                <router-view />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    created() {
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
            navbtn:'open',
        }
    },
    computed: {
        navList: {
            get() {
                return this.$store.getters.navList
            },
        }
    },
	methods: {
        change:function(event){
            if(this.navbtn=='open'){
                let theChild=event.target;
                while(theChild.className!="loncom_nav"){
                    theChild=theChild.parentNode;
                }
                if(theChild.nextSibling.getAttribute("class")&&theChild.nextSibling.getAttribute("class").indexOf("active")!=-1){
                    theChild.nextSibling.classList.remove("active");
                    theChild.querySelector(".loncom_menui")&&theChild.querySelector(".loncom_menui").setAttribute("class","loncom_menui el-icon-arrow-down");
                }else{
                    theChild.nextSibling.classList.add("active");
                    theChild.querySelector(".loncom_menui")&&theChild.querySelector(".loncom_menui").setAttribute("class","loncom_menui el-icon-arrow-up");
                }
            }
        },
        initnav:function(){
            let doms=this.$el.querySelectorAll(".loncom_sidebar_list .router-link-active");
            for(let i=0;i<doms.length;i++){
                let theChild=doms[i];
                while(theChild.parentNode!=null){
                    if(theChild.parentNode.className&&theChild.parentNode.className.indexOf("loncom_morenav")!=-1){
                        theChild.parentNode.classList.add("active");
                        theChild.parentNode.previousSibling.querySelector(".loncom_menui")&&theChild.parentNode.previousSibling.querySelector(".loncom_menui").setAttribute("class","loncom_menui el-icon-arrow-up")
                        break;
                    }
                    theChild=theChild.parentNode;
                }
            }
            
        },
        init:function(){
            this.initnav();
            if(this.navbtn==='open'){
                this.$el.querySelector("#sidebar").style.width="250px";
                this.$el.querySelector("#content").style.paddingLeft="250px";
            }else{
                this.$el.querySelector("#sidebar").style.width="60px";
                this.$el.querySelector("#content").style.paddingLeft="60px";
            }
        },
		//展开收缩
        navclick:function(){
            let theChild=this.$el.querySelector(".loncom_sidebar_list .router-link-active");
            if(this.navbtn=='open'){
                let morenav=this.$el.querySelectorAll(".loncom_morenav");
                for(let i=0;i<morenav.length;i++){
                    morenav[i].classList.remove("active");
                    morenav[i].previousSibling.querySelector(".loncom_menui")&&morenav[i].previousSibling.querySelector(".loncom_menui").setAttribute("class","loncom_menui el-icon-arrow-down")
                }
                this.$el.querySelector("#sidebar").style.width="60px";
                this.$el.querySelector("#sidebar").style.transition="all 0.4s ease-in";
                this.$el.querySelector("#content").style.paddingLeft="60px";
                this.$el.querySelector("#content").style.transition="all 0.4s ease-in";
                this.navbtn='close';
            }else{
                this.$el.querySelector("#sidebar").style.width="250px";
                this.$el.querySelector("#sidebar").style.transition="all 0.4s ease-in";
                this.$el.querySelector("#content").style.paddingLeft="250px";
                this.$el.querySelector("#content").style.transition="all 0.4s ease-in";
                this.initnav();
                this.navbtn='open';
            }
            while(theChild.parentNode!=null){
                if(theChild.className&&theChild.className.indexOf("loncom_nav_ul")!=-1){
                    theChild.setAttribute("class","loncom_nav_ul "+this.navbtn+"active")
                    break;
                }
                theChild=theChild.parentNode;
            }
            
        },
	},
    components: {
        
    }
}
</script>
