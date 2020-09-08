<template>
    <div class="bgfffcontent">
        <div class="breadcrumb">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>{{$t("navbar.statement")}}</el-breadcrumb-item>
                <el-breadcrumb-item>{{$t("navbar.statementPlan")}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="public_content">
            <h2>list树形列表转真树形结构</h2>
            <div style="margin:30px 0;">{{data}}</div>
            <div>{{tree}}</div>
        </div>
    </div>
</template>

<script>
export default {
    created() {
        
    },
    mounted() {
        this.tree=this.$tool.listToTree(JSON.parse(JSON.stringify(this.data)))
    },
    data(){
        return{
            data:[
                {id:"10",name:"类1",pid:"0"},
                {id:"20",name:"类2",pid:"0"},
                {id:"110",name:"类11",pid:"10"},
                {id:"210",name:"类21",pid:"20"},
                {id:"310",name:"类321",pid:"210"},
            ],
            tree:[]
        }
    },
	methods: {
        
	},
    components: {
        
    }
}
</script>
