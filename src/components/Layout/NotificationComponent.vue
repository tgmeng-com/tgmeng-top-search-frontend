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
        message: '可在设置中一键关闭本站内的谷歌广告',
        type: 'success',
        position: "top-left",
        duration: 10000
      })
    }
  },
  mounted() {
    const isBefore = (target) => Date.now() < new Date(target);
    if (isBefore('2025-12-6')) {
      this.notification()
    }
  }
}
</script>

<style scoped>


</style>