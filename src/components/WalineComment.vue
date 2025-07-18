<template>
  <div id="waline-comment"></div>
</template>

<script>
import { init } from '@waline/client';

export default {
  props: {
    serverURL: {
      type: String,
      required: true,
      default: 'https://waline-trend.tgmeng.com', // 替换为你的 Waline 服务端地址
    },
  },
  mounted() {
    this.initWaline();
  },
  methods: {
    initWaline() {
      init({
        el: '#waline-comment',
        serverURL: this.serverURL,
        // 可选：其他 Waline 配置项
        lang: 'zh-CN', // 设置语言为中文
        // path: this.$route.path, // 动态路径，基于当前路由
        // 更多配置参考：https://waline.js.org/reference/client.html
      });
    },
  },
};
</script>

<style scoped>
#waline-comment {
  margin-top: 20px;
}
</style>