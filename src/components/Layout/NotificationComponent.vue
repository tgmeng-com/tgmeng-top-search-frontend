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
        message: '新增支持RSS，可按全站、分类、平台 单独订阅',
        type: 'success',
        position: "top-left",
        duration: 10000
      })
    }
  },
  mounted() {
    const isBefore = (target) => Date.now() < new Date(target);
    if (isBefore('2025-11-28')) {
      this.notification()
    }
  }
}
</script>

<style scoped>


</style>