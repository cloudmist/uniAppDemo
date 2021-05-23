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
				<view class="flex-row-vcenter" >
					<text class="good-price">计划时间：</text>
					<view class="flex-col">
						<text class="green-point"></text>
						<view class="vertical-line"></view>
						<text class="red-point"></text>
					</view>
					<view class="flex-col">
						<text>{{plan.checkCount}}</text>
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
					height: 45rpx;
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

			}
		}
	}
</style>
