<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	@import "./common/common.scss";
	@import "./common/page.less";
	/*每个页面公共css */
	.status_bar{
		height: var(--status-bar-height);
		width: 100%;
	}
	page,view { font-family: 'Source Han Sans SC';}
	
	.flex-row { display: flex;}
	.flex-row-vcenter{display: flex; align-items: center;}/* 垂直居中对齐 */
	.flex-row-rcenter{display: flex; justify-content: center;}/* 水平居中对齐 */
	.flex-row-c{display: flex; align-items: center; justify-content: center;}/* 水平垂直居中对齐 */
	.flex-row-bw{ display: flex; justify-content: space-between;}
	.flex-row-ad{ display: flex; justify-content: space-around;}
	.flex-wrap {flex-wrap: wrap;} /* 换行，默认nowrap（不换行）*/
	
	.flex-col { display: flex; flex-direction: column;}
	.flex-col-vcenter{display: flex; flex-direction: column; justify-content: center;}/* 纵向布局垂直居中 */
	.flex-col-rcenter{display: flex; flex-direction: column; align-items: center;}/* 纵向布局水平居中对齐 */
	.flex-col-c{display: flex; flex-direction: column; align-items: center; justify-content: center;}
	.flex-col-bw{ display: flex; flex-direction: column; justify-content: space-between;}
	
	.flex1-row{ flex: 1; width: 1px;}
	.flex1-col{ flex: 1; height: 1px;}
	.flex1{ flex:1;}
	.alignc{ text-align: center;}
	
	/* .uni-navbar__header-btns-left{ display: none;} */
	
</style>
