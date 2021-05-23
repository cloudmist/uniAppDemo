<template>
	<view class="tabSwiper">
		<uni-nav-bar :statusBar="true" left-icon="back" left-text=" " right-text=" " title="作业计划管理"
			background-color="#14C893" color="#ffffff" fixed="true" @clickLeft="navback">
		</uni-nav-bar>
		<!-- tab切换 -->
		<view class="safe-tabbox flex-row-c" style="background-color: #FFFFFF; height: 88rpx;">
			<view v-for="(item,index) in tabs" :key="index"
				:class="['tabItemrow','flex-row-bw','flex-row-vcenter',{'tabactive':activeTab == index,'tabactivea':activeTab != index}]"
				@tap="change(index)">
				<view class="text" style=" text-align: center; width: 350rpx;">{{item.name}}</view>
			</view>
		</view>

		<swiper class="swiperbox" :duration="200" :current="current" @change="swiperChange">
			<swiper-item v-for="(item,index) in tabs" :key="'item' + index">
				<work-manager-item class="work-manager-item" :i="index" :index="activeTab"></work-manager-item>
			</swiper-item>
		</swiper>
		<view class="cardbutton" ref="btnref">
			<view class="button primarybtn" @tap="applyWorkPlan">申请作业计划</view>
		</view>
	</view>
</template>

<script>
	import sTabs from '@/components/s-tabs/s-tabs/index.vue'
	import sTab from '@/components/s-tabs/s-tab/index.vue'
	import workManagerItem from './work-manager-item.vue'
	export default {
		components: {
			sTabs,
			sTab,
			workManagerItem
		},
		data() {
			return {
				tabs: [{
						name: '未开始'
					},
					{
						name: '执行中'
					}
				],
				activeTab: 0, // tabList索引
				current: 0, //swiper索引
				swpheight: "", // 需要固定swiper的高度
			}
		},
		methods: {
			// 头部tab切换
			change(i) {
				console.log('change----', i)
				this.current = i
			},
			swiperChange(e) {
				var index = e.target.current || e.detail.current;
				this.current = index;
				this.activeTab = this.current
			},
			/**
			 * 申请作业计划
			 */
			applyWorkPlan:function(){
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.tabSwiper {
		height: 100vh;
		display: flex;
		flex-direction: column;

		.swiperbox {
			height: calc(100vh - 88rpx - 92rpx);
		}
	}
	
	.work-manager-item{
		background-color: #F5F5F5;
	}
</style>
