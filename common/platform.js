
import bridge from './JSbridge.js'
import {
	isEmpty,
	isEmptyObj,
} from '../utils/util.js'

//  对应极速版 post 方法.
/**
 * @param {Object} mainCode 主功能码
 * @param {Object} methodName 方法名
 * @param {Object} paramJson 参数串
 * @param {Object} callback 请求标识
 * @return {type}
 * 		/* 	const response = {
			retCode:1, // 0 失败,1成功,2执行中回调
			// 返回数据为json格式字符串
			msgJson:"{ 
				code:1, // 0:成功, 其他:错误
				datas:["data1","data2"], // 返回的数据可能为多个,需要对应方法来取值
				msg:"" // 若是失败,有错误原因提示语句
			}", 
			tag:"tag" //请求标识
		} */
function post(mainCode, methodName, paramJson, callback) {

	let par = {
		mainCode: mainCode,
		methodName: methodName,
		packageName: "com.sgcc.pda.safemanager",
		tag: methodName,
		paramJson: JSON.stringify(paramJson),
	};

	// 用于调用java代码 js2java
	bridge.callHandler("post", JSON.stringify(par), callback);
	// java 调用js代码  由于可能会多个回调，所以java端会主动调用js 实现多次回调
	bridge.registerHandler("postCallback_" + methodName, callback);

}

/****************基于post方法，********************************************************/


/**
 * 掌机基础功能接口
 * @param {Object} methodName
 * @param {Object} paramJson
 * @param {Object} callback
 */
function basic(methodName, paramJson, callback) {
	post("basic", methodName, paramJson, callback);
}

/**
 * 同步
 * 设置掌机时间
 * @param {Object} dateTime 设置日期时间值的字符串yyyy-MM-ddHH:mm:ss，
 * 	如参数串2016-10-28 16:34:45
 * @param {Object} callback true 成功 false 失败
 */
function basic_setDateTime(dateTime, callback) {
	let par = {
		dateTime: dateTime,
	};
	// var paramJson = JSON.stringify(par);
	basic("setDateTime", par, callback);
}

/** 添加APN设置，同时设置为默认APN
 * @param {Object} apnName APN设置的名称标识
 * @param {Object} apn APN内容
 * @param {Object} userName 用户名，可为空或null
 * @param {Object} password 密码，可为空或null
 * @param {Object} callback true 成功 false 失败
 */
function basic_addApn(apnName, apn, userName, password, callback) {
	let par = {
		apnName: apnName,
		apn: apn,
		userName: userName,
		password: password,
	};
	// post("basic", "addApn", paramJson, callback);
	basic("addApn", par, callback);
}

/** 获取设备型号
 * @param {Object} callback  成功返回设备型号 ，失败返回失败信息或空字符串
 */
function basic_getDeviceModel(callback) {
	// post("basic", "getDeviceModel", paramJson, callback);
	basic("getDeviceModel", {}, callback);
}

/** 获取设备序列号
 * @param {Object} callback 成功返回设备序列号 ，失败返回失败信息或空字符串
 */
function basic_getDeviceSn(callback) {
	//	post("basic", "getDeviceSn", paramJson, callback);
	basic("getDeviceSn", {}, callback);
}

/** 获取设备系统版本号
 * @param {Object} callback 成功返回设备系统版本号，失败返回失败信息或空字符串
 */
function basic_getOSVersion(callback) {
	// post("basic", "getOSVersion", paramJson, callback);
	basic("getOSVersion", {}, callback);
}

/**
 * 获取设备硬件版本号
 * @param {Object} callback 成功返回设备硬件版本号，失败返回失败信息或空字符串
 */
function basic_getDeviceHardVersion(callback) {
	// post("basic", "getDeviceHardVersion", paramJson, callback);
	basic("getDeviceHardVersion", {}, callback);
}

/**
 * 获取设备生产日期
 * @param {Object} callback 成功返回设备生产日期 ，失败返回失败信息或空字符串
 */
function basic_getProductionDate(callback) {
	// post("basic", "getProductionDate", paramJson, callback);
	basic("getProductionDate", {}, callback);
}


/************ 上行通信服务接口 **********************************************/

/**
 * @param {Object} methodName 方法名
 * @param {Object} paramJson 参数
 * @param {Object} callback （成功时为结果值，失败时为错误原因，是否成功，结果码（小于等于0为失败，1为成功，2为执行中））
 * 	
 */
function web(methodName, paramJson, callback) {
	// {"msgJson":"msgJson","retCode":1,"tag":"postDataWeaveString"}
	// {"msgJson":"{\"RT_D\":\"验证客户端请求的(身份认证授权通过后)UID值的有效性-验证失败\",\"UID\":\"0903144640581\",\"nStatusCode\":\"401\",\"RT_F\":\"8\"}","retCode":1,"tag":"postDataWeaveString"}
	// msgJson==>  {"RT_D":"验证客户端请求的(身份认证授权通过后)UID值的有效性-验证失败","UID":"0903144640581","nStatusCode":"401","RT_F":"8"}
	//post("web", methodName, paramJson, callback);
	post("web", methodName, paramJson, response => {
		if (isEmpty(response)) {

			return callback("返回内容为空", false, -101);
		}
		let res = JSON.parse(response);
		if (isEmptyObj(res)) {
			return callback("解析返回内容失败", false, -102);
		}
		// 若响应tag不为空，则与请求tag比对
		if (!isEmpty(res.tag) && (res.tag != methodName)) {
			return callback("请求tag与响应tag不一致", false, -103);
		}
		// 将请求结果 的retCode以及 msgJson 返回
		var retCode = res.retCode;
		var msgJson = res.msgJson;
		if (retCode != 1 || isEmpty(msgJson)) {
			retCode = isEmpty(retCode) ? -104 : retCode;
			msgJson = isEmpty(msgJson) ? "结果域为空" : msgJson;
			return callback(msgJson, retCode == 1, retCode);
		}
		// mmsgJson中的 RTF 为2或8时 需要重新定向到平台首页进行重新登陆

		let json = JSON.parse(res.msgJson);
		// alert(res.msgJson)
		return callback(json, true, 0);
	});
}


/**
 * @param {Object} serviceName 微服务名
 * @param {Object} cmdName 微服务方法名
 * @param {Object} requestParams 微服务方法入参 map（key-value）
 * @param {Object} uid uid
 * @param {Object} isAppendUid 是否需要拼接uid
 * @param {Object} callback 对微服务f方法入参进行转换后的请求json，由于中台已经提供了postDataWeaveString，与期方法内的转换xiang'tong 
 * 所以 该方法目前仅用于  uploadFile方法 
 */
