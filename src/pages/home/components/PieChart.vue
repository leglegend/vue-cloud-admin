<template>
  <el-card shadow="hover" body-style="padding:0px">
    <div slot="header" class="home-echarts-header">
      <span>营收报表</span>
      <el-button-group>
        <el-button
          type="primary"
          :plain="type == 1"
          size="small"
          @click="type = 0"
          >周</el-button
        >
        <el-button
          type="warning"
          :plain="type == 0"
          size="small"
          @click="type = 1"
          >月</el-button
        >
      </el-button-group>
    </div>
    <div id="pie-charts" class="home-charts"></div>
  </el-card>
</template>

<script>
import * as echarts from 'echarts'
import resize from '@/utils/mixin/resize.js'
import { queryIncome } from '@/api/report.js'
require('echarts/theme/macarons')

export default {
  data () {
    return {
      type: 0 // 0:周 1:月
    }
  },
  mixins: [resize],
  watch: {
    type () {
      this.getTable()
    }
  },
  methods: {
    setOptions (data = []) {
      const option = {
        legend: {
          top: 'bottom'
        },
        tooltip: {
          backgroundColor: 'rgba(0,0,0,0.7)', // 提示背景颜色，默认为透明度为0.7的黑色
          borderColor: '#333', // 提示边框颜色
          textStyle: {
            color: '#fff'
          },
          axisPointer: {
            type: 'cross'
          }
        },
        series: [
          {
            type: 'pie',
            roseType: 'angle',
            radius: [25, 100],
            center: ['50%', '50%'],
            itemStyle: {
              borderRadius: 3
            },
            data
          }
        ]
      }
      this.echarts.setOption(option)
    },
    initCharts () {
      this.echarts = echarts.init(
        document.getElementById('pie-charts'),
        'macarons'
      )
      this.setOptions()
    },
    getTable () {
      queryIncome({
        type: this.type
      }).then((res) => {
        const data = [
          { value: res.card, name: '售卡收入' },
          { value: res.non, name: '散客收入' },
          { value: res.vip, name: '会员收入' }
        ]
        if (!this.echarts) this.initCharts()
        this.setOptions(data)
      })
    }
  },
  mounted () {
    this.getTable()
  }
}
</script>

<style lang="scss" scoped>
  .home-echarts-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .home-charts {
    height: 350px;
  }
</style>
