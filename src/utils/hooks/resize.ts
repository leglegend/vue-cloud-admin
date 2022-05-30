import { onBeforeUnmount, onMounted, onUnmounted, ref } from 'vue'

const resize = () => {
  const width = ref(0)
  let timer: any
  function resizeHandler() {
    clearTimeout(timer)
    timer = setTimeout(() => {
      width.value = window.innerWidth
    }, 100)
  }
  onMounted(() => {
    window.addEventListener('resize', resizeHandler)
  })
  onBeforeUnmount(() => {
    window.removeEventListener('resize', resizeHandler)
  })
  return width
}
export default resize
