<template>
	<view style="background-color: #F5F5F5;">
		<uni-nav-bar :statusBar="true" left-icon="back" left-text=" " right-text=" " title="分类列表"
			background-color="#14C893" color="#ffffff" fixed="true" @clickLeft="navback">
		</uni-nav-bar>
		<view class="class-item" @tap="toClassOne">
			<text class="class-text">分类一</text>
			<image class="icon-right" src="../../static/icon_youjiantou@2x.png"></image>
		</view>
		<view class="class-item" @tap="toClassTwo">
			<text class="class-text">分类二</text>
			<image class="icon-right" src="../../static/icon_youjiantou@2x.png"></image>
		</view>
		<view class="class-item" @tap="toAllSelect">
			<text class="class-text">已选列表</text>
			<text class="selected-num">{{selectedNum}}个</text>
			<image class="icon-right" src="../../static/icon_youjiantou@2x.png"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				selectedNum: 0
			}
		},
		onShow() {
			var allList = this.$store.state.classOneCheckList.concat(this.$store.state.classTwoCheckList)
			this.selectedNum = 0
			for (var i = 0; i < allList.length; i++) {
				if (allList[i].isCheck) {
					this.selectedNum++
				}
			}
		},
		methods: {
			// 跳转分类一
			toClassOne: function() {
				uni.navigateTo({
					url: './class-one'
				})
			},
            // 跳转分类二
			toClassTwo: function() {
				uni.navigateTo({
					url: './class-two'
				})
			},
			toAllSelect: function() {
				uni.navigateTo({
					url: './all-select'
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.class-item {
		display: flex;
		flex-direction: row;
		align-items: center;
		width: 750rpx;
		height: 80rpx;
		background-color: #FFFFFF;
		margin-top: 15rpx;
	}

	.class-text {
		font-weight: bold;
		color: #323232;
		font-size: 32rpx;
		flex: 1;
		margin-left: 30rpx;
	}

	.icon-right {
		width: 25rpx;
		height: 30rpx;
		margin-left: 15rpx;
		margin-right: 20rpx;
	}

	.selected-num {
		color: #14C893;
		font-size: 28rpx;

	}
</style>
