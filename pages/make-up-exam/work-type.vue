<template>
	<view class="page">
		<view>
			<view class="flex-row-bw flex-row-vcenter">
				<text class="popup-text">请选择作业类型</text>
				<image class="popup-close" src="../../static/clearbtn.png" @tap="closePopup"></image>
			</view>
			<view class="popup-line"></view>
			<radio-group class="uni-list" @change="radioChange">
				<label class="popup-view flex-row" v-for="(item,index) in radioItems" :key="index">
					<radio :id="item.value" :value="item.value" :checked="item.checked"></radio>
					<label :for="item.value">
						<text class="popup-type">{{item.value}}</text>
					</label>
				</label>
			</radio-group>
		</view>
	</view>
</template>

<script>
	export default {
		name:'workType',
		data() {
			return {
				type:"",
				radioItems: [{
						value: '高压互感器更换',
						checked: false
					},
					{
						value: '低压互感器更换',
						checked: false
					},
					{
						value: '互感器现场校验',
						checked: false
					},
					{
						value: '接线盒更换',
						checked: false
					},
					{
						value: '变电站电能表终端装拆及更换',
						checked: false
					},
					{
						value: '变电站电能表现场校验',
						checked: false
					},
					{
						value: '变电站内二次回路现场校验',
						checked: false
					}
				]
			}
		},
		mounted:function(){
			this.type = this.$store.state.workType;
			if(this.type){
				for (var i = 0; i < this.radioItems.length; i++) {
					if(this.type==this.radioItems[i].value){
						this.radioItems[i].checked = true;
					}
				}
			}
		},
		methods: {
			closePopup: function() {
                   this.$emit('closePopup');
			},
			radioChange: function(e) {
				var checked = e.target.value
				for (var i = 0; i < this.radioItems.length; i++) {
					if (checked.indexOf(this.radioItems[i].value) !== -1) {
						this.radioItems[i].checked = true;
						this.$store.state.workType = this.radioItems[i].value;
					} else {
						this.radioItems[i].checked = false;
					}
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		background-color: #FFFFFF;
		border-radius: 10rpx;
	}

	.flex-row-bw {
		padding-top: 20rpx;
	}

	.popup-text {
		color: #666666;
		font-size: 32rpx;
		flex: 1;
		text-align: center;
	}


	.popup-close {
		width: 50rpx;
		height: 50rpx;
		margin-right: 20rpx;
	}

	.popup-line {
		background-color: #AEAEAE;
		width: 480rpx;
		height: 4rpx;
		margin-left: 20rpx;
		margin-right: 10rpx;
		margin-top: 15rpx;
	}

	.uni-list {
		margin-bottom: 20rpx;
		padding-bottom: 20rpx;
		padding-left: 10rpx;
		padding-right: 20rpx;
	}

	.popup-view {
		margin-top: 30rpx;
		margin-left: 50rpx;
		align-items: center;
	}

	.popup-type {
		color: #323232;
		font-size: 32rpx;
		margin-left: 20rpx;
	}
</style>
