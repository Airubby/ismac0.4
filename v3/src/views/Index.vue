<template>
  <div class="content content-flex">
    <div class="content-left">
        <ul class="scrollbar">
            <el-scrollbar>
                <template v-for="(item,index) in $store.getters.config">
                    <li :key="index">
                        <router-link :to="{name:item.key}">
                            <div class="nav-box">
                                <div class="nav-box-con">
                                    <div class="nav-box-con-img">
                                        <i :class="item.iconfont"></i>
                                    </div>
                                    <p>{{$t(item.language)}}</p>
                                </div>
                            </div>
                        </router-link>
                    </li>
                </template>
            </el-scrollbar>
        </ul>
    </div>
    <div class="content-right">
      <div class="content-right-top">
            <div class="content-right-top-logo">
                <router-link to="/loncom"><img :src="'/images/theme/'+$theme+'/logo.png'" v-if="$theme&&$store.getters.showTheme"></router-link>
            </div>
            <div class="index-right-top-list">
                <el-dropdown trigger="click">
                    <span class="el-dropdown-link el-dropdown-link-down">
                        {{getLanguage}}<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item :class="[$lang=='zh'?'active':'','dropdown-item']">
                            <span @click="setLanguage('zh')">中文</span>
                        </el-dropdown-item>
                        <el-dropdown-item :class="[$lang=='en'?'active':'','dropdown-item']">
                            <span @click="setLanguage('en')">English</span>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
            <div class="index-right-top-list">
                <el-dropdown trigger="click">
                    <span class="el-dropdown-link">
                        <i class="icon-skin"></i>{{$t("SkinPeeler")}}
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item :class="[$theme=='partysu'?'active':'','dropdown-item']">
                            <span @click="changeTheme('partysu')">{{$t("Partysu")}}</span>
                        </el-dropdown-item>
                        <el-dropdown-item :class="[$theme=='blue'?'active':'','dropdown-item']">
                            <span @click="changeTheme('blue')">{{$t("TechnologyBlue")}}</span>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
            <div class="index-right-top-list" @click="enterBigScreen">
                <i class="icon-screen"></i>{{$t("BigScreen")}}
            </div>
            <div class="index-right-top-list">
                <i class="icon-acousto"></i>{{$t("AcoustoOptic")}}
            </div>
            <div class="index-right-top-list">
                <div class="top-user">
                    <img src="/images/me.png" class="userid"/>Airubby
                </div>
            </div>
            <div>
                <p style="font-size:26px;">{{date.hours}}:{{date.minutes}}:{{date.seconds}}</p>
                <p style="font-size:12px;">{{date.year}}-{{date.month}}-{{date.day}}<span>{{date.week}}</span></p>
            </div>
      </div>
      <div class="content-body">
        <router-view  />
      </div>
    </div>
    <alarm-video v-if="videoInfo.visible" :dialogInfo="videoInfo"></alarm-video>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
