<template>
<div>
<span v-for="item in items" v-if="item"></span>
</div>
</template>
<script>
export default {
  data () {
    return {
      items: [1, 2, 3]
    }
  }
}
</script>
