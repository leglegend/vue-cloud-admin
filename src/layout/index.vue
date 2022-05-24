<template>
  <el-container class="layout">
    <aside-nav :isMobile="isMobile" />
    <el-container>
      <el-header>
        <div class="header cannotselect">
          <div class="header-toggle cannotselect" @click="toggleAside">
            <div
              :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
            ></div>
          </div>
          <el-dropdown placement="bottom" trigger="click"  @command="handleCommand">
            <div class="header-user">
              <img src="@/assets/user_logo.jpg" alt />
              <i class="el-icon-caret-bottom"></i>
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-setting"
                command="persion" >个人资料</el-dropdown-item
              >
              <el-dropdown-item icon="el-icon-circle-close" divided
                command="logout">退出登录</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div class="keep-alive">
          <el-tag
            :effect="$route.name == 'Home' ? 'dark' : 'light'"
            size="small"
            class="cannotselect"
            @click="onTapHomeTag"
          >
            首页
          </el-tag>
          <el-tag
            v-for="route in keepAlives"
            :key="route.name"
            :closable="route.name != 'Home'"
            size="small"
            class="cannotselect"
            :effect="route.name == $route.name ? 'dark' : 'light'"
            @click="onTapTag(route)"
            @close="onTagClose(route)"
          >
            {{ route.meta.title }}
          </el-tag>
        </div>
      </el-header>
      <el-main>
        <el-scrollbar>
          <div class="app-main" :class="{ mobile: isMobile }">
            <transition name="slide-fade" mode="out-in">
              <keep-alive :include="include">
                <router-view></router-view>
              </keep-alive>
            </transition>
          </div>
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import AsideNav from './AsideNav.vue'
import { mapState } from 'vuex'

export default {
  components: {
    AsideNav
  },
  data () {
    return {
      keepAlives: [],
      visible: true
    }
  },
  computed: {
    ...mapState('app', ['isMobile', 'isCollapse']),
    include () {
      const include = ['Home']
      this.keepAlives.forEach((route) => {
        include.push(route.name)
      })
      return include
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler (route) {
        const keepAlives = this.keepAlives.filter(
          (item) => item.name === route.name
        )
        if (!keepAlives.length && route.name !== 'Home') { this.keepAlives.push(route) }
      }
    }
  },
  methods: {
    onTapTag (route) {
      if (route.fullPath === this.$route.fullPath) return
      this.$router.push(route.fullPath)
    },
    onTagClose (route) {
      this.keepAlives = this.keepAlives.filter(
        (item) => item.name !== route.name
      )
      if (route.name === this.$route.name) {
        if (!this.keepAlives.length) this.onTapHomeTag()
        else {
          this.$router.push({
            name: this.keepAlives[this.keepAlives.length - 1].name
          })
        }
      }
    },
    onTapHomeTag () {
      if (this.$route.fullPath === '/home') return
      this.$router.push({ name: 'Home' })
    },
    handleCommand (command) {
      console.log(command)
      if (command === 'persion') { this.$router.push({ name: 'MemberDetail' }) }
    },
    toggleAside () {
      this.$store.dispatch('app/toggleAside', {
        withoutAnimation: false
      })
    },
    resizeHandler () {
      const width = document.body.getBoundingClientRect().width
      this.$store.dispatch('app/changeIsMobile', {
        isMobile: width < 768
      })
    }
  },
  mounted () {
    this.resizeHandler()
  },
  beforeMount () {
    window.addEventListener('resize', this.resizeHandler)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.resizeHandler)
  }
}
</script>

<style lang="scss">
  .layout {
    .el-header {
      background-color: #ffffff;
      color: #333;
      text-align: center;
      height: 95px !important;
      padding: 0;
      z-index: 2;
      .header {
        width: 100%;
        height: 60px;
        display: flex;
        box-sizing: border-box;
        background-color: #ffffff;
        position: relative;
        z-index: 3;
        border-bottom: 0.1px solid #e6e6e6;
        justify-content: space-between;
        align-items: center;
        padding-right: 20px;
        .header-toggle {
          cursor: pointer;
          transition: background 0.3s;
          display: flex;
          width: 60px;
          height: 100%;
          align-items: center;
          justify-content: center;
          font-size: 30px;
          color: rgba(0, 0, 0, 0.45);
          &:hover {
            background: rgba(0, 0, 0, 0.025);
          }
        }
        .header-user {
          cursor: pointer;
          transition: background 0.3s;
          height: 60px;
          padding: 0 10px;
          display: flex;
          align-items: center;
          position: relative;
          img {
            width: 50px;
            height: 50px;
            border: 0.1px solid #e6e6e6;
            border-radius: 50%;
          }
          .el-icon-caret-bottom {
            position: absolute;
            right: 0px;
            bottom: 0px;
            color: #c9c9c9;
          }
          &:hover {
            background: rgba(0, 0, 0, 0.025);
          }
        }
      }
      .keep-alive {
        position: relative;
        z-index: 2;
        height: 35px;
        display: flex;
        padding-left: 20px;
        align-items: center;
        box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.05);
        .el-tag {
          margin-right: 10px;
          cursor: pointer;
        }
      }
    }

    .el-scrollbar {
      height: 100%;
    }
    .el-scrollbar {
      .el-scrollbar__wrap {
        overflow-x: hidden;
      }
      .is-horizontal {
        display: none;
      }
    }

    .el-main {
      background-color: #f5f5f5;
      color: #333;
      height: calc(100vh - 95px);
      overflow: hidden;
      padding: 0 !important;
      .app-main {
        padding: 30px;
      }
      .mobile {
        padding: 15px;
      }
    }

    .slide-fade-enter-active {
      transition: all 0.4s;
    }
    .slide-fade-leave-active {
      transition: all 0.4s;
    }
    .slide-fade-enter,
    .slide-fade-leave-to {
      transform: translateX(15px);
      opacity: 0;
    }
  }
</style>
