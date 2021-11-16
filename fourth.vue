<template>
	<view>
		<uni-nav-bar :statusBar="true" left-icon="back" left-text=" " right-text=" " title="列表"
			background-color="#14C893" color="#ffffff" fixed="true" @clickLeft="navback">
		</uni-nav-bar>
		<view v-for="(item,index) in classOneData" :key="'classOne'+index">
			<list-item :itemData="item" :isShowCheck="true" :isCanDel="false" :isChecked="item.isCheck"
				@onItemClickListener="onItemClickListener(index)">
			</list-item>
		</view>
		<view class="cardbutton">
			<view class="flex-row-bw">
				<text class="selected-view">已选{{calculation}}条</text>
				<view>删除</view>
			</view>
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
			}
		}
	}
</script>

<style lang="scss" scoped>
	.selected-view {
		color: #14C893;
	}
</style>
