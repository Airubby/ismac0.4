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
            <div class="search">
                <div class="title">筛选</div>
                <div class="searchbox">
                    <el-select v-model="initParams.alarm" placeholder="分类">
                        <el-option key="all" label="所有" value="all"></el-option>
                        <el-option key="1" label="关注" value="1"></el-option>
                    </el-select>
                </div>
                <div class="searchbox">
                    <el-select v-model="initParams.alarm" placeholder="厂商">
                        <el-option key="all" label="所有" value="all"></el-option>
                        <el-option key="1" label="关注" value="1"></el-option>
                    </el-select>
                </div>
                <div class="searchbox">
                    <el-select v-model="initParams.alarm" placeholder="协议">
                        <el-option key="all" label="所有" value="all"></el-option>
                        <el-option key="1" label="关注" value="1"></el-option>
                    </el-select>
                </div>
                <div class="searchbox">
                    <el-input v-model="initParams.alarm" placeholder="请输入内容">
                        <i slot="suffix" class="el-input__icon el-icon-search cursor-pointer"></i>
                    </el-input>
                </div>
            </div>
            <div class="btn">
                <el-button type="primary" @click="handleTemp()">创建模板</el-button>
                <el-button type="primary" plain>批量导入</el-button>
            </div>
        </div>
        <el-table-pagination
            list-field="data.item" 
            total-field="data.total"
            :data="tableData"
            method='post' 
            type="local"
            :params="initParams"
            :columns="tableColumns" ref="thisRef">   
            <el-table-column slot="prepend" type="selection"></el-table-column>
            <template v-slot:preview-name="scope">
                <span @click="enterDetail(scope.row)" class="item-color">{{scope.row.a}}</span>
            </template>
            <template v-slot:preview-handle="scope">
                <p class="table_handle">
                    <span @click="handleTemp(scope.row)">编辑</span>
                    <span>移除</span>
                    <span @click="enterExample(scope.row)">创建实例</span>
                </p>
            </template>
        </el-table-pagination>
        <add-temp :dialogInfo="tempInfo" v-if="tempInfo.visible" @backInfo="backInfo"></add-temp>
    </div>
</template>
<script>
import AddTemp from './component/AddTemp'
export default {
    components: {
        AddTemp
    },
    mixins:[],
    filters:{
        
    },
    created() {
        
    },
    mounted() {
        
    },
    data(){
        return{
            thisVue:this,
            initParams:{},
            tableData:[
                {a:"空调_YMK_K200",b:"温湿度",c:"依米康",d:"2020-10-22",e:"机房222",f:"正常",g:"告警",h:"1",id:"1"},
                {a:"空调_YMK_K200",b:"温湿度",c:"依米康",d:"2020-10-22",e:"机房222",f:"正常",g:"告警",h:"2",id:"2"},
            ],
            tableColumns:[
                { prop: 'a', label: '模板名称',slotName:'preview-name',minWidth:10},
                { prop: 'b', label: '设备类型',minWidth:10},
                { prop: 'c', label: '厂商',minWidth:10},
                { prop: 'd', label: '型号',minWidth:10},
                { prop: 'e', label: '协议',minWidth:10},
                { prop: 'f', label: '版本',minWidth:10},
                { prop: 'g', label: '实例',minWidth:10},
                { prop: 'handle', label: '操作',slotName:'preview-handle',width:170},
            ],
            tempInfo:{
                visible:false,
                id:""
            },
        }
    },
	methods: {
        handleTemp:function(item){
            if(item){
                this.tempInfo.id=item.id;
            }else{
                this.tempInfo.id=""
            }
            this.tempInfo.visible=true;
        },
        backInfo:function(){

        },
        enterDetail:function(item){
            this.$router.push({name:'deviceDetail',query:{params:JSON.stringify({"id":item.id})}});
        },
        enterExample:function(item){
            this.$router.push({name:'deviceExample',query:{params:JSON.stringify({"id":item.id})}});
        }
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
            .search{
                display: flex;
                align-items: center;
            }
            .title{
                margin-right: @itemMargin;
            }
            .searchbox{
                margin-right: @boxMargin;
            }
        }
        .item-color{
            color: @activeColor;
            cursor: pointer;
        }
    }
</style>