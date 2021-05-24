/**
 * @param {Object} obj
 * 判断对象是否为空
 */
function isEmpty(obj) {
	return typeof obj == "undefined" || obj == null || obj == "";
}

function isEmptyObj(obj) {
    for (var key in obj) {
        if ({}.hasOwnProperty.call(obj, key)) return false;
    }
    return true;
}

function isEmptyOrSpaces(obj) {
	return str === undefined || str === null || str.match(/^ *$/) !== null;
}

function callback(callback1) {
	let json = {
		code: 132610,
		data: ["1", "2","3"],
	}
	let par = {
		msgJson: JSON.stringify(json),
		retCode: 0,
		tag: "",
	}
	return callback1(JSON.stringify(par));
}
/**
 * @param {Object} callbackcallback(response => {
		if (util.isEmpty(response)) {
			 return callback ("");
		}
		alert("isEmpty");
		console.log("isEmpty" );
		let res = JSON.parse(response);
		//res ： {retCode:1,msgJson:"{}"，tag:"responseTag"}
		if (null == res || res.retCode != 1 || util.isEmpty(res.msgJson)) {
			 return callback ("");
		}
		alert("res");
		console.log("res" + JSON.stringify(res) );
		let arr = JSON.parse(res.msgJson);
		if(null == arr || arr.length() ==0 || util.isEmpty(arr[0])){
			return callback("");
		}
		alert("arr");
		return callback(arr[0]);
 */
function callbackTest(callback) {
	let json = {
		code: 0,
		data: ["1", "2","3"],
	}
	let par = {
		msgJson: JSON.stringify(json),
		retCode: 1,
		tag: "",
	}
	var response = JSON.stringify(par);
	console.log(getDatasFromResponse(response)[0]);

	/* 	callback(response =>{
			 return callback (response); */
	/* if (util.isEmpty(response)) {
		 return callback ("");
	}
	alert("isEmpty");
	console.log("isEmpty" );
	let res = JSON.parse(response);
	//res ： {retCode:1,msgJson:"{}"，tag:"responseTag"}
	if (null == res || res.retCode != 1 || util.isEmpty(res.msgJson)) {
		 return callback ("");
	}
	alert("res");
	console.log("res" + JSON.stringify(res) );
	let result = JSON.parse(res.msgJson);
	console.log("result" + JSON.stringify(result) + null == result);
	if (null == result || result.code != 0 ) {
		console.log("null == result || res.code != 0" + JSON.stringify(result) );
		 return callback ("");
	}
	var arr = result.data;
	console.log("arr" + JSON.stringify(arr) );
	if(null == arr || arr.length ==0 || util.isEmpty(arr[0])){
		return callback("");
	}
	console.log("arr[0]" + arr[0] );
	return callback(arr[0]); */

	/* }); */
}
// 获取 平台提供的keyValue 值
function getPrefWithDefaultValue(editorKey, key, defaultValue, callback) {
	getPref(editorKey, key, value => {
		return callback(isEmpty(value) ? defaultValue : value)
	});
}


function getDatasFromResponse(response) {
	var msgJson = getMsgJsonFromResponse(response);
	console.log("msgJson "+msgJson);
	let msgJsonType = Object.prototype.toString.call(msgJson);
	console.log("msgJsonType "+msgJsonType);
	return getDatasFromMsgJson(msgJson);
}

/**
 * 根据响应json 获取msgJson
 * @param {Object} response 响应json 
 */
function getMsgJsonFromResponse(response) {
	if (isEmpty(response)) {
		//alert("isEmpty");
		console.log("isEmpty");
		return "";
	}
	let res = JSON.parse(response);
	//res ： {retCode:1,msgJson:"{}"，tag:"responseTag"}
	if (null == res || res.retCode != 1 || isEmpty(res.msgJson)) {
		//alert("res isEmpty");
		console.log("res isEmpty");
		return "";
	}
	console.log("res.msgJson type"+ Object.prototype.toString.call(res.msgJson));
	return res.msgJson/* JSON.stringify(res.msgJson) */;
	
}
/**
 *  根据msgJson 获取datas
 * @param {Object} msgJson
 * @return {Array} msgJson中有个datas 是个数组，返回值会存放在 数据中，多用于hardware
 */