function web_weaveString(serviceName, cmdName, requestParams, uid, isAppendUid, callback) {
	let par = {
		serverMethod: cmdName, // 微服务方法名
		requestParams: requestParams, //微服务方法入参map
	};
	// 调用 平台的转换 方法，将 keyValueMap（requestParams） 转换成 16进制
	web("weaveString", par, paramsHex => {
		let parNoUid = {
			SERVER_NAME: serviceName,
			REQUEST_PARM: paramsHex,
		};
		let parHaveUid = {
			SERVER_NAME: serviceName,
			REQUEST_PARM: paramsHex,
			UID: uid,
			MAC: "12345",
		};
		// 将转换后加上组建好后的json 返回
		var params = JSON.stringify(isAppendUid ? parHaveUid : parNoUid);
		return callback(params);
	})
}

/**
 * @param {Object} serviceName 微服务名
 * @param {Object} url 网关方法
 * @param {Object} cmdName 微服务方法名
 * @param {Object} requestParams  微服务方法入参 map（key-value）
 * @param {Object} callback 
 *  {"RT_D":"验证客户端请求的(身份认证授权通过后)UID值的有效性-验证失败","UID":"0903144640581","nStatusCode":"401","RT_F":"8"}
 */
function web_postData(serviceName, url, cmdName, requestParams, callback) {
	getUID(uid => {
		if (isEmpty(uid)) {
			console.log("uid 不能为空");
			return callback("uid 不能为空");
		}
		// 由于java下  每个请求都需要UID,为了避免每次都传入Uid
		// 在requestParams 主动加加UID
		requestParams["UID"] = uid;
		web_postDataWeaveString(serviceName, url, cmdName, requestParams, false, uid, callback);
	});
}


/**
 * 由于平台App 组建json 时需要对字符串进行 转换，而js转16进制并不容易，
 * 也无法很好的保证与java 端的相互转换能很好的对应，故平台在此提供了一个 新方法
 * @param {Object} serviceName  微服务名称
 * @param {Object} url   网关方法
 * @param {Object} cmdName  微服务方法名  接口名（路径）
 * @param {Object} requestParams  参数 （map 格式）
 * @param {Object} isAppendUid 是否拼接UID，
 * 		向平台传输的json格式为
 * 		{
	 uri: url,
	 requestParams: {
		 SERVER_NAME: serviceName,
		 REQUEST_PARM: {
			 key1：”valeu1“，
			 key2：”valeu2“，
			 ....
			 // 注意 此处也是有 UID和MAC的
			 UID: "123456",
			 MAC: "12345",
		 },
		 // 其中 有些业务App 不能在这添加UID和MAC  ,不然会后台会报错，所以需要视情况添加，没办法，前置服务的限制，
		 UID: "123456",
		 MAC: "12345",
	 },
 }
 * @param {Object} callback  {"RT_D":"成功信息","RT_F":"1"}， {"RT_D":"错误信息","RT_F":"错误码"}
 */
function web_postDataWeaveString(serviceName, url, cmdName, requestParams, isAppendUid, uid, callback) {
	let par = {
		uri: url,
		serverMethod: cmdName,
		serverName: serviceName,
		requestParams: requestParams,
		needUid: isAppendUid,
		uid: uid,
	};

	web("postDataWeaveString", par, callback);
}
/**
 * 通用的post请求，针对当前postData接口以及postDataCallback。 目前已经被 web_postDataWeaveString代替
 * @param {Object} uri 接口uri
 * @param {Object} requestParams 接口请求参数json
 * @param {Object} callback  
 * 	{"RT_D":"成功信息","RT_F":"1"}， {"RT_D":"错误信息","RT_F":"错误码"}
 */
function web_postDataCallback(uri, requestParams, callback) {
	let par = {
		uri: uri,
		requestParams: requestParams,
	};
	web("postDataCallback", par, callback);
}
/**
 * 下载文件方法，返回进度以及下载成功后的文件路径。
 * @param {Object} uri 接口uri
 * @param {Object} fileName 文件名称
 * @param {Object} filePath 指定下载路径
 * @param {Object} callback
 *  {"RT_D":"成功信息","RT_F":"1"}
 * 	{"RT_D":"错误信息","RT_F":"错误码"}
 * 进度返回{"current":"long","total":"long"}
 */
function web_downloadFile(uri, fileName, filePath, callback) {
	let par = {
		uri: uri,
		fileName: fileName,
		filePath: filePath,
	};
	// post("basic", "addApn", paramJson, callback);
	web("downloadFile", par, callback);
}

/**
 * 下载文件方法，返回进度以及下载成功后的文件路径。
 * @param {Object} uri 接口uri
 * @param {Object} fileName 文件名称
 * @param {Object} filePath 指定下载路径
 * @param {Object} callback
 *  {"RT_D":"成功信息","RT_F":"1"}
 * 	{"RT_D":"错误信息","RT_F":"错误码"}
 * 进度返回{"current":"long","total":"long"}
 */
function web_downloadFileList(uriArray, fileNameArray, filePathArray, callback) {
	let par = {
		uriList: uriArray,
		fileNameList: fileNameArray,
		filePathList: filePathArray
	};
	// post("basic", "addApn", paramJson, callback);
	web("downloadFileList", par, callback);
}

/**
 * 下载文件方法，返回进度以及下载成功后的文件路径，支持文件断点续传
 * @param {Object} filePath (string)文件在服务端的路径
 * @param {Object} savePath  文件下载保存路径(含文件名)
 * @param {Object} callback  
 * {"RT_D":"成功信息","RT_F":"1"}
 * {"RT_D":"错误信息","RT_F":"错误码"}
	进度返回{“percent”:"0~100"}1秒更新一次进度
 */
function web_downloadPicFile(filePath, savePath, callback) {
	let par = {
		savePath: savePath,
		filePath: filePath,
	};
	web("downloadPicFile", par, callback);
}


/**
 * 上传图文
 * @param {Object} serviceName 服务名
 * @param {Object} uri  网关方法名
 * @param {Object} cmdName  接口名（包含路径）
 * @param {Object} requestParams  参数
 * @param {Object} files  文件列表
 * @param {Object} callback
 * {"RT_D":"成功信息","RT_F":"1"}
 * {"RT_D":"错误信息","RT_F":"错误码"}
 */
