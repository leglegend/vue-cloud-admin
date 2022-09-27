<template>
<div>
<router-view></router-view>
<div>localCompute{{localCompute}}</div>
<div>count{{count}}</div>
<div>getCount{{getCount}}</div>
</div>
</template>
<script>
import { mapGetters, mapActions, createNamespacedHelpers } from 'vuex'

const { mapState } = createNamespacedHelpers('test')

export default {
  data () {
    return {
      localCount: 2
    }
  },
  computed: {
    ...mapState({
      count: state => state.count,
      count2: 'count',
      localCompute (state) {
        return state.count + this.localCount
      }
    }),
    ...mapGetters(['calcCount']),
    ...mapGetters({
      calcCount2: 'calcCount'
    }),
    getCount () {
      return this.calcCount(2)
    }
  },
  methods: {
    ...mapActions('test', ['addCount']),
    ...mapActions({
      addCount2: 'addCount'
    })
  },
  mounted () {
    // this.addCount(50)
    this.$store.dispatch('test/addCount', 50)
  }
}
</script>
<style>
  .cannotselect {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  * {
    font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
      'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
  }

  body {
    margin: 0;
  }
</style>
