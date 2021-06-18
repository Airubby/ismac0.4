<template>
    <div class="content">
        <div class="top">
            <div class="top-box">
                <p><span>24</span></p>
                <div>{{$t("AllDev")}}</div>
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
                <el-button type="primary">批量确认</el-button>
                <el-button type="primary" plain>批量导出</el-button>
                <el-button type="primary" plain @click="handleSureSet()">告警确认</el-button>
            </div>
        </div>
        <el-table-pagination
            list-field="data.item" 
            total-field="data.total"
            :data="tableData"
            method='post' 
            type="local"
            :webSocketInfo="tableData"
            :params="initParams"
            :columns="tableColumns" ref="thisRef">   
            <el-table-column slot="prepend" type="selection"></el-table-column>
            <template slot-scope="scope" slot="preview-type">
                <div class="alarm-type">
                <i :class="{'icon-urgency':scope.row.type=='5',
                'icon-severity':scope.row.type=='4','icon-significance':scope.row.type=='3',
                'icon-general':scope.row.type=='2','icon-reminder':scope.row.type=='1'}"></i>
                {{scope.row.type | alarmShow(thisVue)}}
                </div>
            </template>
            <template slot-scope="scope" slot="preview-handle">
                <p class="table_handle">
                    <span @click="handleSure(scope.row)">确认</span>
                    <span @click="handleMask(scope.row)">屏蔽</span>
                </p>
            </template>
        </el-table-pagination>
        <alarm-sure-set :dialogInfo="suresetInfo" v-if="suresetInfo.visible"></alarm-sure-set>
        <alarm-mask :dialogInfo="maskInfo" v-if="maskInfo.visible"></alarm-mask>
        <!-- 本地data 设置v-if="tableData.length>0" -->
        <!-- <WebSocket :wsInfo="tableData" :sendInfo="{cmd:'alarm',changeSend:true}" :matchInfo="['value:state','isalarm:alarmstyle']"></WebSocket> -->
    </div>
</template>
<script>
// import Api from './config/Api'
// import Language from './config/Language'
import AlarmSureSet from './component/AlarmSureSet'
import AlarmMask from './component/AlarmMask'
import WebSocket from '@/components/WebSocket.vue'
export default {
    components: {
        AlarmSureSet,AlarmMask,WebSocket
    },
    // mixins:[Language],
    filters:{
        alarmShow: function (value,_this) {
            if (!value) return ''
            const TYPE_MAP = {
                1: _this.$t("AllDev"),
                2: "次要",
                3: "重要",
                4: "严重",
                5: "紧急",
            }
            let n = parseInt(value);
            return TYPE_MAP[n];
        }
    },
    created() {
        
    },
    mounted() {
        this.waitOperate(()=>{
            console.log("未操作")
        },10000)
    },
    data(){
        return{
            thisVue:this,
            initParams:{},
            tableData:[],
            tableColumns:[
                { prop: 'type', label: '等级',slotName:'preview-type',minWidth:10},
                { prop: 'name', label: '告警事件',minWidth:10},
                { prop: 'addr', label: '定位',minWidth:20},
                { prop: 'content', label: '触发原因',minWidth:30},
                { prop: 'time', label: '产生时间',minWidth:10},
                { prop: 'time1', label: '解除时间',minWidth:10},
                { prop: 'handle', label: '操作',slotName:'preview-handle',width:120},
            ],
            suresetInfo:{
                visible:false,
            },
            maskInfo:{
                visible:false
            }
        }
    },
    computed: {
    },
	methods: {
        waitOperate:function(callback, second){
            let count = 0;
            let x;
            let y;
            let timer;
            //监听鼠标
            document.onmousemove = function (event) {
                const x1 = event.clientX;
                const y1 = event.clientY;
                if (x != x1 || y != y1) {
                    count = 0;
                }
                x = x1;
                y = y1;
            };
            //监听键盘
            document.onkeydown = function () {
                count = 0;
            };
            function countTime() {
                count+=1000;
                if(count >=  second){
                    count = 0;
                    clearInterval(timer);
                    callback();
                }
            }
            timer = setInterval(countTime, 1000);
        },
        handleSureSet:function(){
            this.suresetInfo.visible=true;
        },
        handleMask:function(item){
            this.maskInfo.visible=true;
        },
        handleSure:function(item){
            this.$prompt('备注', '告警确认', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                // inputPattern: /\S/,
                // inputErrorMessage: '不能为空'
            }).then(({ value }) => {
                this.$message.success(value);
            });
        },
	},
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
        .alarm-type{
            display:flex;
            align-items: center;
            i{
                margin-right: @itemMargin;
            }
        }
    }
</style>