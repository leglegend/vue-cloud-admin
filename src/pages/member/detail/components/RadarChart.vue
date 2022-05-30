<template>
  <div class="radar-echarts"></div>
</template>

<script>
import resize from '@/utils/mixin/resize.js'
import * as echarts from 'echarts'
require('echarts/theme/macarons')

export default {
  props: ['detail'],
  watch: {
    detail (detail) {
      if (detail.date) {
        if (!this.echarts) this.initCharts()
        else this.setOptions()
      }
    }
  },
  mixins: [resize],
  methods: {
    setOptions () {
      const today = new Date()
      const lastMonth = new Date()
      lastMonth.setDate(lastMonth.getDate() - 30)
      const max = today.getTime() - lastMonth.getTime()
      let value = 0
      if (this.detail.date) {
        const lastDate = new Date(this.detail.date)
        value = lastDate.getTime() - lastMonth.getTime()
      }

      if (value < 0) value = 0

      const values = [
        this.detail.renew + '元',
        this.detail.money + '元',
        this.detail.date,
        this.detail.member + '元',
        this.detail.times + '次'
      ]
      const option = {
        radar: {
          indicator: [
            { name: '累计充值', max: 500 },
            { name: '付款金额', max: 1000 },
            { name: '最近消费', max: max },
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
                value: [this.detail.renew, this.detail.money, value, this.detail.member, this.detail.times],
                label: {
                  show: true,
                  formatter: (params) => {
                    return values[params.dimensionIndex]
                  }
                }
              }
            ]
          }
        ]
      }
      this.echarts.setOption(option)
    },
    initCharts () {
      this.echarts = echarts.init(this.$el, 'macarons')
      this.setOptions()
    }
  },
  mounted () {
    if (this.detail.date) this.initCharts()
  }
}
</script>

<style lang="scss" scoped>
  .radar-echarts {
    height: 275px;
  }
</style>
