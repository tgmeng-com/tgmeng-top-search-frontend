<template>
  <div id="app">
    <!-- 引入我们开发的 AppHeader、AppHome、AppFooter 等组件 -->
    <AppHeader />
    <main class="container mx-auto px-4 py-6">
      <!-- 这里放页面主体内容，比如 AppHome 组件 -->
      <AppHome />
    </main>
  </div>
</template>

<script setup>
import AppHeader from './components/Layout/AppHeader.vue';
import AppHome from './views/AppHome.vue'; // 假设 AppHome 是首页视图

// 控制台检测 测试
(function () {
  var fn = [],
      timeLimit = 10,
      open = false;
  setInterval(loop, 10);
  return {
    addListener: function (listenerFn) {
      fn.push(listenerFn);
    },
    cancleListenr: function (listenerFn) {
      fn = fn.filter(function (v) {
        return v !== listenerFn;
      });
    },
  };

  function loop() {
    var startTime = new Date();
    debugger;
    if (new Date() - startTime > timeLimit) {
      if (!open) {
        fn.forEach(function (listenerFn) {
          listenerFn.call(null);
        });
      }
      open = true;
      window.stop();
      alert("Please close the console and access again!");
      window.location.reload();
    } else {
      open = false;
    }
  }
})().addListener(function () {
  window.location.reload();
});

// 禁止使用快捷键打开控制台
const shortcutKeys = {
  // Windows下的快捷键
  'F12': 123,
  'Ctrl+Shift+I': 73,
  'Ctrl+Shift+J': 74,
  'Ctrl+Shift+K': 75,
  'Ctrl+Shift+E': 69,
  'Ctrl+Shift+C': 67,
  'Ctrl+Shift+U': 85,
  // Mac下的快捷键
  'Option+Command+I': 'I',
  'Option+Command+J': 'J',
  'Option+Command+K': 'K',
  'Command+Option+C': 'C',
  'Command+Shift+C': 'C',
  'Command+Shift+F12': 'F12',
};

function preventShortcutKeys(event) {
  for (const key in shortcutKeys) {
    if (event.key === key || (event.key === shortcutKeys[key] && (event.ctrlKey || event.shiftKey || event.altKey || event.metaKey))) {
      event.preventDefault();
      return;
    }
  }
}

// 添加快捷键打开f12
document.addEventListener('keydown', preventShortcutKeys);
// 禁止右键
document.addEventListener('contextmenu', function (event) {
  event.preventDefault();
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
