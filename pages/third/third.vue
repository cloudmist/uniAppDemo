<template>
	<view>
		<uni-nav-bar :statusBar="true" left-icon="back" left-text=" " right-text=" " title="工作票管理"
			background-color="#14C893" color="#ffffff" fixed="true" @clickLeft="navback">
		</uni-nav-bar>
		<!-- tab切换 -->
		<s-tabs slot-title v-model="activeTab" @change="change" activeColor="#14C893" lineColor="#14C893">
			<s-tab v-for="(item,index) in tabs" :key="index">{{item.name}}</s-tab>
		</s-tabs>

		<swiper class="swiperbox" :duration="200" :current="current" @change="swiperChange">
			<swiper-item v-for="(item,index) in tabs" :key="'item' + index">
				<mescroll-item :i="index" :index="activeTab" :tabs="tabs"></mescroll-item>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import sTabs from '@/components/s-tabs/s-tabs/index.vue'
	import sTab from '@/components/s-tabs/s-tab/index.vue'
	import MescrollItem from './mescroll-swiper-item.vue'
	export default {
		components: {
			sTabs,
			sTab
		},
		data() {
			return {
				tabs: [{
						name: '全部'
					},
					{
						name: '奶粉'
					},
					{
						name: '面膜'
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
	
</style>
