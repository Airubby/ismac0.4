<template>
    <div class="bgfffcontent">
        <div class="breadcrumb">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>{{$t("navbar.control")}}</el-breadcrumb-item>
                <el-breadcrumb-item>{{$t("navbar.controlAlarmRecord")}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="public_content">
            <el-scrollbar class="scrollbar">
                <div class="cabinet">
                    <div class="cabinet-con">
                        <div class="cabinet-u" v-for="(item,index) in cabinetU">
                            <div class="cabinet-number" :class="{'firstU':index==0,'lastU':index==cabinetU.length-1}">
                                <span class="cabinet-number-box">
                                    {{item}}
                                </span>
                                <span class="cabinet-number-box cabinet-number-boxr">
                                    {{item}}
                                    <em class="radio" :class="{'normal':index==3}"></em>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="cabinet-info" :style="{'height':heightU*18+'px'}">
                        <div class="cabinet-info-box">12323</div>
                        <div class="cabinet-info-box">12323</div>
                        <div class="cabinet-info-box">12323</div>
                    </div>
                </div>
            </el-scrollbar>
        </div>
    </div>
</template>

<script>
export default {
    created() {
        for(let i=this.heightU;i>0;i--){
            let index=i;
            if(i<10){
                index="0"+i;
            }
            this.cabinetU.push(index);
        }
    },
    mounted() {
        
    },
    data(){
        return{
            heightU:10,
            cabinetU:[],
        }
    },
	methods: {
        
	},
    components: {
        
    }
}
</script>
<style lang="less" scoped>
    .cabinet{
        width: 250px;
        padding: 10px 10px 20px;
        background: #141726;
        margin: 0 auto 15px auto;
        display: table;
        position: relative;
        .cabinet-con{
            width: 100%;
            background: #0b0c14;
            .cabinet-u{
                position:relative;
                width: 100%;
                height: 18px;
                background: #1e2238;
                border-left: 2px solid #414a75;
                border-top: 1px solid #0b0c14;
                border-bottom: 1px solid #0b0c14;
                .cabinet-number{
                    position: absolute;
                    width: calc(100% + 152px);
                    height: calc(100% + 2px);
                    top: -1px;
                    left: -55px;
                    .cabinet-number-box{
                        width: 35px;
                        height: 100%;
                        background: #353c66;
                        color: #6a7498;
                        text-align:center;
                        display:block;
                        position: absolute;
                        left:0;
                    }
                    .cabinet-number-boxr{
                        right: 45px;
                        left: auto;
                        .radio{
                            display: block;
                            width: 14px;
                            height: 14px;
                            background: #73834a;
                            border-radius: 50%;
                            position: absolute;
                            top: 2px;
                            left: 45px;
                            &.normal{
                                background:#0077e9;
                            }
                        }
                    }
                    &.firstU{
                        .cabinet-number-box:before{
                            content:"";
                            width: 35px;
                            height: 10px;
                            background: #353c66;
                            position: absolute;
                            left:0;
                            top:-10px;
                        }
                    }
                    &.lastU{
                        .cabinet-number-box:before{
                            content:"";
                            width: 35px;
                            height: 20px;
                            background: #353c66;
                            position:absolute;
                            left: 0;
                            bottom: -20px;
                        }
                    }
                }
            }
        }
        &:before{
            content:"";
            width: 20px;
            height: 100%;
            background: #353c66
        }
        .cabinet-info{
            width: 100px;
            position: absolute;
            left: -200px;
            display:flex;
            flex-wrap: wrap;
            align-content: space-between;
            top:0;
            .cabinet-info-box{
                width:100%;
            }
        }
    }
</style>