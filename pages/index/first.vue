/**
* 第一次作业
*/
<template>
	<view style="background-color: #F4F4F4; width: 750rpx;height: 100vh;">
		<view style="width: 750rpx;height: 20rpx;"></view>
		<view class="nav-row">
			<view v-for="(iten,index) in nava" :key="index">
				<image :src="iten.src" mode="" style="width: 83rpx; height: 83rpx;"></image>
				<text>{{iten.name}}</text>
			</view>
		</view>
		<view class="message-row">
			<image style="margin-left: 20rpx;" class="top-icon" src="../../static/home_icon_xiaoxi@2x.png"></image>
			<text style="font-size: 32rpx;color: #808080;margin-left: 20rpx;">暂无消息！</text>
			<image style="width: 354rpx;height: 117rpx;margin-left: 30rpx;" src="../../static/暂无消息插画@2x.png"></image>
		</view>
		<view class="work-row">
			<view class="work-row-item" style="background-color: #C1E9DC;">
				<view class="work-row-column">
					<text style="font-size: 32rpx;color: #323232;">任 务 发 起</text>
					<text style="font-size: 30rpx;color: #5FC396;margin-top: 8rpx;">效率提升</text>
				</view>
				<image class="top-icon" style="margin-left: 30rpx;" src="../../static/icon_任务发起@2x.png"></image>
			</view>
			<view class="work-row-item" style="background-color: #FCE9C8;">
				<view class="work-row-column">
					<text style="font-size: 32rpx;color: #323232;">待 办 工 作</text>
					<text style="font-size: 30rpx;color: #EB8755;margin-top: 8rpx;">快速查看</text>
				</view>
				<image class="top-icon" style="margin-left: 30rpx;" src="../../static/icon_daibangongdan@2x.png"></image>
			</view>
		</view>
		<view class="last-use">
			<view class="last-use-top">
				<text style="flex: 1;">最近使用</text>
				<text style="margin-right: 5rpx;">全部</text>
				<image style="width: 30rpx;height: 30rpx;" src="../../static/icon_youjiantou@2x.png"></image>
			</view>
			<view class="last-use-list" >
				<view class="last-use-item" v-for="(item,index) in navb" :key="index">
					<image :src="item.src" mode="" style="width: 58rpx; height: 58rpx;margin-top: 20rpx;"></image>
					<text style="font-size: 24rpx;margin-top: 8rpx;">{{item.name}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				nava: [{
					src: "../../static/home_icon_zyjh@2x.png",
					name: "工作计划"
				}, {
					src: "../../static/home_icon_gzp@2x.png",
					name: "工作票"
				}, {
					src: "../../static/home_icon_bqh@2x.png",
					name: "班前会"
				}, {
					src: "../../static/home_icon_fxd@2x.png",
					name: "风险点"
				}],
				navb: [{
					src: "../../static/icon_线损异常@2x.png",
					name: "线损异常"
				}, {
					src: "../../static/icon_互感器检测@2x.png",
					name: "互感器检测"
				}, {
					src: "../../static/icon_cjyc_04@2x.png",
					name: "计量装置"
				}, {
					src: "../../static/home_icon_zyjh@2x.png",
					name: "采集异常"
				}, {
					src: "../../static/icon_ydjc_79@2x.png",
					name: "用电检查"
				}, {
					src: "../../static/home_icon_bqh@2x.png",
					name: "单户装拆"
				}, {
					src: "../../static/icon_hbgxyp_80@2x.png",
					name: "户变关系"
				}, {
					src: "../../static/icon_xianchangjianyan_32@2x.png",
					name: "现场检查"
				}, {
					src: "../../static/icon_fqd_26@2x.png",
					name: "反窃电"
				}]
			};
		}
	}
</script>

<style>
	.nav-row {
		margin-left: 36rpx;
		margin-right: 36rpx;
		width: 684rpx;
		height: 180rpx;
		display: flex;
		flex-direction: row;
		background-color: #FFFFFF;
		border-radius: 10rpx;
		justify-content: space-around;
	}

	.nav-row view {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.nav-row view text {
		margin-top: 10rpx;
		font-size: 30rpx;
		color: #282828;
	}

	.message-row {
		margin-top: 30rpx;
		margin-left: 36rpx;
		margin-right: 36rpx;
		width: 684rpx;
		height: 172rpx;
		display: flex;
		flex-direction: row;
		background-color: #FFFFFF;
		border-radius: 10rpx;
		align-items: center;
	}

	.top-icon {
		width: 83rpx;
		height: 83rpx;
	}

	.work-row {
		margin-top: 30rpx;
		margin-left: 36rpx;
		margin-right: 36rpx;
		width: 684rpx;
		height: 172rpx;
		display: flex;
		flex-direction: row;
		border-radius: 10rpx;
		justify-content: space-between;
	}

	.work-row-item {
		display: flex;
		flex-direction: row;
		width: 330rpx;
		align-items: center;
		justify-content: center;
	}

	.work-row-column {
		display: flex;
		flex-direction: column;
		border-radius: 10rpx;
	}

	.last-use {
		margin-top: 30rpx;
		margin-left: 36rpx;
		margin-right: 36rpx;
		width: 684rpx;
		height: wrap;
		background-color: #FFFFFF;
		display: flex;
		flex-direction: column;
		border-radius: 10rpx;
	}
	.last-use-top{
		padding: 20rpx;
		display: flex;
		height: wrap;
		flex-direction: row;
		align-items: center;
	}
	.last-use-list{
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		margin-bottom: 30rpx;
	}
	.last-use-item{
		display: flex;
		flex-direction: column;
		width: 134rpx;
		align-items: center;
	}
</style>
