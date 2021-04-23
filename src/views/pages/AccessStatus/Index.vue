<template>
    <div class="content">
        <div class="swiper-box">
            <div class="swiper-container">
                <div class="swiper-wrapper"  v-if="list.length">
                    <div class="swiper-slide" v-for="(item,index) in list" :key="index">
                        <p><i class="el-icon-refrigerator" :class="{'active':item==5}"></i></p>
                        <p>机房{{item}}前门</p>
                    </div>
                </div>
            </div>
            <div class="swiper-button-prev el-icon-arrow-left"></div>
            <div class="swiper-button-next el-icon-arrow-right"></div>
        </div>
        <el-tabs v-model="activeName" class="content">
            <el-tab-pane label='进出记录' name="first" class="content">
                <Record v-if="activeName=='first'" ref="tabs"></Record>
            </el-tab-pane>
            <el-tab-pane label='异常事件' name="second" class="content">
                <Event v-if="activeName=='second'" ref="tabs"></Event>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import Swiper from 'swiper'  
import Record from './component/Record'
import Event from './component/Event'
export default {
    components:{Record,Event},
    created() {
        
    },
    mounted() {
        
        
        for(let i=0;i<30;i++){
            this.list.push(i);
        } 
    },
    data(){
        return{
            list:[],
            activeName:"first"
        }
    },
	methods: {
        
    },
    watch:{
        list:function(){
            this.$nextTick(()=>{
                new Swiper('.swiper-container', {
                    slidesPerView: 'auto',
                    spaceBetween: 15,
                    initialSlide :0,
                    centeredSlides: false,
                    observer:true,//修改swiper自己或子元素时，自动初始化swiper  动态添加数据的时候用
                    observeParents:true,//修改swiper的父元素时，自动初始化swiper  动态添加数据的时候用
                    // 如果需要前进后退按钮
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    },
                });
            })
        }
    }
}
</script>
<style lang="less" scoped>
    .module-theme(...){
        .swiper-box{
            width: 100%;
            height: 120px;
            padding: 0 50px;
            position: relative;
            .swiper-button-next, .swiper-button-prev {
                width: 50px;
                position: absolute;
                z-index: 99;
                top: 0;
                left: 0;
                font-size: 60px;
                height: 100%;
                display: flex;
                align-items: center;
                cursor: pointer;
                &:focus {
                    outline: none;
                }
            }
            .swiper-button-next{
                right: 0;
                left: auto;
            }
        }
        .swiper-container {
            width: 100%;
            height: 100%;
            margin-left: auto;
            margin-right: auto;
            position: relative;
            overflow: hidden;
            list-style: none;
            padding: 0 ;
            z-index: 1;
            .swiper-wrapper {
                position: relative;
                width: 100%;
                height: 100%;
                z-index: 1;
                display: flex;
                transition-property: transform;
                box-sizing: content-box;
                .swiper-slide {
                    // flex-shrink: 0;
                    // width: 100px;
                    // height: 100%;
                    // position: relative;
                    // text-align: center;
                    // transition-property: transform;

                    flex-shrink: 0;
                    min-width: 100px;
                    padding: 0 30px;
                    height: 100%;
                    display: flex;
                    cursor: pointer;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    position: relative;
                    text-align: center;
                    transition-property: transform;
                    i{
                        font-size: 44px;
                        margin: 20px 0 10px 0;
                        &.active{
                            color: @alarmColor;
                        }
                    }
                }
            }
        }
    }
</style>