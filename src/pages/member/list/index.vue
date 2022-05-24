<template>
  <div class="member-list-container">
    <el-row>
      <el-col :span="24">
        <el-card shadow="hover">
          <el-form
            ref="form"
            class="list-from"
            :model="form"
            label-position="left"
          >
            <el-row :gutter="50">
              <el-col :xs="24" :sm="12" :md="8">
                <el-form-item label="关键字:" label-width="80px" prop="KeyWord">
                  <el-input
                    v-model="form.KeyWord"
                    placeholder="手机号 | 卡号 | 姓名 | 昵称"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :md="8">
                <el-form-item label="余额:" label-width="80px" prop="HaveMony">
                  <el-select
                    v-model="form.HaveMony"
                    clearable
                    placeholder="请选择"
                  >
                    <el-option label="有余额" :value="1"> </el-option>
                    <el-option label="无余额" :value="2"> </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :md="8">
                <el-form-item
                  label="卡有效期:"
                  label-width="80px"
                  prop="Validity"
                >
                  <el-select
                    v-model="form.Validity"
                    clearable
                    placeholder="请选择"
                  >
                    <el-option label="未过期" :value="-1"> </el-option>
                    <el-option label="已过期" :value="-2"> </el-option>
                    <el-option label="7天内过期" :value="7"> </el-option>
                    <el-option label="30天内过期" :value="30"> </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item
                  label="开卡日期:"
                  label-width="80px"
                  prop="OpenCardDateStart"
                >
                  <div class="date-box">
                    <el-date-picker
                      v-model="form.OpenCardDateStart"
                      type="date"
                      placeholder="开始日期"
                      format="yyyy年MM月dd日"
                      value-format="yyyy-MM-dd"
                    >
                    </el-date-picker>
                    <div class="box-center">-</div>
                    <el-date-picker
                      v-model="form.OpenCardDateEnd"
                      type="date"
                      placeholder="结束日期"
                      format="yyyy年MM月dd日"
                      value-format="yyyy-MM-dd"
                    >
                    </el-date-picker>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item
                  label="消费日期:"
                  label-width="80px"
                  prop="ConsumptionDateStart"
                >
                  <div class="date-box">
                    <el-date-picker
                      v-model="form.ConsumptionDateStart"
                      type="date"
                      placeholder="开始日期"
                      format="yyyy年MM月dd日"
                      value-format="yyyy-MM-dd"
                    >
                    </el-date-picker>
                    <div class="box-center">-</div>
                    <el-date-picker
                      v-model="form.ConsumptionDateEnd"
                      type="date"
                      placeholder="结束日期"
                      format="yyyy年MM月dd日"
                      value-format="yyyy-MM-dd"
                    >
                    </el-date-picker>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item
                  label="消费范围:"
                  label-width="80px"
                  prop="ConsumptionMonyMin"
                >
                  <div class="date-box">
                    <el-input
                      v-model="form.ConsumptionMonyMin"
                      placeholder="消费最小金额(元)"
                    ></el-input>
                    <div class="box-center">-</div>
                    <el-input
                      v-model="form.ConsumptionMonyMax"
                      placeholder="消费最大金额(元)"
                    ></el-input>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item
                  label="消费次数:"
                  label-width="80px"
                  prop="ConsumptionSumMin"
                >
                  <div class="date-box">
                    <el-input
                      v-model="form.ConsumptionSumMin"
                      placeholder="最小消费次数"
                    ></el-input>
                    <div class="box-center">-</div>
                    <el-input
                      v-model="form.ConsumptionSumMax"
                      placeholder="最大消费次数"
                    ></el-input>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item
                  label="剩余次数:"
                  label-width="80px"
                  prop="CardSumMin"
                >
                  <div class="card-min" slot="label">
                    <el-tooltip
                      class="item"
                      effect="dark"
                      content="单张会员卡剩余次数"
                      placement="top"
                    >
                      <i class="el-icon-question"></i>
                    </el-tooltip>
                    剩余次数:
                  </div>
                  <div class="date-box">
                    <el-input
                      v-model="form.CardSumMin"
                      placeholder="最小剩余次数"
                    ></el-input>
                    <div class="box-center">-</div>
                    <el-input
                      v-model="form.CardSumMax"
                      placeholder="最大剩余次数"
                    ></el-input>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :md="8">
                <el-form-item
                  label="会员分组:"
                  label-width="80px"
                  prop="CardGroupIds"
                >
                  <el-select
                    v-model="form.CardGroupIds"
                    clearable
                    multiple
                    collapse-tags
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in groupList"
                      :key="item.Id"
                      :label="item.GroupName"
                      :value="item.Id"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-button
                  type="primary"
                  plain
                  size="medium"
                  icon="el-icon-plus"
                  :loading="dialogVisible"
                  @click="dialogVisible = true"
                >
                  新建会员
                </el-button>
              </el-col>
              <el-col class="form-button" :span="12">
                <el-button type="primary" size="medium" @click="getList"
                  >查询</el-button
                >
                <el-button size="medium" @click="resetForm">重置</el-button>
              </el-col>
            </el-row>
          </el-form>
          <el-table
            v-loading="loading"
            :data="tableData"
            border
            stripe
            style="width: 100%"
          >
            <el-table-column label="头像" width="90" align="center">
              <template slot-scope="scope">
                <img class="user-logo" :src="scope.row.UserImg" />
              </template>
            </el-table-column>
            <el-table-column prop="UserName" label="昵称" width="170">
            </el-table-column>
            <el-table-column
              v-if="showName"
              prop="UserStoreName"
              label="姓名"
              width="170"
            >
            </el-table-column>
            <el-table-column
              v-if="showRemark"
              prop="RemarkName"
              label="备注名"
              width="170"
            >
            </el-table-column>
            <el-table-column prop="UserMobile" label="手机号" width="160">
            </el-table-column>

            <el-table-column prop="LastDate" label="最近消费时间" width="180">
            </el-table-column>

            <el-table-column prop="LastDate" label="卡余额" width="180">
              <template slot-scope="scope">
                <el-popover trigger="hover" placement="top">
                  <div class="popover-content">
                    <div
                      v-for="card in scope.row.Cards"
                      :key="card.CardId"
                      class="card-value"
                    >
                      {{ card.CardName }}
                    </div>
                  </div>
                  <div slot="reference">
                    <el-tag effect="plain">{{
                      scope.row.Cards | cardValue
                    }}</el-tag>
                  </div>
                </el-popover>
              </template>
            </el-table-column>

            <el-table-column label="操作" align="right">
              <template slot-scope="scope">
                <el-button size="mini" @click="handleView(scope.row)"
                  >查看</el-button
                >
                <el-button
                  plain
                  size="mini"
                  type="primary"
                  @click="handleDelete(scope.$index, scope.row)"
                  >核销</el-button
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
      </el-col>
    </el-row>
    <create-member :visible.sync="dialogVisible" />
  </div>
