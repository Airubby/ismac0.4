<template>
    <div class="content">
        <div class="list-box">
            <div class="box-left">
                <div class="box-title">存储设置</div>
                <div class="box-content">
                    <span>mysql；192.168.0.11:3306；note</span>
                </div>
            </div>
            <div class="box-right" @click="editSet('storeSetInfo')">
                <span class="el-icon-edit-outline"></span>
            </div>
        </div>
        <div class="list-box">
            <div class="box-left">
                <div class="box-title">存储范围</div>
                <div class="box-content">
                    <span>定义数据存储范围和存储时间</span>
                </div>
            </div>
            <div class="box-right" @click="editSet('storeRangeInfo')">
                <span class="el-icon-edit-outline"></span>
            </div>
        </div>
        <div class="list-box">
            <div class="box-left">
                <div class="box-title">转储设置</div>
                <div class="box-content">
                    <span>依米康.龙控微模块 | 0300 | 四川省成都高新西区科园南二路2号</span>
                </div>
            </div>
            <div class="box-right">
                <span class="el-icon-edit-outline"></span>
            </div>
        </div>
        <store-set v-if="storeSetInfo.visible" :dialogInfo="storeSetInfo"></store-set>
        <store-range v-if="storeRangeInfo.visible" :dialogInfo="storeRangeInfo"></store-range>
    </div>
</template>
<script>
import StoreSet from './component/StoreSet'
import StoreRange from './component/StoreRange'
export default {
    components: {
        StoreSet,StoreRange
    },
    created() {
        
    },
    mounted() {
        
    },
    data(){
        return{
            initParams:{
                name:""
            },
            storeSetInfo:{
                visible:false
            },
            storeRangeInfo:{
                visible:false
            }
        }
    },
	methods: {
        editSet:function(type){
            this[type].visible=true;
        }
	},
    
}
</script>
<style lang="less" scoped>
    .module-theme(...){
        .list-box{
            width: 100%;
            display: flex;
            padding-bottom: @boxMargin;
            margin-bottom: @boxMargin;
            border-bottom: 1px solid @lineColor;
            .box-left{
                width: calc(100% - 60px);
                .box-title{
                    font-size: 16px;
                    color: @activeColor;
                    margin-bottom: @itemMargin;
                }
                .box-content{
                    span{
                        margin-right: @boxMargin;
                    }
                }
            }
            .box-right{
                width: 60px;
                display: flex;
                align-items: center;
                font-size: 22px;
                justify-content: center;
                cursor: pointer;
                color: @activeColor;
            }
        }
    }
</style>