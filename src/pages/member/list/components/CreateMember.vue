<template>
  <el-dialog
    title="新建会员"
    :width="isMobile ? '95%' : '500px'"
    :visible="dialogVisible"
    :before-close="closeDialog"
  >
    <div class="create-form">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="手机号" prop="UserMobile" required>
          <el-input
            v-model.number="form.UserMobile"
            placeholder="请输入手机号"
          ></el-input>
        </el-form-item>
        <el-form-item
          v-for="item in controls"
          :key="item.ControlName"
          :label="item.ControlInstructions"
          :prop="item.ControlName"
          :required="!!item.IsMust"
        >
          <template v-if="item.ControlType == 'input'">
            <el-input
              v-model="form[item.ControlName]"
              :placeholder="'请输入' + item.ControlInstructions"
            ></el-input>
          </template>
          <template v-else-if="item.ControlType == 'radio'">
            <el-radio-group v-model="item.ControlValue">
              <el-radio
                v-for="radio in item.Items"
                :key="radio.ItemName"
                :label="radio.ItemName"
                :value="radio.ItemValue"
              ></el-radio>
            </el-radio-group>
          </template>
          <template v-else-if="item.ControlType == 'select'">
            <el-select
              v-model="form[item.ControlName]"
              clearable
              :placeholder="'请选择' + item.ControlInstructions"
            >
              <el-option
                v-for="select in item.Items"
                :key="select.ItemName"
                :label="select.ItemName"
                :value="select.ItemValue"
              >
              </el-option>
            </el-select>
          </template>
          <template v-else-if="item.ControlType == 'date'">
            <el-date-picker
              v-model="form[item.ControlName]"
              type="date"
              format="yyyy年MM月dd日"
              value-format="yyyy-MM-dd"
              :placeholder="'请选择' + item.ControlInstructions"
            >
            </el-date-picker>
          </template>
        </el-form-item>
        <el-form-item label="会员卡" prop="PrepaidCardId" required>
          <el-select
            v-model="form.PrepaidCardId"
            clearable
            popper-class="member-card"
            placeholder="请选择会员卡"
          >
            <el-option
              v-for="card in cardList"
              :label="card.CardName"
              :value="card.PrepaidCardId"
              :key="card.PrepaidCardId"
            >
              <member-card :card="card" />
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="计入流水" prop="IsAddConsumption">
          <el-switch v-model="form.IsAddConsumption"> </el-switch>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button :disabled="loading" @click="closeDialog">取 消</el-button>
      <el-button type="primary" :loading="loading" @click="onSubmit">
        确 定
      </el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getMemberControls, getCardList, createMember } from '@/api/member.js'
import MemberCard from '@/components/MemberCard.vue'
import { Message } from 'element-ui'
import mobile from '@/utils/mixin/mobile.js'

export default {
  components: {
    MemberCard
  },
  props: ['visible'],
  data () {
    return {
      form: {
        UserMobile: '',
        IsAddConsumption: false,
        PrepaidCardId: ''
      },
      rules: {
        UserMobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' }
        ],
        PrepaidCardId: [{ required: true, message: '请选择会员卡' }]
      },
      controls: [],
      cardList: [],
      dialogVisible: false,
      loading: false
    }
  },
  watch: {
    visible: {
      immediate: true,
      handler (value) {
        this.loading = false
        if (value && this.controls.length) {
          this.dialogVisible = true
        } else if (value) {
          if (!this.controls.length) this.getMemberControls()
          if (!this.cardList.length) this.getCardList()
        }
      }
    }
  },
  mixins: [mobile],
  methods: {
    closeDialog () {
      if (this.loading) return
      this.$refs.form.resetFields()
      this.dialogVisible = false
      this.$emit('update:visible', !this.visible)
    },
    onSubmit () {
      this.$refs.form.validate((valid) => {
        if (!valid) return false
        this.doCreatMember()
      })
    },
    doCreatMember () {
      this.loading = true
      const currentCard = this.cardList.filter(
        (card) => card.PrepaidCardId === this.form.PrepaidCardId
      )[0]
      const params = {
        UserMobile: this.form.UserMobile,
        PrepaidCardId: this.form.PrepaidCardId,
        IsAddConsumption: this.form.IsAddConsumption,
        ValidityDate: currentCard.ValidityDate,
        UserInfos: []
      }
      if (currentCard.CardType === 1) {
        params.CardValue = currentCard.CardValue + currentCard.CardGivingValue
      }
      const already = ['UserMobile', 'IsAddConsumption', 'PrepaidCardId']
      for (const name in this.form) {
        if (already.indexOf(name) >= 0) continue
        params.UserInfos.push({
          ControlName: name,
          ControlValue: this.form[name]
        })
      }
      createMember(params)
        .then((res) => {
          this.loading = false
          this.closeDialog()
          Message({
            message: '创建成功',
            type: 'success',
            duration: 5 * 1000
          })
        })
        .catch((res) => {
          this.loading = false
        })
    },
    getCardList () {
      getCardList().then((res) => {
        this.cardList = res.PrepaidCards
      })
    },
    getMemberControls () {
      getMemberControls().then((res) => {
        const controls = []
        const form = {}
        const rules = {}
        res.Controls.forEach((item) => {
          form[item.ControlName] = ''
          if (item.IsMust) {
            controls.unshift(item)
            rules[item.ControlName] = [
              {
                required: true,
                message: '请输入' + item.ControlInstructions,
                trigger: 'blur'
              }
            ]
          } else {
            controls.push(item)
          }
        })
        this.controls = controls
        this.form = { ...this.form, ...form }
        this.rules = { ...this.rules, ...rules }
        this.loading = false
        this.dialogVisible = true
      })
    }
  },
  mounted () {}
}
</script>

<style lang="scss" scoped>
  .create-form {
    padding: 0 10px;
  }

  .member-card {
    max-height: 900px;
    .el-select-dropdown__item {
      padding: 10px 15px;
      height: 220px !important;
    }
  }
</style>
