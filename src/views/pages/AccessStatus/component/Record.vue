<template>
    <div class="content">
        <div class="topbox">
            <div class="flex">
                <template v-for="(item,index) in btnList">
                    <el-button :type="item.active?'primary':'text'" size="mini" :key="index" @click="clickBtn(index)">{{item.name}}</el-button>
                </template>
                <div class="top-date">
                    <el-date-picker
                    v-model="initParams.value"
                    type="datetimerange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                    </el-date-picker>
                </div>
                <div class="top-select">
                    <el-button :type="'text'" size="mini" class="select-title">门通道</el-button>
                    <el-select v-model="value" placeholder="请选择">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="top-btn">
                <el-button type="primary" @click="exportFn()">导出</el-button>
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
            btnList:[
                {name:"今日",active:true},
                {name:"本周",active:false},
                {name:"本月",active:false},
                {name:"自定义",active:false},
            ],
            options:[

            ],
            initParams:{
                value:""
            },
            tableData:[
                {'a':"admin",b:"管理员",'c':"2020-3-10~2021-2-22",d:'15225252525',e:"123@qq.com",f:"1",g:"2",h:'WEB'},
                {'a':"admin",b:"管理员",'c':"2020-3-10~2021-2-22",d:'15225252525',e:"123@qq.com",f:"1",g:"2",h:'WEB'},
                {'a':"admin",b:"管理员",'c':"2020-3-10~2021-2-22",d:'15225252525',e:"123@qq.com",f:"1",g:"2",h:'WEB'},
                {'a':"admin",b:"管理员",'c':"2020-3-10~2021-2-22",d:'15225252525',e:"123@qq.com",f:"1",g:"2",h:'WEB'},
                {'a':"admin",b:"管理员",'c':"2020-3-10~2021-2-22",d:'15225252525',e:"123@qq.com",f:"1",g:"2",h:'WEB'},
                {'a':"admin",b:"管理员",'c':"2020-3-10~2021-2-22",d:'15225252525',e:"123@qq.com",f:"1",g:"2",h:'WEB'},

            ],
            tableColumns:[
                { prop: 'a', label: '时间',minWidth:20},
                { prop: 'b', label: '事件',minWidth:20},
                { prop: 'c', label: '人员',minWidth:10},
                { prop: 'd', label: '卡号',minWidth:20},
                { prop: 'e', label: '位置',minWidth:20},
            ],
        }
    },
	methods: {
        clickBtn:function(index){
            for(let i=0;i<this.btnList.length;i++){
                this.btnList[i].active=false;
            }
            this.btnList[index].active=true;
        },
        exportFn:function(){
            console.log("config 导出")
        }
	},
    components: {
        
    }
}
</script>
<style lang="less" scoped>
    .module-theme(...){
        .topbox{
            display: flex;
            justify-content: space-between;
            margin-bottom: @boxMargin;
            .top-date{
                width: 340px;
                margin-left: @btnMargin;
            }
            .top-select{
                display: flex;
            }
            .select-title{
                color: @color;
                margin: 0 @itemMargin 0 @btnMargin;
            }
        }
        .flex{
            display: flex;
        }
    }
</style>