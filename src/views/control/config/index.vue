<template>
    <div class="bgfffcontent">
        <div class="breadcrumb">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>{{$t("navbar.control")}}</el-breadcrumb-item>
                <el-breadcrumb-item>{{$t("navbar.controlConfig")}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="public_content">
            <el-scrollbar class="scrollbar">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <el-input
                        style="width:300px;"
                        size="small"
                        class="loncom_mr10"
                        placeholder="请输入名称"
                        prefix-icon="el-icon-search"
                        v-model="initParams.user">
                    </el-input>
                    <el-button type="primary" size="small" @click="search">搜索</el-button>
                </div>
                <el-table-pagination
                    type="local" 
                    border
                    :params="initParams"
                    :data="tableData"
                    :page-sizes="[4]"
                    :showPagination="true"
                    :show-select-all="true"
                    select-id="code"
                    :span-method="spanMethod"
                    :columns="table_columns" ref="thisRef">   
                    <template slot-scope="scope" slot="preview-name">
                        <p class="table_handle"><span @click="detail(scope.row)">{{scope.row.code}}</span></p>
                    </template>
                    <template slot-scope="scope" slot="preview-type">
                        <router-link :to="'/loncom/control/config/detail/'+scope.row.id">{{scope.row.type}}</router-link> / 
                        <router-link :to="{name:'controlConfigDetail',params:{'id':scope.row.id}}">{{scope.row.type}}</router-link>
                    </template>
                    <template slot-scope="scope" slot="preview-handle">
                        <p class="table_handle"><span @click="del(scope.row,scope.$index)">删除</span></p>
                    </template>
                </el-table-pagination>
            </el-card>
            </el-scrollbar>
        </div>
    </div>
</template>

<script>

export default {
    created() {
        // this.getInfo()
    },
    mounted() {
        this.getSpanArr(this.tableData, this.mergeKeys)
    },
    data(){
        return{
            initParams:{
                user:''
            },
            tableData:[{
                name: ' 氮肥、复合肥',
                proportion: '15.23%',
                ingredients: '尿素',
                indexName: '全国均价:尿素(含氮46%,国产)（元/公斤)',
                value: '2.04',
                value2: '2.00%',
                value3: '	13.97%'
            },
            {
                name: ' 氮肥、复合肥',
                proportion: '15.23%',
                ingredients: '三元复合肥',
                indexName: '全国均价:三元复合肥(氯基,含氮磷钾各15%,国产)（元/公斤)',
                value: '2.74',
                value2: '0.37%',
                value3: '	2.24%'
            },
            {
                name: ' 氮肥、复合肥',
                proportion: '15.23%',
                ingredients: '三元复合肥',
                indexName: '全国均价:三元复合肥(硫基,含氮磷钾各15%,国产)（元/公斤)',
                value: '3.05',
                value2: '0.33%',
                value3: '	2.35%'
            },
            {
                name: ' 种子生产',
                proportion: '6.83%',
                ingredients: '玉米种子',
                indexName: '平均售价:玉米种子（元/公斤）',
                value: '3.05',
                value2: '-16.06%',
                value3: '	-5.70%'
            },
            ],
            table_columns:[
               { prop: 'name', label: '设备名称',minWidth:10},
              { prop: 'proportion', label: '设备类型',minWidth:10},
              { prop: 'ingredients', label: '位置',minWidth:10},
              { prop: 'indexName', label: '监控状态',minWidth:10},
              { prop: 'value', label: '告警状态',minWidth:10},
              { prop: 'value2', label: '状态',minWidth:10},
            ],
            mergeData: {},
            //合并行的记录
            mergeProp: {},
            //mergeData中每项的索引
            mergeKeys: ['name', 'proportion', 'ingredients','value','value2'],
        }
    },
	methods: {
        getSpanArr(tableData, keyName) {
            keyName.forEach((kitem, k) =>{
                tableData.forEach((data, i) =>{
                    if (i === 0) {
                        this.mergeData[kitem] = this.mergeData[kitem] || []
                        this.mergeData[kitem].push(1) 
                        this.mergeProp[kitem] = 0
                    } else {
                        // 判断当前元素与上一个元素是否相同
                        if (data[kitem] === tableData[i - 1][kitem]) {
                            this.mergeData[kitem][this.mergeProp[kitem]] += 1
                            this.mergeData[kitem].push(0)
                        } else {
                            this.mergeData[kitem].push(1) 
                            this.mergeProp[kitem] = i
                        }
                    }
                })
            }) 
        },
        spanMethod:function({ row, column, rowIndex, columnIndex }){
            if (this.mergeKeys.includes(column.property)) {
                const _row = this.mergeData[column.property][rowIndex] 
                const _col = _row > 0 ? 1 : 0
                return {
                    rowspan: _row,
                    colspan: _col
                }
            }
        },
        search:function(){
            this.$refs.thisRef.searchHandler(true);
        },
        getInfo:function(){
            // this.$r.get("/getEditTable",{},r=>{
            //     console.log(r)
            //     if(r.err_code=="0"){
            //         this.tableData=r.data;
            //     }else{
            //         this.$message.warning(r.err_msg);
            //     }
            // })
            this.$r.get("/getTable",{},r=>{
                if(r.err_code=="0"){
                    this.tableData=r.data;
                }else{
                    this.$message.warning(r.err_msg);
                }
            })
        },
        detail:function(row){
            // this.$router.push({name:'controlConfigDetail',params:{"id":row.id}});  //name路由
            this.$router.push({path:'/loncom/control/config/detail/'+row.id});  //path路由

        },
        del:function(row,index){
            // console.log(row)
            // console.log(index);
            // this.tableData=this.tableData.filter((item)=>{
            //     return item !="";
            // })
            this.tableData.forEach((item, index, arr)=> {
                let flag=this.$tool.equalsObj(item,row)
                if(flag){
                    this.tableData.splice(index, 1);
                    console.log(this.tableData)
                    this.$refs.thisRef.searchHandler(true);
                }
            });
        },
	},                                                          
    components: {
        
    }
}
</script>
