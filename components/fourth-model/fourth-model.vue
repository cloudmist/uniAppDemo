<template>
	<view v-if="show" class="mask" @tap="handleSubmit">
		<view class="model">
			<view class="content">
				{{content}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			show: {
				type: Boolean,
				default: false
			},
			content: {
				type: String,
				default: ""
			}
		},
		methods: {
			handleSubmit() {
				this.$close()
				this.callBack && this.callBack()
			}
		}
	}
</script>

<style lang="scss" scoped>
	* {
		padding: 0;
		margin: 0;
		box-sizing: border-box;
	}

	.mask {
		position: fixed;
		left: 0;
		top: 0;
		z-index: 9999;
		background-color: rgba($color: #000000, $alpha: 0.4);
		width: 100%;
		height: 100%;

		.model {
			width: 100%;
			background-color: #FF0000;
			position: absolute;
			text-align: center;

			.content {
				padding: 30rpx;
				color: #FFF;
				font-size: 32rpx;
			}
		}
	}
</style>
