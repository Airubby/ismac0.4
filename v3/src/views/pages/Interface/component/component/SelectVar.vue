<template>
    <el-dialog title='变量筛选位' :visible.sync="dialogInfo.visible" width="600px" v-dialogDrag :close-on-click-modal="false" :append-to-body="true">
        <el-scrollbar style="height:320px;" class="scrollbar">
            <div class="dialog-content">
                <el-form ref="ValidateForm" :model="initParams" label-position="top">
                    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange" class="checkall">全选</el-checkbox>
                    <el-checkbox-group v-model="checked" @change="handleCheckedCitiesChange">
                        <p v-for="(item,index) in list" :key="index">
                            <el-checkbox :label="item.key" :key="item.key">{{item.name}}</el-checkbox>
                        </p>
                    </el-checkbox-group>
                </el-form>
            </div>
        </el-scrollbar>
        <dialog-btn :dialogInfo="dialogInfo" @dialogSure="dialogSure()"></dialog-btn>
    </el-dialog>
</template>

<script>
export default {
    created() {
        for(let i=0;i<this.list.length;i++){
            this.Options.push(this.list[i].key)
        }
    },
    mounted() {
        
    },
    data(){
        return{
            checkAll: false,
            isIndeterminate: false,
            checked: [],
            Options:[],
            list:[
                {key:"proname",name:"项目名称"},
                {key:"time",name:"消息时间"},
                {key:"devname",name:"设备名称"},
                {key:"pointname",name:"测点名称"},
                {key:"eventname",name:"事件名称"},
                {key:"value",name:"触发值"},
                {key:"level",name:"等级"},
                {key:"unit",name:"单位"},
                {key:"reason",name:"触发原因"},
                {key:"ifsure",name:"是否被确认"},
                {key:"user",name:"确认人"},
                {key:"advise",name:"处理建议"},
            ],
            initParams:{}
        }
    },
	methods: {
        handleCheckAllChange(val) {
            console.log(val)
            this.checked = val ? this.Options : [];
            this.isIndeterminate = false;
        },
        handleCheckedCitiesChange(value) {
            console.log(value)
            let checkedCount = value.length;
            this.checkAll = checkedCount === this.list.length;
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.list.length;
        },
        //保存的操作
        dialogSure:function(){
            this.$refs['ValidateForm'].validate((valid) => {
                if(valid){ //验证通过
                    this.$emit("backInfo")
                }
            })
        },
	},
    props:["dialogInfo"]
}
</script>
<style lang="less" scoped>
.module-theme(...){
    .checkall{
        margin-bottom: 10px
    }
}
</style>