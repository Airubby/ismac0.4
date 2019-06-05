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
                    <ul>
                        <li v-for="item in navList" v-if="navList.length>0" class="navli">
                            <div class="loncom_nav" @click="change($event)">
                                <em><img :src="'images/'+$theme+'/'+item.meta.icon" v-if="$theme"></em>
                                <div class="loncom_menu showhide" v-if="item.children">
                                    <span>{{$t("navbar."+item.name)}}</span>
                                    <i class="loncom_menui el-icon-arrow-down"></i>
                                </div>
                                <div class="loncom_menu showhide" v-else>
                                    <span><router-link :to="{'name':item.name}">{{$t("navbar."+item.name)}}</router-link></span>
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
    name: 'home',
    created() {
        // this.navList=store.getters.navList;
        // console.log(this.navList)
    },
    mounted() {
        // this.$r.post("/getMockData",{params:{"tew":'12321'}},r=>{
        //     console.log(r)
        // })
        // this.$r.get("/getInfo",{params:{"tew":'12321'}},r=>{
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
            let dom=event.target;
            if(event.target.className!="loncom_nav"){
                dom=event.target.offsetParent;
            }
            if(dom.nextSibling.getAttribute("class").indexOf("active")!=-1){
                dom.nextSibling.classList.remove("active");
                dom.querySelector(".loncom_menui")&&dom.querySelector(".loncom_menui").setAttribute("class","loncom_menui el-icon-arrow-down");
            }else{
                dom.nextSibling.classList.add("active");
                dom.querySelector(".loncom_menui")&&dom.querySelector(".loncom_menui").setAttribute("class","loncom_menui el-icon-arrow-up");
            }

            // let theChild=event.target;
            // while(theChild.parentNode!=null){
            //     if(theChild.parentNode.className&&theChild.parentNode.className.indexOf("navli")!=-1){
            //         if(theChild.parentNode.className.indexOf("showactive")!=-1){
            //             theChild.parentNode.classList.remove("showactive");
            //             theChild.parentNode.querySelector(".loncom_menui")&&theChild.parentNode.querySelector(".loncom_menui").setAttribute("class","loncom_menui el-icon-arrow-down");
            //         }else{
            //             theChild.parentNode.classList.add("showactive");
            //             theChild.parentNode.querySelector(".loncom_menui")&&theChild.parentNode.querySelector(".loncom_menui").setAttribute("class","loncom_menui el-icon-arrow-up");
            //         }
            //         break;
            //     }
            //     theChild=theChild.parentNode;
            // }

        },
        init:function(){
            let theChild=this.$el.querySelector(".loncom_sidebar_list .router-link-active");
            while(theChild.parentNode!=null){
                if(theChild.parentNode.className&&theChild.parentNode.className.indexOf("loncom_morenav")!=-1){
                    theChild.parentNode.classList.add("active");
                    theChild.parentNode.previousSibling.querySelector(".loncom_menui")&&theChild.parentNode.previousSibling.querySelector(".loncom_menui").setAttribute("class","loncom_menui el-icon-arrow-up")
                    break;
                }
                theChild=theChild.parentNode;
            }
            // let theChild=this.$el.querySelector(".loncom_sidebar_list .router-link-active");
            // while(theChild.parentNode!=null){
            //     if(theChild.parentNode.className&&theChild.parentNode.className.indexOf("navli")!=-1){
            //         theChild.parentNode.classList.add("active");
            //         if(theChild.parentNode.querySelector(".loncom_morenav")){
            //             theChild.parentNode.querySelector(".loncom_menui")&&theChild.parentNode.querySelector(".loncom_menui").setAttribute("class","loncom_menui el-icon-arrow-up");
            //         }else{
            //             theChild.parentNode.classList.add("onlyactive");
            //         }
            //         break;
            //     }
            //     theChild=theChild.parentNode;
            // }
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
                this.$el.querySelector("#sidebar").style.width="60px";
                this.$el.querySelector("#sidebar").style.transition="all 0.4s ease-in";
                this.$el.querySelector("#content").style.paddingLeft="60px";
                this.$el.querySelector("#content").style.transition="all 0.4s ease-in";
                let morenav=this.$el.querySelectorAll(".loncom_morenav");
                for(let i=0;i<morenav.length;i++){
                    morenav[i].style.display="none";
                }
                while(theChild.parentNode!=null){
                    if(theChild.parentNode.className&&theChild.parentNode.className.indexOf("loncom_morenav")!=-1){
                        theChild.parentNode.previousSibling.classList.add("active");
                        break;
                    }
                    theChild=theChild.parentNode;
                }
                this.navbtn='close';
            }else{
                this.$el.querySelector("#sidebar").style.width="250px";
                this.$el.querySelector("#sidebar").style.transition="all 0.4s ease-in";
                this.$el.querySelector("#content").style.paddingLeft="250px";
                this.$el.querySelector("#content").style.transition="all 0.4s ease-in";
                let morenav=this.$el.querySelectorAll(".loncom_morenav");
                for(let i=0;i<morenav.length;i++){
                    morenav[i].style.display="";
                }
                while(theChild.parentNode!=null){
                    if(theChild.parentNode.className&&theChild.parentNode.className.indexOf("loncom_morenav")!=-1){
                        theChild.parentNode.previousSibling.classList.remove("active");
                        break;
                    }
                    theChild=theChild.parentNode;
                }
                this.navbtn='open';
            }
        },
	},
    components: {
        
    }
}
</script>
