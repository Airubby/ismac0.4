const reqMessage="该字段不能为空";
const ruleMessage="填写格式错误";
const checkPhone = (rule, value, callback) => {
	if(rule.required){
		if(value===""||value===null||value===undefined){
			callback(new Error(rule.reqMessage||reqMessage));
		}else{
			let reg = /^1[345789]\d{9}$/
			if(reg.test(value)){
				callback()
			}else{
				callback(new Error(rule.ruleMessage||ruleMessage))
			}
		}
	}else{
		callback();
	}
};
const checkPassword = (rule, value, callback) => {
	if(rule.required){
		if(value===""||value===null||value===undefined){
			callback(new Error(rule.reqMessage||reqMessage));
		}else{
			/**
			 * /^([A-Za-z0-9]{6,20})$/; 
			 * [a-z]/.test(value) && /[A-Z]/.test(value) && /[0-9]/.test(value)&& value.length>7    包含数字字母大小写，且至少8位
			 */
			let reg = /^([a-z_A-Z-.+0-9]{6,20})$/;   //. - _ 也可以包含包含
			if(reg.test(value)){
				callback()
			}else{
				callback(new Error(rule.ruleMessage||ruleMessage))
			}
		}
	}else{
		callback();
	}
};
const checkPort = (rule, value, callback) => {
	if(rule.required){
		if(value===""||value===null||value===undefined){
			callback(new Error(rule.reqMessage||reqMessage));
		}else{
			if (Math.round(Number(value)) !== Number(value)||Number(value)>65535||Number(value)<1) {
				callback(new Error(rule.ruleMessage||ruleMessage))
			} else {
				callback()
			}
		}
	}else{
		callback();
	}
};
const checkIP = (rule, value, callback) => {
	if(rule.required){
		if(value===""||value===null||value===undefined){
			callback(new Error(rule.reqMessage||reqMessage));
		}else{
			let reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
			if(reg.test(value)){
				callback()
			}else{
				console.log(this)
				callback(new Error(rule.ruleMessage||ruleMessage))
			}
		}
	}else{
		callback();
	}
};
const checkIDCard = (rule, value, callback) => {
	if(rule.required){
		if(value===""||value===null||value===undefined){
			callback(new Error(rule.reqMessage||reqMessage));
		}else{
			let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
			if(reg.test(value)){
				callback()
			}else{
				callback(new Error(rule.ruleMessage||ruleMessage))
			}
		}
	}else{
		callback();
	}
};
const checkEmail = (rule, value, callback) => {
	if(rule.required){
		if(value===""||value===null||value===undefined){
			callback(new Error(rule.reqMessage||reqMessage));
		}else{
			let reg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
			if(reg.test(value)){
				callback()
			}else{
				callback(new Error(rule.ruleMessage||ruleMessage))
			}
		}
	}else{
		callback();
	}
};
const checkNumber = (rule, value, callback) => {
	if(rule.required){
		if(value===""||value===null||value===undefined){
			callback(new Error(rule.reqMessage||reqMessage));
		}else{
			/**
			 * /[\u4e00-\u9fa5+！@#￥……&*（）——【】，；。？‘’“”]/;    中文
			 *  /^[1-9]\d*$/;  //大于0的正整数
			 * /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
			 * /(^[\-0-9][0-9]*(.[0-9]+)?)$/;  //正负整数，浮点数  /^(\-|\+)?\d+(\.\d+)?$/   /^[-+]?\d+(\.\d+)?$/
			 * /^(([\-]*[0-9](.[0-9]+)?)|([\-]*[1-9][0-9]*(.[0-9]+)?))$/   //正负整数、浮点数
 			 */
			let reg = /^\d+(\.\d+)?$/; //非负浮点数01.22 错误
			if(reg.test(value)){
				callback()
			}else{
				callback(new Error(rule.ruleMessage||ruleMessage))
			}
		}
	}else{
		callback();
	}
};
export default {
	checkPhone,
	checkPassword,
	checkPort,
	checkIP,
	checkIDCard,
	checkEmail,
	checkNumber
}