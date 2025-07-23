<template>
  <div class="bg-white dark:bg-dark-card rounded-xl overflow-hidden shadow-sm card-hover">
    <!-- 顶部标题栏 -->
    <div class="bg-blue-50 dark:bg-dark-card-title p-4 flex items-center">
      <img :src="logo" alt="Logo" class="w-8 h-8 rounded-full mr-3">
      <h3 class="font-semibold dark:text-dark-text">{{ title }}</h3>
      <span
          class="ml-auto text-xs px-2 py-1 bg-blue-100/30 dark:bg-blue-300/10 text-blue-600 dark:text-blue-400 rounded-full dark:text-dark-text">
        {{ updateTime }}
      </span>
    </div>

    <!-- 内容区域（限制高度、可滚动） -->
    <div class="p-4 max-h-[480px] overflow-y-auto custom-scroll">
      <!-- ✅ 加载中 -->
      <div v-if="loading" class="flex flex-col items-center justify-center text-gray-400 py-10">
        <div class="atom-spinner">
          <div class="spinner-inner">
            <div class="spinner-line"></div>
            <div class="spinner-line"></div>
            <div class="spinner-line"></div>
            <div class="spinner-circle">&#9679;</div>
          </div>
        </div>
        <p class="mt-3 text-sm text-gray-500">加载中...</p>
      </div>

      <!-- ✅ 有数据 -->
      <ul v-else-if="list && list.length > 0" class="space-y-3">
        <li
            v-for="(item, index) in list"
            :key="index"
            class="flex items-center justify-between"
        >
          <!-- 序号 -->
          <span
              :class="[
                'sequence-number rounded-full flex items-center justify-center text-sm font-bold mr-3',
                index === 0
                  ? 'bg-red-600 text-white'
                  : index === 1
                  ? 'bg-orange-500 text-white'
                  : index === 2
                  ? 'bg-yellow-700 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
              ]"
          >
            {{ index + 1 }}
          </span>

          <!-- 标题 -->
          <a
              :href="item.url"
              target="_blank"
              rel="noopener noreferrer"
              class="text-sm dark:text-dark-text hot-title hover:underline"
              :title="item.keyword"
          >
            {{ item.keyword }}
          </a>

          <div>
            <template v-if="title.includes('网易云')">
              <!-- 音乐播放器 -->
              <audio
                  :id="'audio-' + index"
                  :src="'https://music.163.com/song/media/outer/url?id=' + extractWangYiYunId(item.url) + '.mp3'"
                  ref="audios"
                  :loop="isLoop"
              ></audio>

              <!-- 播放按钮 -->
              <button @click="playAudio(index, item.keyword)">
                {{ playingIndex === index && !isPaused ? '⏸️' : '▶️' }}
              </button>

              <!-- 循环播放按钮 -->
              <button @click="toggleLoop(index)">
                {{ isLoop ? '🔁' : '🔂'  }}
              </button>
            </template>
            <template v-else>
              <span class="text-sm text-red-600 dark:text-red-300 hot-score">
                🔥{{ item.hotScore }}
              </span>
            </template>
          </div>
        </li>
      </ul>

      <!-- ✅ 无数据 -->
      <div v-else class="text-center text-gray-400 dark:text-gray-500 text-sm py-10">
        🤡 暂无数据或接口异常<br />
        请稍后重试或者联系作者
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      playingIndex: null,
      isPaused: true,
      isLoop: false,  // 默认不循环播放
    };
  },
  methods: {
    extractWangYiYunId(url) {
      const match = url.match(/id=(\d+)/);
      return match ? match[1] : '';
    },
    // 播放音乐
    playAudio(index, title) {
      const audios = this.$refs.audios;
      if (!audios || audios.length === 0) return;

      const currentAudio = audios[index];
      if (!currentAudio) return;

      // 如果当前点击的是播放中的音频
      if (this.playingIndex === index) {
        if (currentAudio.paused) {
          currentAudio.play().catch(err => {
            console.error(title + ' 播放失败:', err);
            this.$message?.error?.(title + ' 播放失败(狗会员才能听，站长乏力，当然如果你愿意贡献会员账号就万分感激！)');
          });
          this.isPaused = false;
        } else {
          currentAudio.pause();
          this.isPaused = true;
        }
      } else {
        // 如果有其他音频在播放，暂停它
        if (this.playingIndex !== null && audios[this.playingIndex]) {
          audios[this.playingIndex].pause();
          audios[this.playingIndex].currentTime = 0;
        }
        // 播放当前选中音频
        currentAudio.play().catch(err => {
          console.error(title + ' 播放失败:', err);
          this.$message?.error?.(title + ' 播放失败(狗会员才能听，站长乏力，当然如果你愿意贡献会员账号就万分感激！)');
        });
        this.playingIndex = index;
        this.isPaused = false;
      }

      // 监听暂停事件，保持状态同步
      currentAudio.onpause = () => {
        if (this.playingIndex === index) {
          this.isPaused = true;
        }
      };

      // 监听播放事件，保持状态同步
      currentAudio.onplay = () => {
        this.isPaused = false;
      };
    },

    // 切换循环播放
    toggleLoop(index) {
      this.isLoop = !this.isLoop; // 切换循环状态
      const audio = this.$refs.audios[index];
      if (audio) {
        audio.loop = this.isLoop;
      }
    }
  },
  props: {
    title: String,
    logo: String,
    updateTime: String,
    list: Array,
    loading: {
      type: Boolean,
      default: false,
    },
  }
}
</script>