function web_uploadPramsAndFiles(serviceName, uri, cmdName, requestParams, files, callback) {
	/* const uri = "uploadFiles.do"; */
	// 若是文件为空，则直接按照postData 执行
	getUID(uid => {
		if (isEmpty(uid)) {
			console.log("uid 不能为空");
			return callback("uid 不能为空");
		}
		if (isEmptyObj(files) || files.length == 0) {
			web_postDataWeaveString(serviceName, uri, cmdName, requestParams, isAppendUid, uid, callback);
		} else {
			web_weaveString(serviceName, cmdName, requestParams, false, uid, paramsHex => {
				var filepaths = files.join(";");
				web_uploadFile(uri, data, filepaths, callback);
			});
		}

	})

}




/**
 * 功能描述：上传文件
 * @param {Object} uri 接口uri
 * @param {Object} requestParams (string)接口请求参数json
 * @param {Object} filePath 待上传文件路径（多文件用“;”隔开）
 * @param {Object} callback 
 * {"RT_D":"成功信息","RT_F":"1"}
 * {"RT_D":"错误信息","RT_F":"错误码"}
 */
function web_uploadFile(uri, requestParams, filePath, callback) {
	let par = {
		uri: uri,
		requestParams: requestParams,
		filePath: filePath,
		//上传日志是“file”图文上传时“files”,上传图片是“uploadfiles”
		// 也不知道真假，按照v3包下的Java代码封装
		fileKey: "files",
	};
	web("uploadFile", par, callback);
}
/**
 * 参数更新接口，可以更新通用参数配置
 * @param {Object} appIdentity APP标识（包名）
 * @param {Object} paramVersion 参数版本号（第一次可为空）
 * @param {Object} callback 
 * {"RT_D":"成功信息","RT_F":"1"}
 * {"RT_D":"错误信息","RT_F":"错误码"}
 */
function web_commParmUpdate(appIdentity, paramVersion, callback) {
	let par = {
		appIdentity: appIdentity,
		paramVersion: paramVersion,
	};
	web("commParmUpdate", par, callback);
}

/** 大文件分块上传
 * @param {Object} filePath 掌机待上传文件路径
 * @param {Object} savePath 服务器存储路径
 * @param {Object} isDelete 传完是否删除
 * @param {Object} callback
 * 成功回调： {
   "retCode":1,
 * "msgJson":{"fileName":"你好.png",
			  "filePath":"/weblogic/app/eomdoc/20200211/1583342818133.png",
			  "msg":"上传成功"},
    "tag":"requestTag"
	}
	失败回调：{
	"retCode":0,
	"msgJson":{"errorMsg":"上传文件大小超限"},
	"tag":"requestTag"
	}
	进度回调：{
	"retCode":2,
	"msgJson":{"current":2,"total":"10"},
	"tag":"requestTag"}
	
 */
function web_blockUploadFile(filePath, savePath, isDelete, callback) {
	let par = {
		filePath: filePath,
		savePath: savePath,
		isDelete: isDelete,
	};
	web("blockUploadFile", par, callback);
}
/** 取消大文件分块上传
 * @param {Object} filePath 掌机待上传文件路径
 * @param {Object} savePath 服务器存储路径
 * @param {Object} callback
 *  {"retCode":1,
 * 	"msgJson":{"RT_D":"上传取消成功！！！","RT_F":"1"},
	"tag":"requestTag"}
	
	{"retCode":0,
	"msgJson":{"errorMsg":"取消失败"},
	"tag":"requestTag"}
 */
function web_cancelBlockUploadFile(filePath, savePath, callback) {
	let par = {
		filePath: filePath,
		savePath: savePath,
	};
	web("cancelBlockUploadFile", par, callback);
}
/** 订阅消息
 * @param {Object} packageName 包名
 * @param {Object} topic  话题
 * @param {Object} callback 
 * {"retCode":1,"msgJson":{"success":true},"tag":"requestTag"}
 * {"retCode":0,"msgJson":{"success":false},"tag":"requestTag"}
 */
function web_subscribe(packageName, topic, callback) {
	let par = {
		packageName: packageName,
		topic: topic,
	};
	web("subscribe", par, callback);
}
/**
 * 取消订阅消息
 * @param {Object} packageName
 * @param {Object} topic
 * @param {Object} callback
 * {"retCode":1,"msgJson":{"success":true},"tag":"requestTag"}
 * {"retCode":0,"msgJson":{"success":false},"tag":"requestTag"}
 * 
 */
function web_unsubscribe(packageName, topic, callback) {
	let par = {
		packageName: packageName,
		topic: topic,
	};
	web("unsubscribe", par, callback);
}
/**
 * @param {Object} topic 话题
 * @param {Object} content 内容
 * @param {Object} callback
 * 成功回调{"retCode":1,"msgJson":{"success":true},"tag":"requestTag"}
失败回调{"retCode":0,"msgJson":{"success":false},"tag":"requestTag"}
 */
function web_publish(topic, content, callback) {
	let par = {
		content: content,
		topic: topic,
	};
	web("publish", par, callback);
}
/**
 *  获取离线消息
 * @param {Object} packageName  包名
 * @param {Object} callback 
 * 成功回调 [{"topic":”mqttTopic”,"content":"the msg content",”timeTag”:”20200403150759487”}]
 * 成功回调 {"retCode":0,"msgJson":””,"tag":"requestTag"}
 * */
function web_getOfflineMsg(packageName, callback) {
	let par = {
		packageName: packageName,
	};
	web("getOfflineMsg", par, callback);
}
/**
 *  上报已收到消息
 * @param {Object} packageName 包名
 * @param {Object} time  时间标签
 * @param {Object} callback
 * 成功回调	{"retCode":1,"msgJson":{"success": true},"tag":"requestTag"}
 * 失败回调	{"retCode":0,"msgJson":{"success": false},"tag":"requestTag"}
 */
function web_reportReceivedMsg(packageName, time, callback) {
	let par = {
		packageName: packageName,
		time: time,
	};
	web("reportReceivedMsg", par, callback);
}


/**********硬件服务接口*******************************************/

function hardware(methodName, paramJson, callback) {
	post("hardware", methodName, paramJson, callback);
}


/** js调用拍照
 * @param {int} num 几张照片 0-9
 * @param {boolean} isCamera  是否视频
 * @param {String} wtNo  工作票号
 * @param {Object} callback 照片64位
 */
