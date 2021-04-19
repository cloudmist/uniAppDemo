<template>
	<view>
		<uni-nav-bar :statusBar="true" left-icon="back" left-text=" " right-text=" " title="已选列表"
			background-color="#14C893" color="#ffffff" fixed="true" @clickLeft="navback">
		</uni-nav-bar>
		<view v-for="(item,index) in allSelectList" :key="index">
			<list-item :itemData="item" :isShowCheck="false" :isCanDel="true" :isChecked="item.isCheck"
				:isDelState="item.isDelState" @onItemClickListener="onItemClickListener(index)"
				@onItemLongClickListener="onItemLongClickListener(index)" @deleteItem="deleteItem(index)">
			</list-item>
		</view>

		<view class="cardbutton flex-row-vcenter" ref="btnref">
			<text>已选{{calculation}}条</text>
			<button class="submit-btn">提交</button>
		</view>
	</view>
</template>

<script>
	import listItem from '../../components/list-item/list-item.vue'
	export default {
		components: {
			listItem
		},
		data() {
			return {
				allSelectList: []
			}
		},
		onShow: function() {
			var allList = this.$store.state.classOneCheckList.concat(this.$store.state.classTwoCheckList)
			for (var i = 0; i < allList.length; i++) {
				allList[i].isDelState = false;
			}
			this.allSelectList = allList;
		},
		computed: {
			calculation() {
				let count = 0;
				this.allSelectList.forEach((item) => {
					if (item.isCheck) {
						count++;
					}
				})
				return count;
			}
		},
		methods: {
			onItemClickListener(index) {
				for (var i = 0; i < this.allSelectList.length; i++) {
					this.allSelectList[i].isDelState = false;
				}
			},
			// 长按事件
			onItemLongClickListener: function(index) {
				for (var i = 0; i < this.allSelectList.length; i++) {
					if (i == index && !this.allSelectList[i].isDelState) {
						this.allSelectList[i].isDelState = true;
					} else {
						this.allSelectList[i].isDelState = false;
					}
				}
			},
			// 删除
			deleteItem(index) {
				var item = this.allSelectList[index]

				var index0 = this.$store.state.classOneCheckList.findIndex(i => {
					if (item.id == i.id) {
						return true
					}
				})
				if (index0 > -1) {
					this.$store.state.classOneCheckList.splice(index0, 1)
				}

				var index1 = this.$store.state.classTwoCheckList.findIndex(i => {
					if (item.id == i.id) {
						return true
					}
				})
				if (index1 > -1) {
					this.$store.state.classTwoCheckList.splice(index1, 1)
				}

				var allList = this.$store.state.classOneCheckList.concat(this.$store.state.classTwoCheckList)
				for (var i = 0; i < allList.length; i++) {
					allList[i].isDelState = false;
				}
				this.allSelectList = allList;
			}
		}
	}
</script>

<style scoped lang="scss">
	.submit-btn {
		background-color: #14C893; color: #FFFFFF; width: 420rpx; margin-left: 140rpx;
	}
</style>
