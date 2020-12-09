<template>
    <div :class="['_cabinet']" :style="bg">
        <!--type 'pd':配电单元，'zl':整流柜，'dc':电池柜，'jg':设备单元，'kt':精密空调，'llfp':冷量分配单元，'gk':管控单元-->
        <!-- <div class="img" v-if="type">
            <img :src="require('@/assets/images/lsp_'+type+'.png')">
        </div> -->
        <div class="img"></div>
        <div class="title">{{name}}</div>
        <i class="el-icon-delete icon-btn" @click="$emit('close',index)" v-if="showClose"></i>
    </div>
</template>
<script>
export default {
    created () {
        
    },
    computed:{
        bg(){
            let color=this.background?this.background:"#D2D2D2";
            return 'background:'+color;
        }
    },
    data(){
        return{
           
        }
    },
    props:['background','name','index','showClose'],
}
</script>

<style scoped lang="less">
    ._cabinet{
        width: 100%;
        height:100%;
        position: relative;
        cursor: move;
        .icon-btn{
            position: absolute;
            top: 3px;
            right: 3px;
            display: none;
            cursor: pointer;
            color: #fff;
        }
        &:hover{
            .icon-btn{
                display: block;
            }
        }
        .img{
            width: 100%;
            padding: 15px 20% 5px;
            img{
                max-width: 100%;
                max-height: 100%;
            }
        }
        .title{
            width: 22px;
            margin: 0 auto;
            color: #fff;
            font-size: 16px;
        }
    }
</style>