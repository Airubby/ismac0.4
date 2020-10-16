<template>
	<div class="content" v-if="currentConfig.children&&currentConfig.children.length>0">
        <ul class="content-nav">
            <template v-for="item in currentConfig.children">
                <li>
                    <router-link :to="{name:item.key}">
                        {{$t(item.language)}}
                    </router-link>
                </li>
            </template>
        </ul>
        <div class="content-con">
            <router-view />
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
	components:{},
	computed:{
        ...mapGetters([
            'currentConfig'
        ]),
	},
	methods:{
		
	},
	watch:{
		currentConfig:function(val){
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
				color: @color;
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
}
</style>