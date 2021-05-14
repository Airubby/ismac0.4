<template>
    <div slot="footer" class="dialog-footer">
        <el-button type="primary" plain @click="dialogCancel">取 消</el-button>
        <el-button type="primary" @click="dialogSure" :disabled="handleLoading">确 定</el-button>
    </div>
</template>

<script>

export default {
    name:"DialogBtn",
    created () {
        
    },
    mounted() {
        
    },
    data() {
        return {
            handleLoading:false,
        }
    },
    methods:{
        //保存的操作
        dialogSure:function(){
            this.handleLoading=true;
            this.$emit('dialogSure');
            setTimeout(() => {
                this.handleLoading=false;
            }, 1500);
        },
        //取消操作
        dialogCancel:function(){
            this.dialogInfo.visible=false;   
        },

    },
    props:["dialogInfo"]  
}
</script>

