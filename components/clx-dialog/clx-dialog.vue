<template>
	<view class="enn-dialog" :class="{ 'enn-dialog__show': showModal }" @touchmove.stop.prevent="bindTouchmove">
		<view class="enn-dialog__mask"></view>
		<view class="enn-dialog__container">
			<view class="enn-dialog__header" v-if="title.length > 0">{{ title }}</view>
			<view class="enn-dialog__content" :style="{ 'text-align': textalign }">
				<view class="modal-content">{{ content }}</view>
				<slot name="content">
				</slot>
			</view>
			<view>
				<slot></slot>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'enn-dialog',
		data() {
			return {
				showModal: false
			};
		},
		props: {
			isShow: {
				type: Boolean,
				default: false
			},
			// 标题
			title: {
				type: String,
				default: ''
			},

			// 内容
			content: String,

			// hint
			hint: String,

			// 对齐方式
			textalign: {
				type: String,
				default: 'center'
			},

			// 是否显示弹出框
			show: {
				type: Boolean,
				default: false
			}
		},
		watch: {
			isShow(val) {
				this.showModal = val
				console.log(val)
			}
		},
		methods: {
			// 关闭弹窗
			closeDialog() {
				this.showModal = false;
				this.$emit('close')
			}
		}
	}
</script>

<style lang="scss">
	.enn-dialog {
		position: fixed;
		visibility: hidden;
		width: 100%;
		height: 100%;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 1500;
		transition: visibility 200ms ease-in;

		&.enn-dialog__show {
			visibility: visible;
		}

		&__container {
			position: absolute;
			z-index: 1010;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			transition: transform 0.3s;
			width: 540upx;
			border-radius: 10upx;
			background-color: #fff;
			overflow: hidden;
			opacity: 0;
			transition: opacity 200ms ease-in;
			padding-top: 30upx;
		}

		&__header {
			position: relative;
			overflow: auto;
			text-overflow: ellipsis;
			white-space: nowrap;
			padding: 0 24upx 24upx;
			line-height: 1.5;
			color: #303133;
			font-weight: bold;
			font-size: 40upx;
			text-align: center;
		}


		&__content {
			position: relative;
			color: #303133;
			font-size: 36upx;
			box-sizing: border-box;
			line-height: 1.5;

			.modal-content {
				padding: 0 30upx 30upx;
			}

			
			&::after {
				content: " ";
				position: absolute;
				left: 0;
				bottom: -1px;
				right: 0;
				height: 1px;
				border-bottom: 1px solid #EBEEF5;
				transform-origin: 0 0;
				transform: scaleY(.5);
			}
		}

		

		&__mask {
			display: block;
			position: absolute;
			z-index: 1000;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			width: 100%;
			height: 100%;
			background: rgba(0, 0, 0, .2);
			opacity: 0;
			transition: opacity 200ms ease-in;
		}

		&__show {

			.enn-dialog__container,
			.enn-dialog__mask {
				opacity: 1;
			}
		}
	}
</style>