function getDatasFromMsgJson(msgJson) {
	var result = [""];
	let msg = JSON.parse(msgJson);
	let msgType = Object.prototype.toString.call(msg);
	console.log("msgType"+msgType);
	// msgJson : {code:0,data:["1","2"]}   或者 {code:0,datas:["1","2"]，msg:"msg"}
	if (msgJson == "{}" || msg.code != 0) {
		//alert("result isEmpty");
		console.log("result isEmpty");
		return result;
	}
	// 不太确定 result 的key为 data还是datas
	var arr = msg.data;
	arr = null == arr ? msg.datas : arr;
	if (null == arr || arr.length == 0 || isEmpty(arr[0])) {
		//alert("arr isEmpty"+ JSON.stringify(arr));
		console.log("arr isEmpty" + JSON.stringify(arr));
		return result;
	}
	return arr;
}
/**
 * 根据 url中的"?"符后的字串 获取键值对
 * @return {Map} 
 * @example 
 * http://localhost:8080/?id=1&name=2&age=3#/
 *  map{"id":"1","name":"2","age":"3"}
 */
function getParmasFromUri() {
	var urlarr=location.toString().split('?');
	var url = "?"+urlarr[1]; //获取url中"?"符后的字串
	var map = new Map();
	if (url.indexOf("?") != -1) {
		var str = url.substr(1);
		var strs = str.split("&");
		for (var i = 0; i < strs.length; i++) {
			var keyValue = strs[i].split("=");
			var value = unescape(keyValue[1]);
			if(value.endsWith('#/')){
				value = value.substring(0,value.indexOf('#/'));
			}
			map[keyValue[0]] = value;
		}
	}
	return map;
}

/**
 * 将Map中的key-value 拼接到url上
 * @param {Object} url  
 * @param {Object} keyValueMap
 * @example  url             http://localhost:8080/ 
 * 			 keyValueMap     {"id":"1","name":"2","age":"3"}
 * 			 result          http://localhost:8080/?id=1&name=2&age=3
 */
function setParmasToUri(url, keyValueMap) {
	params = Object.keys(keyValueMap).map(function(key) {
		return encodeURIComponent(key) + "=" + encodeURIComponent(keyValueMap[key]);
	}).join("&");
	return url + "?" + params;
}



/**
 * // js  字符串转 16进制 与java 端（平台）的转换对应不住，且js中文转16进制实现困难， 
 * @param {Object} str 
 *    char[] chars = "0123456789ABCDEF".toCharArray();
        StringBuilder sb = new StringBuilder("");
        byte[] bs = str.getBytes();

        for(int i = 0; i < bs.length; ++i) {
            int bit = (bs[i] & 240) >> 4;
            sb.append(chars[bit]);
            bit = bs[i] & 15;
            sb.append(chars[bit]);
        }

        return sb.toString().trim();
 */
function str2HexStr(str) {
	/* var String = plus.android.importClass("java.lang.String");
	var chars = new String("0123456789ABCDEF").toCharArray();
	var StringBuilder = plus.android.importClass("java.lang.StringBuilder");
	var sb = new StringBuilder("");
	var bs = new String(str).getBytes();
	for (var i = 0; i < bs.length; i++) {
		var bit = (bs[i] & 240) >> 4;
		sb.append(chars[bit]);
		bit = bs[i] & 15;
		sb.append(chars[bit]);
	}
	return sb.toString().trim(); */
	return strToHexCharCode(str);
}


// 字符串转16进制
function strToHexCharCode(str) {
	if (str === "")
		return "";
	var hexCharCode = [];
	hexCharCode.push("0x");
	for (var i = 0; i < str.length; i++) {
		hexCharCode.push((str.charCodeAt(i)).toString(16));
	}
	return hexCharCode.join("");
}



// 16进制转字符串
function hexCharCodeToStr(hexCharCodeStr) {
	var trimedStr = hexCharCodeStr.trim();
	var rawStr =
		trimedStr.substr(0, 2).toLowerCase() === "0x" ?
		trimedStr.substr(2) :
		trimedStr;
	var len = rawStr.length;
	if (len % 2 !== 0) {
		//alert("Illegal Format ASCII Code!");
		return "";
	}
	var curCharCode;
	var resultStr = [];
	for (var i = 0; i < len; i = i + 2) {
		curCharCode = parseInt(rawStr.substr(i, 2), 16); // ASCII Code Value
		resultStr.push(String.fromCharCode(curCharCode));
	}
	return resultStr.join("");
}

const util = {

	isEmpty: isEmpty,
	isEmptyObj: isEmptyObj,
	isEmptyOrSpaces: isEmptyOrSpaces,
	getParmasFromUri: getParmasFromUri,
	hexCharCodeToStr: hexCharCodeToStr,
	strToHexCharCode: strToHexCharCode,
	str2HexStr: str2HexStr,
	callbackTest: callbackTest,

}
module.exports = util
