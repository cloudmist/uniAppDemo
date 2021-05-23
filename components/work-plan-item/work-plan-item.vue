<!-- 列表组件 -->
<template>
	<view class="good-list">
		<view class="good-li" v-for="(plan,index) in list" :key="'plan'+index">
			<view class="flex-item flex-col cardshadow">
				<view class="flex-row-bw">
					<view class="good-name">{{plan.planName}}</view>
					<view :class="['已审核'==plan.review?'already-review':'no-review']">{{plan.review}}</view>
				</view>
				<view class="flex-row-vcenter">
					<text class="good-price">计划内容：</text>
					<text class="plan-content">{{plan.planContent}}</text>
				</view>
				<view class="flex-row-vcenter" v-if="plan.checkCount>0">
					<text class="good-price">应检数量：</text>
					<text class="plan-content">{{plan.checkCount}}</text>
				</view>
				<view class="flex-row" >
					<text class="good-price">计划时间：</text>
					<view class="flex-col">
						<view class="green-point"></view>
						<view class="vertical-line"></view>
						<view class="red-point"></view>
					</view>
					<view class="flex-col-c">
						<text class="plan-content">{{plan.startTime}}</text>
						<text class="plan-content">{{plan.endTime}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			list: {
				type: Array,
				default () {
					return []
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.good-list {
		background-color: #F5F5F5;

		.good-li {
			padding: 20rpx;

			.flex-item {
				padding-right: 0rpx;

				.flex-row-vcenter {
					height: 48rpx;
				}

				.good-name {
					font-size: 36rpx;
					line-height: 40upx;
					height: 50upx;
					margin-bottom: 20upx;
					overflow: hidden;
				}

				.already-review {
					background-color: #14C893;
					color: #FFFFFF;
					display: flex;
					align-items: center;
					justify-content: center;
					width: 100rpx;
					height: 40rpx;
					font-size: 28rpx;
					border-radius: 20rpx 0rpx 0rpx 20rpx;
				}

				.no-review {
					background-color: red;
					color: #FFFFFF;
					display: flex;
					align-items: center;
					justify-content: center;
					width: 100rpx;
					height: 40rpx;
					font-size: 28rpx;
					border-radius: 20rpx 0rpx 0rpx 20rpx;
				}

				.good-price {
					font-size: 30rpx;
					color: gray;
				}

				.plan-content {
					font-size: 30rpx;
					color: #323232;
				}

				.good-sold {
					font-size: 30rpx;
					color: gray;
				}
				
				.green-point{
					margin-top: 10rpx;
					width: 20rpx;
					height: 20rpx;
					background-color: #14C893;
					border-radius: 10rpx;
				}
				
				.red-point{
					width: 20rpx;
					height: 20rpx;
					background-color: red;
					border-radius: 10rpx;
					margin-top: 25rpx;
				}
				
				.flex-col-c{
					margin-left: 10rpx;
				}

			}
		}
	}
</style>
