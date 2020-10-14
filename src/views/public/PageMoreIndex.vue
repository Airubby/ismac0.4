<template>
	<div class="content">
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
			a{
				display: block;
				background: #718199;
				color: #fff;
				&.router-link-exact-active,&.router-link-active{
					background: #5a687b;
				}
			}
		}
	}
	.content-con{
		width: 100%;
		height: calc(100% - 48px);
	}
</style>