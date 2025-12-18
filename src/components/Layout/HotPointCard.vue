<template>
  <div class="bg-gray-200 dark:bg-dark-card rounded-xl overflow-hidden card-hover">
    <!-- 顶部标题栏 -->
    <div class="bg-gray-300 dark:bg-dark-card-title p-4 flex items-center drag-handle"
         :style="cardTopStyle">
      <img :src="logo" :alt="title" class=" rounded-full" :style="cardTopLogoStyle">
      <el-icon
          class="favorite-icon"
          :color="isStar ? '#f7ba2a' : '#ccc'"
          @click="toggleStar"
          :style="cardTopStyle">
        <component :is="isStar ? 'StarFilled' : 'Star'"/>
      </el-icon>
      <div>
        <a :href="'https://tgmeng.com' + rss+ '/rss.xml'" target="_blank" @click="handleRssClick(title)">
          <svg xmlns="http://www.w3.org/2000/svg"
               viewBox="0 0 24 24"
               :style="{ width: cardTopStyle.fontSize, height: cardTopStyle.fontSize }">
            <rect width="24" height="24" rx="4" ry="4" fill="#FFA500"/>
            <circle cx="6" cy="18" r="2" fill="white"/>
            <path d="M4 4c9.941 0 18 8.059 18 18" stroke="white" stroke-width="2" fill="none"/>
            <path d="M4 10c6.627 0 12 5.373 12 12" stroke="white" stroke-width="2" fill="none"/>
          </svg>
        </a>
      </div>
      <h1 class="ml-2 font-semibold dark:text-dark-text hot-title" :class="{'card-title-full':cardTitleFull}">{{
          title
        }}</h1>
      <span v-if="cardTimeShow"
            class="ml-auto px-1 bg-blue-100/30 dark:bg-blue-300/10  dark:text-blue-400 rounded-xl dark:text-dark-text"
            :style="cardTopTimeStyle">
        <el-button
            link
            @click="onRefreshCardData"
            class="dark:text-dark-text"
        >
          <el-icon v-if="!loading" :style="cardTopStyle"><Refresh/></el-icon>
          <el-icon v-else :style="cardTopStyle" class="is-loading">
            <Loading/>
          </el-icon>
        </el-button>

        {{ timeAgo(updateTime) }}
      </span>
    </div>

    <!-- 内容区域（限制高度、可滚动） -->
    <div class="p-4 overflow-y-auto custom-scroll "
         :style="[cardHeightStyle ,cardTitleStyle]">
      <!--    <div :class="`p-4 overflow-y-auto custom-scroll max-h-[21rem]`">-->
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
        <p class="mt-3  text-gray-500">加载中...</p>
      </div>

      <!-- ✅ 有数据 -->
      <ul v-else-if="list && list.length > 0" class="space-y-3">
        <template v-for="(item, index) in list.slice(0,cardListLimit)" :key="index">
          <!-- 正常内容 li -->
          <li class="flex items-center justify-between">
            <!-- 序号 -->
            <span :class="[
              'sequence-number rounded-xl flex items-center justify-center font-bold mr-3',
              index === 0 ? 'bg-red-600 text-white' :
              index === 1 ? 'bg-orange-500 text-white' :
              index === 2 ? 'bg-yellow-700 text-white' :
              'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300']">
              {{ index + 1 }}
            </span>

            <!-- 标题 -->
            <a :href="item.url" target="_blank" rel="noopener noreferrer"
               class="dark:text-dark-text hot-title hover:underline"
               :class="{'hot-title-full':cardHotTitleFull}"
               :title="item.keyword">

              <span v-if="title.includes('CCTV')" :style="cardSecondTitleStyle" style="margin-left: 0.2rem"
                    class="ml-auto px-2 py-1 bg-blue-100/30 dark:bg-blue-300/10 dark:text-blue-400 rounded-xl dark:text-dark-text">
                  {{ item.showTime }}
                </span>
              {{ item.keyword }}
              <!-- 网易云二级标题 -->
              <template v-if="title.includes('网易云')">
                <span :style="cardSecondTitleStyle">&nbsp;- {{ item.image }}</span>
              </template>
              <!-- 猫眼二级标题 -->
              <template v-else-if="title.includes('猫眼')">
              <span v-for="(text, idx) in maoYanSecondTitleInfo(item)" :key="idx"
                    :style="cardSecondTitleStyle" style="opacity: 0.5"><br/>· {{ text }}
              </span>
              </template>
              <!-- GitHub二级标题 -->
              <template v-else-if="title.includes('新仓库') || title === 'Star总榜'">
                <span v-if="item.desc" :style="cardSecondTitleStyle" style="opacity: 0.5"><br/>{{ item.desc }}</span>
              </template>
            </a>

            <!-- 评分/播放/信息 -->
            <div v-if="cardHotScoreShow">
              <template v-if="title.includes('网易云')">
                <audio :id="'audio-' + index"
                       :src="'https://music.163.com/song/media/outer/url?id=' + extractWangYiYunId(item.url) + '.mp3'"
                       ref="audios" :loop="isLoop"></audio>
                <button @click="playAudio(index, item.keyword)">
                  {{ playingIndex === index && !isPaused ? '⏸️' : '▶️' }}
                </button>
                <button @click="toggleLoop(index)">
                  {{ isLoop ? '🔁' : '🔂' }}
                </button>
              </template>

              <template v-else-if="title.includes('豆瓣组')">
                <span :style="cardSecondTitleStyle"
                      class="ml-auto px-2 py-1 bg-blue-100/30 dark:bg-blue-300/10 dark:text-blue-400 rounded-xl dark:text-dark-text">
                  👩‍👧‍👦{{ formatHotScore(item.commentCount) }}
                </span>
                <span :style="cardSecondTitleStyle" style="margin-left: 0.2rem"
                      class="ml-auto px-2 py-1 bg-blue-100/30 dark:bg-blue-300/10 dark:text-blue-400 rounded-xl dark:text-dark-text">
                  {{ item.publishTime }}
                </span>
              </template>

              <template v-else-if="title.includes('CCTV')">

                <span v-if="item.url" :style="cardSecondTitleStyle" style="margin-left: 0.2rem"
                      class="ml-auto px-2 py-1 bg-blue-100/30 dark:bg-blue-300/10 dark:text-blue-400 rounded-xl dark:text-dark-text">
                  <a :href="item.url" target="_blank" rel="noopener noreferrer">往期视频</a>
                </span>
                <span v-if="isPast(item.endTime)" :style="cardSecondTitleStyle"
                      style="margin-left: 0.2rem;background-color: #2d8db5"
                      class="ml-auto px-2 py-1 bg-blue-100/30 dark:bg-blue-300/10 dark:text-blue-400 rounded-xl dark:text-dark-text">
                  <a :href="'https://tv.cctv.com/live/cctv'+item.type+'/index.shtml?stime='+item.startTime+'&etime='+item.endTime+'&type=lbacks'"
                     target="_blank" rel="noopener noreferrer">
                    回看
                  </a>
                </span>

                <span v-if="isBetween(item.startTime,item.endTime)" :style="cardSecondTitleStyle"
                      style="margin-left: 0.2rem;background-color: #E42626"
                      class="ml-auto px-2 py-1 bg-blue-100/30 dark:bg-blue-300/10 dark:text-blue-400 rounded-xl dark:text-dark-text">
                  <a :href="'https://tv.cctv.com/live/cctv'+item.type" target="_blank" rel="noopener noreferrer">
                    直播中
                  </a>
                </span>

                <span v-if="isFuture(item.startTime)" :style="cardSecondTitleStyle"
                      style="margin-left: 0.2rem;background-color: #8a8a8a"
                      class="ml-auto px-2 py-1 bg-blue-100/30 dark:bg-blue-300/10 dark:text-blue-400 rounded-xl dark:text-dark-text">
                  未开始
                </span>
              </template>


              <template v-else>
                <span :style="cardSecondTitleStyle" class="text-red-600 dark:text-red-300 hot-score">
                  🔥{{ formatHotScore(item.hotScore) }}
                </span>
              </template>
            </div>
          </li>
          <!-- 信息流广告 li -->
          <li v-if="shouldShowAd(index)">
            <GoogleAdsense v-if="$store.state.adsEnabled" ad-client="ca-pub-3286880109560525"
                           ad-slot="4294342531"
                           ad-format="fluid"
                           ad-layout-key="-i1-y+5r-2a-c0"
                           :full-width-responsive="true"/>
          </li>
        </template>
      </ul>

      <!-- ✅ 无数据 -->
      <div v-else class="text-center text-gray-400 dark:text-gray-500 py-10">
        🤡 暂无数据或接口异常<br/>
        请稍后重试或者联系作者
      </div>
    </div>
  </div>
