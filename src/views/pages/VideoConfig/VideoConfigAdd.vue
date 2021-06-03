<template>
    <div class="content">
        <el-button type="primary" plain @click="$router.back(-1)">返回</el-button>
        <el-form ref="ValidateForm" :model="initParams" :rules="rules" label-position="top" class="form-box">
            <div class="card_title">
                <div class="title">基本信息</div>
            </div>
            <el-row :gutter="30">
                <el-col :span="8">
                    <el-form-item :label="$t('video.videoName')" prop="servername">
                        <el-input v-model.trim="initParams.servername"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item :label="$t('video.brand')" prop="devtype">
                        <el-select v-model="initParams.devtype" >
                            <el-option :label="$t('video.dahua')" value="002001"></el-option>
                            <el-option :label="$t('video.haik')" value="002002"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item :label="$t('public.installPosition')" prop="addrid">
                        <el-input v-model.trim="initParams.addrid"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item :label="$t('video.videoCate')" prop="videotype">
                        <el-select v-model="initParams.videotype"  :disabled="disabled">
                            <el-option label="NVR" value="0020001"></el-option>
                            <el-option :label="$t('video.netCamera')" value="0020002"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item :label="$t('video.playCate')" prop="opentype">
                        <el-select v-model="initParams.opentype" >
                            <el-option label="RTSP" value="00101"></el-option>
                            <!--<el-option label="SDK" value="00201"></el-option>-->
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item :label="$t('video.codeStream')" prop="videostream">
                        <el-select v-model="initParams.videostream" >
                            <el-option :label="$t('video.hostCode')" value="0"></el-option>
                            <el-option :label="$t('video.assistCode')" value="1"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <div class="card_title">
                <div class="title">通讯参数</div>
            </div>
            <el-row :gutter="30">
                <el-col :span="8">
                    <el-row :gutter="10">
                        <el-col :span="14">
                            <el-form-item :label="$t('video.dockPointIP')" prop="ip" >
                                <el-input v-model="initParams.ip" placeholder='192.168.1.12'></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item :label="`\u3000`" prop="port" >
                                <el-input v-model="initParams.port" placeholder="554" ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-col>
                <el-col :span="8">
                    <el-form-item :label="$t('video.userName')" prop="user">
                        <el-input v-model.trim="initParams.user" ></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item :label="$t('video.pwd')" prop="paswd">
                        <el-input v-model.trim="initParams.paswd" type="password"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <div class="pd20_20_0" v-if="initParams.videotype==='0020001'">
                <div class="card_title">
                    <span class="title">{{$t("video.channelInfo")}}</span>
                    <div class="fr">
                        <el-button type="primary" @click="add()">新建</el-button>
                    </div>
                </div>
                <div class="tab">
                    <el-table-pagination
                        type="local"
                        :data="initParams.item"
                        :columns="tableColumns" ref="thisRef">
                        <template slot-scope="scope" slot="preview-handle">
                            <p class="table_handle">
                                <span @click="add(scope.row)">编辑</span>
                                <span @click="moreDelete(scope.row)">删除</span>
                            </p>
                        </template>
                    </el-table-pagination>
                </div>
            </div>
            <handle-btn @handleClick="handleSure()" class="box-btn"></handle-btn>
        </el-form>
        <add v-if="addInfo.visible" :dialogInfo="addInfo" v-on:backInfo="backInfo"></add>
    </div>
</template>
<script>
import add from './component/add'
export default {
    components: {add},
    created() {
        
    },
    mounted() {
        
    },
    data(){
        return{
            hint:'add',
            disabled:false,
            loading:false,
            initParams:{
                id:'',
                devtype:'',
                servername:'',
                videotype:'',
                opentype:'',
                addrid:'',
                cnumber:'',
                ip:'',
                port:'',
                user:'',
                paswd:'',
                videostream:"",  //码流  0主码 1子码
                item:[],
            },
            rules:{
                servername:[
                    { required: true, message: this.$t('hint.nonEmpty'), trigger: 'blur'},
                ],
                devtype:[
                    { required: true, message: this.$t('hint.nonEmpty'), trigger: 'change'},
                ],
                addrid:[
                    { required: true, message: this.$t('hint.nonEmpty'), trigger: 'change'},
                ],
                videotype:[
                    { required: true, message: this.$t('hint.nonEmpty'), trigger: 'change'},
                ],
                videostream:[
                    { required: true, message: this.$t('hint.nonEmpty'), trigger: 'change'},
                ],
                opentype:[
                    { required: true, message: this.$t('hint.nonEmpty'), trigger: 'change'},
                ],
                user:[
                    { required: true, message: this.$t('hint.nonEmpty'), trigger: 'blur'},
                ],
                paswd:[
                    { required: true, message: this.$t('hint.nonEmpty'), trigger: 'blur'},
                ],
                cnumber:[
                    { required: true, message: this.$t('hint.nonEmpty'), trigger: 'blur'},
                ],
                ip:[
                    { required: true, trigger: 'blur'},
                ],
                port:[
                    { required: true, trigger: 'blur'},
                ]
            },
            tableColumns:[
                { prop: 'name', label: this.$t('public.name'),minWidth:10},
                { prop: 'channel', label: this.$t('video.comNum'),minWidth:10},
                { prop: 'handle', label: this.$t('public.handle'),slotName:'preview-handle',width:100},
            ],
            addInfo:{
                visible:false,
                row:''
            }
        }
    },
	methods: {
        getInfo:function(id){
            this.$api.get("/video/videoserver/details",{id:id}).then(res=>{
                if(res.err_code==='0'){
                    this.initParams=res.data;
                    if(r.data.videotype=="0020001"){
                        this.getChannel(res.data.id);
                    }
                }else{
                    this.$message.warning(res.err_msg);
                }
            })
        },
        getChannel:function(id){
            this.$api.get("/video/video/query",{videoserverid:id}).then(res=>{
                if(res.err_code==='0'){
                    this.initParams.item=res.data.items;
                }else{
                    this.$message.warning(res.err_msg);
                }
            })
        },
        add:function(row){
            if(row){
                this.addInfo.row=row;
            }else{
                this.addInfo.row='';
            }
            this.addInfo.visible=true;
        },
        moreDelete:function (row) {
            this.$confirm(this.$t('layer.sure'), this.$t('layer.tips'), {
                confirmButtonText: this.$t('layer.ok'),
                cancelButtonText: this.$t('layer.cancel'),
                type: 'warning'
            }).then(() => {
                this.initParams.item.forEach((item,index)=>{
                    if(this.$tool.equalsObj(item,row)){
                        this.initParams.item.splice(index,1)
                    }
                })
            });
        },
        backInfo:function(info){
            this.initParams.item.unshift(info)
        },
        //保存的操作
        handleSure:function(){
            this.$refs['ValidateForm'].validate((valid) => {
                if(valid){ //验证通过
                    let url="/video/videoserver/add";
                    if(this.hint=="edit"){
                        url="/video/videoserver/update";
                    }
                    this.$api.post(url,  this.initParams).then( res => {
                        this.loading = false;
                        if (res.err_code == "0") {
                            this.$message.success(res.err_msg);
                            this.$router.go(-1);
                        } else {
                            this.$message.warning(res.err_msg);
                        }
                    });
                }
            })
        },
	},
    
}
</script>
<style lang="less" scoped>
    .module-theme(...){
        .card_title{
            margin-top: @boxMargin;
            margin-bottom: @itemMargin;
        }
        .box-btn{
            margin-bottom: @boxMargin;
            float: right;
        }
        .relative-content{
            width: 100%;
            height: 100%;
            position: relative;
        }
    }
</style>