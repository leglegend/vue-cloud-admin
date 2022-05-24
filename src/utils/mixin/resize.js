const resize = {
  computed: {
    isCollapse () {
      return this.$store.state.app.isCollapse
    }
  },
  watch: {
    isCollapse () {
      if (!this.echarts) return
      setTimeout(() => {
        this.echarts.resize()
      }, 300)
    }
  },
  methods: {
    resizeHandler () {
      if (!this.echarts) return
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.echarts.resize()
      }, 100)
    }
  },
  mounted () {
    window.addEventListener('resize', this.resizeHandler)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.resizeHandler)
  }
}

export default resize
