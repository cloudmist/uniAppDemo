<template>
	<view>
		<view class="item-view" @tap="onItemClickListener" @longtap="onItemLongClickListener">
			<image v-if="isShowCheck" class="item-check" :src="checkIcon"></image>
			<view :class="['cardshadow',isDelState?'item-del-background':'item-info']">
				<text class="item-title">{{itemData.title}}</text>
				<view class="item-unit">
					<text class="item-unit-text">上报单位</text>
					<text class="item-unit-content">{{itemData.unit}}</text>
				</view>
				<view class="item-address">
					<text class="item-address-text">上报时间</text>
					<text class="item-address-content">{{filter(itemData.date)}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "list-item",
		props: {
			itemData: {
				type: Object,
				required: true
			},
			// 是否展示勾选框
			isShowCheck: {
				type: Boolean,
				default: true,
				required: true
			},
			isChecked: {
				type: Boolean,
				default: false,
			},
			// 是否可以删除
			isCanDel: {
				type: Boolean,
				default: false
			},
			// 是否删除状态
			isDelState: {
				type: Boolean,
				default: false
			}
		},
		created: function() {
			if (this.isChecked) {
				this.checkIcon = '../../static/icon_fuxuan_selected@2x.png'
			} else {
				this.checkIcon = '../../static/icon_fuxuan_default@2x.png'
			}
		},
		data() {
			return {
				checkIcon: '../../static/icon_fuxuan_default@2x.png'
			}
		},
		watch: {
			isChecked(newVal, oldVal) {
				if (newVal) {
					this.checkIcon = '../../static/icon_fuxuan_selected@2x.png'
				} else {
					this.checkIcon = '../../static/icon_fuxuan_default@2x.png'
				}
			}
		},
		methods: {
			// 条目点击事件
			onItemClickListener: function() {
				this.$emit("onItemClickListener")
			},
			// 条目长按事件
			onItemLongClickListener: function() {
				this.$emit("onItemLongClickListener")
			},
			// 删除事件
			deleteItem: function() {
				this.$emit("deleteItem")
			}
		}
	}
</script>

<style scoped>
	.item-view {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		margin-top: 10rpx;
	}

	.item-check {
		width: 50rpx;
		height: 50rpx;
		margin-left: 20rpx;
		padding-top: 30rpx;
	}

	.item-info {
		width: 80%;
		margin: 30rpx 30rpx 0rpx 30rpx;
	}


	.item-title {
		color: #111111;
		font-size: 36rpx;
		font-weight: bold;
	}

	.item-unit {
		margin-top: 16rpx;
	}

	.item-unit-text {
		color: #666666;
		font-size: 32rpx;
	}

	.item-unit-content {
		color: #323232;
		font-size: 32rpx;
		margin-left: 24rpx;
	}

	.item-address {
		margin-top: 16rpx;
	}

	.item-address-text {
		color: #666666;
		font-size: 32rpx;
	}

	.item-address-content {
		color: #323232;
		font-size: 32rpx;
		margin-left: 24rpx;
	}

	.item-del-background {
		width: 80%;
		margin: 30rpx 30rpx 0rpx 30rpx;
		background-color: rgba(0, 0, 0, 0.3)
	}
</style>
