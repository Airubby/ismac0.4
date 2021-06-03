<template>
    <div>
        <el-select v-model="initParams.alarm" placeholder="请选择">
            <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select>
    </div>
</template>

<script>

export default {
    name:"AlarmType",
    props:{
        type:{
            type:String,
            default:"select"  //text，select
        },
        icon:{
            type: Boolean,
            default: true,
        }, 
    },
    created () {
        
    },
    mounted() {
        
    },
    data() {
        return {
            options:[
                {value:"1",label:"提示"},
                {value:"2",label:"次要"},
                {value:"3",label:"重要"},
                {value:"4",label:"严重"},
                {value:"5",label:"紧急"},
            ],
        }
    },
    methods:{
        
    },
    
}
</script>