function takePhoto(num, isCamera, wtNo, callback) {
	var paramsData = {
		class: "com.cepri.service.binder.IDEVBaseBinderUtil",
		method: "takePhoto",
		params: {
			imgNum: num,
			isCamera: isCamera,
			wtNo: wtNo,
		}
	};

	var stringParams = JSON.stringify(paramsData);

	bridge.callHandler("jsToJava_IDEVBase", stringParams, responseData => {
		// {"code":"1","msg":"success","result":{"images":"["",""]"}
		let res = JSON.parse(responseData);
		let arr = [];

		if (res.result.images.length > 0) {
			console.info("返回数组:" + typeof(arr));
			arr = res.result.images;
		}

		return callback(arr);
	});


}

/** js调用拍照或者录制视频
 * @param {int} num 几张照片 0-9
 * @param {Object} callback 照片64位
 */
function takePhotoOrVideo(num, isCamera, supportVideo, callback) {
	var paramsData = {
		class: "com.cepri.service.binder.IDEVBaseBinderUtil",
		method: "takePhoto",
		params: {
			imgNum: num,
			isCamera: isCamera,
			supportVideo: supportVideo
		}
	};

	var stringParams = JSON.stringify(paramsData);
	bridge.callHandler("jsToJava_IDEVBase", stringParams, responseData => {
		let res = JSON.parse(responseData);
		return callback(res.result);
	});
}

/** js 人脸识别
 */
/** js调用拍照
 * @param {int} state 0 注册人脸识别，其他 人脸识别
 */
function face(state, view, callback) {

	var activity = "";
	if (state == 0) {
		activity = "com.sgcc.pda.faceplugin.activity.FaceRegisterActivity"
	} else {
		// activity = "com.sgcc.pda.faceplugin.activity.FaceRGBCloseDebugSearchActivity"
		activity = "com.sgcc.pda.faceplugin.activity.InitFaceSdkActivity"
	}
	var alias;
	if (view == 1) {
		alias = "face";
	} else {
		alias = "safeFace";
	}
	var paramsData = {
		params: {
			appPackageName: "com.sgcc.pda.faceplugin",
			startActivity: activity,
			useFrontCamera: '1',
			FLAG: "1"
		}
	};
	var stringParams = JSON.stringify(paramsData);

	bridge.callHandler("jsToJava_PluginJump", stringParams, responseData => {
		let res = JSON.parse(responseData);
		return callback(res);
	});
}

/** js调用安全管控人脸识别
 * @param {int} state 0 注册人脸识别，其他 人脸识别
 */
function safeFace(state, callback) {
	var activity = "";
	if (state == 0) {
		activity = "com.sgcc.pda.faceplugin.activity.FaceRegisterActivity"
	} else {
		activity = "com.sgcc.pda.faceplugin.activity.FaceRGBCloseDebugSearchActivity"
	}
	var params = {
		alias: "safeFace",
		startActivity: activity
	}
	let paramJson = {
		action: "safeFaceInvoke",
		requestParams: JSON.stringify(params)
	}
	let par = {
		mainCode: "safe",
		methodName: "channel",
		tag: "safeFaceInvoke",
		paramJson: JSON.stringify(paramJson)
	};
	bridge.callHandler("post", JSON.stringify(par), responseData => {
		// console.log(JSON.parse(responseData))
		let res = JSON.parse(responseData);
		return callback(res);
	});
}

/** js调用人脸识别
 * @param {Object} userCode 账号
 * @param {Object} userName 用户名
 * @param {Object} useFrontCamera 1使用前置 0使用后置
 * @param {Object} callback 回调
 */
function faceDetect(userCode, userName, useFrontCamera, callback) {

	var activity = "com.sgcc.pda.faceplugin.activity.InitFaceSdkActivity";
	var paramsData = {
		params: {
			appPackageName: "com.sgcc.pda.faceplugin",
			startActivity: activity,
			userCode: userCode,
			userName: userName,
			useFrontCamera: useFrontCamera,
			FLAG: "1"
		}
	};
	var stringParams = JSON.stringify(paramsData);
	bridge.callHandler("jsToJava_PluginJump", stringParams, responseData => {
		let res = JSON.parse(responseData);
		return callback(res);
	});
}

/** js 语音合成
 *@param { 合成的文字} str
 * @param {合成后的状态} state 
 *  String 0  合成播放；
 *  String 1  继续播放
 *  String 2  暂停播放
 */
function voice(str, state, callback) {
	if (str != '' || (str === '' && state === 2)) {
		var paramsData = {
			class: "com.cepri.service.binder.IDEVBaseBinderUtil",
			method: "voice",
			params: {
				data: str,
				state: state
			}
		};
		var stringParams = JSON.stringify(paramsData);
		bridge.callHandler("jsToJava_IDEVBase", stringParams, responseData => {
			let res = JSON.parse(responseData);
			return callback(res);
		});
	}
}

/** js  扫一扫
 */
function scan(callback) {

	var paramsData = {
		class: "com.cepri.service.binder.IDEVBaseBinderUtil",
		method: "localScan",
		params: {

		}
	};
	var stringParams = JSON.stringify(paramsData);

	bridge.callHandler("jsToJava_IDEVBase", stringParams, responseData => {
		let res = JSON.parse(responseData);
		return callback(res);
	});
}
/** js    base64  2 image
 */
function saveBase64File(baseStr, callback) {
	var num = Math.ceil(Math.random() * 100000000000);
	var fileName = num + '.jpg';
	var paramsData = {
		class: "com.cepri.service.binder.IDEVBaseBinderUtil",
		method: "saveBase64File",
		params: {
			base64: baseStr,
			path: "yxgkzy/gongzuopiaoPic",
			fileName: fileName
		}
	};
	var stringParams = JSON.stringify(paramsData);

	bridge.callHandler("jsToJava_IDEVBase", stringParams, responseData => {
		let res = JSON.parse(responseData);
		return callback(res);
	});
}

/**
 *  js录音recordState 0，录音 1，停止录音 2.取消录音
 */
function luyin(recordState, callback) {
	var paramsData = {
		class: "com.cepri.service.binder.IDEVBaseBinderUtil",
		method: "record",
		params: {
			recordState: recordState
		}
	};
	var stringParams = JSON.stringify(paramsData);
	bridge.callHandler("jsToJava_IDEVBase", stringParams, responseData => {
		let res = JSON.parse(responseData);
		return callback(res);
	});
}
/**
 *  js录音播放playState  0 播放 其他值停止。
 */
