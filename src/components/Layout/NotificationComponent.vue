<template>
  <div>
  </div>
</template>

<script>
import {ElNotification} from 'element-plus'

export default {
  components: {},
  data() {
    return {
    }
  },
  methods: {
    notification() {
      ElNotification({
        title: '新功能',
        message: '新增了摸鱼模式，点击右上方小鱼即可体验',
        type: 'success',
        position: "top-left",
        duration: 10000
      })
    }
  },
  mounted() {
    const isBefore = (target) => Date.now() < new Date(target);
    if (isBefore('2025-11-25')) {
      this.notification()
    }
  }
}
</script>

<style scoped>


</style>