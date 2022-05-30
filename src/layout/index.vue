<template>
  <el-container class="layout">
    <AsideNav :isMobile="isMobile" />
    <el-container>
      <el-header>
        <div class="header cannotselect">
          <div class="header-toggle cannotselect" @click="toggleAside">
            <div :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"></div>
          </div>
          <el-dropdown placement="bottom" trigger="click" @command="handleCommand">
            <div class="header-user">
              <img src="@/assets/user_logo.jpg" />
              <i class="el-icon-caret-bottom"></i>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item icon="el-icon-setting" command="persion">
                  个人资料
                </el-dropdown-item>
                <el-dropdown-item icon="el-icon-circle-close" divided command="logout">
                  退出登录
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
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
            <router-view v-slot="{ Component }">
              <transition name="slide-fade" mode="out-in">
                <keep-alive :include="include">
                  <component :is="Component" />
                </keep-alive>
              </transition>
            </router-view>
          </div>
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
  import AsideNav from './AsideNav.vue'
  import { useStore } from 'vuex'
  import { useRouter, useRoute, RouteLocationNormalizedLoaded } from 'vue-router'
  import { watch, computed, reactive, onMounted, onBeforeUnmount } from 'vue'

  let keepAlives = reactive([]) as Array<RouteLocationNormalizedLoaded>
  const store = useStore()
  const isMobile = computed(() => {
    return store.state.app.isMobile.value
  })
  const isCollapse = computed(() => {
    return store.state.app.isCollapse.value
  })

  const include = computed(() => {
    const include = ['Home']
    keepAlives.forEach(route => {
      include.push(route.name as string)
    })
    return include
  })

  const router = useRouter()
  const route = useRoute()

  watch(
    route,
    (newVal, oldVal) => {
      const alives: any = keepAlives.filter(item => item.name === route.name)
      if (!alives.length && route.name !== 'Home') {
        keepAlives.push(route)
      }
    },
    { immediate: true }
  )

  function onTapTag(tapRoute: RouteLocationNormalizedLoaded) {
    if (tapRoute.fullPath === route.fullPath) return
    router.push(route.fullPath)
  }

  function onTagClose(tapRoute: RouteLocationNormalizedLoaded) {
    keepAlives = keepAlives.filter(item => item.name !== tapRoute.name)
    if (tapRoute.name === route.name) {
      if (!keepAlives.length) onTapHomeTag()
      else {
        router.push({
          name: keepAlives[keepAlives.length - 1].name as string
        })
      }
    }
  }

  function onTapHomeTag() {
    if (route.fullPath === '/home') return
    router.push({ name: 'Home' })
  }

  function toggleAside() {
    store.dispatch('app/toggleAside', {
      withoutAnimation: false
    })
  }

  function handleCommand(command: string) {
    if (command === 'persion') {
      router.push({ name: 'MemberDetail' })
    } else {
      localStorage.removeItem('token')
      router.push('/login')
    }
  }

  function resizeHandler() {
    const width = document.body.getBoundingClientRect().width
    store.dispatch('app/changeIsMobile', {
      isMobile: width < 768
    })
  }

  onMounted(() => {
    window.addEventListener('resize', resizeHandler)
  })
  onBeforeUnmount(() => {
    window.removeEventListener('resize', resizeHandler)
  })
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