function luyinbofang(playState, filePath, callback) {
	var paramsData = {
		class: "com.cepri.service.binder.IDEVBaseBinderUtil",
		method: "record",
		params: {
			playState: playState,
			filePath: filePath
		}
	};
	var stringParams = JSON.stringify(paramsData);
	bridge.callHandler("jsToJava_IDEVBase", stringParams, responseData => {
		let res = JSON.parse(responseData);
		return callback(res);
	});
}

/**
 *  js  打开相机。
 */
function openCamera() {
	var paramsData = {
		class: "com.cepri.service.binder.IDEVBaseBinderUtil",
		method: "openCamera",
		params: {

		}
	};
	var stringParams = JSON.stringify(paramsData);
	bridge.callHandler("jsToJava_IDEVBase", stringParams, null);
}

function finishActivity() {
	var paramsData = {
		class: "com.cepri.service.binder.IDEVBaseBinderUtil",
		method: "finishActivity",
		params: {}
	};
	var stringParams = JSON.stringify(paramsData);

	bridge.callHandler("jsToJava_IDEVBase", stringParams, responseData => {});
}

/**
 * 跳转原生界面，
 * @param {String} packageName  原生界面对应App包名
 * @param {String} startActivity 页面类名
 */
function jump(packageName, startActivity) {
	var paramsData = {
		params: {
			packageName: packageName,
			startActivity: startActivity,
			// 平台对应的方法 含有以下两个key,
			// tgId: "",
			// stateDate: "",
		}
	};
	var stringParams = JSON.stringify(paramsData);
	bridge.callHandler("jsToJava_Jump", stringParams, responseData => {
		//let res = JSON.parse(responseData);
		console.log("callback: " + responseData);
	});
}

function business(methodName, paramJson, callback) {
	post("business", methodName, paramJson, callback);
}


// 获取 平台提供的keyValue 值
function getPref(editorKey, key, callback) {
	let par = {
		editorKey: editorKey,
		key: key,
	};
	business("getSharedPreference", par, response => {
		// getSharedPreference 的结果直接就是msgJson ，并未再次封装
		/* 	let responseType = Object.prototype.toString.call(response);
			uni.showToast({
				title: isEmptyObj(response) + "， " + responseType
			}) */
		// var data = getMsgJsonFromResponse(JSON.stringify(response));
		var data = getMsgJsonFromResponse(response);
		return callback(data);
	});
	//	business("getSharedPreference", par,callback);
	/* 	business("getSharedPreference", par,response =>{
				
				return callback(JSON.stringify(response) + "123567");
		}); */
}
// 获取 平台提供的keyValue 值
function getPrefWithDefaultValue(editorKey, key, defaultValue, callback) {
	getPref(editorKey, key, value => {
		return callback(isEmpty(value) ? defaultValue : value)
	});
}


function getDatasFromResponse(response) {
	var msgJson = getMsgJsonFromResponse(response);
	return getDatasFromMsgJson(msgJson);
}

/**
 * 根据响应json 获取msgJson
 * @param {String} response 响应json 
 * @return {String} 获取响应json中  msgJson字段的值，该值通常为 jsonzi字符串，但在sp时直接we为结果值
 */
function getMsgJsonFromResponse(response) {
	if (isEmpty(response)) {
		return "";
	}
	let res = JSON.parse(response);
	//res ： {"msgJson":"1234567890","retCode":1,"tag":"getSharedPreference"}
	if (isEmptyObj(res) || res.retCode != 1 || isEmptyObj(res.msgJson)) {
		//alert("res isEmpty");
		console.log("res isEmpty");
		return "";
	}
	// res.msgJson  本身就是一个字符串类型，不需要再 JSON.stringify(res.msgJson)
	return res.msgJson;


}
/**
 *  根据msgJson 获取datas
 * @param {String} msgJson
 * @return {Array} msgJson中有个datas 是个数组，返回值会存放在 数据中，多用于hardware
 */
function getDatasFromMsgJson(msgJson) {
	var result = [""];
	let msg = JSON.parse(msgJson);
	// msgJson : {code:0,data:["1","2"]}   或者 {code:0,datas:["1","2"]，msg:"msg"}
	if (isEmptyObj(msg) || msg.code != 0) {
		//alert("result isEmpty");
		console.log("result isEmpty");
		return result;
	}
	// 不太确定 result 的key为 data还是datas
	var arr = msg.data;
	arr = null == arr ? msg.datas : arr;
	if (isEmptyObj(arr) || arr.length == 0 || isEmpty(arr[0])) {
		//alert("arr isEmpty"+ JSON.stringify(arr));
		console.log("arr isEmpty" + JSON.stringify(arr));
		return result;
	}
	return arr;
}
/**
 * 获取平台的UID
 * @param {Object} callback 
 */
function getUID(callback) {
	// 这个key是根据 平台代码返回的。
	getPref("LOGIN_", "LOGIN_UID", callback);
}

/**
 * 获取url
 * @param {Object} callback 
 */
function getUrl(callback) {
	// 这个key是根据 平台代码返回的。
	getPref("thinta_comm", "comm_ip", strIp => {
		getPref("thinta_comm", "comm_port", strPort => {
			var port = "";
			if (strPort == '8083') {
				//内网开发
				port = '19000';
			} else if (strPort == '9006') {
				//内网测试
				port = '19000';
			} else if (strPort == '30037') {
				//外网演示
				port = '30039';
			} else if (strPort == '30026') {
				//外网开发
				port = '30042';
			} else if (strPort == '30059') {
				//外网测试
				port = '30060';
			}
			return callback('http://' + strIp + ':' + port);
		});
	});
}


/*
 *大文件上传
 */
function blockUploadFile(filePath, callback) {
	var savePath = "/weblogic/app/yxgkzy/image/"; //上传工作票图片
	var isDelete = false; //上传完成后是否自动删除
	var paramJsonobj = {
		filePath: filePath,
		savePath: savePath,
		isDelete: isDelete
	}
	let par = {
		mainCode: "web",
		methodName: "blockUploadFile",
		packageName: "com.sgcc.pda.safemanager",
		tag: "blockUploadFile",
		paramJson: JSON.stringify(paramJsonobj),
	};
	bridge.callHandler("post", JSON.stringify(par), responseData1 => {
		let res = JSON.parse(responseData1);
		//服务器文件所在路径
		if (res.retCode === 1) {
			var path = JSON.parse(res.msgJson).filePath;
			return callback(path);
		} else {
			return callback("");
		}
	});

}
/*
 * 下载图片
 * filePath   (string)文件在服务端的路径
 * savePath   文件下载保存路径(含文件名)
 */
