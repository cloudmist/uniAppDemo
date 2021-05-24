<template>
	<view>
		<view class="subtitle">请选择负责人</view>
		<view v-for="(item ,index) in principalList" :key="'principal'+index">
			<view class="flex-row-bw flex-row-vcenter principal-name" @tap="changeCheckedState(index)">
				<text
					:class="[item.isCheck?'principal-name-text-checked':'principal-name-text-normal']">{{item.name}}</text>
				<image class="check-icon" v-if="item.isCheck" src="../../static/icon_fuxuan_selected@2x.png"></image>
			</view>
			<view class="line-bottom"></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				principalList: [{
					"name": "安迪",
					"isCheck": false
				}, {
					"name": "陈景润",
					"isCheck": false
				}, {
					"name": "高明明",
					"isCheck": false
				}, {
					"name": "秦大海",
					"isCheck": false
				}, {
					"name": "周启阳",
					"isCheck": false
				}, {
					"name": "赵晓辉",
					"isCheck": false
				}, {
					"name": "周密",
					"isCheck": false
				}, {
					"name": "王新奇",
					"isCheck": false
				}]
			}
		},
		mounted: function() {
			let principalStr = this.$store.state.principal;
			if (principalStr) {
				for (var i = 0; i < this.principalList.length; i++) {
					if (principalStr.indexOf(this.principalList[i].name) != -1) {
						this.principalList[i].isCheck = true;
					}
				}
			}
		},
		methods: {
			/**
			 * 改变选中状态
			 */
			changeCheckedState: function(index) {
				this.principalList[index].isCheck = !this.principalList[index].isCheck
				let principalStr = "";
				for (var i = 0; i < this.principalList.length; i++) {
					if (this.principalList[i].isCheck) {
						if (principalStr) {
							principalStr = principalStr + "," + this.principalList[i].name;
						} else {
							principalStr = this.principalList[i].name;
						}
					}
				}
				this.$store.state.principal = principalStr;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.subtitle {
		font-size: 34rpx;
		color: #323232;
		padding: 20rpx;
	}

	.principal-name {
		height: 80rpx;
		padding-left: 20rpx;
	}

	.principal-name-text-checked {
		font-size: 32rpx;
		color: #14C893;
	}

	.principal-name-text-normal {
		font-size: 32rpx;
		color: #323232;
	}

	.check-icon {
		width: 32rpx;
		height: 32rpx;
		margin-right: 20rpx;
	}

	.line-bottom {
		width: 100%;
		height: 2rpx;
		background-color: #F5F5F5;
	}
</style>
