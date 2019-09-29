<template>
    <span></span>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    name:'webSocket',
    created () {
        
    },
    mounted() {
        // let _this=this;  // 监听的话，刷新就没法send数据了
        // this.$ws.addEventListener('open', function (event) {
        //     //_this.$ws.send(_this.sendInfo)
        // });
        //推送数据回来，不用向vuex中写了,但是如果一个组件应用了两个webSocket组件时，就有问题，还是得存vuex中监听
        // this.$ws.onmessage = function(event) {
        //     console.log(event)
        //     // let result = JSON.parse(event.data);
        //     let result = eval(event.data);
        //     for(let i=0;i<result.length;i++){
        //         for(let j=0;j<_this.wsInfo.length;j++){
        //             if(result[i].matchID===_this.wsInfo[j].matchID){
        //                 _this.wsInfo[j].value=result[i].value;
        //             }
        //         }
        //     }
        // };

        if(this.sendInfo){
            this.sInfo.cmd=this.sendInfo.cmd;
            if(!this.sendInfo.changeSend){
                this.handleInfo(this.wsInfo);
            }
        }

    },
    computed:{
    //   ...mapGetters({
    //     'getWSData':"getWSData"  //起别名用，如果不起别名用下面的
    //   })
    //// 映射 `this.getWSData` 为 `store.getters.getWSData`
        ...mapGetters([
            'getWSData'
        ]),
    },
    data() {
        return {
            sendFlag:true,
            sInfo:{
                cmd:'',
                data:[],
            }
       }
    },
    destroyed() {
        this.sendFlag=false;
    },
    methods:{
       send:function(){
            if(this.$ws&&this.$ws.readyState==1){
                this.$ws.send(JSON.stringify(this.sInfo))
            }else{
                setTimeout(()=>{
                    if(this.sendFlag){
                        this.send();
                    }
                },1000)
            }
            
        },
        handleInfo:function(info){
            let arr=[];
            if(info instanceof Array){  //数组
                if(this.sendInfo.cmd=="subdata"){
                    if(info.length>0){
                        for(let i=0;i<info.length;i++){
                            if(info[i].devid){
                                arr.push({devid:info[i].devid,pointid:info[i].pointid?info[i].pointid:""});
                            }
                        }
                    }
                }
            }else{  //对象
                if(this.sendInfo.cmd=="subcount"){

                }
            }
            this.sInfo.data=arr;
            this.send();
        }
    },
    watch:{
        wsInfo:function(){
            if(this.sendInfo.changeSend){
                this.handleInfo();
            }
        },
        getWSData: function(val) { 
            if(val.cmd=="subdata"){
                if(val.data.length>0){
                    if(this.sendInfo.returnFn){
                        this.$emit("backInfo",val.data);
                    }else{
                        for(let i=0;i<val.data.length;i++){
                            for(let j=0;j<this.wsInfo.length;j++){
                                //:matchInfo="['value:state','isalarm:alarmstyle']"  冒号前是推送端的key，冒号后是本地展示的key
                                if(this.matchInfo){
                                    if(val.data[i].devid==this.wsInfo[j].devid&&(this.wsInfo[j].pointid?(val.data[i].pointid==this.wsInfo[j].pointid):true)){
                                        for(let n=0;n<this.matchInfo.length;n++){
                                            let item=this.matchInfo[n].split(":");
                                            this.wsInfo[j][item[1]]=val.data[i][item[0]];
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }else if(val.cmd=="subcount"){

            }
            // if(this.wsInfo instanceof Array){ //数组的时候
            //     if(val&&val.length>0){
            //         for(let i=0;i<val.length;i++){
            //             for(let j=0;j<this.wsInfo.length;j++){
            //                 if(val[i].matchID===this.wsInfo[j].matchID){
            //                     this.wsInfo[j].value=val[i].value;
            //                 }
            //             }
            //         }
            //     }
            // }else{ //obj的时候,如果obj中有多个值需要动态改变时，上面的数组中也可用下面的方式
            //     //给每个需改变的值比如value新增key_value
            //     if(val&&val.length>0){
            //         for(let i=0;i<val.length;i++){
            //             for(let item in this.wsInfo){
            //                 if(this.wsInfo[item]===val[i].key){  //这个key与需要改变的（key_value）匹配
            //                     let vitem=item.split("_")[1];
            //                     this.wsInfo[vitem]=val.data[i].value;
            //                 }
            //             }
            //         }
                    
            //     }
                
            // }
            
            
        },
    },
    //wsInfo:匹配的数据源；sendInfo:{cmd:"alarm",returnFn:true,changeSend:true}下发的指令信息；matchInfo:匹配显示的字段
    //returnFn为true,将推送来的数据返回到父组件函数处理；changeSend为true,匹配数据源改变时重新下发信息
    props:["wsInfo","sendInfo","matchInfo"],
    components:{}
}
</script>

<style scoped lang="less">

</style>