function downloadPicFile(filePath, callback) {
	var num = Math.ceil(Math.random() * 100000000000);
	var savePath = "/storage/emulated/0/safemanageAppPic/app/yxgkzy/gongzuopiaopic/" + num + '.png'; //工作票下载图片保存路径
	var paramJsonobj = {
		filePath: filePath,
		savePath: savePath
	}
	let par = {
		mainCode: "web",
		methodName: "downloadPicFile",
		packageName: "com.sgcc.pda.safemanager",
		tag: "downloadPicFile",
		paramJson: JSON.stringify(paramJsonobj),
	};
	bridge.callHandler("post", JSON.stringify(par), responseData => {
		let res = JSON.parse(responseData);
		return callback(res);
	});
}

/*
 * 风险点页面---查询操作步骤及风险点
 * parm Object 
 * 	{
 *		appNo:'', // 工单号
 *	 	procNo:[], // 工作程序编号
 *	}
 * 
 */
function loadOperRiskPoint(parm, callback) {
	let paramJson = {
		action: "loadOperRiskPoint",
		requestParams: JSON.stringify(parm)
	}
	let par = {
		mainCode: "safe",
		methodName: "channel",
		packageName: "com.sgcc.pda.mdrh.task.safe.riskpoint",
		tag: "loadOperRiskPoint",
		paramJson: JSON.stringify(paramJson)
	};
	bridge.callHandler("post", JSON.stringify(par), responseData => {
		// console.log(JSON.parse(responseData))
		let res = JSON.parse(responseData);
		return callback(res);
	});
}


/*
 * 风险点页面---查询关键风险点取证列表
 * parm Object 
 * 	{
 *		appNo:'', // 工单号
 *	 	stepNo:[], // 工作步骤编号，多个工作步骤时使用英文的逗号隔开
 *	}
 * 
 */
function loadRiskPointEvidence(parm, callback) {
	let paramJson = {
		action: "loadRiskPointEvidence",
		requestParams: JSON.stringify(parm)
	}
	let par = {
		mainCode: "safe",
		methodName: "channel",
		packageName: "com.sgcc.pda.loadRiskPointEvidencemdrh.task.safe.riskpoint",
		tag: "loadRiskPointEvidence",
		paramJson: JSON.stringify(paramJson)
	};
	bridge.callHandler("post", JSON.stringify(par), responseData => {
		// console.log(JSON.parse(responseData))
		let res = JSON.parse(responseData);
		return callback(res);
	});
}


/*
 * 风险点页面---查询关键风险点取证记录
 * parm Object 
 * 	{
 *		appNo:'', // 工单号
 *	 	stepNo:[], // 工作步骤编号，多个工作步骤时使用英文的逗号隔开
 *	}
 * 
 */
function loadRiskPointEvidenceRecord(parm, callback) {
	let paramJson = {
		action: "loadRiskPointEvidenceRecord",
		requestParams: JSON.stringify(parm)
	}
	let par = {
		mainCode: "safe",
		methodName: "channel",
		packageName: "com.sgcc.pda.mdrh.task.safe.riskpoint",
		tag: "loadRiskPointEvidenceRecord",
		paramJson: JSON.stringify(paramJson)
	};

	bridge.callHandler("post", JSON.stringify(par), responseData => {
		// console.log(JSON.parse(responseData))
		let res = JSON.parse(responseData);
		return callback(res);
	});
}


/*
 * 风险点页面---查询关键风险点取证记录
 * parm Object 
 * 	{
 *		appNo:'092001552925', // 工单号
 *	 	stepNo:'01010202', // 工作步骤Id
 * 		riskPoint:[
 *	 		{
 *	 			riskNo,:"010128" 关键风险点Id
 * 				attach:[
 *	 						{
 *								attachSrc:'/weblogic/app/yxgkzy/image/5448db15802141dc9b0565eb6dbb9da0.jpg',  //附件路径
 * 								attachType:'01', // 附件类型  01照片、02视频、03音频
 * 								localSrc:''  // 本地路径
 *							}
 *					   ]
 *			}
 *		],
 * 
 *	}
 * 
 */
function saveRiskPointEviRecord(parm, callback) {
	let paramJson = {
		action: "saveRiskPointEviRecord",
		requestParams: JSON.stringify(parm)
	}
	let par = {
		mainCode: "safe",
		methodName: "channel",
		packageName: "com.sgcc.pda.mdrh.task.safe.riskpoint",
		tag: "saveRiskPointEviRecord",
		paramJson: JSON.stringify(paramJson)
	};
	bridge.callHandler("post", JSON.stringify(par), responseData => {
		// console.log(JSON.parse(responseData))
		let res = JSON.parse(responseData);
		return callback(res);
	});
}

/**
 * 图片保存在本地并上传服务器
 */
function saveBase64FileAndUpload(baseStr, callback) {
	var num = Math.ceil(Math.random() * 100000000000);
	var fileName = num + '.jpg'; //图片名称
	var paramsData = {
		class: "com.cepri.service.binder.IDEVBaseBinderUtil",
		method: "saveBase64File",
		params: {
			base64: baseStr,
			path: "yxgkzy/image", //本地图片路径
			fileName: fileName
		}
	};
	var stringParams = JSON.stringify(paramsData);

	bridge.callHandler("jsToJava_IDEVBase", stringParams, responseData => {
		let res = JSON.parse(responseData);
		var filePath = res.result.PATH_LOGCAT; //本地路径

		var savePath = "/weblogic/app/yxgkzy/image/"; //上传工作票图片
		var isDelete = false; //上传完成后是否自动删除
		var paramJsonobj = {
			filePath: filePath,
			savePath: savePath,
			isDelete: isDelete
		}
		let par = {
			mainCode: "web",
			methodName: "blockUploadFile",
			packageName: "com.sgcc.pda.safemanager",
			tag: "blockUploadFile",
			uid: "zyz",
			paramJson: JSON.stringify(paramJsonobj),
		};
		bridge.callHandler("post", JSON.stringify(par), responseData1 => {
			let res = JSON.parse(responseData1);
			if (res.retCode === 1) {
				var path = JSON.parse(res.msgJson).filePath; //服务器文件所在路径
				return callback(path);
			} else {
				return callback("");
			}
		});

	});
}

