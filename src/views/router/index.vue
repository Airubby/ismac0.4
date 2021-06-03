<template>
	<div class="content">
        <ul class="content-nav">
            <template v-for="(item,index) in currentConfig.children">
                <li :key="index">
                    <router-link :to="{name:item.key}">
                        {{$t(item.language)}}
                    </router-link>
                </li>
            </template>
        </ul>
        <div class="content-con">
            <div class="scrollbar">
                <el-scrollbar>
                    <router-view  class="component-con"/>
                </el-scrollbar>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
	computed:{
        ...mapGetters([
            'currentConfig'
        ]),
    },
    watch:{
        $route:function(val){
            console.log(val)
        }
    }
}
</script>
<style lang="less" scoped>
.module-theme(...){
	.content-nav{
		width:100%;
		height: 48px;
		display: flex;
		justify-content: space-around;
		li{
			width: 100%;
			height: 100%;
			text-align: center;
            line-height: 48px;
            font-size: 18px;
			a{
				display: block;
				background: @normalBg;
				color: @bgColor;
				&.router-link-exact-active,&.router-link-active{
					background: @activeBg;
				}
			}
		}
	}
	.content-con{
		width: 100%;
        height: calc(100% - 48px);
        background: @contentBg;
    }
    .component-con{
        width: 100%;
        height: 100%;
        padding: 15px;
        background: @contentBg;
    }
}
</style>