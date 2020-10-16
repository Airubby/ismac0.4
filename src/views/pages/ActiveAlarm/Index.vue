<template>
    <div class="content">
        <div class="top">
            <div class="top-box">
                <p><span>24</span></p>
                <div>接入设备总数</div>
            </div>
            <div class="top-box">
                <p><i :class="['icon-ups',true?'active':'']"></i></p>
                <div>UPS:2</div>
            </div>
            <div class="top-box">
                <p><i :class="['icon-ammeter']"></i></p>
                <div>电表:2</div>
            </div>
            <div class="top-box">
                <p><i :class="['icon-arrayabinet']"></i></p>
                <div>列头柜:2</div>
            </div>
            <div class="top-box">
                <p><i :class="['icon-air']"></i></p>
                <div>空调:2</div>
            </div>
            <div class="top-box">
                <p><i :class="['icon-humiture']"></i></p>
                <div>温湿度:2</div>
            </div>
            <div class="top-box">
                <p><i :class="['icon-leakage']"></i></p>
                <div>漏水:2</div>
            </div>
            <div class="top-box">
                <p><i :class="['icon-smoke']"></i></p>
                <div>烟感:2</div>
            </div>
        </div>
        <div class="center">
            <div class="number">
                <span>紧急(5)</span>
                <span>严重(25)</span>
                <span>重要(50)</span>
                <span>次要(15)</span>
                <span>提示(5)</span>
            </div>
            <div class="btn">
                <el-button type="primary">主要按钮</el-button>
                <el-button type="primary" plain>主要按钮</el-button>
            </div>
        </div>
        <el-table-pagination
            :url="$ajaxUrl+'/getTable'"
            list-field="data" 
            total-field="total"
            type="local"
            :data="tableData"
            method='get' 
            :params="initParams"
            :columns="tableColumns" ref="thisRef">   
            <el-table-column slot="prepend" type="selection"></el-table-column>
            <template slot-scope="scope" slot="preview-handle">
                <p class="table_handle">
                    <span>确认</span>
                    <span>屏蔽</span>
                </p>
            </template>
        </el-table-pagination>
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
            initParams:{},
            tableData:[
                {code:"1",type:"告警",indate:"告警",timegroup:"告警",jieru:"2020-12",jieru1:"2020-12"},
                {code:"1",type:"告警",indate:"告警",timegroup:"告警",jieru:"2020-12",jieru1:"2020-12"},
                {code:"1",type:"告警",indate:"告警",timegroup:"告警",jieru:"2020-12",jieru1:"2020-12"},
                {code:"1",type:"告警",indate:"告警",timegroup:"告警",jieru:"2020-12",jieru1:"2020-12"},
                {code:"1",type:"告警",indate:"告警",timegroup:"告警",jieru:"2020-12",jieru1:"2020-12"},
                {code:"1",type:"告警",indate:"告警",timegroup:"告警",jieru:"2020-12",jieru1:"2020-12"},
                {code:"1",type:"告警",indate:"告警",timegroup:"告警",jieru:"2020-12",jieru1:"2020-12"},
                {code:"1",type:"告警",indate:"告警",timegroup:"告警",jieru:"2020-12",jieru1:"2020-12"},
                {code:"1",type:"告警",indate:"告警",timegroup:"告警",jieru:"2020-12",jieru1:"2020-12"},
                {code:"1",type:"告警",indate:"告警",timegroup:"告警",jieru:"2020-12",jieru1:"2020-12"},
                {code:"1",type:"告警",indate:"告警",timegroup:"告警",jieru:"2020-12",jieru1:"2020-12"},
                {code:"1",type:"告警",indate:"告警",timegroup:"告警",jieru:"2020-12",jieru1:"2020-12"},
            ],
            tableColumns:[
                { prop: 'code', label: '等级',minWidth:10},
                { prop: 'type', label: '告警事件',minWidth:10},
                { prop: 'indate', label: '定位',minWidth:10},
                { prop: 'timegroup', label: '触发原因',minWidth:10},
                { prop: 'jieru', label: '产生时间',minWidth:10},
                { prop: 'jieru1', label: '解除时间',minWidth:10},
                { prop: 'handle', label: '操作',slotName:'preview-handle',width:120},
            ]
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
        .top{
            width: 100%;
            height: 100px;
            display: flex;
            justify-content: space-around;
            align-items: center;
            .top-box{
                text-align: center;
                p{
                    height: 60px;
                    margin-bottom: 16px;
                    span{
                        color: @activeColor;
                        font-weight: bold;
                        font-size: 50px;
                    }
                }
                i{
                    font-size: 60px;
                    &:before{
                        color: @color;
                    }
                    &.active:before{
                        color: @alarmColor
                    }
                }
            }
        }
        .center{
            display: flex;
            justify-content: space-between;
            height: 32px;
            margin: 35px 0 15px 0;
            align-items: center;
            .number{
                span{
                    border-right: 1px solid @color;
                    padding-right: 10px;
                    margin-right: 10px;
                    &:nth-last-of-type(1){
                        border: none;
                    }
                }
            }
        }
    }
</style>