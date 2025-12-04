<!-- 基本设置 -->
<template>
  <div class="min-h-screen pb-16 bg-transparent">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- HERO -->
      <header class="relative text-center">
        <h1 class="main-title">
          个性化你的热榜体验
        </h1>
        <div class="main-desc">
          <p class="mt-1">我们提供灵活的功能，帮助你管理平台展示、主题选择以及样式个性化，让每次访问都符合你的喜好</p>
        </div>
      </header>

      <!--  平台展示与隐藏    -->
      <section class="mt-16">
        <h2 class="text-left text-xl font-bold text-gray-900 dark:text-gray-100">平台展示与隐藏</h2>
        <el-tabs v-model="activeName" stretch=false class="mt-4 card-bg">
          <el-tab-pane
              v-for="cat in categroies"
              :key="cat.name"
              :name="cat.name"
              :label="cat.name">
            <div class="flex flex-wrap">
              <div style="width: 15rem; display: flex; align-items: center; margin-bottom: 0.5rem;"
                   v-for="p in cat.subCategories"
                   :key="p.title"
              >
                <el-switch
                    v-model="p.isShow"
                    active-color="#13ce66"
                    inactive-color="#C0CCDA"
                    @change="changeCategroyStatus">
                </el-switch>
                <img :src="p.logo" style="width: 1.25rem; margin-left: 0.5rem; margin-right: 0.5rem;" :alt="p.title"
                     class="rounded-s">
                <span class="card-desc">{{ p.title }}</span>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </section>

      <!--  主题    -->
      <section class="mt-16">
        <h2 class="text-left text-xl font-bold text-gray-900 dark:text-gray-100">主题</h2>
        <div class="mt-4 text-left card-bg">
          <span class="card-title">暗色</span>&nbsp;&nbsp;
          <el-switch
              v-model="isDark"
              active-color="#13ce66"
              inactive-color="#C0CCDA"
              @change="changeTheme">
          </el-switch>
        </div>
      </section>

      <!--  广告    -->
      <section class="mt-16">
        <h2 class="text-left text-xl font-bold text-gray-900 dark:text-gray-100">广告</h2><br/>
        <p class="text-left text-gray-900 dark:text-gray-100">大家可以用各种去广告插件屏蔽站内的谷歌广告，当然也可以在这里一键关闭站内所有谷歌广告</p>
        <p class="text-left text-gray-900 dark:text-gray-100">如果有能力的朋友，还是希望能够随便点点广告，你点一次，我可能就有0.00001￥，哈哈哈</p>
        <div class="mt-4 text-left card-bg">
          <span class="card-title">广告展示</span>&nbsp;&nbsp;
          <el-switch
              :model-value="adsEnabled"
              active-color="#13ce66"
              inactive-color="#C0CCDA"
              @update:model-value="changeAdsStatus">
          </el-switch>
        </div>
      </section>

      <!-- 密码确认对话框 -->
      <PasswordConfirm
          v-model:visible="showPasswordDialog"
          title="安全验证"
          description="关闭广告的密码在交流群的群公告里<br> PS1对于的值，可以自行直接查看"
          :on-confirm="handlePasswordConfirm"
      />

      <!--  样式自定义    -->
      <section class="mt-16">
        <h2 class="text-left text-xl font-bold text-gray-900 dark:text-gray-100">样式自定义</h2>
        <div class="mt-4 text-left card-bg">
          <p class="card-desc">我们支持超级灵活的样式自定义方式</p>
          <p class="card-desc">关于所有样式的自定义，可以在主页调整，因为那样可以实时预览到效果</p>
        </div>
      </section>

    </div>
  </div>
</template>
<script>
import {clearAllLocalStorage, getLocalStorage, LOCAL_STORAGE_KEYS, setLocalStorage} from "@/utils/localStorageUtils";
import PasswordConfirm from "@/components/UI/PasswordConfirm.vue";
import {topSearchForAdsPassword} from "@/api/api";