/**  判断网络状态
 */
function isConnect(callback) {
	var paramsData = {
		class: "com.cepri.service.binder.IDEVBaseBinderUtil",
		method: "isConnect",
		params: {}
	};

	var stringParams = JSON.stringify(paramsData);

	bridge.callHandler("jsToJava_IDEVBase", stringParams, responseData => {
		let res = JSON.parse(responseData);
		return callback(res.result.connect);
	});


}


function test(callback) {
	let params = {
		action: "verifyWorkTicketState", // 意图查询工作票状态，类似微服务中的接口名称
		requestParams: {
			appNo: "18771232131", // 工单号
		}
	};
	let par = {
		mainCode: "safe",
		methodName: "channel",
		packageName: "com.sgcc.pda.safemanager",
		tag: "channel",
		paramJson: JSON.stringify(params),
	};
	// 用于调用java代码 js2java
	bridge.callHandler("post", JSON.stringify(par), function(responseData) {
		console.log("--->" + responseData)
		return callback(responseData);
	});
}

//查询知识库专业分类列表
function loadKnowledgeMajorCls(callback) {
	let paramJson = {
		action: "loadKnowledgeMajorCls",
		// requestParams:JSON.stringify(parm)
		requestParams: '' //无参数
	}
	let par = {
		mainCode: "safe",
		methodName: "channel",
		packageName: "com.example.test",
		tag: "loadRiskPointEvidence",
		paramJson: JSON.stringify(paramJson)
	};
	bridge.callHandler("post", JSON.stringify(par), responseData => {
		// console.log(JSON.parse(responseData))
		let res = JSON.parse(responseData);
		return callback(res);
	});
}

//查询知识库业务分类列表
function loadKnowledgeBusiCls(parm, callback) {
	let paramJson = {
		action: "loadKnowledgeBusiCls",
		requestParams: JSON.stringify(parm)
		// requestParams:''//无参数
	}
	let par = {
		mainCode: "safe",
		methodName: "channel",
		packageName: "com.example.test",
		tag: "loadRiskPointEvidence",
		paramJson: JSON.stringify(paramJson)
	};
	bridge.callHandler("post", JSON.stringify(par), responseData => {
		// console.log(JSON.parse(responseData))
		let res = JSON.parse(responseData);
		return callback(res);
	});
}

//查询知识库典型经验信息
function loadKnowledgeTypicalExp(parm, callback) {
	let paramJson = {
		action: "loadKnowledgeTypicalExp",
		requestParams: JSON.stringify(parm)
		// requestParams:''//无参数
	}
	let par = {
		mainCode: "safe",
		methodName: "channel",
		packageName: "com.example.test",
		tag: "loadKnowledgeTypicalExp",
		paramJson: JSON.stringify(paramJson)
	};
	bridge.callHandler("post", JSON.stringify(par), responseData => {
		// console.log(JSON.parse(responseData))
		let res = JSON.parse(responseData);
		return callback(res);
	});
}

//查询知识库标准视频信息
function loadKnowledgeTypicalExp1(parm, action, callback) {
	let paramJson = {
		action: JSON.stringify(action),
		requestParams: JSON.stringify(parm)
		// requestParams:''//无参数
	}
	let par = {
		mainCode: "safe",
		methodName: "channel",
		packageName: "com.example.test",
		tag: "loadKnowledgeTypicalExp",
		paramJson: JSON.stringify(paramJson)
	};
	bridge.callHandler("post", JSON.stringify(par), responseData => {
		// console.log(JSON.parse(responseData))
		let res = JSON.parse(responseData);
		return callback(res);
	});
}

//查询知识库标准视频信息
function loadKnowledgeVideo(parm, callback) {
	let paramJson = {
		action: "loadKnowledgeVideo",
		requestParams: JSON.stringify(parm)
		// requestParams:''//无参数
	}
	let par = {
		mainCode: "safe",
		methodName: "channel",
		packageName: "com.example.test",
		tag: "loadKnowledgeTypicalExp",
		paramJson: JSON.stringify(paramJson)
	};
	bridge.callHandler("post", JSON.stringify(par), responseData => {
		// console.log(JSON.parse(responseData))
		let res = JSON.parse(responseData);
		return callback(res);
	});
}

//查询操作步骤及风险点
function loadOperRiskPoint1(parm, callback) {
	let paramJson = {
		action: "loadOperRiskPoint",
		requestParams: JSON.stringify(parm)
		// requestParams:''//无参数
	}
	let par = {
		mainCode: "safe",
		methodName: "channel",
		packageName: "com.example.test",
		tag: "loadKnowledgeTypicalExp",
		paramJson: JSON.stringify(paramJson)
	};
	bridge.callHandler("post", JSON.stringify(par), responseData => {
		// console.log(JSON.parse(responseData))
		let res = JSON.parse(responseData);
		return callback(res);
	});
}

//查询知识库工作程序详情信息
function loadKnowledgeProcDetail(parm, callback) {
	let paramJson = {
		action: "loadKnowledgeProcDetail",
		requestParams: JSON.stringify(parm)
		// requestParams:''//无参数
	}
	let par = {
		mainCode: "safe",
		methodName: "channel",
		packageName: "com.example.test",
		tag: "loadKnowledgeTypicalExp",
		paramJson: JSON.stringify(paramJson)
	};
	bridge.callHandler("post", JSON.stringify(par), responseData => {
		// console.log(JSON.parse(responseData))
		let res = JSON.parse(responseData);
		return callback(res);
	});
}

//查询标准化作业步骤及风险点
function loadOperStepRiskPoint(parm, callback) {
	let paramJson = {
		action: "loadOperStepRiskPoint",
		requestParams: JSON.stringify(parm)
		// requestParams:''//无参数
	}
	let par = {
		mainCode: "safe",
		methodName: "channel",
		packageName: "com.example.test",
		tag: "loadKnowledgeTypicalExp",
		paramJson: JSON.stringify(paramJson)
	};
	bridge.callHandler("post", JSON.stringify(par), responseData => {
		// console.log(JSON.parse(responseData))
		let res = JSON.parse(responseData);
		return callback(res);
	});
}

//查询关键风险点取证记录

