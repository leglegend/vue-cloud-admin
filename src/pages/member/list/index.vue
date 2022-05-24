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
              <el-col :md="24" :lg="12">
                <el-form-item label="关键字:" label-width="80px" prop="keyWord">
                  <el-input
                    v-model="form.keyWord"
                    placeholder="手机号 | 姓名 | 昵称"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="性别:" label-width="80px" prop="sex">
                  <el-select
                    v-model="form.sex"
                    clearable
                    placeholder="请选择"
                  >
                    <el-option label="男" value="1"> </el-option>
                    <el-option label="女" value="0"> </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item
                  label="注册日期:"
                  label-width="80px"
                  prop="beginDate"
                >
                  <div class="date-box">
                    <el-date-picker
                      v-model="form.beginDate"
                      type="date"
                      placeholder="开始日期"
                      format="yyyy年MM月dd日"
                      value-format="yyyy-MM-dd"
                    >
                    </el-date-picker>
                    <div class="box-center">-</div>
                    <el-date-picker
                      v-model="form.endDate"
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
                  label="标签:"
                  label-width="80px"
                  prop="tags"
                >
                  <el-select
                    v-model="form.tags"
                    clearable
                    multiple
                    collapse-tags
                    placeholder="请选择"
                  >
                    <el-option
                      label="程序员"
                      value="1"
                    >
                    </el-option>
                     <el-option
                      label="技术宅"
                      value="2"
                    >
                    </el-option>
                    <el-option
                      label="外卖员"
                      value="3"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12" class="none">
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
            <el-table-column prop="name" label="昵称" width="170">
            </el-table-column>
            <el-table-column prop="phone" label="手机号" width="160">
            </el-table-column>

            <el-table-column prop="date" label="注册时间" width="180">
            </el-table-column>

            <el-table-column prop="email" label="邮箱" width="180">
            </el-table-column>

            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button size="mini" @click="handleView(scope.row)"
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
      </el-col>
    </el-row>
    <create-member :visible.sync="dialogVisible" />
  </div>
</template>

<script>
import { queryUser } from '@/api/user.js'
import list from '@/utils/mixin/list.js'
import CreateMember from './components/CreateMember.vue'

export default {
  name: 'MemberList',
  components: {
    CreateMember
  },
  data () {
    const form = {
      keyWord: '',
      sex: '',
      beginDate: '',
      endDate: '',
      tags: []
    }
    return {
      form,
      tableData: [],
      dialogVisible: false
    }
  },
  mixins: [list],
  methods: {
    resetForm () {
      this.form.endDate = ''
      this.$refs.form.resetFields()
    },
    handleView () {
      this.$router.push({ name: 'MemberDetail' })
    },
    getList () {
      this.loading = true
      const params = Object.assign(this.form, {
        page: this.page,
        pageSize: this.pageSize
      })
      queryUser(params).then((res) => {
        console.log(res)
        this.total = res.total
        this.tableData = res.dataList
        this.loading = false
      })
    }
  },
  mounted () {
    this.getList()
  }
}
</script>

<style lang="scss" scoped>
  .member-list-container {
    .none {
      visibility: hidden;
    }
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
