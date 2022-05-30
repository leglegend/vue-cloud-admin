<template>
  <el-card shadow="hover" body-style="padding:0px">
    <template v-slot:header>
      <div class="home-echarts-header">
        <span>营收报表</span>
        <el-button-group>
          <el-button type="primary" :plain="type == 1" size="small" @click="type = 0">周</el-button>
          <el-button type="warning" :plain="type == 0" size="small" @click="type = 1">月</el-button>
        </el-button-group>
      </div>
    </template>
    <div id="pie-charts" class="home-charts"></div>
  </el-card>
</template>

<script lang="ts" setup>
  import * as echarts from 'echarts'
  import useResize from '@/utils/hooks/resize'
  import { queryIncome } from '@/api/report'
  import { ref } from '@vue/reactivity'
  import { onMounted, watch } from 'vue'
  import 'echarts/theme/macarons'

  const type = ref(0) // 0:周 1:月
  const width = useResize()
  let echart: any
  watch(type, (newValue, oldValue) => {
    getTable()
  })
  watch(width, (newValue, oldValue) => {
    echart.resize()
  })

  const getTable = () => {
    queryIncome(type).then((res: any) => {
      const data = [
        { value: res.card, name: '售卡收入' },
        { value: res.non, name: '散客收入' },
        { value: res.vip, name: '会员收入' }
      ]
      if (!echart)
        echart = echarts.init(document.getElementById('pie-charts') as HTMLElement, 'macarons')
      setOptions(data)
    })
  }
  const setOptions = (data: Array<Object> = []) => {
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
    echart.setOption(option)
  }
  onMounted(() => {
    getTable()
  })
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