import Vue from 'vue'
import AlarmVideo from '@/components/AlarmVideo'
export default {
    name: 'index',
    components: { AlarmVideo},
    created () {
        console.log(this.$theme)
        this.date=this.setClock();
    },
    mounted() {
        setInterval(()=>{
            this.date=this.setClock();
        },1000);
    },
    computed:{
        getLanguage:function(){
            let language=this.$store.getters.language;
            if(language=="en"){
                document.title="T-block";
                return "English"
            }else{
                document.title="小微产品0.4";
                return "中文"
            }
        },
    },
    data(){
        return{
            date:{
                year:'',
                month:'',
                day:'',
                hours:'',
                minutes:'',
                seconds:''
            },
            vWeek: [this.$t("SUN"),this.$t("Mon"),this.$t("Tues"),this.$t("Wed"),this.$t("Thurs"),this.$t("Fir"),this.$t("Sat")],
            videoInfo:{
                visible:false
            }
        }
    },
    methods: {
        setLanguage:function(language){
            this.$i18n.locale = language
            this.$store.dispatch('setLanguage', language);
            Vue.prototype.$lang=language;
            this.vWeek=[this.$t("SUN"),this.$t("Mon"),this.$t("Tues"),this.$t("Wed"),this.$t("Thurs"),this.$t("Fir"),this.$t("Sat")];
        },
        setClock:function(){
            let vDate={};
            // vWeek = ["星期天","星期一","星期二","星期三","星期四","星期五","星期六"];
            // vWeek = ["SUN","Mon","Tues","Wed","Thurs","Fir","Sat"];
            let date =  new Date();
            vDate["year"] = date.getFullYear();
            vDate["month"] =( date.getMonth() + 1)<10?("0"+ (date.getMonth() + 1)): date.getMonth() + 1;
            vDate["day"] = date.getDate()<10?("0"+date.getDate()):date.getDate();
            vDate["hours"] = date.getHours()<10?("0"+date.getHours()):date.getHours();
            vDate["minutes"] = date.getMinutes()<10?("0"+date.getMinutes()):date.getMinutes();
            vDate["seconds"] = date.getSeconds()<10?("0"+date.getSeconds()):date.getSeconds();
            vDate["week"] = this.vWeek[date.getDay()];
            return vDate;
        },
        changeTheme:function(theme){
            this.$store.dispatch('setTheme',theme);
            Vue.prototype.$theme=theme;
            sessionStorage.setItem("theme", theme);
        },
        enterBigScreen(){
            this.$router.push({path:'/bigScreen'});
        }
    }
}
</script>
<style lang="less" scoped>
    .module-theme(...){
        .el-dropdown-menu__item.active{
            color: @activeColor;
        }
        .content-flex{
            display: flex;
        }
        .content-left{
            width: 160px;
            height: 100%;
            ul {
                width: 100%;
                height: 100%;
                background: @navBg;
                li {
                    width: 100%;
                    height: auto;
                    padding: 18px 0;
                    .nav-box{
                        display: flex;
                        width: 100%;
                        height: 100%;
                        align-items: center;
                        .nav-box-con{
                            vertical-align: middle;
                            text-align: center;
                            font-size: 14px;
                            width: calc(100% - 4px);
                            border-left: 4px solid @navBg;
                            .nav-box-con-img{
                                width: 30px;
                                height: 30px;
                                overflow: hidden;
                                margin: 0 auto 2px auto;
                                i{
                                    font-size: 30px;
                                    &:before{
                                        color: @color;
                                    }
                                }
                            }
                            img{
                                height: 30px;
                            }
                            p{
                                color: @color;
                            }
                        }
                    }
                    a.router-link-active{
                        .nav-box .nav-box-con{
                            border-color: @activeColor;
                            .nav-box-con-img{
                                i:before{
                                    color: @activeColor;
                                }
                            }
                            p{
                                color: @activeColor;
                            }
                        } 
                    }
                }
                li:nth-last-of-type(1){
                    border: none;
                }
            }
        }
        .content-right {
            width: calc(100% - 160px);
            height: 100%;
            background: @bodyBg;
            .content-right-top{
                display: flex;
                white-space: nowrap;
                align-items: center;
                background: @bodyTopBg;
                width: 100%;
                height: 64px;
                padding: 0 15px;
                .content-right-top-logo{
                    font-size: 26px;
                    line-height: 64px;
                    display: flex;
                    align-items: center;
                    width: 100%;
                    min-width: 260px;
                    margin-right: 20px;
                    a{
                        display: flex;
                        align-items: center;
                    }
                    img{
                        max-width: 100%;
                        max-height: 64px;
                    }
                }
                .index-right-top-list{
                    font-size: 16px;
                    margin: 0 15px;
                    cursor: pointer;
                    i{
                        font-size: 24px;
                        vertical-align: middle;
                        margin-right: 8px;
                        &:before{
                            color: @color;
                        }
                    }
                    .top-user{
                        display: flex;
                        align-items: center;
                        img{
                            width: 44px;
                            height: 44px;
                            border-radius: 50%;
                            margin-right: 8px;
                        }
                    }
                }
                
            }
            .content-body{
                width: 100%;
                height: calc(100% - 64px);
                padding: 15px;
            }
        }
        .el-dropdown-link{
            font-size: 16px;
        }
        .el-dropdown-link-down{
            i{
                font-size: 20px !important;
            }
        }
    }
</style>
