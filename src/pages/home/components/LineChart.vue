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
    <div id="charts" class="home-charts"></div>
  </el-card>
</template>

<script>
import * as echarts from 'echarts'
import resize from '@/utils/mixin/resize.js'
import { queryTable } from '@/api/report.js'
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
      this.queryTable()
    }
  },
  methods: {
    setOptions (xAxis = [], total = [], non = [], vip = []) {
      const option = {
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'rgba(0,0,0,0.7)', // 提示背景颜色，默认为透明度为0.7的黑色
          borderColor: '#333', // 提示边框颜色
          textStyle: {
            color: '#fff'
          },
          axisPointer: {
            type: 'cross'
          }
        },
        xAxis: {
          type: 'category',
          data: xAxis,
          boundaryGap: false
        },
        yAxis: {
          type: 'value'
        },
        grid: {
          left: 20,
          right: 30,
          bottom: 20,
          top: 50,
          containLabel: true
        },
        legend: {
          padding: [20, 5, 0, 5],
          data: ['总营收', '散客收入', '会员收入']
        },
        series: [
          {
            name: '总营收',
            data: total,
            type: 'line'
          },
          {
            name: '散客收入',
            data: non,
            type: 'line'
          },
          {
            name: '会员收入',
            data: vip,
            type: 'line'
          }
        ]
      }
      this.echarts.setOption(option)
    },
    initCharts () {
      this.echarts = echarts.init(
        document.getElementById('charts'),
        'macarons'
      )
      this.setOptions()
    },
    queryTable () {
      queryTable({
        type: this.type
      }).then((res) => {
        if (!this.echarts) this.initCharts()
        this.setOptions(res.xAxis, res.total, res.non, res.vip)
      })
    }
  },
  mounted () {
    this.queryTable()
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
