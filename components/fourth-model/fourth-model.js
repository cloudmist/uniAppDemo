import Vue from "vue"
// 导入模板
import modelComponent from "./fourth-model.vue"
// 使用extend创建构造器
const modelConstructor = Vue.extend(modelComponent)
// 创建实例并指定挂载的元素
const modelInstance = new modelConstructor({
	el: document.createElement('div')
})
// 将实例追加到body上
document.body.appendChild(modelInstance.$mount().$el)

// 定义实例所拥有的方法
function $showModle(options = {}) {
	modelInstance.show = true
	modelInstance.content = options.content || ""

	modelInstance.$close = function() {
		modelInstance.show = false
	}
}

export default {
	// 导出的对象必须要有instal方法，才能用Vue.use()方法
	install: function() {
		if (!Vue.prototype.$showModle) {
			Vue.prototype.$showModle = $showModle
		}
	}
}
