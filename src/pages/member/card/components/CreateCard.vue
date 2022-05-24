<template>
  <el-dialog
    title="新建会员卡"
    :width="isMobile ? '95%' : '500px'"
    :visible="dialogVisible"
    :before-close="closeDialog"
  >
    <div class="create-form">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="会员卡名" prop="CardName" required>
          <el-input
            v-model.number="form.CardName"
            placeholder="请输入会员卡名"
          ></el-input>
        </el-form-item>
        <el-form-item label="售价" prop="Price" required>
          <el-input
            v-model.number="form.Price"
            placeholder="请输入售价"
          ></el-input>
        </el-form-item>

        <el-form-item label="卡面" prop="CardImg" required>
          <el-select
            v-model="form.CardImg"
            clearable
            popper-class="member-card"
            placeholder="请选择卡面"
          >
            <el-option
              v-for="(card, index) in cardList"
              :value="card.ImageUrl"
              :label="index + 1"
              :key="index"
            >
              <img class="card-img" :src="card.ImageUrl" />
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="赠送金额" prop="CardGivingValue">
          <el-input
            v-model.number="form.CardGivingValue"
            placeholder="请输入赠送金额"
          ></el-input>
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
import { getCardSetting, createCard } from '@/api/member.js'
import { Message } from 'element-ui'
import mobile from '@/utils/mixin/mobile.js'

export default {
  name: 'CreateCard',
  props: ['visible'],
  data () {
    return {
      form: {
        CardName: '',
        CardType: 1,
        Price: '',
        CardDiscount: 10,
        CardGivingValue: '',
        CardImg: '',
        ValidityDate: '',
        CardInstructions: ''
      },
      rules: {
        CardName: [
          { required: true, message: '请输入会员卡名', trigger: 'blur' },
          {
            min: 3,
            max: 16,
            message: '长度在 3 到 16 个字符',
            trigger: 'blur'
          }
        ],
        Price: [{ required: true, message: '请输入售价' }],
        CardImg: [{ required: true, message: '请选择卡面' }]
      },
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
        if (value && this.cardList.length) {
          this.dialogVisible = true
        } else if (value) {
          this.getCardSetting()
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
        this.doCreateCard()
      })
    },
    doCreateCard () {
      this.loading = true
      const params = {
        CardValue: this.form.Price,
        ...this.form
      }
      createCard(params)
        .then((res) => {
          this.loading = false
          this.$emit('success')
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
    getCardSetting () {
      getCardSetting().then((res) => {
        this.cardList = res.CardImages
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
    .card-img {
      width: 222px;
      height: 132px;
      border-radius: 5px;
    }
    .el-select-dropdown__item {
      padding: 10px 15px;
      height: 152px !important;
    }
  }
</style>
