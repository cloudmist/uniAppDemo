<!-- 工作票列表组件 <work-list :list="xx"></work-list> -->
<template>
	<view class="work-list">
		<view :id="'good'+good.id"  v-for="(work,index) in list" :key="good.id">
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			list: {
				type: Array,
				default(){
					return []
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>
