<template>
  <div class="sticky top-0 z-50 bg-light-bg/90 dark:bg-dark-bg/90 backdrop-blur-md shadow-sm transition-all duration-300">

  <div style="min-height: 80px;margin-top: 30px"  class="container mx-auto px-4 flex items-center ">

    <!-- 左侧 Logo -->
    <div class="ml-4" style="width: 50px;">
      <a href="https://tgmeng.com" target="_blank">
        <img
            src="@/assets/image/logo.png"
            alt="网站 Logo"
            class="logo"
        >
      </a>
    </div>

    <!-- 右侧元素容器 -->
    <div class="flex-1 flex justify-end items-center space-x-4">
      <!-- 交流群 -->
      <div style="width: 40px;">
        <a href="https://wechat.tgmeng.com" target="_blank">
          <el-tooltip
              placement="bottom"
              effect="light"
          >
            <template #content>
              <div style="text-align: center"><span style="color: #212830">进交流群</span></div>
              <img src="@/assets/image/wechat.png" style="width: 100px;"/>
            </template>
            <div style="width: 33px">
              <img src="../assets/image/wechat-logo.png">
            </div>
          </el-tooltip>
        </a>
      </div>

      <!-- 论坛 -->
      <div style="width: 40px;">
        <a href="https://bbs.tgmeng.com" target="_blank">
          <el-tooltip
              placement="bottom"
              effect="light"
          >
            <template #content>
              <div style="text-align: center"><span style="color: #212830">论坛</span></div>
            </template>
            <div style="width: 26px">
              <img src="../assets/image/bbs.png">
            </div>
          </el-tooltip>
        </a>
      </div>

      <!-- 明暗主题 -->
      <div>
        <ThemeToggle/>
      </div>

      <!-- 设置 -->
      <div>
        <el-tooltip
            placement="bottom"
            effect="light"
        >
          <template #content>
            <div style="text-align: center"><span style="color: #212830">设置</span></div>
          </template>
          <button
              @click="drawerClick"
              class="setting-btn"
              aria-label="设置"
          >
            <div style="width: 33px">
              <img src="@/assets/image/setting.png">
            </div>
          </button>
        </el-tooltip>
      </div>
    </div>


  </div>
  </div>
  <el-drawer v-model="drawer" :with-header="false" :direction="'ttb'">

    <div style="margin-bottom: 20px">
      <el-button class="resetButton" type="danger" @click="cleanLocalStorage">重置设置</el-button>
    </div>

    <div>
      <el-tabs v-model="activeName" stretch=false>
        <el-tab-pane
            v-for="cat in categroies"
            :key="cat.name"
            :name="cat.name"
            :label="cat.name">
          <!-- 使用 flex 布局 -->
          <div class="flex flex-wrap">
            <div style="width: 240px; display: flex; align-items: center; margin-bottom: 8px;"
                 v-for="p in cat.subCategories"
                 :key="p.title"
            >
              <el-switch
                  v-model="p.isShow"
                  active-color="#13ce66"
                  inactive-color="#C0CCDA"
                  @change="changeCategroyStatus">
              </el-switch>
              <img :src="p.logo" style="width: 20px; margin-left: 8px; margin-right: 8px;">
              <span>{{ p.title }}</span>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </el-drawer>
</template>

<script>

import {clearCategroiesFromLocalStorage, updateCategroiesInLocalStorage} from "@/utils/localStorageUtils";
import ThemeToggle from "@/components/Theme/ThemeToggle.vue";
// 默认暗色模式

export default {
  components: {ThemeToggle},
  mounted() {
    // ✅✅✅✅✅✅ 顶部通知
    // this.notificationMessage()

    const savedTheme = localStorage.getItem('theme')
    // 优先使用用户保存的主题
    if (savedTheme) {
      this.isDark = savedTheme === 'dark'
    } else {
      // 没有保存时，默认暗色（无需检查系统偏好）
      this.isDark = true
    }
  },
  data() {
    return {
      isDark: true,
      drawer: false,
      activeName: '全部',
      categroies: this.$store.state.categroies
    };
  },
  computed: {},
  methods: {
    notificationMessage() {
      this.$notify({
        title: '佬们好！',
        message: '‼️目前两点已知问题：<br>1:优酷接口返回的是海外用户的排行榜<br>2:优酷接口不稳定<br>其余数据全都正常，请尽情享用',
        duration: 10000,
        type: 'success',
        position: 'top-left',
        dangerouslyUseHTMLString: true
      });
    },
    drawerClick() {
      this.drawer = true
    },
    changeCategroyStatus() {
      const clonedForStorage = JSON.parse(JSON.stringify(this.categroies));
      //只保存isShow的数据
      clonedForStorage.forEach(categroy => {
        categroy.subCategories.forEach(subCategroy => {
          subCategroy.data = null
          subCategroy.api = null
          subCategroy.logo = null
          subCategroy.updateTime = ''
          subCategroy.loading = false
          subCategroy.title = null
        })
      });
      updateCategroiesInLocalStorage(this.categroies);
    },
    cleanLocalStorage() {
      this.$confirm('此操作将清除历史勾选,展示全部内容', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        clearCategroiesFromLocalStorage();
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
  }
};
</script>

<style scoped>
/* 保持原有样式不变 */
.setting-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 8px;
  transition: transform 0.2s ease;
}

.icon {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.sun-icon {
  opacity: 0;
  transform: scale(0.8);
}

.moon-icon {
  opacity: 1;
  transform: scale(1);
}

.dark .sun-icon {
  opacity: 1;
  transform: scale(1);
}

.dark .moon-icon {
  opacity: 0;
  transform: scale(0.8);
}

.theme-toggle-btn:hover .icon {
  transform: scale(1.1);
}

.theme-toggle-btn:active .icon {
  transform: scale(0.95);
}

.resetButton {
  background-color: #f56c6c !important;
}

:deep(.el-button+.el-button) {
  background-color: #409eff !important;
}

:deep(.el-tabs) {
  background-color: #c9c9c9;
  padding: 10px;
  border-radius: 30px;
}

:deep(.el-tabs__item) {
  font-weight: 700 !important;
  color: #004c4d !important;
  font-size: 18px !important;
}

</style>