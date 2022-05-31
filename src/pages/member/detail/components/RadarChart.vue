<template>
  <div id="radarChart" class="radar-echarts"></div>
</template>

<script lang="ts" setup>
  import useResize from '@/utils/hooks/resize'
  import * as echarts from 'echarts'
  import 'echarts/theme/macarons'
  import { watch, computed, reactive, onMounted } from 'vue'

  const width = useResize()
  let echart: any

  watch(width, (newValue, oldValue) => {
    echart.resize()
  })

  const props = defineProps(['detail'])

  const detail = computed(() => {
    return props.detail
  })

  watch(
    detail,
    () => {
      console.log(detail)
      if (!echart) initCharts()
      setOptions()
    },
    {
      deep: true
    }
  )

  const setOptions = () => {
    const today = new Date()
    const lastMonth = new Date()
    lastMonth.setDate(lastMonth.getDate() - 30)
    const max = today.getTime() - lastMonth.getTime()
    let value = 0
    if (detail.value.date) {
      const lastDate = new Date(detail.value.date)
      value = lastDate.getTime() - lastMonth.getTime()
    }

    if (value < 0) value = 0

    const values = [
      detail.value.renew + '元',
      detail.value.money + '元',
      detail.value.date,
      detail.value.member + '元',
      detail.value.times + '次'
    ]
    const option = {
      radar: {
        indicator: [
          { name: '累计充值', max: 500 },
          { name: '付款金额', max: 1000 },
          { name: '最近消费', max },
          { name: '会员消费', max: 900 },
          { name: '消费次数', max: 100 }
        ]
      },
      series: [
        {
          name: '会员雷达图',
          type: 'radar',
          data: [
            {
              value: [
                detail.value.renew,
                detail.value.money,
                value,
                detail.value.member,
                detail.value.times
              ],
              label: {
                show: true,
                formatter: (params: any) => {
                  return values[params.dimensionIndex]
                }
              }
            }
          ]
        }
      ]
    }
    echart.setOption(option)
  }

  function initCharts() {
    echart = echarts.init(document.getElementById('radarChart') as HTMLElement, 'macarons')
  }

  onMounted(() => {
    if (detail.value.date) {
      initCharts()
      setOptions()
    }
  })
</script>

<style lang="scss" scoped>
  .radar-echarts {
    height: 275px;
  }
</style>
