<template>
    <div class="content">
        <div class="cabinet">
            <div class="cabinet-con" v-if="cabinetU.length>0">
                <div v-for="(item,index) in cabinetU" class="cabinet-u" :key="index">
                    <div class="cabinet-number" :class="{'firstU':index==0,'lastU':index==cabinetU.length-1}">
                        <span class="cabinet-number-box">{{item.index}}</span>
                        <span class="cabinet-number-box cabinet-number-boxr">
                            {{item.index}}
                            <em class="radio" :style="getStyle(item.lastvalue)" @click="setColorFn(item)"></em>
                        </span>
                    </div>
                </div>
                <template v-for="(item,index) in tableData">
                    <div class="cabinet-con-img" :key="index" :style="{height:18*Number(item.ubit)+'px',bottom:18*(Number(item.installu)-1>=0?(Number(item.installu)-1):0)+'px'}" v-if="Number(item.installu)>0">
                        <template v-for="index in Number(item.ubit)">
                            <img src="./config/images/U.png" :style="{bottom:18*(index-1)+'px'}" :key="index">
                        </template>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    created() {
        
    },
    mounted() {
        this.init(42)
    },
    data(){
        return{
            cabinetU:[],
            color_list:[],
            color_data:[]
        }
    },
    computed: {
    },
	methods: {
        init:function(val){
            for(let a=1;a<=val;a++){
                let index=a;
                if(index<10){
                    index="0"+index;
                }
                if(this.color_list.length>0){
                    let flag=false;
                    for(let i=0;i<this.color_list.length;i++){
                        if('L'+a===this.color_list[i].pointid){
                            flag=true;
                            let obj=Object.assign({},this.color_list[i]);
                            obj["index"]=index;
                            obj["show"]=true;
                            this.cabinetU.push(obj);
                        }
                    }
                    if(!flag){
                        this.cabinetU.push({index:index,show:false});
                    }
                }else{
                    this.cabinetU.push({index:index,show:false});
                }
            }
            this.cabinetU.reverse();
        },
        getStyle:function(status){
            let st=parseInt(status).toString();
            let style={
                background:"#73B34A",  //默认色
            }
            for(let i=0;i<this.color_data.length;i++){
                if(st===this.color_data[i].code){
                    style.background=this.color_data[i].color;
                    return style;
                }
            }
            return style;
        },
	},
    components: {
        
    }
}
</script>
<style lang="less" scoped>
    .module-theme(...){
        .cabinet{
            width: 192px;
            padding:6px 6px 15px;
            background: #141726;
            margin: 0 auto 15px auto;
            .cabinet-con{
                width: 100%;
                background: #0B0C14;
                position: relative;
                .cabinet-u{
                    position: relative;
                    width: 100%;
                    height: 18px;
                    background: #1E2238;
                    border-left: 2px solid #414A75;
                    border-top: 1px solid #0B0C14;
                    border-bottom: 1px solid #0B0C14; 
                    .cabinet-number{
                        position: absolute;
                        width: calc(100% + 86px);
                        height: calc(100% + 2px);
                        top: -1px;
                        left: -44px;
                        .cabinet-number-box{
                            width: 26px;
                            height: 100%;
                            background: #353C66;
                            color: #6A7498;
                            text-align: center;
                            display: block;
                            position: absolute;
                            left: 0;
                        }
                        .cabinet-number-boxr{
                            right: 0;
                            left: auto;
                            .radio{
                                display: block;
                                width: 14px;
                                height: 14px;
                                background: #73B34A;
                                border-radius: 50%;
                                position: absolute;
                                top: 2px;
                                left: 35px;
                                cursor: pointer;
                                &.normal{
                                    background: #0077E9;
                                }
                                &.alarm{
                                    background: #FF4A4A;
                                }
                            }
                        }
                        &.firstU{
                            .cabinet-number-box:before{
                                content: "";
                                width: 26px;
                                height: 6px;
                                background: #353C66;
                                position: absolute;
                                left: 0;
                                top: -6px; 
                            }
                        }
                        &.lastU{
                            .cabinet-number-box:before{
                                content: "";
                                width: 26px;
                                height: 15px;
                                background: #353C66;
                                position: absolute;
                                left: 0;
                                bottom: -15px; 
                            }
                        }
                    }
                }
                .cabinet-con-img{
                    position: absolute;
                    width:180px;
                    img{
                        width: 100%;
                        height: 18px;
                        position: absolute;
                    }
                }
            }
            &:before{
                content: "";
                width: 20px;
                height: 100%;
                background: #353C66;
            }
        }
    }
</style>