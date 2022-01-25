<template>
	<view>
		<uni-nav-bar :statusBar="true" left-icon="back" left-text=" " right-text=" " title="列表"
			background-color="#14C893" color="#ffffff" fixed="true" @clickLeft="navback">
		</uni-nav-bar>
		<view v-for="(item,index) in classOneData" :key="'classOne'+index">
			<fourth-list :itemData="item" :isShowCheck="true" :isCanDel="false" :isChecked="item.isCheck"
				@onItemClickListener="onItemClickListener(index)">
			</fourth-list>
		</view>
		<view class="cardbutton">
			<view class="flex-row-bw flex-row-vcenter">
				<text class="selected-view">已选{{calculation}}条</text>
				<view :class="isCanDel?'delete-view':'delete-view-can-not-click'" @tap="deleteItem">删除</view>
			</view>
		</view>
		<clx-dialog :isShow.sync="showDialog" :content="dialogContent">
			<template slot="content">
				<input class="modal-input" :placeholder="dialogHint" type="password" v-model="password" />
			</template>
			<template>
				<view class="enn-dialog__footer">
					<view v-if="isShowCancel" class="enn-dialog__btn enn-dialog__footer-cancel"
						:style="{ color: cancelColor }" @click="cancel">
						{{ cancelText }}
					</view>
					<view class="enn-dialog__btn enn-dialog__footer-confirm" :style="{ color: confirmColor }"
						:class="[ isShowCancel ?  '' : 'enn-dialog__btn-row' ]" @click="confirm">
						{{ confirmText }}
					</view>
				</view>
			</template>
		</clx-dialog>
	</view>
</template>

<script>
	import fourthList from '../../components/fourth-list/fourth-list.vue'
	import listData from '@/listdata/fourthlistdata.json'
	import clxDialog from '../../components/clx-dialog/clx-dialog.vue'
	export default {
		components: {
			fourthList,
			clxDialog
		},
		data() {
			return {
				classOneData: [],
				showDialog: false,
				dialogContent: "提示",
				dialogHint: "请输入操作密码",
				// 是否可以删除
				isCanDel: false,
				// 是否显示取消按钮
				isShowCancel: {
					type: Boolean,
					default: true
				},
				// 取消文字
				cancelText: '取消',

				// 取消颜色
				cancelColor: {
					type: String,
					default: '#909399'
				},
				// 确定文字
				confirmText: '确定',

				// 确定文字颜色
				confirmColor: {
					type: String,
					default: '#409EFF'
				},
				// 正确的密码
				PASSWORD: "888",
				// 输入的密码
				password: ''
			}
		},
		onShow: function() {
			let pageData = JSON.parse(JSON.stringify(listData));
			this.classOneData = pageData;
		},
		computed: {
			calculation() {
				let _this = this;
				let count = 0;
				_this.classOneData.forEach((item) => {
					if (item.isCheck) {
						count++;
					}
				});
				_this.isCanDel = count > 0;
				return count;
			}
		},
		methods: {
			onItemClickListener(index) {
				this.classOneData[index].isCheck = !this.classOneData[index].isCheck
			},
			deleteItem: function() {
				if (this.isCanDel) {
					this.showDialog = true;
				}
			},
			// 取消方法
			cancel() {
				setTimeout(() => {

				}, 200);
				this.showDialog = false;
			},

			// 确定方法
			confirm() {
				setTimeout(() => {

				}, 200);
				this.showDialog = false;
				if (this.PASSWORD !== this.password) {
					// 密码错误
					this.$showModle({
						content: "密码错误!",
						callBack: () => {
							console.log("触发回调");
						}
					});
				} else {
					uni.showToast({
						icon: "none",
						title: "删除成功",
						duration: 1000
					});
				}
				this.password = '';
			},
		}
	}
</script>

<style lang="scss" scoped>
	.selected-view {
		color: #14C893;
	}

	.modal-input {
		padding: 0 30upx 30upx;
	}

	.delete-view {
		color: #FFFFFF;
		background-color: #14C893;
		font-size: 32rpx;
		padding: 10rpx 50rpx 10rpx 50rpx;
	}

	.delete-view-can-not-click {
		color: #FFFFFF;
		background-color: #C8C7CC;
		font-size: 32rpx;
		padding: 10rpx 50rpx 10rpx 50rpx;
	}

	.enn-dialog__footer {
		position: relative;
		overflow: auto;
		text-overflow: ellipsis;
		white-space: nowrap;
		color: #303133;
		font-size: 36upx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;

		.enn-dialog__btn {
			width: 50%;
			text-align: center;
			padding: 20upx 0;

			&.enn-dialog__footer-cancel {
				color: #909399;
			}

			&.enn-dialog__footer-confirm {
				color: #409EFF;
			}

			&.enn-dialog__btn-row {
				width: 100%;
				text-align: center;
				padding: 20upx 0;

				&.enn-dialog__footer-confirm {
					color: #409EFF;
				}
			}
		}
	}
</style>
