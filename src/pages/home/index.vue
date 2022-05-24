<template>
  <div class="home-container">
    <board />
    <el-row :gutter="30" class="home-row">
      <el-col :sm="16" :xs="24" class="home-col">
        <line-chart />
      </el-col>
      <el-col :sm="8" :xs="24" class="home-col">
        <pie-chart />
      </el-col>
    </el-row>
    <el-row :gutter="30">
      <el-col class="home-col" :sm="12" :xs="24">
        <table-list />
      </el-col>
      <el-col class="quick-cards" :sm="12" :xs="24">
        <el-row :gutter="30">
          <el-col
            v-for="(card, index) in quickCards"
            :key="index"
            class="card-col"
            :sm="8"
            :xs="12"
          >
            <el-card shadow="hover">
              <div class="card">
                <div class="card-icon">
                  <i :class="card.icon" :style="{ color: card.color }"></i>
                </div>
                <div class="card-title">{{ card.name }}</div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Board from './components/Board.vue'
import LineChart from './components/LineChart.vue'
import PieChart from './components/PieChart.vue'
import TableList from './components/TableList.vue'

export default {
  name: 'Home',
  components: {
    Board,
    LineChart,
    PieChart,
    TableList
  },
  data () {
    return {
      quickCards: [
        { icon: 'el-icon-help', name: '帮助', color: 'rgb(149, 222, 100)' },
        {
          icon: 'el-icon-picture-outline-round',
          name: '店铺码',
          color: 'rgb(105, 192, 255)'
        },
        {
          icon: 'el-icon-edit-outline',
          name: '记账',
          color: 'rgb(255, 214, 102)'
        },
        {
          icon: 'el-icon-postcard',
          name: '制卡',
          color: 'rgb(92, 219, 211)'
        },
        {
          icon: 'el-icon-thumb',
          name: '创建会员',
          color: 'rgb(179, 127, 235)'
        },
        {
          icon: 'el-icon-user',
          name: '会员列表',
          color: 'rgb(255, 133, 192)'
        }
      ],
      cardStyle: {
        padding: '20px 0'
      },
      timer: ''
    }
  },

  methods: {}
}
</script>

<style lang="scss" scoped>
  .home-container {
    .home-row {
      padding-top: 10px;
    }
    .home-col {
      margin-bottom: 30px;
    }
    .quick-cards {
      .card-col {
        margin-bottom: 20px;
        .card {
          height: 90px;
          display: flex;
          align-content: center;
          justify-content: center;
          flex-wrap: wrap;
          .card-icon {
            height: 50px;
            display: flex;
            align-items: center;
            i {
              font-size: 50px;
              font-weight: 500;
              color: rgb(149, 222, 100);
              transition: 0.2s;
            }
          }
          .card-title {
            width: 100%;
            text-align: center;
            padding-top: 10px;
          }
          &:hover {
            .card-icon {
              i {
                font-size: 55px;
              }
            }
          }
        }
      }
    }
  }
</style>
