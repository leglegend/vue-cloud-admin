<template>
  <div class="order-trade-list">
    <el-card shadow="hover">
      <el-form class="list-from" :model="form" label-position="left">
        <el-row :gutter="50">
          <el-col :span="14">
            <el-form-item label="起止时间:" label-width="80px">
              <el-date-picker
                v-model="dates"
                type="daterange"
                align="left"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :editable="false"
                :clearable="false"
                :picker-options="pickerOptions"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="form-button" :span="10">
            <el-button type="primary" size="medium" @click="getList">
              查询
            </el-button>
          </el-col>
        </el-row>
      </el-form>
      <el-table
        v-loading="loading"
        :data="tableData"
        border
        stripe
        style="width: 100%"
        :height="49 + 53 * pageSize"
      >
        <el-table-column prop="CreateDate" label="时间" width="120">
        </el-table-column>
        <el-table-column prop="UserStoreName" label="用户" width="150">
          <template slot="header">
            用户
            <el-popover trigger="hover" placement="right">
              <div class="popover-content">
                <div class="user-tag">
                  <el-tag size="medium"> 张三 </el-tag>
                  代表会员
                </div>
                <div>
                  <el-tag size="medium" type="info"> 张三 </el-tag>
                  代表散客
                </div>
              </div>
              <i slot="reference" class="el-icon-question"></i>
            </el-popover>
          </template>
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="right">
              <div class="popover-content">
                <img class="user-logo" :src="scope.row.UserImg" />
              </div>
              <div slot="reference">
                <el-tag size="medium" :type="scope.row.CardId ? '' : 'info'">
                  {{ scope.row.UserStoreName }}
                </el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          prop="ConsumptionTagValue"
          label="消费类型"
          width="170"
        >
        </el-table-column>
        <el-table-column
          prop="ConsumptionValue"
          label="消费金额/次数"
          width="170"
        >
        </el-table-column>
        <el-table-column prop="StoreUserName" label="操作人">
          <template slot="header">
            操作人
            <el-tooltip
              class="item"
              effect="dark"
              content="'-'代表用户自行操作"
              placement="top"
            >
              <i class="el-icon-question"></i>
            </el-tooltip>
          </template>
          <template slot-scope="scope">
            <div>
              {{ scope.row.StoreUserName || '-' }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small"
              >查看</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="table-pagination">
        <el-pagination
          background
          layout="total, sizes, prev, pager, next"
          :total="total"
          :page-sizes="[10, 30, 50]"
          :page-size="pageSize"
          :current-page="page"
          @size-change="sizeChange"
          @current-change="currentChange"
        >
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getList } from '@/api/report.js'
import list from '@/utils/mixin/list.js'

export default {
  name: 'Trade',
  data () {
    const pickerOptions = {
      shortcuts: [
        {
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        },
        {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        },
        {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }
      ]
    }

    return {
      dates: [new Date(), new Date()],
      pickerOptions,
      form: {}
    }
  },
  mixins: [list],
  watch: {
    dates: {
      immediate: true,
      handler () {
        this.getList()
      }
    }
  },
  methods: {
    handleClick (row) {
      this.$router.push({
        name: 'TradeDetail',
        params: { id: row.ConsumptionId }
      })
    },
    getList () {
      this.loading = true
      getList({
        StartDate: getDate(this.dates[0]) + ' 00:00',
        EndDate: getDate(this.dates[1]) + ' 23:59:59',
        PageIndex: this.page,
        PageSize: this.pageSize
      }).then((res) => {
        this.total = res.TotalCount
        this.tableData = res.Data
        this.loading = false
      })
      function getDate (date) {
        return [date.getFullYear(), date.getMonth() + 1, date.getDate()].join(
          '-'
        )
      }
    }
  },
  mounted () {}
}
</script>

<style lang="scss" scoped>
  .order-trade-list {
    .list-box {
      padding: 30px;
    }
    .list-from {
      margin-bottom: 20px;
      .form-button {
        display: flex;
        // justify-content: center;
      }
    }
    .table-pagination {
      display: flex;
      justify-content: center;
      margin-top: 10px;
    }
  }
  .el-popover {
    min-width: 0 !important;
  }
  .popover-content {
    .user-tag {
      margin-bottom: 5px;
    }
    .user-logo {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      display: block;
    }
  }
</style>
