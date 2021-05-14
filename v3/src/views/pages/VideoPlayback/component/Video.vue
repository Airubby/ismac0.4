<template>
    <el-dialog title='选择摄像头' :visible.sync="dialogInfo.visible" width="900px" v-dialogDrag :append-to-body="true" :close-on-click-modal="false">
        <el-scrollbar class="scrollbar" style="height:480px;">
            <div class="dialog-content">
                <el-tree
                    :data="tree_data"
                    node-key="id"
                    show-checkbox
                    check-strictly
                    :default-checked-keys="checkKey"
                    :check-on-click-node="true"
                    ref="tree"
                    @check-change="handleCheckChange">
                </el-tree>
            </div>
        </el-scrollbar>
        <dialog-btn :dialogInfo="dialogInfo" @dialogSure="dialogSure()"></dialog-btn>
    </el-dialog>
</template>

<script>
export default {
    created() {
        this.getInfo();
        this.checkKey.push(this.dialogInfo.addrid)
    },
    mounted() {
        
    },
    data(){
        return{
            tree_data:[],
            checkKey:[],
        }
    },
	methods: {
        getInfo:function(){
            
            this.$api.post('/video/videoserver/tree',{}).then( res=> {
                
                if (r.err_code === '0') {
                    this.tree_data = r.data;
                }else{
                    this.$message.warning(r.err_msg);
                }
            })
        },
        handleCheckChange:function(node,checked){
            console.log(node)
            if(this.$refs.tree.getCheckedNodes().length%2===0){
                if(checked){
                    this.$refs.tree.setCheckedNodes([node]);
                }else{
                    this.$refs.tree.setCheckedNodes([]);
                }        
            }
        },
        dialogSure:function(){
            if(this.$refs.tree.getCheckedNodes().length>0){
                this.dialogInfo.addrid=this.$refs.tree.getCheckedNodes()[0].id;
                this.dialogInfo.devtype=this.$refs.tree.getCheckedNodes()[0].map.devtype;
                this.dialogInfo.map=this.$refs.tree.getCheckedNodes()[0].map;
                this.dialogInfo.visible=false;   
            }else{
                this.$message.warning("非空");
            }
        },
        
	},
    props:["dialogInfo"]
}
</script>
