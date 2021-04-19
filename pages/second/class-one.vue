<template>
	<view>
		<uni-nav-bar :statusBar="true" left-icon="back" left-text=" " right-text=" " title="分类一"
			background-color="#14C893" color="#ffffff" fixed="true" @clickLeft="navback">
		</uni-nav-bar>
		<view v-for="(item,index) in classOneData" :key="'classOne'+index">
			<list-item :itemData="item" :isShowCheck="true" :isCanDel="false" :isChecked="item.isCheck"
				@onItemClickListener="onItemClickListener(index)">
			</list-item>
		</view>
		<view class="cardbutton">
			<text>已选{{calculation}}条</text>
		</view>
	</view>
</template>

<script>
	import listItem from '../../components/list-item/list-item.vue'
	import listData from '@/listdata/listdata.json'
	export default {
		components: {
			listItem
		},
		data() {
			return {
				classOneData: []
			}
		},
		onShow: function() {
			var pageData = JSON.parse(JSON.stringify(listData.classOneData));
			var classOneCheckList = this.$store.state.classOneCheckList;
			if (classOneCheckList != null && classOneCheckList.length > 0) {
				for (var i = 0; i < pageData.length; i++) {
					for (var j = 0; j < classOneCheckList.length; j++) {
						if (pageData[i].id == classOneCheckList[j].id) {
							pageData[i].isCheck = true;
						}
					}
				}
			}
			this.classOneData = pageData;
		},
		computed: {
			calculation() {
				let count = 0;
				this.classOneData.forEach((item) => {
					if (item.isCheck) {
						count++;
					}
				})
				return count;
			}
		},
		methods: {
			onItemClickListener(index) {
				this.classOneData[index].isCheck = !this.classOneData[index].isCheck
				if (this.classOneData[index].isCheck) {
					this.$store.state.classOneCheckList.push(this.classOneData[index]);
				} else {
					var item = this.classOneData[index]
					var index0 = this.$store.state.classOneCheckList.findIndex(i => {
						if (item.id == i.id) {
							return true
						}
					})
					this.$store.state.classOneCheckList.splice(index0, 1)
				}
			}
		}
	}
</script>

<style>
</style>
