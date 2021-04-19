import Vue from 'vue'
import App from './App'
import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"

Vue.prototype.navback = function(){
	uni.navigateBack({
		delta:1
	})
}

//引入vuex
import store from './store'
//把vuex定义成全局组件
Vue.prototype.$store = store

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
