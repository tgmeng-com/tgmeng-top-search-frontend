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
        message: '订阅推送功能上线，顶部🚀图标',
        type: 'success',
        position: "top-left",
        duration: 10000
      })
    }
  },
  mounted() {
    const isBefore = (target) => Date.now() < new Date(target);
    if (isBefore('2025-12-9')) {
      this.notification()
    }
  }
}
</script>

<style scoped>


</style>