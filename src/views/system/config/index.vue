<template>
    <div class="bgfffcontent">
        <div class="breadcrumb">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>{{$t("navbar.system")}}</el-breadcrumb-item>
                <el-breadcrumb-item>{{$t("navbar.systemConfig")}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="public_content">
            <h4>禁止:draggable="false"；默认不给为可拖拽</h4>
            <draggable v-model="myArray" 
                
                >
                <transition-group>
                    <div v-for="element in myArray" :key="element.id">
                        {{element.name}}
                    </div>
                </transition-group>
            </draggable>
            <button @click="addPeople">Add</button>
        </div>
    </div>
</template>

<script>
import draggable from 'vuedraggable'
export default {
    components: {
        draggable
    },
    created() {
        
    },
    mounted() {
        
        
    },
    destroyed(){

    },
    data(){
        return{
            myArray:[
                {id:"1",name:"test"},
                {id:"3",name:"发送到了"},
                {id:"2",name:"上了对方诉讼费"}
            ]
        }
    },
	methods: {
        addPeople:function(){
            this.myArray.push({id:"23",name:"新增1"})
        }
	},
    
}
</script>
