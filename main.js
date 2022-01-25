import Vue from 'vue'
import App from './App'
import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
import fourthModel  from '@/components/fourth-model/fourth-model.js'  
Vue.use( fourthModel )  

Vue.prototype.navback = function() {
	uni.navigateBack({
		delta: 1
	})
}

Vue.mixin({

	methods: {
		filter(temp) {
			let date = '';
			if (temp.length == 13) {
				date = new Date(temp);
			} else {
				date = new Date(temp * 1000);
			}
			let y = date.getFullYear();
			let m = date.getMonth() + 1;
			let d = date.getDate();
			if (m < 10) {
				m = '0' + m;
			};
			if (d < 10) {
				d = '0' + d;
			}
			let dateStr = y + '年' + m + '月' + d + '日';
			console.log('时间字符串==' + dateStr)
			return dateStr;
		}
	}
})

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