</template>

<script>
import {StarFilled, Star, Refresh, Loading} from '@element-plus/icons-vue'
import GoogleAdsense from "@/components/Adsense/GoogleAdsense.vue";
import {isBetween, isFuture, isPast} from "@/utils/timeUtils";

export default {
  components: {
    GoogleAdsense,
    StarFilled,
    Star,
    Refresh,
    Loading,
  },
  data() {
    return {
      categroies: this.$store.state.categroies,
      playingIndex: null,
      isPaused: true,
      isLoop: false,  // 默认不循环播放
      currentUpdateTime: this.updateTime,  // 保存当前更新时间
      now: new Date(),  // 添加一个响应式的当前时间
      intervalId: null,  // 存储定时器的 ID
    };
  },
  methods: {
    isPast,
    isBetween,
    isFuture,
    timeAgo(date) {
      const parsedDate = new Date(date);

      // 如果传入的日期无效，返回“加载中”
      if (isNaN(parsedDate)) {
        return "加载中";
      }

      const diffInSeconds = Math.floor((this.now - parsedDate) / 1000);

      if (diffInSeconds < 60) {
        return `${diffInSeconds}秒前`; // 小于一分钟的秒数
      }

      const diffInMinutes = Math.floor(diffInSeconds / 60);
      if (diffInMinutes < 60) {
        const remainingSeconds = diffInSeconds % 60;
        return `${diffInMinutes}分${remainingSeconds}秒前`; // 小于一小时的分钟和秒
      }

      const diffInHours = Math.floor(diffInMinutes / 60);
      if (diffInHours < 24) {
        const remainingMinutes = diffInMinutes % 60;
        const remainingSeconds = diffInSeconds % 60;
        return `${diffInHours}时${remainingMinutes}分${remainingSeconds}秒前`; // 小于一天的小时、分钟和秒
      }

      const diffInDays = Math.floor(diffInHours / 24);
      if (diffInDays < 30) {
        const remainingHours = diffInHours % 24;
        const remainingMinutes = diffInMinutes % 60;
        const remainingSeconds = diffInSeconds % 60;
        return `${diffInDays}天${remainingHours}时${remainingMinutes}分${remainingSeconds}秒前`; // 小于30天的天数、小时、分钟、秒
      }

      const diffInMonths = Math.floor(diffInDays / 30);
      if (diffInMonths < 12) {
        const remainingDays = diffInDays % 30;
        const remainingHours = diffInHours % 24;
        const remainingMinutes = diffInMinutes % 60;
        const remainingSeconds = diffInSeconds % 60;
        return `${diffInMonths}月${remainingDays}天${remainingHours}时${remainingMinutes}分${remainingSeconds}秒前`; // 小于12个月的月份、天数、小时、分钟、秒
      }

      const diffInYears = Math.floor(diffInMonths / 12);
      const remainingMonths = diffInMonths % 12;
      const remainingDays = diffInDays % 30;
      const remainingHours = diffInHours % 24;
      const remainingMinutes = diffInMinutes % 60;
      const remainingSeconds = diffInSeconds % 60;
      return `${diffInYears}年${remainingMonths}月${remainingDays}天${remainingHours}时${remainingMinutes}分${remainingSeconds}秒前`; // 超过12个月的年、月、天、小时、分钟、秒
    },
    // 判断是否展示信息流广告
    shouldShowAd(index) {
      // 每10个一条广告（14,29,44,59…）
      if ((index + 1) % 15 === 0) return true;
      // 最后一个元素也显示广告
      if (index === this.list.length - 1) return true;
      return false;
    },
    handleRssClick(title) {
      window.umami.track('点击RSS:' + title);
    },
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
    },
    //点击收藏某个卡片
    toggleStar() {
      // 更新父组件isStar数据
      this.$emit('update:isStar', !this.isStar)
      // 调用父组件更新缓存方法
      this.$emit('updateCategroiesCache')
      if (!this.isStar) {
        window.umami.track('收藏')
      } else {
        window.umami.track('取消收藏')
      }
    },
    maoYanSecondTitleInfo(item) {
      return [
        item.publishTime?.trim(),
        item.type?.trim(),
        item.desc?.trim(),
        item.author?.trim(),
      ].filter(Boolean);
    },
    onRefreshCardData() {
      this.$emit('fetchData')
    },
    formatHotScore(value) {
      // 判断是不是纯数字
      if (!/^\d+$/.test(value)) {
        return value; // 非纯数字，不处理
      }

      const num = Number(value);

      if (num >= 1e9) {
        return (num / 1e9).toFixed(2).replace(/\.00$/, '').replace(/\.0$/, '') + 'B';
      }
      if (num >= 1e6) {
        return (num / 1e6).toFixed(2).replace(/\.00$/, '').replace(/\.0$/, '') + 'M';
      }
      if (num >= 1e3) {
        const k = num / 1e3;
        return k.toFixed(k < 10 ? 2 : 1).replace(/\.00$/, '').replace(/\.0$/, '') + 'K';
      }
      return num.toString();
    }
  },
  mounted() {
    // 每秒更新一次时间
    this.intervalId = setInterval(() => {
      this.now = new Date();  // ✅ 只更新 now
    }, 1000);  // 改成 1000ms（1秒）
  },
  beforeUnmount() {
    // 清除定时器，防止内存泄漏
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  },
  props: {
    title: String,
    logo: String,
    updateTime: String,
    list: Array,
    isStar: Boolean,
    rss: String,
    loading: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    // 卡片顶部标题样式
    cardTopStyle() {
      return {
        fontSize: this.cardTopFontSize + 'rem',
      }
    },
    // 卡片顶部logo样式
    cardTopLogoStyle() {
      return {
        width: this.cardTopFontSize * 2 + 'rem',
        height: this.cardTopFontSize * 2 + 'rem'
      }
    },
    // 卡片顶部时间样式
    cardTopTimeStyle() {
      return {
        fontSize: this.cardTopFontSize - 0.125 + 'rem',
        opacity: 0.9,
      }
    },
    // 卡片热点标题样式
    cardTitleStyle() {
      return {
        fontSize: this.cardTitleFontSize + 'rem',
      }
    },
    // 卡片二级标题样式
    cardSecondTitleStyle() {
      return {
        fontSize: this.cardTitleFontSize - 0.1 + 'rem',
        opacity: 0.9,
      }
    },
    cardHeightStyle() {
      return {
        maxHeight: this.cardHeight + 'rem',
      }
    },
    cardHeight: {
      get() {
        return this.$store.state.cardHeight;
      },
      set(value) {
        this.$store.commit('setCardHeight', value);
      }
    },
    cardTitleFontSize: {
      get() {
        return this.$store.state.cardTitleFontSize;
      },
      set(value) {
        this.$store.commit('setCardTitleFontSize', value);
      }
    },
    cardTopFontSize: {
      get() {
        return this.$store.state.cardTopFontSize;
      },
      set(value) {
        this.$store.commit('setCardTopFontSize', value);
      }
    },
    cardHotScoreShow: {
      get() {
        return this.$store.state.cardHotScoreShow;
      },
      set(value) {
        this.$store.commit('setCardHotScoreShow', value);
      }
    },
    // 卡片时间是否显示
    cardTimeShow: {
      get() {
        return this.$store.state.cardTimeShow;
      },
      set(value) {
        this.$store.commit('setCardTimeShow', value);
      }
    },
    // 标题是否显示完整
    cardHotTitleFull: {
      get() {
        return this.$store.state.cardHotTitleFull;
      },
      set(value) {
        this.$store.commit('setCardHotTitleFull', value);
      }
    },
    // 卡片标题是否显示完整
    cardTitleFull: {
      get() {
        return this.$store.state.cardTitleFull;
      },
      set(value) {
        this.$store.commit('setCardTitleFull', value);
      }
    },
    cardListLimit: {
      get() {
        return this.$store.state.cardListLimit;
      },
      set(value) {
        this.$store.commit('setCardListLimit', value);
      }
    }
  }
}
</script>

