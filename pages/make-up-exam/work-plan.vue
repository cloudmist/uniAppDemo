<template>
	<view class="root-page">
		<uni-nav-bar :statusBar="true" left-icon="back" left-text=" " right-text=" " title="作业计划"
			background-color="#14C893" color="#ffffff" fixed="true" @clickLeft="navback">
		</uni-nav-bar>
		<!-- 右侧抽屉栏 -->
		<udrawer ref="drawerRight" @change="showPrincipal" mode="right">
			<choose-principal></choose-principal>
		</udrawer>

		<view class="flex-col plan-name-part">
			<text class="plan-subtitle">计划名称</text>
			<input class="input-plan-name" placeholder="请输入计划名称" v-model="workPlan.planName"></input>
		</view>

		<view class="flex-col type-part">
			<view class="flex-row-bw" @tap="chooseWorkType">
				<text class="plan-subtitle">作业类型</text>
				<text>{{workPlan.workType}}</text>
				<image class="icon-right" src="../../static/arrowr.png"></image>
			</view>
			<view class="line"></view>
			<view class="flex-row-bw" @tap="choosePrincipal">
				<text class="plan-subtitle">负责人</text>
				<text>{{workPlan.principal}}</text>
				<image class="icon-right" src="../../static/arrowr.png"></image>
			</view>
		</view>

		<view class="flex-col address-part">
			<text class="plan-subtitle">作业地点</text>
			<view class="input-area flex-col">
				<textarea class="text-area" maxlength="140" v-model="workPlan.workAddress"></textarea>
				<text class="input-count">{{addressCount}}/140</text>
			</view>
		</view>

		<view class="flex-col address-part">
			<text class="plan-subtitle">计划内容</text>
			<view class="input-area flex-col">
				<textarea class="text-area" maxlength="140" v-model="workPlan.planContent"></textarea>
				<text class="input-count">{{contnetCount}}/140</text>
			</view>
		</view>

		<view class="flex-col type-part">
			<view class="flex-row-bw">
				<text class="plan-subtitle">计划开始时间</text>
				<biaofun-datetime-picker class="datetime-picker" v-model="workPlan.startTime"
					:defaultValue="workPlan.startTime" fields="minute" @change="changeDatetimePickerStart" />
				<image class="icon-right" src="../../static/arrowr.png"></image>
			</view>
			<view class="line"></view>
			<view class="flex-row-bw">
				<text class="plan-subtitle">计划结束时间</text>
				<biaofun-datetime-picker class="datetime-picker" v-model="workPlan.endTime"
					:defaultValue="workPlan.endTime" fields="minute" @change="changeDatetimePickerEnd" />
				<image class="icon-right" src="../../static/arrowr.png"></image>
			</view>
		</view>
		<view class="cardbutton" ref="btnref">
			<button :class="['button',btnFlag? 'nomalBtn':'primarybtn']" :disabled="btnFlag" @tap="submit">提交审核</button>
		</view>
		<!-- 工作类型弹窗 -->
		<uni-popup ref="workTypeRef" @change="popupChange">
			<work-type @closePopup="closePopup"></work-type>
		</uni-popup>
	</view>
</template>

