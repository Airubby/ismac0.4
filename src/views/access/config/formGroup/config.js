const ruleFormOpt=[
    {type:"input",label:"活动名称",field:"name"},
    {type:"password",label:"活动邀请码",field:"password"},
    {type:"switch",label:"即时配送",field:"delivery",value:true},
    {
        type:"select",label:"活动区域",field:"region",placeholder:"请选中活动区域",
        children:[
            {label:"上海",value:"shanghai"},
            {label:"北京",value:"beijing"}
        ],
        options:[

        ]
    },
    {
        type:"checkbox",label:"活动性质",field:"type",
        children:[
            {label:"美食/餐厅线上活动",value:"1"},
            {label:"地推活动",value:"2"},
            {label:"线下主题活动",value:"3"},
            {label:"单纯品牌曝光",value:"4"},
        ]
    },
    {
        type:"radio",label:"特殊资源",field:"resource",value:'1',
        children:[
            {label:"线上品牌商赞助",value:"1"},
            {label:"线下场地免费",value:"2"}
        ]
    },
    {
        type:"textarea",label:"活动形式",field:"desc"
    }
]
export const config={
    ruleFormOpt
}