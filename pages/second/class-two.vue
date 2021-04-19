<template>
	<view>
		<uni-nav-bar :statusBar="true" left-icon="back" left-text=" " right-text=" " title="分类二"
			background-color="#14C893" color="#ffffff" fixed="true" @clickLeft="navback">
		</uni-nav-bar>
		<view v-for="(item,index) in classTwoData" :key="'classTwo'+index">
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
		compTwonts: {
			listItem
		},
		data() {
			return {
				classTwoData: []
			}
		},
		onShow: function() {
			var pageData = JSON.parse(JSON.stringify(listData.classTwoData));
			var classTwoCheckList = this.$store.state.classTwoCheckList;
			if (classTwoCheckList != null && classTwoCheckList.length > 0) {
				for (var i = 0; i < pageData.length; i++) {
					for (var j = 0; j < classTwoCheckList.length; j++) {
						if (pageData[i].id == classTwoCheckList[j].id) {
							pageData[i].isCheck = true;
						}
					}
				}
			}
			this.classTwoData = pageData;
		},
		computed: {
			calculation() {
				let count = 0;
				this.classTwoData.forEach((item) => {
					if (item.isCheck) {
						count++;
					}
				})
				return count;
			}
		},
		methods: {
			onItemClickListener(index) {
				this.classTwoData[index].isCheck = !this.classTwoData[index].isCheck
				if (this.classTwoData[index].isCheck) {
					this.$store.state.classTwoCheckList.push(this.classTwoData[index]);
				} else {
					var item = this.classTwoData[index]
					var index0 = this.$store.state.classTwoCheckList.findIndex(i => {
						if (item.id == i.id) {
							return true
						}
					})
					this.$store.state.classTwoCheckList.splice(index0, 1)
				}
			}
		}
	}
</script>

<style>
</style>
