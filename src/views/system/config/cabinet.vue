<template>
    <div :class="['_cabinet',type,{'gray':grayFlag}]">
        <!--type 'pd':配电单元，'zl':整流柜，'dc':电池柜，'jg':设备单元，'kt':精密空调，'llfp':冷量分配单元，'gk':管控单元-->
        <div class="img" v-if="type">
            <!-- <img :src="require('@/assets/images/lsp_'+type+'.png')"> -->
        </div>
        <div class="title">{{title}}</div>
        <i class="el-icon-delete icon-btn" @click="$emit('close',index)"></i>
    </div>
</template>
<script>
export default {
    created () {
        // this.tcolor=this.color?this.color:"#F2F2F2";
        // console.log(this.tcolor)
    },
    mounted() {
        
    },
    data(){
        return{
           tcolor:'',
        }
    },
    props:['type','grayFlag','title','index'],
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
        &.pd{
            background: #D8645B;
        }
        &.zl{
            background: #8CBECF;
        }
        &.dc{
            background: #F2B747;
        }
        &.kt{
            background: #588EEA;
        }
        &.jg{
            background: #75B899;
        }
        &.gk{
            background: #55A1E2;
        }
        &.llfp{
            background: #55A1E2;
        }
        &.gray{
            background: #F2F2F2;
        }
    }
</style>