<script>
	import timePicker from '@/components/biaofun-datetime-picker/biaofun-datetime-picker.vue'
	import udrawer from '@/components/uni-drawer/uni-drawer.vue'
	import choosePrincipal from './choose-principal.vue'
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import workType from './work-type.vue'
	import util from "@/utils/util.js"
	import platform from "@/common/platform.js"
	export default {
		components: {
			udrawer,
			choosePrincipal,
			timePicker,
			uniPopup,
			workType
		},
		data() {
			return {
				planName: "",
				addressCount: 0,
				planContent: "",
				contnetCount: 0,
				startTime: "",
				endTime: "",
				workPlan: {
					"planName": "",
					"review": "未审核",
					workAddress: "",
					"planContent": "",
					"checkCount": 0,
					"startTime": "",
					"endTime": "",
					workType: "",
					principal: "",
					"progress": "未开始"
				},
				btnFlag: true,
			}
		},
		methods: {
			/**
			 * 选择负责人
			 */
			choosePrincipal: function() {
				this.$refs.drawerRight.open()
			},
			showPrincipal: function(e) {
				if (!e) {
					this.workPlan.principal = this.$store.state.principal;
				}
			},
			// 选择开始日期
			changeDatetimePickerStart: function(data) {
				this.workPlan.startTime = data
			},
			// 选择结束日期
			changeDatetimePickerEnd: function(data) {
				this.workPlan.endTime = data
			},
			/**
			 * 工作类型弹窗
			 */
			chooseWorkType: function() {
				this.$refs.workTypeRef.open()
			},
			/**
			 * 关闭工作类型弹窗
			 */
			closePopup: function() {
				this.$refs.workTypeRef.close()
			},
			/**
			 * 工作类型弹窗状态监听
			 */
			popupChange: function(e) {
				if (!e.show) {
					this.workPlan.workType = this.$store.state.workType;
				}
			},
			/**
			 * 提交审核
			 */
			submit: function() {
				this.$store.state.workPlanList.push(this.workPlan);
				this.$store.state.workType = "";
				this.$store.state.principal = "";
				uni.showToast({
					title: '提交成功！',
					duration: 2000
				});
				uni.$emit('update', {
					msg: '页面更新'
				})
				setTimeout(function() {
					uni.navigateBack();
				}, 1000);
			},
		},
		watch: {
			workAddress(newVal, oldVal) {
				this.addressCount = newVal.length;
			},
			planContent(newVal, oldVal) {
				this.contnetCount = newVal.length;
			},
			workPlan: {
				handler: function(val, oldVal) {
					if (!val.planName) {
						this.btnFlag = true
						return;
					}
					if (!val.workType) {
						this.btnFlag = true
						return;
					}
					if (!val.principal) {
						this.btnFlag = true
						return;
					}
					if (!val.workAddress) {
						this.btnFlag = true
						return;
					}
					if (!val.planContent) {
						this.btnFlag = true
						return;
					}
					if (!val.startTime) {
						this.btnFlag = true
						return;
					}
					if (!val.endTime) {
						this.btnFlag = true
						return;
					}
					this.btnFlag = false
				},
				deep: true
			}
		}
	}
</script>

<style lang="scss" scoped>
	.root-page {
		width: 750rpx;
		height: 100vh;
		background-color: #F5F5F5;

		.plan-subtitle {
			color: #323232;
			font-size: 34rpx;
		}
	}

	.plan-name-part {
		background-color: #FFFFFF;
		padding: 20rpx;
	}

	.input-plan-name {
		margin-top: 20rpx;
		border: #14C893;
		border-style: solid;
		border-top: none;
		border-left: none;
		border-right: none;
		border-width: 3rpx;
		font-size: 32rpx;
	}

	.type-part {
		background-color: #FFFFFF;
		margin-top: 12rpx;
	}

	.icon-right {
		margin-left: 20rpx;
		width: 18rpx;
		height: 35rpx;
	}

	.line {
		background-color: #F5F5F5;
		width: 700rpx;
		height: 3rpx;
		margin-left: 50rpx;
	}

	.flex-row-bw {
		padding: 20rpx;
	}

	.address-part {
		background-color: #FFFFFF;
		margin-top: 12rpx;
		padding: 20rpx;
	}

	.input-area {
		background-color: #F5F5F5;
		border-radius: 8rpx;
	}

	.text-area {
		width: 95%;
		margin-top: 12rpx;
		background-color: #F5F5F5;
		border-radius: 8rpx;
		font-size: 32rpx;
	}

	.input-count {
		color: #666666;
		display: flex;
		justify-content: flex-end;
		margin-right: 20rpx;
		font-size: 30rpx;
	}

	.nomalBtn {
		background-color: #14C893;
	}
</style>
