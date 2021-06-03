<template>
    <div class="centermap">
        <div>
            <div class="table-box">
                <div class="table-box-list">
                    <div class="table-box-span">
                        源1参数 自市电1
                    </div>
                    <div class="table-box-span"><span>A</span></div>
                    <div class="table-box-span"><span>B</span></div>
                    <div class="table-box-span"><span>C</span></div>
                </div>
                <div class="table-box-list border-top">
                    <div class="table-box-span">相电压(V)</div>
                    <div class="table-box-span"><span class="table-value">220</span></div>
                    <div class="table-box-span"><span class="table-value">220</span></div>
                    <div class="table-box-span"><span class="table-value">220</span></div>
                </div>
                <div class="table-box-list border-top">
                    <div class="table-box-span">线电压(V)</div>
                    <div class="table-box-span"><span class="table-value">5.0</span></div>
                    <div class="table-box-span"><span class="table-value">5.0</span></div>
                    <div class="table-box-span"><span class="table-value">5.0</span></div>
                </div>
                <div class="table-box-list border-top">
                    <div class="table-box-span">频率(Hz)</div>
                    <div class="table-box-span"></div>
                    <div class="table-box-span"><span class="table-value">5.0</span></div>
                    <div class="table-box-span"></div>
                </div>
            </div>
        </div>
        <div class="centerimg">
            <img :src="templateUrl+'/images/ats.png'">
            <div class="info">
                <div><span class="title">开关位置</span><span>源1</span></div>
                <div><span class="title">手自动状态</span><span>自动</span></div>
            </div>
        </div>
        <div>
            <div class="table-box">
                <div class="table-box-list">
                    <div class="table-box-span">
                        源2参数 自cai柴发1-1
                    </div>
                    <div class="table-box-span"><span>A</span></div>
                    <div class="table-box-span"><span>B</span></div>
                    <div class="table-box-span"><span>C</span></div>
                </div>
                <div class="table-box-list border-top">
                    <div class="table-box-span">相电压(V)</div>
                    <div class="table-box-span"><span class="table-value">220</span></div>
                    <div class="table-box-span"><span class="table-value">220</span></div>
                    <div class="table-box-span"><span class="table-value">220</span></div>
                </div>
                <div class="table-box-list border-top">
                    <div class="table-box-span">线电压(V)</div>
                    <div class="table-box-span"><span class="table-value">5.0</span></div>
                    <div class="table-box-span"><span class="table-value">5.0</span></div>
                    <div class="table-box-span"><span class="table-value">5.0</span></div>
                </div>
                <div class="table-box-list border-top">
                    <div class="table-box-span">频率(Hz)</div>
                    <div class="table-box-span"></div>
                    <div class="table-box-span"><span class="table-value">5.0</span></div>
                    <div class="table-box-span"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
module.exports = {
    props:["templateData","templateUrl","dataObject"],
    components:{
        
    },
    created() {
        
    },
    mounted() {
        
    },
    data(){
        return{
            initParams:{
               
            }
        }
    },
	methods: {
        selectPoint:function(key){
            this.$emit("selectPoint",key)
        },
        enterPage:function(key){
            this.$emit("selectUrl",key)
        }
    },
    watch:{
        dataObject:{
            handler:function(val){
                this.initParams=Object.assign(this.initParams,val)
            },
            deep: true, 
            immediate: true
        }
    }
}
</script>
<style lang="less" scoped>
    .centermap{
        width: 100%;
        height: 100%;
        min-width: 800px;
        min-height: 500px;
        display: flex;
        justify-content: space-between;
    }
    .table-box{
        border: 1px solid #258BC0;
        border-radius: 5px;
    }
    .table-text{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .table-box-list{
        display: flex;
        margin: 5px 0;
    }
    .table-box-list .table-box-span{
        width: 70px;
        min-height: 30px;
        line-height: 30px;
        text-align: center;
    }
    .table-box-list .table-box-span img{
        max-width: 20px;
        max-height: 20px;
        margin-right: 5px;
    }
    .table-box-list .table-box-span:nth-of-type(1){
        width: 120px;
        display: flex;
        justify-content: center;
        align-items: center;
        line-height: 22px;
    }
    .table-box-list .table-value{
        border: 1px solid #258BC0;
        border-radius: 20px;
        padding: 0 10px;
    }
    .centerimg{
        width: 300px;
        position: relative;
        img{
            max-width: 100%;
        }
        .info{
            position: absolute;
            left:0;
            top:250px;
            .title{
                width: 75px;
                display: inline-block;
                text-align: right;
                margin-right: 10px;
                margin-bottom: 5px;
            }
        }
    }
</style>
