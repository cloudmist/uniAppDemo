<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<button @click="clickShow">點我試試</button>
			<clxDialog :isShow='show' @dialogConfirm='dialogConfirm' @dialogCancel='dialogCancel' :content="dialogContent"></clxDialog>
		</view>
	</view>
</template>

<script>
	import clxDialog from 'clx-dialog.vue'
	export default {
		data() {
			return {
				title: 'Hello',
				show: false,
				dialogContent:'are you ok?'
			}
		},
		components: {
			clxDialog
		},
		methods: {
			clickShow() {
				this.show = true
			},
			dialogConfirm() {
				this.show = false
			},
			dialogCancel() {
				this.show = false
			}

		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