function loadRiskPointEvidRecord(parm, callback) {
	let paramJson = {
		action: "loadRiskPointEvidRecord",
		requestParams: JSON.stringify(parm)
		// requestParams:''//无参数
	}
	let par = {
		mainCode: "safe",
		methodName: "channel",
		packageName: "com.example.test",
		tag: "loadKnowledgeTypicalExp",
		paramJson: JSON.stringify(paramJson)
	};
	bridge.callHandler("post", JSON.stringify(par), responseData => {
		// console.log(JSON.parse(responseData))
		let res = JSON.parse(responseData);
		return callback(res);
	});
}

//查询关键风险点取证列表
function loadPointEvid(parm,callback) {
	let paramJson = {
		action: "loadRiskPointEvid",
		requestParams: JSON.stringify(parm)
		// requestParams:''//无参数
	}
	let par = {
		mainCode: "safe",
		methodName: "channel",
		packageName: "com.example.test",
		tag: "loadKnowledgeTypicalExp",
		paramJson: JSON.stringify(paramJson)
	};
	bridge.callHandler("post", JSON.stringify(par), responseData => {
		// console.log(JSON.parse(responseData))
		let res = JSON.parse(responseData);
		return callback(res);
	});
}

//保存风险点取证数据
function saveRecord(parm, callback) {
	let paramJson = {
		action: "saveRiskPointEviRecord",
		requestParams: JSON.stringify(parm)
		// requestParams:''//无参数
	}
	let par = {
		mainCode: "safe",
		methodName: "channel",
		packageName: "com.example.test",
		tag: "loadKnowledgeTypicalExp",
		paramJson: JSON.stringify(paramJson)
	};
	bridge.callHandler("post", JSON.stringify(par), responseData => {
		// console.log(JSON.parse(responseData))
		let res = JSON.parse(responseData);
		return callback(res);
	});
}

//播放视频(测试地址http://1.192.147.48:30042/weblogic/app/yxgkzy/image/1603199270975.mp4)
function playVideo(url) {
	let par = {
		url: url
	};
	business("playVideo", par, null);
}

function OpenView(packageName,path,isExit) {
	var paramsData = {
		class: "com.cepri.service.binder.IDEVBaseBinderUtil",
		method: "OpenView",
		params: {
			packageName: packageName,
			path:path,
			isExit:isExit,
		}
	};
	var stringParams = JSON.stringify(paramsData);
	
	bridge.callHandler("jsToJava_IDEVBase", stringParams, responseData => {
		let res = JSON.parse(responseData);
		return callback(res);
	});
}

function is2App(packageName,callback) {
	var paramsData = {
		class: "com.cepri.service.binder.IDEVBaseBinderUtil",
		method: "is2App",
		params: {
			packageName: packageName,
		}
	};
	var stringParams = JSON.stringify(paramsData);
	
	bridge.callHandler("jsToJava_IDEVBase", stringParams, responseData => {
		let res = JSON.parse(responseData);
		return callback(res);
	});
}


function jumpToApp(packageName,appNo,isExit) {
	var paramsData = {
		class: "com.cepri.service.binder.IDEVBaseBinderUtil",
		method: "jumpToApp",
		params: {
			packageName: packageName,
			appNo,appNo
		}
	};
	var stringParams = JSON.stringify(paramsData);
	
	bridge.callHandler("jsToJava_IDEVBase", stringParams, responseData => {
		let res = JSON.parse(responseData);
		return callback(res);
	});
}

/** 获取音频时长
 * @param {Object} audioPath
 * @param {Object} callback
 */
function getAudioDuration(audioPath, callback) {
	var paramsData = {
		class: "com.cepri.service.binder.IDEVBaseBinderUtil",
		method: "getAudioDuration",
		params: {
			audioUrl: audioPath
		}
	};
	var stringParams = JSON.stringify(paramsData);
	
	bridge.callHandler("jsToJava_IDEVBase", stringParams, responseData => {
		let res = JSON.parse(responseData);
		return callback(res);
	});
}

/**
 *  将上面的方法暴露出去，在调试通过后逐渐添加。
 */
const platform = {
	post: post,
	web: web,
	web_postData: web_postData,
	web_uploadPramsAndFiles: web_uploadPramsAndFiles,
	web_weaveString: web_weaveString,
	saveBase64File: saveBase64File,

	hardware: hardware,


	takePhoto: takePhoto,
	takePhotoOrVideo: takePhotoOrVideo,
	face: face,
	safeFace: safeFace,
	voice: voice,
	scan: scan,
	luyin: luyin,
	openCamera: openCamera,
	finishActivity: finishActivity,
	jump: jump,
	getPref: getPref,
	getPrefWithDefaultValue: getPrefWithDefaultValue,
	getUID: getUID,
	getUrl: getUrl,
	blockUploadFile: blockUploadFile,
	downloadPicFile: downloadPicFile,
	saveBase64FileAndUpload: saveBase64FileAndUpload,
	loadRiskPointEvidence: loadRiskPointEvidence,
	loadRiskPointEvidenceRecord: loadRiskPointEvidenceRecord,
	saveRiskPointEviRecord: saveRiskPointEviRecord,
	luyinbofang: luyinbofang,
	loadOperRiskPoint: loadOperRiskPoint,
	test: test,
	isConnect: isConnect,
	OpenView:OpenView,
	is2App:is2App,
	jumpToApp:jumpToApp,
	loadKnowledgeMajorCls: loadKnowledgeMajorCls,
	loadKnowledgeBusiCls: loadKnowledgeBusiCls,
	loadKnowledgeTypicalExp: loadKnowledgeTypicalExp,
	loadKnowledgeTypicalExp1: loadKnowledgeTypicalExp1,
	loadKnowledgeVideo: loadKnowledgeVideo,
	loadOperRiskPoint1: loadOperRiskPoint1,
	loadKnowledgeProcDetail: loadKnowledgeProcDetail,
	playVideo: playVideo,
	loadOperStepRiskPoint: loadOperStepRiskPoint,
	loadRiskPointEvidRecord: loadRiskPointEvidRecord,
	loadPointEvid: loadPointEvid,
	saveRecord: saveRecord,
	faceDetect: faceDetect,
	web_downloadPicFile: web_downloadPicFile,
	web_downloadFile: web_downloadFile,
	web_downloadFileList: web_downloadFileList,
	getAudioDuration:getAudioDuration
}

module.exports = platform