</template>

<script>
import { queryMembers, getGroupList } from '@/api/member.js'
import list from '@/utils/mixin/list.js'
import CreateMember from './components/CreateMember.vue'

export default {
  name: 'MemberList',
  components: {
    CreateMember
  },
  data () {
    const form = {
      KeyWord: '',
      HaveMony: '',
      Validity: '',
      OpenCardDateStart: '',
      OpenCardDateEnd: '',
      ConsumptionDateStart: '',
      ConsumptionDateEnd: '',
      ConsumptionMonyMin: '',
      ConsumptionMonyMax: '',
      ConsumptionSumMin: '',
      ConsumptionSumMax: '',
      CardSumMin: '',
      CardSumMax: '',
      CardGroupIds: []
    }
    return {
      form,
      tableData: [],
      groupList: [],
      dialogVisible: false
    }
  },
  mixins: [list],
  computed: {
    showName () {
      return this.tableData.filter((item) => item.UserStoreName).length
    },
    showRemark () {
      return this.tableData.filter((item) => item.RemarkName).length
    }
  },
  filters: {
    cardValue (cards) {
      const cardValue = []
      let cardPrice = 0
      let cardTimes = 0
      cards.forEach((card) => {
        if (card.CardType === 1) {
          cardPrice += card.CardPrice
        } else if (card.CardType === 0) {
          cardTimes += card.CardPrice
        }
      })
      if (cardPrice) {
        cardValue.push(cardPrice + '元')
      }
      if (cardTimes) {
        cardValue.push(cardTimes + '次')
      }
      return cardValue.join('/') || '-'
    }
  },
  methods: {
    resetForm () {
      this.form.OpenCardDateEnd = ''
      this.form.ConsumptionDateEnd = ''
      this.form.ConsumptionMonyMax = ''
      this.form.ConsumptionSumMax = ''
      this.form.CardSumMax = ''
      this.$refs.form.resetFields()
    },
    handleView ({ CardId, UserId }) {
      this.$router.push({ name: 'MemberDetail', params: { CardId, UserId } })
    },
    getList () {
      this.loading = true
      const params = Object.assign(this.form, {
        PageIndex: this.page,
        PageSize: this.pageSize
      })
      queryMembers(params).then((res) => {
        this.total = res.TotalCount
        this.tableData = res.Data
        this.loading = false
      })
    },
    getGroupList () {
      getGroupList().then((res) => {
        this.groupList = res.Groups
      })
    }
  },
  mounted () {
    this.getList()
    this.getGroupList()
  }
}
</script>

<style lang="scss" scoped>
  .member-list-container {
    .el-table {
      min-height: 300px;
    }
    .el-input {
      max-width: 220px;
    }
    .card-min {
      position: relative;
      .el-icon-question {
        position: absolute;
        left: -16px;
        top: 12px;
      }
    }

    .date-box {
      display: flex;
      align-items: center;
      .box-center {
        margin: 0 10px;
      }
    }
    .list-from {
      margin-bottom: 20px;
      .form-button {
        display: flex;
        justify-content: flex-end;
      }
    }
    .table-pagination {
      display: flex;
      justify-content: center;
      margin-top: 10px;
    }
    .user-logo {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
  }
</style>