export default {
  data() {
    return {
      activeName: '新闻',
      categroies: this.$store.state.categroies,
      isDark: true,
      showPasswordDialog: false,
    };
  },
  components: {
    PasswordConfirm
  },
  methods: {
    notificationMessage() {
      this.$notify({
        title: '支持自定义拖拽排序啦！',
        // message: '‼️目前已知问题：<br>1:优酷接口返回的是海外用户的排行榜<br>其余数据全都正常，请尽情享用',
        message: '拖拽卡片即可改变位置，数据保存在本地缓存中，任意时间进来网站都能保持您的设置<br/>如果想要恢复默认设置，点击右上角设置中的重置即可',
        duration: 10000,
        type: 'success',
        position: 'top-left',
        dangerouslyUseHTMLString: true
      });
    },
    changeCategroyStatus() {
      const clonedForStorage = JSON.parse(JSON.stringify(this.categroies));
      //只保存title和isShow的数据，其余数据全部设置为null，减少缓存
      clonedForStorage.forEach(categroy => {
        categroy.subCategories.forEach(subCategroy => {
          subCategroy.data = null
          subCategroy.api = null
          subCategroy.logo = null
          subCategroy.updateTime = ''
          subCategroy.loading = true
        })
      });
      setLocalStorage(LOCAL_STORAGE_KEYS.CATEGORIES, clonedForStorage);
    },
    changeTheme() {
      document.documentElement.classList.toggle('dark', this.isDark)
      localStorage.setItem('theme', this.isDark ? 'dark' : 'light')
      window.umami.track('明暗主题切换');
    },
    changeAdsStatus() {
      this.showPasswordDialog = true;
    },
    async handlePasswordConfirm(password) {
      const res = await topSearchForAdsPassword(password);
      const adsPasswordReal = res?.data?.data || false;
      if (adsPasswordReal) {
        this.adsEnabled = !this.adsEnabled;
        setLocalStorage(LOCAL_STORAGE_KEYS.ADS_ENABLED, this.adsEnabled);
        window.umami.track('成功屏蔽网站广告');
        this.$message.success('操作成功');
      } else {
        throw new Error('密码错误');
      }
    },
    cleanLocalStorage() {
      this.$confirm('此操作将清除所有历史个人设置，包括排序、收藏、隐藏/展示、自定义样式等等所有个人设置', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        clearAllLocalStorage(LOCAL_STORAGE_KEYS.CATEGORIES);
        this.$message({
          type: 'success',
          message: '已重置，请刷新页面获取全部数据!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });
    }
  },
  mounted() {
    // 初始化主题
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      this.isDark = savedTheme === 'dark'
    } else {
      // 没有保存时，默认暗色（无需检查系统偏好）
      this.isDark = true
    }
    document.documentElement.classList.toggle('dark', this.isDark)

    const cacheAdsEnabled = getLocalStorage(LOCAL_STORAGE_KEYS.ADS_ENABLED)
    this.adsEnabled = cacheAdsEnabled ?? this.adsEnabled
  },
  computed: {
    adsEnabled: {
      get() {
        return this.$store.state.adsEnabled;
      },
      set(value) {
        this.$store.commit('setAdsEnabled', value);
      }
    },
  },
};
</script>

<style>
.main-title {
  @apply mt-6 text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-gray-900 dark:text-gray-100
}

.main-desc {
  @apply mt-6 max-w-3xl mx-auto text-gray-600 dark:text-gray-300
}

.card-bg {
  @apply p-2 rounded-xl bg-gradient-to-r from-indigo-600/10 to-pink-600/10 border border-transparent
  dark:border-transparent shadow-sm hover:shadow-lg transition transform hover:-translate-y-1;
}

.card-title {
  @apply font-semibold text-gray-900 dark:text-gray-100
}

.card-desc {
  @apply text-sm text-gray-500 dark:text-gray-300 mt-1
}

</style>