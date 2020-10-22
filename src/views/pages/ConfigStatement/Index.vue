<template>
    <div class="content">
        <div class="list-box">
            <div class="box-left">
                <div class="box-title">存储设置</div>
                <div class="box-content">
                    <span>mysql；192.168.0.11:3306；note</span>
                </div>
            </div>
            <div class="box-right">
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
            <div class="box-right">
                <span class="el-icon-edit-outline"></span>
            </div>
        </div>
        <div class="list-box">
            <div class="box-left">
                <div class="box-title">转储设置</div>
                <div class="box-content">
                    <span>转储设置</span>
                </div>
            </div>
            <div class="box-right">
                <span class="el-icon-edit-outline"></span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    created() {
        
    },
    mounted() {
        
    },
    data(){
        return{
            
        }
    },
    computed: {
    },
	methods: {
        
	},
    components: {
        
    }
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