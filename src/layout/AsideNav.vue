<template>
  <div class="aside cannotselect">
    <transition name="aside-bg">
      <div v-show="!isCollapse && isMobile" @click="toggleAside(false)" class="aside-bg"></div>
    </transition>
    <div class="aside-nav" :class="asideClass">
      <div class="aside-top" @click="toggleAside(false)">
        <div class="top-logo">
          <img src="@/assets/logo.png" />
        </div>
      </div>
      <el-scrollbar>
        <el-menu
          :collapse="isCollapse && !isMobile"
          :default-active="activePath"
          :collapse-transition="false"
        >
          <div v-for="(route, index) in routes" :key="index">
            <template v-if="!route.children"></template>
            <el-sub-menu v-else-if="route.children.length > 1" :index="route.path">
              <template #title>
                <el-icon>
                  <component :is="route.meta.icon"></component>
                </el-icon>
                <span>{{ route.meta.title }}</span>
              </template>
              <el-menu-item-group>
                <template v-for="(child, childIndex) in route.children">
                  <el-menu-item
                    v-if="child.meta && !child.meta.hidden"
                    :index="`${route.path}/${child.path}`"
                    :key="childIndex"
                    @click="routeTo(child, route)"
                  >
                    <el-icon>
                      <component :is="child.meta.icon"></component>
                    </el-icon>
                    {{ child.meta.title }}
                  </el-menu-item>
                </template>
              </el-menu-item-group>
            </el-sub-menu>
            <template v-else-if="route.children.length == 1 && route.children[0].meta">
              <el-menu-item
                :index="`${route.path == '/' ? '' : route.path}/${route.children[0].path}`"
                @click="routeTo(route.children[0], route)"
              >
                <el-icon>
                  <component :is="route.children[0].meta.icon"></component>
                </el-icon>
                <span>{{ route.children[0].meta.title }}</span>
              </el-menu-item>
            </template>
          </div>
        </el-menu>
      </el-scrollbar>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref, watch } from 'vue'
  import { useStore } from 'vuex'
  import { useRouter, useRoute } from 'vue-router'

  const store = useStore()

  const isMobile = computed(() => {
    return store.state.app.isMobile
  })

  const isCollapse = computed(() => {
    return store.state.app.isCollapse
  })

  const withoutAnimation = computed(() => {
    return store.state.app.withoutAnimation
  })

  const asideClass = computed(() => {
    return {
      'aside-mobile': isMobile.value,
      'aside-is-collapse': isCollapse.value && !isMobile.value,
      'aside-mobile-open': !isCollapse.value && isMobile.value,
      'aside-mobile-off': isCollapse.value && isMobile.value,
      'aside-without-animation': withoutAnimation.value
    }
  })

  const beforeHandlerState = ref(false)

  const router = useRouter()

  const route = useRoute()

  const routes = computed(() => {
    return router.options.routes
  })

  const activePath = computed(() => {
    return useRoute().path
  })

  watch(isMobile, newValue => {
    if (newValue) beforeHandlerState.value = isCollapse.value
    if (newValue && !isCollapse.value) toggleAside(true)
    if (!newValue && beforeHandlerState.value !== isCollapse.value) {
      toggleAside(true)
    }
    store.dispatch('app/changeWithoutAnimation', {
      withoutAnimation: true
    })
  })

  function toggleAside(withoutAnimation: boolean) {
    store.dispatch('app/toggleAside', {
      withoutAnimation
    })
  }
  function routeTo(tapRoute: any, father: any) {
    const beforePath = father ? (father.path === '/' ? '/' : father.path + '/') : ''
    const path = beforePath + tapRoute.path
    if (route.fullPath === path) return
    router.push({ path })
    if (isMobile.value) toggleAside(false)
  }
</script>

<style lang="scss">
  .aside {
    .aside-bg {
      width: 100vw;
      height: 100vh;
      position: fixed;
      left: 0;
      top: 0;
      background: #000000;
      opacity: 0.3;
      z-index: 9;
    }
    .aside-nav {
      border-right: solid 0.1px #e6e6e6;
      box-sizing: content-box !important;
      width: 200px;
      height: 100vh;
      transition: 0.3s;
      position: relative;
      z-index: 10;
      background: #ffffff;
      .el-scrollbar {
        height: calc(100% - 60px) !important;
        width: auto;
      }
      .el-scrollbar .el-scrollbar__wrap {
        overflow-x: hidden;
      }
      .el-menu--collapse .el-sub-menu__icon-arrow {
        display: none;
      }

      .el-menu-item-group {
        background: #f5f5f5;
      }

      .aside-top {
        height: 60px;
        box-sizing: border-box;
        // border-bottom: solid 0.1px #e6e6e6;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #f5f5f5;
        overflow: hidden;
        .top-logo {
          overflow: hidden;
          height: 60px;
          width: 200px;
          transition: 0.3s;
        }
        img {
          width: 200px;
          height: 60px;
        }
      }
      .el-menu {
        border-right: 0 !important;
        min-height: calc(100% - 60px) !important;
      }
    }
    .aside-mobile {
      position: fixed;
      left: 0;
      top: 0;
      .el-scrollbar .el-scrollbar__wrap {
        overflow-x: hidden;
        overflow-y: hidden !important;
      }
    }
    .aside-is-collapse {
      width: 64px;
      .aside-top {
        .top-logo {
          width: 46px;
        }
      }
      .el-menu-item span {
        height: 0;
        width: 0;
        overflow: hidden;
        visibility: hidden;
        display: inline-block;
      }
      .el-sub-menu__title span {
        height: 0;
        width: 0;
        overflow: hidden;
        visibility: hidden;
        display: inline-block;
      }
    }
    .aside-without-animation {
      transition: 0s;
      .aside-top {
        .top-logo {
          transition: 0s;
        }
      }
    }
    .aside-mobile-open {
      left: 0;
    }
    .aside-mobile-off {
      left: -200px;
    }

    // 导航背景动画
    .aside-bg-enter-active {
      transition: all 0.3s;
    }
    .aside-bg-leave-active {
      transition: all 0.3s;
    }
    .aside-bg-enter,
    .aside-bg-leave-to {
      opacity: 0;
    }
  }
  .el-menu-item-group__title {
    padding: 0 !important;
  }
</style>
