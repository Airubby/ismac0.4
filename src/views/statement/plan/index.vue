<template>
    <div class="bgfffcontent">
        <div class="breadcrumb">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>{{$t("navbar.statement")}}</el-breadcrumb-item>
                <el-breadcrumb-item>{{$t("navbar.statementPlan")}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="public_content">
            <h2 style="margin:30px 0;">list树形列表转真树形结构</h2>
            <div>{{data}}</div>
            <div>{{tree}}</div>
            <h2 style="margin:30px 0;">N秒内连续变化不做操作，超过N秒没变化了才操作最后一次变化的数据</h2>
            <h2 style="margin:30px 0;">排序</h2>
            <div>
                {{sortData}}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    created() {
        
    },
    mounted() {
        this.tree=this.$tool.listToTree(JSON.parse(JSON.stringify(this.data)))
        this.sortData=this.data.sort((a,b)=>{
            return a.id*1-b.id*1;
        })
    },
    data(){
        return{
            data:[
                {id:"310",name:"类321",pid:"210"},
                {id:"20",name:"类2",pid:"0"},
                {id:"110",name:"类11",pid:"10"},
                {id:"10",name:"类1",pid:"0"},
                {id:"210",name:"类21",pid:"20"},
            ],
            tree:[],
            sortData:[],
            timer:null,  //定时器
            lastTime:null,  //记录最后的时间
            time:1000,  //多少秒内连续变化不操作
        }
    },
	methods: {
        flushHandle:function(){
            clearTimeout(this.timer);
            this.timer=null;
            let _this=this;
            if(this.lastTime===null){
                //第一次都要操作
                console.log("变化了，第一次得操作")
            }else{
                let thisTime=new Date();
                if(thisTime.getTime()-this.lastTime.getTime()>this.time){
                    //超过了限定的秒数
                    console.log("超过了限定的秒数，操作变化的数据")
                }else{
                    this.timer=setTimeout(() => {
                        _this.flushHandle();
                    }, _this.time);
                }
            }
            this.lastTime=new Date();
        }
	},
    components: {
        
    }
}
</script>
