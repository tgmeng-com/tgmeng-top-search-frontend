<template>
  <div class="w-full h-10 flex items-center overflow-hidden bg-transparent">
    <div
        class="carousel-mask relative w-full h-full flex items-center"
        :style="{
        maskImage: 'linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)',
        webkitMaskImage: 'linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)'
      }"
    >
      <div
          class="flex items-center whitespace-nowrap animate-scroll"
          :style="trackStyle"
          @mouseenter="isPaused = true"
          @mouseleave="isPaused = false"
      >
        <div
            v-for="(item, index) in doubleDonations"
            :key="index"
            class="donation-capsule rounded-xl ml-8 px-2 py-1"
        >
          <router-link to="/donation" class="donation-link">
            <img :src="item.avatar" class="w-5 h-5 rounded-full object-cover shadow-sm"/>

            <div class="donation-info">
              <span class="text-yellow-600 dark:text-yellow-400 font-medium">{{ item.name }}</span>
              <span class="dark:text-dark-text text-xs opacity-80">投喂了</span>
              <span class="text-yellow-600 dark:text-yellow-400 font-bold tabular-nums opacity-80">¥{{ item.amount }}</span>
              <span class="dark:text-dark-text">
                {{ item.message === '无' ? '科技不该冰冷，人性不该傲慢' : item.message }}
              </span>
              <span class="dark:text-dark-text text-xs font-mono opacity-80">
                {{ item.time }}
              </span>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DonationCarousel',
  data() {
    return {
      isPaused: false,
      donations: this.$store.state.donations
    }
  },
  computed: {
    doubleDonations() {
      return [...this.donations, ...this.donations];
    },
    trackStyle() {
      return {
        animationDuration: (this.donations.length * 15) + 's',
        animationPlayState: this.isPaused ? 'paused' : 'running'
      };
    }
  },
  methods: {}
}
</script>

<style scoped>
.donation-capsule {
  display: inline-flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(4px);
  transition: all 0.3s ease;
  white-space: nowrap;
  flex-shrink: 0;
}

.donation-capsule:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.2);
}

/* 关键：让 router-link 变成 inline-flex */
.donation-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  color: inherit;
}

.donation-info {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.875rem;
}

.animate-scroll {
  animation: scroll-left linear infinite;
}

@keyframes scroll-left {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}
</style>