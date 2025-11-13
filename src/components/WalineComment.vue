<template>
  <div style="max-width: 50rem; display: inline-block; width: 100%;margin-top: 2.5rem">
    <div style="height: auto;padding-left: 1rem;padding-right: 1rem;">
        <img src="@/assets/image/comment.gif">
    </div>
<!--    <div style="margin-top: 20px;">阅读量: <span class="waline-pageview-count" data-path="/" /></div>-->
    <div id="waline-comment"></div>
  </div>
</template>

<script>
import { init } from '@waline/client';

export default {
  props: {
    serverURL: {
      type: String,
      required: true,
      default: 'https://walinetrend.tgmeng.com/', // 替换为你的 Waline 服务端地址
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
        lang: 'zh-CN', // 设置语言为中文
        // reaction: true, // 开启反应
        pageview: true, // 浏览量统计
        comment: true, // 评论数统计
        dark: true,
        meta: ['nick'], // 评论者属性
        requiredMeta: ['nick'],//必填项
        wordLimit: [5,500], //评论字数限制
        pageSize: 20, // 每页评论数
        noCopyright: true, //隐藏页脚版权信息
        avatar: '/favicon.png',// 默认用户头像
        turnstileKey: '0x4AAAAAABlpMORaJS5YUeAD'
        // 更多配置参考：https://waline.js.org/reference/client/props.html#meta
      });
    },
  },
};
</script>

<style scoped>
#waline-comment {
  margin-top: 1.25rem;
}
</style>
