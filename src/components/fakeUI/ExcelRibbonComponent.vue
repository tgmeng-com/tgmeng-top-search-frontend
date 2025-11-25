<template>
  <div style="height: 83px;overflow: hidden;padding: 3px">
      <img style="height: 100%; object-fit: cover;" :src="require(`@/assets/image/excelribbon/${menuName}.png`)" class="floating-image fade-in-zoom" />
  </div>
</template>

<script>
export default {
  props: {
    menuName: String // 定义接收的 prop，类型为 String
  }
};
</script>

<style scoped>
</style>
