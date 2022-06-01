<template>
	<router-view></router-view>
</template>
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
	.cannotselect {
	    -webkit-touch-callout: none;
	    -webkit-user-select: none;
	    -moz-user-select: none;
	    -ms-user-select: none;
	    user-select: none;
	  }
	  * {
	    font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
	      'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
	  }
	
	  body {
	    margin: 0;
	  }
	  .el-scrollbar .el-scrollbar__wrap {
	    overflow-x: hidden;
	  }
	  .el-menu--collapse .el-submenu__title span {
	    height: 0;
	    width: 0;
	    overflow: hidden;
	    visibility: hidden;
	    display: inline-block;
	  }
	  .el-menu--collapse .el-submenu__icon-arrow {
	    display: none;
	  }
	  
	  .el-menu-item-group {
	    background: #f5f5f5;
	  }
	  .el-menu-item-group__title {
	    padding: 0 !important;
	  }
</style>
