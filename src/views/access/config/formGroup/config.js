import Rules from "@/utils/Rules"
const ruleFormOpt=[
    {
        type:"input",label:"网址IP",field:"name",
        options:{
            rules:[
                { required: true, trigger: 'change',validator: Rules.checkIP }
            ]
        }
    },
    {
        type:"password",label:"formTestLanguage",field:"password",
        options:{
            languageChange:true,
        }
    },
    {type:"switch",label:"即时配送",field:"delivery",value:true},
    {
        type:"select",label:"ActiveArea",field:"region",placeholder:"select",
        options:{
            languageChange:true,
            api:"/getSelect",
            params:{},
            rules:[
                { required: true, message: 'select', trigger: 'change' }
            ]
        }
    },
    {
        type:"checkbox",label:"活动性质",field:"type",
        children:[
            {label:"美食/餐厅线上活动",value:"1"},
            {label:"地推活动",value:"2"},
            {label:"线下主题活动",value:"3"},
            {label:"单纯品牌曝光",value:"4"},
        ],
        options:{
            rules:[
                { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
            ]
        }
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
    },
    {
        type:"timePicker", label:"时间",field:"time",
        options:{
            pickerOptions:{},
            isRange:true
        }
    }
]
export const config={
    ruleFormOpt
}