<style scoped>
.sequence-number{
  width: 1rem;
  height: 1rem;
}
/* 多行标题样式 */
.hot-title {
  flex: 1;
  text-align: left !important;
  white-space: normal;
  word-break: break-word;
  min-width: 0;
  display: -webkit-box;
  /*标题最多显示行数，0表示不限制*/
  -webkit-line-clamp: 0;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* 列表项调整 */
li {
  align-items: flex-start;
}

/* 序号对齐 */
li > span:first-child {
  margin-top: 2px;
}

/* 热度值右对齐 */
.hot-score {
  min-width: 60px;
  text-align: right;
  flex-shrink: 0;
}

/* 滚动条美化 */
.custom-scroll::-webkit-scrollbar {
  width: 6px;
}

.custom-scroll::-webkit-scrollbar-thumb {
  background-color: rgba(100, 100, 100, 0.2);
  border-radius: 4px;
}

.custom-scroll {
  scrollbar-width: thin;
  scrollbar-color: rgba(100, 100, 100, 0.2) transparent;
}

/* 加载动画样式*/
.atom-spinner, .atom-spinner * {
  box-sizing: border-box;
}

.atom-spinner {
  height: 60px;
  width: 60px;
  overflow: hidden;
}

.atom-spinner .spinner-inner {
  position: relative;
  display: block;
  height: 100%;
  width: 100%;
}

.atom-spinner .spinner-circle {
  display: block;
  position: absolute;
  color: #ff1d5e;
  font-size: calc(60px * 0.24);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.atom-spinner .spinner-line {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border-left-width: calc(60px / 5);
  border-top-width: calc(60px / 25);
  border-left-color: #ff1d5e;
  border-left-style: solid;
  border-top-style: solid;
  border-top-color: transparent;
}

.atom-spinner .spinner-line:nth-child(1) {
  animation: atom-spinner-animation-1 1s linear infinite;
  transform: rotateZ(120deg) rotateX(66deg) rotateZ(0deg);
}

.atom-spinner .spinner-line:nth-child(2) {
  animation: atom-spinner-animation-2 1s linear infinite;
  transform: rotateZ(240deg) rotateX(66deg) rotateZ(0deg);
}

.atom-spinner .spinner-line:nth-child(3) {
  animation: atom-spinner-animation-3 1s linear infinite;
  transform: rotateZ(360deg) rotateX(66deg) rotateZ(0deg);
}

@keyframes atom-spinner-animation-1 {
  100% {
    transform: rotateZ(120deg) rotateX(66deg) rotateZ(360deg);
  }
}

@keyframes atom-spinner-animation-2 {
  100% {
    transform: rotateZ(240deg) rotateX(66deg) rotateZ(360deg);
  }
}

@keyframes atom-spinner-animation-3 {
  100% {
    transform: rotateZ(360deg) rotateX(66deg) rotateZ(360deg);
  }
}
</style>