<style scoped>
.sequence-number {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.4em; /* 使用 em 单位，使其随字体大小自动放大 */
  height: 1.4em;
  border-radius: 50%; /* 保证圆形 */
  font-weight: 600;
  text-align: center;
  line-height: 1; /* 避免字体撑高 */
  flex-shrink: 0;
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
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.hot-title-full {
  display: block !important;
  -webkit-line-clamp: unset !important;
  overflow: visible !important;
  -webkit-box-orient: unset !important;
  white-space: normal !important;
}

.card-title-full {
  display: block !important;
  -webkit-line-clamp: unset !important;
  overflow: visible !important;
  -webkit-box-orient: unset !important;
  white-space: normal !important;
}

/* 列表项调整 */
li {
  align-items: flex-start;
}

/* 序号对齐 */
li > span:first-child {
  margin-top: 0.125rem;
}

/* 热度值右对齐 */
.hot-score {
  min-width: 3.75rem;
  text-align: right;
  flex-shrink: 0;
}

/* 滚动条美化 */
.custom-scroll::-webkit-scrollbar {
  width: 0.375rem;
}

.custom-scroll::-webkit-scrollbar-thumb {
  background-color: rgba(100, 100, 100, 0.2);
  border-radius: 0.25rem;
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
  height: 3.125rem;
  width: 3.125rem;
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
  font-size: calc(3.75rem * 0.24);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.atom-spinner .spinner-line {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border-left-width: calc(3.75rem / 5);
  border-top-width: calc(3.75rem / 25);
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

.favorite-icon {
  cursor: pointer;
  transition: transform 0.2s, color 0.2s;
  margin: 0 0.4rem;
  font-size: 1.1rem;
}

.favorite-icon:hover {
  transform: scale(1.15);
}
</style>
