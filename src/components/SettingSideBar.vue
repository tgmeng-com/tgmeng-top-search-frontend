<template>
  <div class="container mx-auto px-4  flex justify-end items-center">
    <div class="ml-4">
      <ThemeToggle />
    </div>


    <div class="ml-4">
      <button
          @click="drawerClick"
          class="setting-btn"
          aria-label="设置"
      >
        <div style="width: 33px">
          <img src="@/assets/image/setting.png">
        </div>
      </button>
    </div>


    <el-drawer v-model="drawer" title="I am the title" :with-header="false" :direction="'ttb'">


      <el-button type="text" @click="cleanLocalStorage">重置设置</el-button>

      <el-tabs v-model="activeName" stretch=true>
        <el-tab-pane
            v-for="cat in categroies"
            :key="cat.name"
            :name="cat.name"
            :label="cat.name">
          <div style="width: 200px;float: left;text-align: left"
               v-for="p in cat.subCategories"
               :key="p.title"
          >
            <el-switch
                v-model="p.isShow"
                active-color="#13ce66"
                inactive-color="#C0CCDA"
                @change="changeCategroyStatus">
            </el-switch>
            {{ p.title }}
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-drawer>
  </div>
</template>

<script>

import {clearCategroiesFromLocalStorage, updateCategroiesInLocalStorage} from "@/utils/localStorageUtils";
import ThemeToggle from "@/components/Theme/ThemeToggle.vue";
// 默认暗色模式

export default {
  components: {ThemeToggle},
  mounted() {
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

<style>
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

</style>