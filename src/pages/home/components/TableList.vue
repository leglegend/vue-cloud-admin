<template>
  <el-card class="home-table-list" shadow="hover" body-style="padding:0px">
    <div slot="header">
      <span>今日流水</span>
    </div>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="time" label="时间" width="120">
      </el-table-column>
      <el-table-column prop="name" label="用户" width="170">
      </el-table-column>
      <el-table-column prop="money" label="消费"> </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import { getList } from '@/api/report.js'

export default {
  data () {
    return {
      tableData: []
    }
  },
  methods: {
    getList () {
      getList().then((res) => {
        this.tableData = res
      })
    }
  },
  mounted () {
    this.getList()
  }
}
</script>

<style lang="scss" scoped>
  .home-table-list {
    padding: 0;
  }
  .popover-content {
    .user-logo {
      width: 100px;
      height: 100px;
      border-radius: 50%;
    }
  }
</style>
