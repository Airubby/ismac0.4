<template>
    <div class="app-wrapper">
        <div class="main-container loncom_sidebar_right">
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
                            <div class="box_con_me"><img src="/images/me.png"><span>admin</span></div>
                        </div>
                    </el-popover>
                </div>
                <div class="loncom_right_top_box">
                    <div class="box_con">
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
                                <el-dropdown-item :class="{'themeActive':$theme=='default','dropdown-item':true}">
                                    <span @click="changeTheme('default')">优雅白</span>
                                </el-dropdown-item>
                                <el-dropdown-item :class="{'themeActive':$theme=='black','dropdown-item':true}">
                                    <span @click="changeTheme('black')">炫酷黑</span>
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                </div>
                <div class="loncom_right_top_box">
                    <div class="box_con">
                        <i class="el-icon-full-screen top-icon-color"></i>
                    </div>
                </div>
                <div class="loncom_right_top_box">
                    <div class="box_con">
                        <i class="el-icon-view top-icon-color"></i>
                    </div>
                </div>
                <div class="loncom_right_top_box">
                    <div class="box_con">
                        <el-dropdown>
                            <span class="el-dropdown-link">
                                {{language}}<i class="el-icon-arrow-down el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item class="dropdown-item">
                                    <span @click="setLanguage('zh')">中文</span>
                                </el-dropdown-item>
                                <el-dropdown-item class="dropdown-item">
                                    <span @click="setLanguage('en')">英文</span>
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                </div>
          
            </div>
            <div class="loncom_content">
                <router-view/>
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
import { mapGetters } from 'vuex'
import Cookies from 'js-cookie'
export default {
    created() {
        let lang=Cookies.get('language')||'zh';
        if(lang=='zh'){
            this.language="中文"
        }else{
            this.language="英文"
        }
    },
    mounted() {
        
    },
    data(){
        return{
            language:"中文",
            loginInfo:{
                userid:"admin",
                phone:"15252525252",
                email:"123@qq.com"
            }
        }
    },
    computed: {
    },
	methods: {
        setLanguage:function(language){
            if(language=="zh"){
                this.language="中文"
            }else{
                this.language="English"
            }
            this.$i18n.locale = language
            this.$store.dispatch('setLanguage', language)
        },
        changeTheme:function(theme){
            this.$store.dispatch('setTheme',theme);
            sessionStorage.setItem("theme", theme);
        },
	},
    components: {
        
    }
}
</script>
