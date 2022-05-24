<template>
  <el-card shadow="hover" :loading="loading">
    <el-page-header @back="goBack" content="交易详情"> </el-page-header>

    <el-descriptions class="margin-top" title="基础信息" :column="2" border>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-user"></i>
          用户名
        </template>
        <el-popover trigger="hover" placement="left">
          <div class="popover-content">
            <img class="user-logo" :src="detail.UserImg" />
          </div>
          <div slot="reference">
            <el-tag size="medium" :type="detail.CardId ? '' : 'info'">
              {{ detail.UserName }}
            </el-tag>
          </div>
        </el-popover>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-mobile-phone"></i>
          手机号
        </template>
        {{ detail.UserMobile || '-' }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-edit"></i>
          操作人
        </template>
        {{ detail.StoreUserName || '-' }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-time"></i>
          操作时间
        </template>
        {{ detail.CreateDate }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i>
          备注
        </template>
        {{ detail.BusinessRemark || '-' }}
      </el-descriptions-item>
    </el-descriptions>

    <el-descriptions class="margin-top" title="交易信息" :column="2" border>
      <el-descriptions-item label="交易类型">
        {{ detail.ConsumptionTagValue }}
      </el-descriptions-item>
      <el-descriptions-item label="支付方式">
        {{ detail.PayType }}
      </el-descriptions-item>
      <el-descriptions-item label="应付金额">
        {{ detail.TotalPrice }}
      </el-descriptions-item>
      <el-descriptions-item
        v-if="!detail.Service || !detail.Service.length"
        label="实付金额"
      >
        {{ detail.ConsumptionValue }}
      </el-descriptions-item>
      <el-descriptions-item v-else label="实付金额">
        <template v-for="(service, index) in detail.Service">
          <el-tag v-if="service.ConsumptionValue" :key="index" size="medium">
            {{
              `${service.ItemName} -${service.ConsumptionValue}${
                service.ItemUnit || '次'
              }`
            }}
          </el-tag>
        </template>
      </el-descriptions-item>

      <el-descriptions-item v-if="detail.CardDiscount" label="会员卡折扣">
        {{ detail.CardDiscount }}
      </el-descriptions-item>
      <el-descriptions-item v-if="detail.IsCoupon" label="优惠券">
        <el-tag
          size="medium"
          v-for="(coupon, index) in detail.Coupons"
          :key="index"
        >
          {{
            coupon.CouponValue +
            (coupon.CouponType ? '折' : '元') +
            coupon.CouponTitle
          }}
        </el-tag>
      </el-descriptions-item>
      <el-descriptions-item v-if="detail.IsIntegral" label="积分变动">
        {{ detail.AfterIntegral }}
      </el-descriptions-item>
    </el-descriptions>

    <el-descriptions
      v-if="detail.CardName"
      class="margin-top"
      title="会员卡信息"
      :column="2"
      border
    >
      <el-descriptions-item label="会员卡名称">
        {{ detail.CardName }}
      </el-descriptions-item>
      <el-descriptions-item label="会员卡类型">
        {{ cardType[detail.CardType] }}
      </el-descriptions-item>
      <el-descriptions-item label="卡号">
        {{ detail.CardNumber }}
      </el-descriptions-item>
      <el-descriptions-item label="卡余额">
        <template v-if="!detail.Service || !detail.Service.length">
          {{ detail.AfterValue }}
        </template>
        <template v-else>
          <el-tag
            v-for="(service, index) in detail.Service"
            :key="index"
            size="medium"
          >
            {{
              `${service.ItemName} ${service.AfterValue}${
                service.ItemUnit || '次'
              }`
            }}
          </el-tag>
        </template>
      </el-descriptions-item>
    </el-descriptions>
  </el-card>
</template>

<script>
import { getDetail } from '@/api/report.js'
export default {
  name: 'TradeDetail',
  data () {
    return {
      detail: {},
      loading: false,
      cardType: ['计次卡', '储值卡', '时限卡', '权益卡']
    }
  },
  methods: {
    goBack () {
      window.history.back()
    },
    getTradeDetail (ConsumptionId) {
      this.loading = true
      getDetail({ ConsumptionId }).then((res) => {
        this.detail = res
        this.loading = true
      })
    }
  },
  mounted () {
    console.log(this.$route)
    this.getTradeDetail(this.$route.params.id)
  },
  activated () {
    if (this.$route.params.id) this.getTradeDetail(this.$route.params.id)
  }
}
</script>

<style lang="scss" scoped>
  .margin-top {
    margin-top: 30px;
  }
  .el-tag {
    margin-right: 10px;
  }
  .user-logo {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    display: block;
  }
</style>
