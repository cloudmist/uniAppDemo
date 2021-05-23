<template>
	<view class="root-page">
		<uni-nav-bar :statusBar="true" left-icon="back" left-text=" " right-text=" " title="作业计划"
			background-color="#14C893" color="#ffffff" fixed="true" @clickLeft="navback">
		</uni-nav-bar>
		<view class="flex-col plan-name-part">
			<text class="plan-subtitle">计划名称</text>
			<input class="input-plan-name" placeholder="请输入计划名称"></input>
		</view>
		
		<view class="flex-col type-part" >
			<view class="flex-row-bw" @tap="chooseWorkType">
				<text class="plan-subtitle">作业类型</text>
				<text></text>
				<image class="icon-right" src="../../static/arrowr.png"></image>
			</view>
			<view class="line"></view>
			<view class="flex-row-bw">
				<text class="plan-subtitle">负责人</text>
				<text></text>
				<image class="icon-right" src="../../static/arrowr.png"></image>
			</view>
		</view>
		
		<view class="flex-col address-part" >
			<text class="plan-subtitle">作业地点</text>
			<textarea class="text-area" maxlength="140"></textarea>
		</view>
		
		<view class="flex-col address-part" >
			<text class="plan-subtitle">计划内容</text>
			<textarea class="text-area" maxlength="140"></textarea>
		</view>
		
		<view class="flex-col type-part" >
			<view class="flex-row-bw">
				<text class="plan-subtitle">计划开始时间</text>
				<text></text>
				<image class="icon-right" src="../../static/arrowr.png"></image>
			</view>
			<view class="line"></view>
			<view class="flex-row-bw">
				<text class="plan-subtitle">计划结束时间</text>
				<text></text>
				<image class="icon-right" src="../../static/arrowr.png"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		
	}
</script>

<style lang="scss" scoped>
	.root-page{
		height: 100vh;
		background-color: #F5F5F5;
		
		.plan-subtitle{
			color: #323232;
			font-size: 34rpx;
		}
	}
	
	.plan-name-part {
		background-color: #FFFFFF;
		padding: 20rpx;
	}
	
	.input-plan-name{
		margin-top: 20rpx;
		border: #14C893;
		border-style: solid;
		border-top: none;
		border-left: none;
		border-right: none;
		border-width: 3rpx;
		font-size: 32rpx;
	}
	
	.type-part{
		background-color: #FFFFFF;
		margin-top: 12rpx;
	}
	
	.icon-right{
		margin-left: 20rpx;
		width: 18rpx;
		height: 35rpx;
	}
	
	.line{
		background-color: #F5F5F5;
		width: 100%;
		height: 3rpx;
		margin-left: 50rpx;
	}
	
	.flex-row-bw{
		padding: 20rpx;
	}
	
	.address-part{
		background-color: #FFFFFF;
		margin-top: 12rpx;
		padding: 20rpx;
	}
	
	.text-area{
		width: 95%;
		margin-top: 12rpx;
		background-color: #F5F5F5;
		border-radius: 8rpx;
	}
</style>
