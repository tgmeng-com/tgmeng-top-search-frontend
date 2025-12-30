<template>
  <div>
    <teleport to="body">
      <transition name="modal">
        <div v-if="subscriptionSettingShow" class="config-backdrop" @click="close">
          <div class="config-panel" @click.stop>
            <!-- 动态背景 -->
            <div class="bg-gradient"></div>
            <div class="bg-mesh"></div>

            <!-- 固定头部 -->
            <header class="panel-header">
              <div class="header-content">
                <div class="title-group">
                  <h1>推送订阅配置</h1>
                  <p>关键词监控 · 多平台推送</p>
                </div>
                <button class="close-btn" @click="close">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M15 5L5 15M5 5l10 10"/>
                  </svg>
                </button>
              </div>
            </header>

            <!-- 订阅设置 -->
            <main class="scrollable-content">
              <!-- 全局订阅关键词模块（带边框） -->
              <section class="section-box">
                <h3>
                  全局订阅关键词
                  <span class="counter">{{ form.keywords.length }}/{{ publicKeyWordCountLimit }}</span>
                  <div class="global-tip-icon" data-tip="全局关键词会应用到所有平台推送。&#10;&#10;如果某个平台设置了独立关键词，则会在其基础上追加这个全局关键词列表。">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5">
                      <circle cx="8" cy="8" r="6"/>
                      <path d="M8 7v4M8 5h.01"/>
                    </svg>
                  </div>
                </h3>

                <div class="keyword-tags">
                  <div v-for="(tag, i) in form.keywords" :key="i" class="keyword-tag">
                    {{ tag }}
                    <div @click="form.keywords.splice(i, 1)">
                      <svg width="12" height="12" viewBox="0 0 12 12" stroke="currentColor">
                        <path d="M9 3L3 9M3 3l6 6" stroke-width="2"/>
                      </svg>
                    </div>
                  </div>

                  <input
                      v-if="addingKeyword"
                      ref="keywordInput"
                      v-model="newKeyword"
                      class="keyword-input"
                      placeholder="回车确认"
                      @keyup.enter="addKeyword"
                      @blur="addKeyword"
                  />

                  <div
                      v-else
                      class="add-tag-btn"
                      :class="{ disabled: form.keywords.length >= publicKeyWordCountLimit }"
                      @click="form.keywords.length < publicKeyWordCountLimit && startAddKeyword()"
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" stroke="none">
                      <path d="M7 2v10M2 7h10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                    </svg>
                  </div>
                </div>
              </section>

              <!-- 全局平台分类模块（带边框） -->
              <section class="section-box">
                <h3>
                  全局平台分类
                  <span class="counter">{{ globalSelectedPlatforms.length }}/{{ totalPlatformsCount }}</span>
                  <div class="global-tip-icon" data-tip="全局平台分类会应用到所有推送平台。&#10;&#10;如果某个平台设置了独立分类，则该平台只会推送选中的分类内容（独立分类优先）。&#10;&#10;不选则推送所有来源。">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5">
                      <circle cx="8" cy="8" r="6"/>
                      <path d="M8 7v4M8 5h.01"/>
                    </svg>
                  </div>
                </h3>

                <div class="category-cascader-wrapper">
                  <div class="cascader-trigger modern-input" @click="toggleGlobalCascader">
                    <span class="trigger-text">{{ globalSelectedPlatforms.length > 0 ? `已选 ${globalSelectedPlatforms.length} 个平台` : '选择平台分类（支持多选）' }}</span>
                    <svg class="arrow" :class="{ rotate: globalCascaderOpen }" width="12" height="12" viewBox="0 0 12 12">
                      <path d="M2 4l4 4 4-4" stroke="currentColor" stroke-width="2" fill="none"/>
                    </svg>
                  </div>

                  <div class="cascader-dropdown cascader-tabs" v-show="globalCascaderOpen">
                    <div class="cascader-tabs-header">
                      <div
                          v-for="root in platformCategories"
                          :key="root.platformCategoryRoot"
                          class="tab-item"
                          :class="{ active: globalActiveTab === root.platformCategoryRoot }"
                          @click="globalActiveTab = root.platformCategoryRoot"
                      >
                        {{ root.platformCategoryRoot }}
                      </div>
                    </div>
                    <div class="cascader-tabs-content">
                      <div v-for="root in platformCategories" :key="root.platformCategoryRoot" v-show="globalActiveTab === root.platformCategoryRoot">
                        <div class="cascader-root-header" :class="{ allSelected: isRootAllSelected(root) }">
                          <label class="checkbox-label">
                            <input type="checkbox" :checked="isRootAllSelected(root)" @change="toggleRootAll(root, $event.target.checked)" />
                            <span>全选 {{ root.platformCategoryRoot }}</span>
                          </label>
                        </div>
                        <div class="cascader-items dense">
                          <label v-for="item in root.platforms" :key="item.platformName" class="checkbox-label item">
                            <div class="item-bg">
                              <input type="checkbox"
                                     :value="item.platformName"
                                     v-model="globalSelectedPlatforms" />
                              <span>{{ item.platformName }}</span>
                            </div>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section class="platforms-grid">
                <!-- 已添加的平台卡片 -->
                <div
                    v-for="(plat, index) in form.platforms"
                    :key="plat.id"
                    class="platform-card"
                    :class="{ active: activePlatform === plat.id }"
                    @click="activePlatform = plat.id"
                >
                  <div class="card-glow" :style="{ background: plat.glow }"></div>

                  <!-- 删除按钮 -->
                  <button
                      class="delete-platform-btn"
                      @click.stop="removePlatform(index)"
                      title="删除此平台"
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" stroke="currentColor" stroke-width="2">
                      <path d="M10 4L4 10M4 4l6 6"/>
                    </svg>
                  </button>

                  <div class="card-header">
                    <div class="icon">
                      <img :src="plat.icon" class="icon-img"/>
                    </div>
                    <h4>{{ plat.name }}</h4>
                  </div>

                  <div class="inputs">
                    <!-- Webhook 输入框 -->
                    <div class="input-with-tip">
                      <input v-model="plat.webhook" :placeholder="plat.webhookPlaceholder"
                             class="modern-input secret full-width"/>
                      <div class="tip-icon" :data-tip="plat.webhookTip">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5">
                          <circle cx="8" cy="8" r="6"/>
                          <path d="M8 7v4M8 5h.01"/>
                        </svg>
                      </div>
                    </div>

                    <!-- Secret 输入框（其他平台） -->
                    <div v-if="plat.type!=='QIYEWEIXIN'" class="input-with-tip">
                      <input v-model="plat.secret" :placeholder="plat.secretPlaceholder"
                             class="modern-input secret full-width"/>
                      <div class="tip-icon" :data-tip="plat.secretTip">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5">
                          <circle cx="8" cy="8" r="6"/>
                          <path d="M8 7v4M8 5h.01"/>
                        </svg>
                      </div>
                    </div>

                    <!-- 下拉选择框（企业微信） -->
                    <div v-else class="input-with-tip">
                      <div class="custom-select" :class="{ active: plat.selectOpen }">
                        <div class="select-trigger modern-input secret full-width" @click.stop="plat.selectOpen = !plat.selectOpen">
                          <span>{{ plat.secret || '请选择推送格式' }}</span>
                          <svg class="arrow" :class="{ rotate: plat.selectOpen }" width="12" height="12"
                               viewBox="0 0 12 12">
                            <path d="M2 4l4 4 4-4" stroke="currentColor" stroke-width="2" fill="none"/>
                          </svg>
                        </div>
                        <div class="select-dropdown" v-show="plat.selectOpen">
                          <div class="select-option"
                               :class="{ selected: plat.secret === 'markdown' }"
                               @click.stop="plat.secret = 'markdown'; plat.selectOpen = false">
                            markdown
                          </div>
                          <div class="select-option"
                               :class="{ selected: plat.secret === 'text' }"
                               @click.stop="plat.secret = 'text'; plat.selectOpen = false">
                            text
                          </div>
                        </div>
                      </div>
                      <div class="tip-icon" :data-tip="plat.secretTip">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5">
                          <circle cx="8" cy="8" r="6"/>
                          <path d="M8 7v4M8 5h.01"/>
                        </svg>
                      </div>
                    </div>

                    <!-- 平台独立关键词 -->
                    <div class="input-with-tip">
                      <div class="platform-keywords">
                        <div class="platform-keywords-header">
                          <span class="keywords-label">独立关键词(可选) ({{ plat.platformKeywords?.length || 0 }}/{{ privateKeyWordCountLimit }})</span>
                        </div>

                        <div class="platform-keyword-tags">
                          <div v-for="(tag, i) in plat.platformKeywords" :key="i" class="platform-keyword-tag">
                            {{ tag }}
                            <div class="tag-close" @click.stop="removePlatformKeyword(plat, i)">
                              <svg width="10" height="10" viewBox="0 0 10 10" stroke="currentColor">
                                <path d="M8 2L2 8M2 2l6 6" stroke-width="2"/>
                              </svg>
                            </div>
                          </div>

                          <input
                              v-if="plat.addingKeyword"
                              :ref="`platformKeywordInput_${plat.id}`"
                              v-model="plat.newKeyword"
                              class="platform-keyword-input"
                              placeholder="回车确认"
                              @click.stop
                              @keyup.enter="addPlatformKeyword(plat)"
                              @blur="addPlatformKeyword(plat)"
                          />

                          <div
                              v-else
                              class="add-platform-tag-btn"
                              :class="{ disabled: (plat.platformKeywords?.length || 0) >= privateKeyWordCountLimit }"
                              @click.stop="startAddPlatformKeyword(plat)"
                          >
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" stroke="none">
                              <path d="M6 1.5v9M1.5 6h9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                            </svg>
                          </div>
                        </div>
                      </div>

                      <div class="tip-icon" data-tip="此平台的独立关键词，仅在此平台推送。&#10;&#10;如果设置了独立关键词，则此平台关键词为：独立关键词列表+全局关键词列表。&#10;&#10;如果不设置独立关键词，则此平台关键词为：全局关键词列表。">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5">
                          <circle cx="8" cy="8" r="6"/>
                          <path d="M8 7v4M8 5h.01"/>
                        </svg>
                      </div>
                    </div>

                    <!-- 平台独立分类 -->
                    <div class="input-with-tip">
                      <div class="platform-keywords">
                        <div class="platform-keywords-header">
                          <span class="keywords-label">独立平台分类(可选) ({{ (plat.selectedPlatforms?.length || 0) }}/{{ totalPlatformsCount }})</span>
                        </div>

                        <div class="category-cascader-wrapper platform-cascader">
                          <div class="cascader-trigger modern-input" @click.stop="togglePlatformCascader(plat)">
                            <span class="trigger-text">{{ (plat.selectedPlatforms?.length || 0) > 0 ? `已选 ${plat.selectedPlatforms.length} 个平台` : '选择平台分类（支持多选）' }}</span>
                            <svg class="arrow" :class="{ rotate: plat.cascaderOpen }" width="12" height="12" viewBox="0 0 12 12">
                              <path d="M2 4l4 4 4-4" stroke="currentColor" stroke-width="2" fill="none"/>
                            </svg>
                          </div>

                          <div class="cascader-dropdown cascader-tabs high-zindex" v-show="plat.cascaderOpen">
                            <div class="cascader-tabs-header">
                              <div
                                  v-for="root in platformCategories"
                                  :key="root.platformCategoryRoot"
                                  class="tab-item small"
                                  :class="{ active: plat.activeTab === root.platformCategoryRoot }"
                                  @click.stop="plat.activeTab = root.platformCategoryRoot"
                              >
                                {{ root.platformCategoryRoot }}
                              </div>
                            </div>
                            <div class="cascader-tabs-content">
                              <div v-for="root in platformCategories" :key="root.platformCategoryRoot" v-show="plat.activeTab === root.platformCategoryRoot">
                                <div class="cascader-root-header" :class="{ allSelected: isPlatformRootAllSelected(plat, root) }">
                                  <label class="checkbox-label">
                                    <input type="checkbox" :checked="isPlatformRootAllSelected(plat, root)" @change="togglePlatformRootAll(plat, root, $event.target.checked)" />
                                    <span>全选 {{ root.platformCategoryRoot }}</span>
                                  </label>
                                </div>
                                <div class="cascader-items dense small">
                                  <label v-for="item in root.platforms" :key="item.platformName" class="checkbox-label item">
                                    <div class="item-bg">
                                      <input type="checkbox"
                                             :value="item.platformName"
                                             v-model="plat.selectedPlatforms" />
                                      <span>{{ item.platformName }}</span>
                                    </div>
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="tip-icon" data-tip="选择此推送平台的来源分类。&#10;&#10;选中后，该平台只会推送来自这些分类的文章。&#10;&#10;不选则推送所有来源（受全局分类影响）。">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5">
                          <circle cx="8" cy="8" r="6"/>
                          <path d="M8 7v4M8 5h.01"/>
                        </svg>
                      </div>
                    </div>

                    <!-- 备注输入框 -->
                    <div class="input-with-tip">
                      <input
                          v-model="plat.remark"
                          placeholder="备注（可选，用于区分多个同类平台）"
                          class="modern-input remark-input full-width"
                      />
                      <div class="tip-icon" data-tip="给这个平台添加备注，方便区分多个同类平台。&#10;例如：公司群、客户群、测试群等">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5">
                          <circle cx="8" cy="8" r="6"/>
                          <path d="M8 7v4M8 5h.01"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- 添加平台按钮 -->
                <div
                    v-if="form.platforms.length < platformCountLimit"
                    class="platform-card add-platform-card"
                    @click="showAddPlatformModal = true"
                >
                  <div class="add-platform-content">
                    <div class="add-icon">
                      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2.5">
                        <path d="M16 8v16M8 16h16"/>
                      </svg>
                    </div>
                    <h4>添加平台</h4>
                    <p>{{ form.platforms.length }}/{{ platformCountLimit }}</p>
                  </div>
                </div>
              </section>
            </main>

            <footer class="panel-footer">
              <div class="shortcuts">
                <kbd>ESC</kbd> 关闭 · <kbd>Enter</kbd> 保存
              </div>
              <button class="confirm-btn" @click="saveConfig">
                保存配置
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M3 8h10M9 4l4 4-4 4"/>
                </svg>
              </button>
            </footer>
          </div>

          <!-- 添加平台选择弹窗 -->
          <transition name="modal-inner">
            <div v-if="showAddPlatformModal" class="add-platform-modal" @click="showAddPlatformModal = false">
              <div class="add-platform-panel" @click.stop>
                <h3>选择要添加的平台</h3>
                <div class="platform-options">
                  <div
                      v-for="template in platformTemplates"
                      :key="template.type"
                      class="platform-option"
                      @click="addPlatform(template)"
                  >
                    <img :src="template.icon" class="option-icon"/>
                    <span>{{ template.name }}</span>
                  </div>
                </div>
                <button class="cancel-btn" @click="showAddPlatformModal = false">取消</button>
              </div>
            </div>
          </transition>
        </div>
      </transition>
    </teleport>
  </div>
</template>

<script>
import {getPlatformCategories, getSubscriptionConfig, updateSubscriptionConfig} from "@/api/api";
import {getLocalStorage, LOCAL_STORAGE_KEYS} from "@/utils/localStorageUtils";

export default {
  name: 'SubscriptionConfigModal',
  data() {
    return {
      activePlatform: '',
      addingKeyword: false,
      newKeyword: '',
      showAddPlatformModal: false,
      platformIdCounter: 0,
      globalCascaderOpen: false,
      globalActiveTab: '新闻',
      globalSelectedPlatforms: [],

      platformTemplates: [
        {
          type: 'DINGDING',
          name: '钉钉',
          icon: require('@/assets/image/dingding.png'),
          glow: 'radial-gradient(circle at 50% 0%,rgba(0,162,255,.18),transparent 60%)',
          webhookPlaceholder: 'Webhook URL(必填)',
          webhookTip:'钉钉机器人的WebHook的URL地址',
          secretPlaceholder: 'Secret(必填)',
          secretTip:'钉钉机器人设置中的加签',
        },
        {
          type: 'FEISHU',
          name: '飞书',
          icon: require('@/assets/image/feishu.png'),
          glow: 'radial-gradient(circle at 50% 0%,rgba(255,89,89,.18),transparent 60%)',
          webhookPlaceholder: 'Webhook URL(必填)',
          webhookTip:'飞书机器人的WebHook的URL地址',
          secretPlaceholder: 'Secret(必填)',
          secretTip:'飞书机器人设置中的签名校验',
        },
        {
          type: 'QIYEWEIXIN',
          name: '企业微信',
          icon: require('@/assets/image/qiyeweixin.png'),
          glow: 'radial-gradient(circle at 50% 0%,rgba(42,171,238,.18),transparent 60%)',
          webhookPlaceholder: 'Webhook URL(必填)',
          webhookTip:'企业微信机器人的WebHook的URL地址',
          secretPlaceholder: '推送格式',
          secretTip:'markdown或者text\n\nmarkdown格式：只能在企业微信中看，微信中会提示:暂不支持此消息类型，点击前往企业微信查看\n\ntext格式：微信和企业微信中都能看，标题的超链接会直接显示在标题后面',
        },
        {
          type: 'TELEGRAM',
          name: 'Telegram',
          icon: require('@/assets/image/telegram.png'),
          glow: 'radial-gradient(circle at 50% 0%,rgba(42,171,238,.18),transparent 60%)',
          webhookPlaceholder: 'BOT_TOKEN(必填)',
          webhookTip:'1.打开 Telegram 搜索 BotFather\n2.输入/start\n3.输入 /newbot\n4.给 bot 起名（显示名）\n5.再起一个用户名（必须以 bot 结尾）\n6.BotFather 会返回：\nUse this token to access the HTTP API:\n1234567890:AAE1BlaBlaBla....\n7.这个就是 bot_token，相当于飞书/钉钉的 webhook',
          secretPlaceholder: 'chat_id(必填)',
          secretTip:'1.拉机器人进群\n2.随便在群里发一句话3.然后浏览器访问 https://api.telegram.org/bot<BOT_TOKEN>/getUpdates,例如\nhttps://api.telegram.org/bot12345678:AbCdEf123/getUpdates\n4.返回结果就能看到chat_id,这个id通常是负数,例如-123456789\n' +
              '{\n' +
              '\u00A0\u00A0"ok": true,\n' +
              '\u00A0\u00A0"result": [\n' +
              '\u00A0\u00A0\u00A0\u00A0{\n' +
              '\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"message": {\n' +
              '\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"chat": {\n' +
              '\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"id": -123456789,\n' +
              '\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"type": "private"\n' +
              '\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0}\n' +
              '\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0}\n' +
              '\u00A0\u00A0\u00A0\u00A0}\n' +
              '\u00A0\u00A0]\n' +
              '}',
        },
        {
          type: 'NTFY',
          name: 'NTFY',
          icon: require('@/assets/image/ntfy.png'),
          glow: 'radial-gradient(circle at 50% 0%,rgba(42,171,238,.18),transparent 60%)',
          webhookPlaceholder: 'Webhook URL(必填)',
          webhookTip:'你的ntfy的服务器地址加上tipic名，\n例如：https://ntfy.sh/Xiz2J23124324',
          secretPlaceholder: '不填',
          secretTip:'不需要填这个',
        },
        {
          type: 'GOTIFY',
          name: 'GOTIFY',
          icon: require('@/assets/image/gotify.png'),
          glow: 'radial-gradient(circle at 50% 0%,rgba(42,171,238,.18),transparent 60%)',
          webhookPlaceholder: 'Webhook URL(必填)',
          webhookTip:'你的gotify的服务器地址加上token，\n\n例如：https://<你的服务器地址>/message?token=<你的token>，\n\n比如：https://gotify.fuck.you/message?token=Awsdfs34235Isdf',
          secretPlaceholder: '不填',
          secretTip:'不需要填这个',
        },
        {
          type: 'WANGYIPOPO',
          name: '网易泡泡（参考钉钉实现）',
          icon: require('@/assets/image/wangyipopo.png'),
          glow: 'radial-gradient(circle at 50% 0%,rgba(42,171,238,.18),transparent 60%)',
          webhookPlaceholder: 'Webhook URL(必填)',
          webhookTip:'网易泡泡机器人的WebHook的URL地址',
          secretPlaceholder: 'Secret(必填)',
          secretTip:'网易泡泡机器人设置中的加签',
        }
      ],
      licenseCode: '',
      form: {
        keywords: [],
        platforms: []
      },
      platformCountLimit: 10,
      publicKeyWordCountLimit: 10,
      privateKeyWordCountLimit: 10,

      platformCategories: [
        {
          "platformCategoryRoot": "新闻",
          "platforms": [
            {"platformCategory": "新闻", "platformName": "星岛环球"},
            {"platformCategory": "新闻", "platformName": "ZAKER"},
            {"platformCategory": "新闻", "platformName": "腾讯新闻"},
            {"platformCategory": "新闻", "platformName": "网易新闻"},
            {"platformCategory": "新闻", "platformName": "中国新闻网"},
            {"platformCategory": "新闻", "platformName": "BBC"},
            {"platformCategory": "新闻", "platformName": "新京报"},
            {"platformCategory": "新闻", "platformName": "百度国际"},
            {"platformCategory": "新闻", "platformName": "澎湃新闻"},
            {"platformCategory": "新闻", "platformName": "法广"},
            {"platformCategory": "新闻", "platformName": "百度新闻"},
            {"platformCategory": "新闻", "platformName": "华尔街日报"},
            {"platformCategory": "新闻", "platformName": "纽约时报"},
            {"platformCategory": "新闻", "platformName": "头条新闻"}
          ]
        },
        {
          "platformCategoryRoot": "设计",
          "platforms": [
            {"platformCategory": "设计", "platformName": "Awwwards"},
            {"platformCategory": "设计", "platformName": "Abduzeedo"},
            {"platformCategory": "设计", "platformName": "Dribbble"},
            {"platformCategory": "涂鸦王国", "platformName": "涂鸦王国"},
            {"platformCategory": "设计", "platformName": "腾讯设计开放平台"},
            {"platformCategory": "设计", "platformName": "ArchDaily"},
            {"platformCategory": "站酷", "platformName": "站酷"},
            {"platformCategory": "设计", "platformName": "TOPYS"},
            {"platformCategory": "设计", "platformName": "Core77"},
            {"platformCategory": "设计", "platformName": "优设网"},
            {"platformCategory": "设计", "platformName": "人人都是产品经理"}
          ]
        },
        {
          "platformCategoryRoot": "财经",
          "platforms": [
            {"platformCategory": "财经", "platformName": "金色财经"},
            {"platformCategory": "财经", "platformName": "每经网"},
            {"platformCategory": "财经", "platformName": "时代在线"},
            {"platformCategory": "财经", "platformName": "格隆汇"},
            {"platformCategory": "财经", "platformName": "科创板日报"},
            {"platformCategory": "财经", "platformName": "第一财经"},
            {"platformCategory": "财经", "platformName": "同花顺"},
            {"platformCategory": "财经", "platformName": "法布"},
            {"platformCategory": "财经", "platformName": "百度财经"},
            {"platformCategory": "财经", "platformName": "金融界"},
            {"platformCategory": "财经", "platformName": "新浪财经"},
            {"platformCategory": "财经", "platformName": "金十"},
            {"platformCategory": "财经", "platformName": "汇通财经"},
            {"platformCategory": "财经", "platformName": "老虎财经"},
            {"platformCategory": "财经", "platformName": "选股通"},
            {"platformCategory": "财经", "platformName": "经济观察网"},
            {"platformCategory": "财经", "platformName": "东方财富网"},
            {"platformCategory": "财经", "platformName": "21经济网"},
            {"platformCategory": "财经", "platformName": "BlockBeats"},
            {"platformCategory": "财经", "platformName": "智通财经"},
            {"platformCategory": "财经", "platformName": "财联社"},
            {"platformCategory": "财经", "platformName": "会计头条"},
            {"platformCategory": "财经", "platformName": "华尔街见闻"},
            {"platformCategory": "财经", "platformName": "MBA智库"},
            {"platformCategory": "财经", "platformName": "Chain Catcher"}
          ]
        },
        {
          "platformCategoryRoot": "科技",
          "platforms": [
            {"platformCategory": "科技", "platformName": "MIT"},
            {"platformCategory": "科技", "platformName": "腾讯云社区"},
            {"platformCategory": "科技", "platformName": "ReadHub"},
            {"platformCategory": "科技", "platformName": "创业邦"},
            {"platformCategory": "科技", "platformName": "IT之家"},
            {"platformCategory": "科技", "platformName": "钛媒体"},
            {"platformCategory": "HuggingFaces", "platformName": "HuggingFaces"},
            {"platformCategory": "科技", "platformName": "站长之家"},
            {"platformCategory": "科技", "platformName": "新智元"},
            {"platformCategory": "科技", "platformName": "智源社区"},
            {"platformCategory": "科技", "platformName": "量子位"},
            {"platformCategory": "科技", "platformName": "雷锋网"},
            {"platformCategory": "科技", "platformName": "美团社区"},
            {"platformCategory": "科技", "platformName": "快科技"},
            {"platformCategory": "科技", "platformName": "i黑马"},
            {"platformCategory": "科技", "platformName": "机器之心"},
            {"platformCategory": "科技", "platformName": "猎云网"},
            {"platformCategory": "科技", "platformName": "多知"},
            {"platformCategory": "科技", "platformName": "36氪"},
            {"platformCategory": "科技", "platformName": "阿里云社区"},
            {"platformCategory": "科技", "platformName": "中关村在线"},
            {"platformCategory": "科技", "platformName": "全天候科技"},
            {"platformCategory": "科技", "platformName": "芥末堆"},
            {"platformCategory": "GitHub", "platformName": "GitHub"},
            {"platformCategory": "科技", "platformName": "蓝点网"},
            {"platformCategory": "国际科技创新中心", "platformName": "人工智能国际科技创新中心"},
            {"platformCategory": "科技", "platformName": "理想生活实验室"},
            {"platformCategory": "科技", "platformName": "艾媒网"},
            {"platformCategory": "科技", "platformName": "EurekAlert"}
          ]
        },
        {
          "platformCategoryRoot": "体育",
          "platforms": [
            {"platformCategory": "体育", "platformName": "PP体育"},
            {"platformCategory": "体育", "platformName": "百度体育"},
            {"platformCategory": "体育", "platformName": "央视体育"},
            {"platformCategory": "体育", "platformName": "懂球帝"},
            {"platformCategory": "体育", "platformName": "直播吧"},
            {"platformCategory": "体育", "platformName": "网易体育"},
            {"platformCategory": "体育", "platformName": "新浪体育"},
            {"platformCategory": "体育", "platformName": "虎扑体育"},
            {"platformCategory": "体育", "platformName": "搜狐体育"}
          ]
        },
        {
          "platformCategoryRoot": "媒体",
          "platforms": [
            {"platformCategory": "媒体", "platformName": "美漫百科"},
            {"platformCategory": "媒体", "platformName": "B站"},
            {"platformCategory": "媒体", "platformName": "电视猫"},
            {"platformCategory": "媒体", "platformName": "百度文娱"},
            {"platformCategory": "媒体", "platformName": "Youtube"},
            {"platformCategory": "媒体", "platformName": "acfun"},
            {"platformCategory": "媒体", "platformName": "煎蛋"},
            {"platformCategory": "媒体", "platformName": "百度民生"},
            {"platformCategory": "媒体", "platformName": "微博"},
            {"platformCategory": "百度", "platformName": "百度"},
            {"platformCategory": "媒体", "platformName": "抖音"},
            {"platformCategory": "媒体", "platformName": "微信读书"},
            {"platformCategory": "媒体", "platformName": "时光网"}
          ]
        },
        {
          "platformCategoryRoot": "游戏",
          "platforms": [
            {"platformCategory": "巴哈姆特", "platformName": "巴哈姆特"},
            {"platformCategory": "游戏", "platformName": "游研社"},
            {"platformCategory": "游戏", "platformName": "电玩帮"},
            {"platformCategory": "游戏", "platformName": "A9VG"},
            {"platformCategory": "游戏", "platformName": "GCORES"},
            {"platformCategory": "游戏", "platformName": "游戏陀螺"},
            {"platformCategory": "QooApp", "platformName": "QooApp"},
            {"platformCategory": "4Gamer", "platformName": "4Gamer"},
            {"platformCategory": "游戏", "platformName": "IGN"},
            {"platformCategory": "游戏", "platformName": "17173"},
            {"platformCategory": "游戏", "platformName": "3DMGAME"},
            {"platformCategory": "GameBase", "platformName": "gamebase"},
            {"platformCategory": "游戏", "platformName": "游侠网"},
            {"platformCategory": "游戏", "platformName": "游民星空"}
          ]
        },
        {
          "platformCategoryRoot": "影音",
          "platforms": [
            {"platformCategory": "爱奇艺视频", "platformName": "爱奇艺视频"},
            {"platformCategory": "腾讯视频", "platformName": "腾讯视频"},
            {"platformCategory": "优酷视频", "platformName": "优酷视频"},
            {"platformCategory": "芒果视频", "platformName": "芒果视频"},
            {"platformCategory": "猫眼", "platformName": "猫眼"},
            {"platformCategory": "网易云音乐", "platformName": "网易云音乐"}
          ]
        },
        {
          "platformCategoryRoot": "社区",
          "platforms": [
            {"platformCategory": "社区", "platformName": "水木社区"},
            {"platformCategory": "社区", "platformName": "KDS上海头条"},
            {"platformCategory": "社区", "platformName": "通信人家园"},
            {"platformCategory": "Nodeloc", "platformName": "nodeloc"},
            {"platformCategory": "社区", "platformName": "NGA"},
            {"platformCategory": "社区", "platformName": "掘金文章"},
            {"platformCategory": "社区", "platformName": "HACKER_NEWS"},
            {"platformCategory": "社区", "platformName": "知无不言跨境电商社区"},
            {"platformCategory": "社区", "platformName": "Emacs China"},
            {"platformCategory": "社区", "platformName": "虫部落"},
            {"platformCategory": "社区", "platformName": "知乎"},
            {"platformCategory": "社区", "platformName": "开源资讯"},
            {"platformCategory": "社区", "platformName": "Ruby China"},
            {"platformCategory": "社区", "platformName": "先知社区"},
            {"platformCategory": "社区", "platformName": "豆瓣"},
            {"platformCategory": "社区", "platformName": "步行街虎扑"},
            {"platformCategory": "社区", "platformName": "V2EX"},
            {"platformCategory": "社区", "platformName": "凯迪网"},
            {"platformCategory": "社区", "platformName": "百度贴吧"},
            {"platformCategory": "社区", "platformName": "少数派"},
            {"platformCategory": "社区", "platformName": "经管之家"}
          ]
        },
        {
          "platformCategoryRoot": "生活",
          "platforms": [
            {"platformCategory": "小组豆瓣", "platformName": "小组豆瓣"}
          ]
        },
        {
          "platformCategoryRoot": "健康",
          "platforms": [
            {"platformCategory": "健康", "platformName": "丁香医生"},
            {"platformCategory": "健康", "platformName": "健康时报网"},
            {"platformCategory": "健康", "platformName": "医药魔方"},
            {"platformCategory": "健康", "platformName": "家医大健康"},
            {"platformCategory": "健康", "platformName": "生命时报"},
            {"platformCategory": "健康", "platformName": "果壳"},
            {"platformCategory": "健康", "platformName": "生物谷"}
          ]
        },
        {
          "platformCategoryRoot": "电视",
          "platforms": [
            {"platformCategory": "CCTV", "platformName": "央视电视台"}
          ]
        },
        {
          "platformCategoryRoot": "羊毛",
          "platforms": [
            {"platformCategory": "羊毛", "platformName": "0818团"}
          ]
        }
      ]
    }
  },
  computed: {
    subscriptionSettingShow: {
      get() {
        return this.$store.state.subscriptionSettingShow;
      },
      set(value) {
        this.$store.commit('setSubscriptionSettingShow', value);
      }
    },
    totalPlatformsCount() {
      return this.platformCategories.reduce((sum, root) => sum + root.platforms.length, 0)
    }
  },
  mounted() {
    window.addEventListener('keydown', this.onKey)
    this.licenseInit()
  },
  beforeUnmount() {
    window.removeEventListener('keydown', this.onKey)
  },
  methods: {
    licenseInit() {
      this.licenseCode = getLocalStorage(LOCAL_STORAGE_KEYS.LICENSE_DODE)
      if (this.licenseCode) {
        this.applyKey()
      }
    },
    close() {
      this.globalCascaderOpen = false
      this.form.platforms.forEach(p => {
        p.cascaderOpen = false
        p.activeTab = '新闻'
      })
      this.subscriptionSettingShow = false
    },
    toggleGlobalCascader() {
      this.globalCascaderOpen = !this.globalCascaderOpen
      this.form.platforms.forEach(p => p.cascaderOpen = false)
    },
    togglePlatformCascader(currentPlat) {
      const wasOpen = currentPlat.cascaderOpen
      this.globalCascaderOpen = false
      this.form.platforms.forEach(p => p.cascaderOpen = false)
      currentPlat.cascaderOpen = !wasOpen
    },
    startAddKeyword() {
      this.addingKeyword = true
      this.$nextTick(() => this.$refs.keywordInput?.focus())
    },
    addKeyword() {
      const v = this.newKeyword.trim()
      if (v && this.form.keywords.length < this.publicKeyWordCountLimit && !this.form.keywords.includes(v)) {
        this.form.keywords.push(v)
      }
      this.newKeyword = ''
      this.addingKeyword = false
    },

    startAddPlatformKeyword(plat) {
      if (!plat.platformKeywords) plat.platformKeywords = []
      if ((plat.platformKeywords.length || 0) >= this.privateKeyWordCountLimit) return
      plat.addingKeyword = true
      plat.newKeyword = ''
      this.$nextTick(() => {
        const input = this.$refs[`platformKeywordInput_${plat.id}`]
        if (input && input[0]) input[0].focus()
      })
    },

    addPlatformKeyword(plat) {
      const v = (plat.newKeyword || '').trim()
      if (v && !plat.platformKeywords.includes(v)) {
        plat.platformKeywords.push(v)
      }
      plat.addingKeyword = false
      plat.newKeyword = ''
    },

    removePlatformKeyword(plat, index) {
      plat.platformKeywords.splice(index, 1)
    },

    isRootAllSelected(root) {
      return root.platforms.every(item => this.globalSelectedPlatforms.includes(item.platformName))
    },
    toggleRootAll(root, checked) {
      root.platforms.forEach(item => {
        const name = item.platformName
        if (checked && !this.globalSelectedPlatforms.includes(name)) {
          this.globalSelectedPlatforms.push(name)
        } else if (!checked) {
          const idx = this.globalSelectedPlatforms.indexOf(name)
          if (idx > -1) this.globalSelectedPlatforms.splice(idx, 1)
        }
      })
    },

    isPlatformRootAllSelected(plat, root) {
      if (!plat.selectedPlatforms) return false
      return root.platforms.every(item => plat.selectedPlatforms.includes(item.platformName))
    },
    togglePlatformRootAll(plat, root, checked) {
      if (!plat.selectedPlatforms) this.$set(plat, 'selectedPlatforms', [])
      root.platforms.forEach(item => {
        const name = item.platformName
        if (checked && !plat.selectedPlatforms.includes(name)) {
          plat.selectedPlatforms.push(name)
        } else if (!checked) {
          const idx = plat.selectedPlatforms.indexOf(name)
          if (idx > -1) plat.selectedPlatforms.splice(idx, 1)
        }
      })
    },

    selectAllDefault() {
      const allNames = []
      this.platformCategories.forEach(root => {
        root.platforms.forEach(item => {
          if (!allNames.includes(item.platformName)) allNames.push(item.platformName)
        })
      })
      this.globalSelectedPlatforms = [...allNames]
      this.form.platforms.forEach(plat => {
        if (!plat.selectedPlatforms) this.$set(plat, 'selectedPlatforms', [])
        plat.selectedPlatforms = [...allNames]
      })
    },

    addPlatform(template) {
      if (this.form.platforms.length >= this.platformCountLimit) {
        this.$message.warning('最多只能添加10个平台')
        return
      }

      const newPlatform = {
        ...template,
        id: `${template.type}_${this.platformIdCounter++}`,
        remark: '',
        platformKeywords: [],
        webhook: '',
        secret: '',
        selectOpen: false,
        addingKeyword: false,
        newKeyword: '',
        cascaderOpen: false,
        activeTab: '新闻',
        selectedPlatforms: []
      }

      this.form.platforms.push(newPlatform)
      this.showAddPlatformModal = false
      this.activePlatform = newPlatform.id

      this.$message.success(`已添加 ${template.name}`)
    },

    removePlatform(index) {
      const platform = this.form.platforms[index]
      this.form.platforms.splice(index, 1)
      this.$message.success(`已删除 ${platform.name} ${platform.remark}`)

      if (this.activePlatform === platform.id) {
        this.activePlatform = this.form.platforms.length > 0 ? this.form.platforms[0].id : ''
      }
    },

    applyKey() {
      const successMessage = '密钥有效';
      const errorMessage = '密钥无效，请检查';
      if (!this.licenseCode || !this.isValidKey(this.licenseCode)) {
        if (this.subscriptionSettingShow) {
          this.$message.error(errorMessage);
        }
      } else {
        getPlatformCategories()
            .then(res => {
              const result = res?.data?.data || false;
              if (result && res.data.code !== 999) {
                this.platformCategories = result || []
              }
            });

        getSubscriptionConfig()
            .then(res => {
              const result = res?.data?.data || false;
              if (result && res.data.code !== 999) {
                this.form.keywords = result.subscriptionGlobalKeywords || []
                this.globalSelectedPlatforms = result.subscriptionGlobalCategories || []

                this.form.platforms = []
                this.platformIdCounter = 0

                if (result.subscriptionPlatformConfigs && result.subscriptionPlatformConfigs.length > 0) {
                  result.subscriptionPlatformConfigs.forEach(platformData => {
                    const template = this.platformTemplates.find(t => t.type === platformData.type)
                    if (template) {
                      this.form.platforms.push({
                        ...template,
                        id: `${template.type}_${this.platformIdCounter++}`,
                        remark: platformData.remark || '',
                        platformKeywords: platformData.subscriptionPlatformKeywords || [],
                        selectedPlatforms: platformData.subscriptionPlatformCategories || [],
                        webhook: platformData.webhook || '',
                        secret: platformData.secret || '',
                        selectOpen: false,
                        addingKeyword: false,
                        newKeyword: '',
                        cascaderOpen: false,
                        activeTab: '新闻'
                      })
                    }
                  })
                }

                if (this.form.platforms.length > 0) {
                  this.activePlatform = this.form.platforms[0].id
                }

                if (this.subscriptionSettingShow) {
                  this.$message.success(successMessage);
                }

                if (this.globalSelectedPlatforms.length === 0) {
                  this.selectAllDefault()
                }
              } else {
                this.form.keywords = []
                this.globalSelectedPlatforms = []
                this.form.platforms = []
                if (this.subscriptionSettingShow && res.data.code === 999) {
                  this.$message.error(res.data.message);
                }
              }
            })
            .finally(() => {
              if (this.globalSelectedPlatforms.length === 0) {
                this.selectAllDefault()
              }
            });
      }
    },

    saveConfig() {
      if (this.form.keywords.length === 0 && !this.form.platforms.some(p => p.platformKeywords?.length > 0)) {
        return this.$message.error("请至少添加 1 个全局关键词或平台独立关键词")
      }
      const hasWebhook = this.form.platforms.some(p => p.webhook.trim())
      if (!hasWebhook) return this.$message.error("请至少填写 1 个 Webhook")

      const submitData = {
        subscriptionGlobalKeywords: this.form.keywords,
        subscriptionGlobalCategories: this.globalSelectedPlatforms,
        subscriptionPlatformConfigs: this.form.platforms.map(p => ({
          type: p.type,
          remark: p.remark || '',
          subscriptionPlatformKeywords: p.platformKeywords || [],
          subscriptionPlatformCategories: p.selectedPlatforms || [],
          webhook: p.webhook,
          secret: p.secret
        }))
      }

      updateSubscriptionConfig(submitData)
          .then(res => {
            const result = res?.data?.data || false;
            if (result && res.data.code !== 999) {
              this.$message.success("配置更新成功")
            } else {
              if (res.data.code === 999){
                this.$message.error(res.data.message)
              }
            }
          })
          .finally(() => {});
    },

    onKey(e) {
      if (!this.subscriptionSettingShow) return
      if (e.key === 'Escape') {
        if (this.showAddPlatformModal) {
          this.showAddPlatformModal = false
        } else {
          this.globalCascaderOpen = false
          this.form.platforms.forEach(p => p.cascaderOpen = false)
          this.close()
        }
      }

      const isAddingPlatformKeyword = this.form.platforms.some(p => p.addingKeyword)

      if (e.key === 'Enter' && !this.addingKeyword && !this.showAddPlatformModal && !isAddingPlatformKeyword) this.saveConfig()
    },

    isValidKey(str) {
      return /^[A-Za-z0-9]{4}(-[A-Za-z0-9]{4}){5}$/.test(str);
    }
  },
  created() {
    this.$nextTick(() => {
      this.selectAllDefault()
    })
  }
}
</script>

<style scoped>
/* 美化滚动条 */
.scrollable-content::-webkit-scrollbar {
  width: 8px;
}

.scrollable-content::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.02);
  border-radius: 10px;
}

.scrollable-content::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, rgba(100, 181, 255, 0.25), rgba(100, 181, 255, 0.35));
  border-radius: 10px;
  transition: background 0.3s;
}

.scrollable-content::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(180deg, rgba(100, 181, 255, 0.4), rgba(100, 181, 255, 0.5));
}

/* Firefox 滚动条样式 */
.scrollable-content {
  scrollbar-width: thin;
  scrollbar-color: rgba(100, 181, 255, 0.3) rgba(255, 255, 255, 0.02);
}

/* 全局提示图标 */
.global-tip-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  color: rgba(255, 255, 255, 0.4);
  cursor: help;
  transition: all 0.3s ease;
  position: relative;
  margin-left: 6px;
  flex-shrink: 0;
}

.global-tip-icon:hover {
  color: #64b5ff;
}

.global-tip-icon::after {
  content: attr(data-tip);
  position: absolute;
  top: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%) translateY(-4px);
  min-width: 280px;
  max-width: 350px;
  padding: 10px 14px;
  background: rgba(20, 23, 32, 0.98);
  color: #e6edf3;
  font-size: 12px;
  line-height: 1.6;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(10px);
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  pointer-events: none;
  z-index: 1000;
  white-space: pre-line;
  word-wrap: break-word;
}

.global-tip-icon::before {
  content: '';
  position: absolute;
  top: calc(100% + 2px);
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-bottom: 6px solid rgba(20, 23, 32, 0.98);
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1001;
}

.global-tip-icon:hover::after,
.global-tip-icon:hover::before {
  opacity: 1;
  visibility: visible;
  transform: translateX(-50%) translateY(0);
}

/* 备注输入框 */
.remark-input {
  font-style: italic;
  color: #a8b3cf !important;
}

.remark-input::placeholder {
  color: #6b7280;
  font-style: italic;
}

/* 平台关键词样式 */
.platform-keywords {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  padding: 10px;
  width: 100%;
  position: relative;
  z-index: 1;
  flex: 1;
}

.platform-keywords-header {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 8px;
}

.keywords-label {
  font-size: 12px;
  color: #8892b0;
  font-weight: 500;
}

.platform-keyword-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  align-items: center;
  min-height: 32px;
}

.platform-keyword-tag {
  background: rgba(168, 85, 247, 0.15);
  color: #c084fc;
  padding: 4px 8px;
  border-radius: 8px;
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  border: 1px solid rgba(192, 132, 252, 0.3);
  transition: all 0.2s;
}

.platform-keyword-tag:hover {
  background: rgba(168, 85, 247, 0.25);
}

.platform-keyword-input {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #e6edf3;
  padding: 6px 10px;
  border-radius: 8px;
  outline: none;
  font-size: 12px;
  width: 100px;
  flex-shrink: 0;
}

.platform-keyword-input:focus {
  border-color: #a855f7;
  box-shadow: 0 0 0 3px rgba(168, 85, 247, 0.2);
}

.add-platform-tag-btn {
  width: 28px;
  height: 28px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.06);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: 1px dashed rgba(255, 255, 255, 0.25);
  transition: all 0.2s;
  flex-shrink: 0;
  position: relative;
  z-index: 10;
}

.add-platform-tag-btn svg {
  color: rgba(255, 255, 255, 0.6);
  pointer-events: none;
}

.add-platform-tag-btn.disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.add-platform-tag-btn:hover:not(.disabled) {
  background: rgba(168, 85, 247, 0.15);
  border-color: rgba(168, 85, 247, 0.4);
}

.add-platform-tag-btn:hover:not(.disabled) svg {
  color: #c084fc;
}

.platform-keyword-tag .tag-close {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.2s;
}

.platform-keyword-tag .tag-close:hover {
  opacity: 1;
}

/* 删除平台按钮 */
.delete-platform-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 28px;
  height: 28px;
  border-radius: 8px;
  background: rgba(255, 89, 89, 0.1);
  border: 1px solid rgba(255, 89, 89, 0.3);
  color: #ff5959;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: 0;
  transition: all 0.25s;
  z-index: 10;
}

.platform-card:hover .delete-platform-btn {
  opacity: 1;
}

.delete-platform-btn:hover {
  background: rgba(255, 89, 89, 0.2);
  transform: scale(1.1);
}

/* 添加平台卡片 */
.add-platform-card {
  background: rgba(40, 44, 56, 0.3);
  border: 2px dashed rgba(255, 255, 255, 0.15);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  transition: all 0.3s;
}

.add-platform-card:hover {
  border-color: rgba(64, 158, 255, 0.5);
  background: rgba(50, 55, 70, 0.5);
  transform: translateY(-4px);
}

.add-platform-content {
  text-align: center;
  color: #8892b0;
}

.add-icon {
  width: 56px;
  height: 56px;
  margin: 0 auto 12px;
  border-radius: 16px;
  background: rgba(64, 158, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #64b5ff;
}

.add-platform-content h4 {
  font-size: 16px;
  color: #e6edf3;
  margin-bottom: 6px;
}

.add-platform-content p {
  font-size: 13px;
  color: #6b7280;
}

/* 添加平台弹窗 */
.add-platform-modal {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 20px;
}

.add-platform-panel {
  background: linear-gradient(145deg, rgba(30, 33, 42, 0.98), rgba(20, 23, 32, 0.98));
  border-radius: 20px;
  padding: 28px;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.add-platform-panel h3 {
  font-size: 20px;
  color: #e6edf3;
  margin-bottom: 20px;
  font-weight: 600;
}

.platform-options {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-bottom: 20px;
}

.platform-option {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  background: rgba(40, 44, 56, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.25s;
}

.platform-option:hover {
  background: rgba(50, 55, 70, 0.8);
  border-color: rgba(64, 158, 255, 0.4);
  transform: translateY(-2px);
}

.option-icon {
  width: 32px;
  height: 32px;
  border-radius: 8px;
}

.platform-option span {
  font-size: 15px;
  color: #e6edf3;
  font-weight: 500;
}

.cancel-btn {
  width: 100%;
  padding: 12px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 10px;
  color: #e6edf3;
  font-size: 15px;
  cursor: pointer;
  transition: all 0.25s;
}

.cancel-btn:hover {
  background: rgba(255, 255, 255, 0.1);
}

/* 弹窗动画 */
.modal-inner-enter-active,
.modal-inner-leave-active {
  transition: all 0.3s ease;
}

.modal-inner-enter-from,
.modal-inner-leave-to {
  opacity: 0;
}

.modal-inner-enter-from .add-platform-panel,
.modal-inner-leave-to .add-platform-panel {
  transform: scale(0.9) translateY(20px);
}

/* 原有样式保持不变 */
.config-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, .85);
  backdrop-filter: blur(20px) saturate(120%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1999;
  padding: 12px;
  animation: fadeIn .3s ease;
}

.config-panel {
  width: 80%;
  height: 90vh;
  max-height: 900px;
  background: linear-gradient(145deg, rgba(30, 33, 42, .95), rgba(20, 23, 32, .95));
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 25px 80px rgba(0, 0, 0, .6), 0 0 0 1px rgba(255, 255, 255, .08);
  display: flex;
  flex-direction: column;
  animation: slideUp .45s cubic-bezier(.16, 1, .3, 1);
}

.scrollable-content {
  flex: 1;
  overflow-y: auto;
  padding: 0 28px 28px;
  -webkit-overflow-scrolling: touch;
}

.panel-header {
  padding: 28px 28px 20px;
  flex-shrink: 0;
  position: relative;
  z-index: 2;
}

.panel-footer {
  padding: 20px 28px;
  flex-shrink: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  position: relative;
  z-index: 2;
}

.bg-gradient {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle at 30% 30%, rgba(64, 158, 255, .15), transparent 50%), radial-gradient(circle at 70% 70%, rgba(255, 89, 89, .12), transparent 50%);
  animation: rotate 25s linear infinite;
  pointer-events: none
}

.bg-mesh {
  position: absolute;
  inset: 0;
  background-image: linear-gradient(rgba(255, 255, 255, .02) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, .02) 1px, transparent 1px);
  background-size: 30px 30px;
  pointer-events: none
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center
}

.title-group h1 {
  font-size: 26px;
  font-weight: 800;
  background: linear-gradient(135deg, #fff, #a8b3cf);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: -.5px;
  margin-bottom: 4px
}

.title-group p {
  font-size: 13.5px;
  color: #8892b0
}

.close-btn {
  width: 38px;
  height: 38px;
  border-radius: 12px;
  background: rgba(255, 255, 255, .05);
  border: 1px solid rgba(255, 255, 255, .08);
  color: #ccd6f6;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all .25s
}

.close-btn:hover {
  background: rgba(255, 255, 255, .1);
  transform: scale(1.05)
}

.counter {
  font-size: 13px;
  color: #64b5ff
}

.keyword-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  min-height: 40px
}

.keyword-tag {
  background: rgba(64, 158, 255, .15);
  color: #64b5ff;
  padding: 6px 11px;
  border-radius: 10px;
  font-size: 13px;
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  border: 1px solid rgba(100, 181, 255, .3)
}

.keyword-tag:hover {
  background: rgba(64, 158, 255, .25)
}

.keyword-input {
  background: rgba(255, 255, 255, .06);
  border: 1px solid rgba(255, 255, 255, .15);
  color: #e6edf3;
  padding: 8px 12px;
  border-radius: 10px;
  outline: none;
  font-size: 14px;
  width: 140px
}

.keyword-input:focus {
  border-color: #409eff;
  box-shadow: 0 0 0 3px rgba(64, 158, 255, .2)
}

.add-tag-btn {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: rgba(255, 255, 255, .06);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: 1px dashed rgba(255, 255, 255, .25)
}

.add-tag-btn.disabled {
  opacity: .4;
  cursor: not-allowed
}

.add-tag-btn:hover:not(.disabled) {
  background: rgba(255, 255, 255, .12);
  border-color: rgba(255, 255, 255, .4)
}

.platforms-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
  margin-top: 24px
}

@media (max-width: 1024px) {
  .platforms-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .platforms-grid {
    grid-template-columns: 1fr;
    gap: 16px;
    margin-top: 20px
  }
}

.platform-card {
  position: relative;
  background: rgba(40, 44, 56, .75);
  border: 1px solid rgba(255, 255, 255, .08);
  border-radius: 16px;
  padding: 18px;
  cursor: pointer;
  overflow: visible;
  transition: all .35s cubic-bezier(.16, 1, .3, 1);
  isolation: isolate;
}

.platform-card:hover {
  transform: translateY(-4px)
}

.platform-card.active {
  border-color: rgba(64, 158, 255, .5);
  background: rgba(50, 55, 70, .9);
  box-shadow: 0 0 0 3px rgba(64, 158, 255, .15)
}

.card-glow {
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity .3s;
  pointer-events: none;
  z-index: 0;
}

.platform-card.active .card-glow {
  opacity: 1
}

.card-header {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 14px
}

.icon {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0
}

.icon-img {
  width: 32px;
  height: 32px
}

.platform-card h4 {
  font-size: 16px;
  color: #e6edf3;
  font-weight: 600;
  margin: 0
}

.inputs {
  display: flex;
  flex-direction: column;
  gap: 10px
}

.modern-input {
  background: rgba(255, 255, 255, .06);
  border: 1px solid rgba(255, 255, 255, .12);
  color: #e6edf3;
  padding: 10px 12px;
  border-radius: 10px;
  outline: none;
  font-size: 13.5px;
  transition: all .2s
}

.modern-input:focus {
  border-color: #409eff;
  box-shadow: 0 0 0 3px rgba(64, 158, 255, .2)
}

.modern-input::placeholder {
  color: #6b7280
}

.secret {
  opacity: .8;
  font-size: 13px
}

.shortcuts {
  font-size: 13px;
  color: #6b7280
}

.shortcuts kbd {
  background: rgba(255, 255, 255, .08);
  padding: 4px 7px;
  border-radius: 5px;
  font-size: 11px;
  border: 1px solid rgba(255, 255, 255, .1);
  font-family: ui-monospace, monospace;
  margin: 0 2px
}

.confirm-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 11px 24px;
  background: linear-gradient(135deg, #409eff, #3a8fee);
  color: #fff;
  border: none;
  border-radius: 11px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 16px rgba(64, 158, 255, .3);
  transition: all .3s;
  position: relative;
  overflow: hidden
}

.confirm-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(64, 158, 255, .4)
}

.confirm-btn svg {
  transition: transform .3s
}

.confirm-btn:hover svg {
  transform: translateX(3px)
}

@media (max-width: 768px) {
  .config-panel {
    height: 92vh;
    border-radius: 20px
  }

  .panel-header {
    padding: 24px 20px 16px
  }

  .title-group h1 {
    font-size: 23px
  }

  .scrollable-content {
    padding: 0 20px 24px
  }

  .platform-card {
    padding: 16px
  }

  .card-header {
    gap: 12px
  }

  .icon {
    width: 40px;
    height: 40px
  }

  .panel-footer {
    padding: 18px 20px;
    flex-direction: column-reverse;
    gap: 14px
  }

  .confirm-btn {
    width: 100%;
    justify-content: center;
    padding: 13px
  }

  .platform-options {
    grid-template-columns: 1fr;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0
  }
  to {
    opacity: 1
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px) scale(.95)
  }
  to {
    opacity: 1;
    transform: none
  }
}

@keyframes rotate {
  from {
    transform: rotate(0)
  }
  to {
    transform: rotate(360deg)
  }
}

/* 修复后的样式 */

/* 输入框和触发器文字过长截断 + 箭头对齐 */
.cascader-trigger {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 12px;
  cursor: pointer;
  user-select: none;
  font-size: 13.5px;
  color: #a8b3cf;
}

.trigger-text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex: 1;
  margin-right: 8px;
}

.arrow {
  flex-shrink: 0;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 0.6;
}

.arrow.rotate {
  transform: rotate(180deg);
}

/* 输入框满宽 */
.full-width {
  flex: 1;
}

/* tip 图标位置固定在右侧，不影响输入框长度 */
.input-with-tip {
  display: flex;
  align-items: center;
  gap: 10px;
}

.input-with-tip .modern-input,
.input-with-tip .custom-select .select-trigger {
  flex: 1;
}

.tip-icon {
  flex-shrink: 0;
  width: 28px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.4);
  cursor: help;
  transition: all 0.3s ease;
}

/* 全选时整个父分类标题变绿 */
.cascader-root-header.allSelected {
  color: #2db302;
}

/* 子平台紧凑横向排列 */
.cascader-items.dense {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
}

.cascader-items.dense.small {
  gap: 6px;
}

.checkbox-label.item {
  margin: 0;
}

.item-bg {
  background: rgba(255, 255, 255, 0.04);
  border-radius: 8px;
  padding: 6px 10px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  transition: background 0.2s;
}

.cascader-items.dense.small .item-bg {
  padding: 5px 9px;
  font-size: 12.5px;
}

.item-bg:hover {
  background: rgba(255, 255, 255, 0.09);
}

.cascader-dropdown.cascader-tabs {
  z-index: 9999;
}

.cascader-dropdown.high-zindex {
  z-index: 10000 !important;
}

.tab-item.active {
  background: #409eff;
  color: #fff;
}

.cascader-root-header {
  margin-bottom: 10px;
}

/* 模块外框 */
.section-box {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 18px;
  margin-bottom: 24px;
}

.cascader-tabs-header {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 12px 16px 8px;
  background: rgba(64, 158, 255, 0.06);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.tab-item {
  padding: 8px 14px;
  border-radius: 8px;
  font-size: 13px;
  cursor: pointer;
  background: rgba(255, 255, 255, 0.06);
  color: #8892b0;
  transition: all 0.2s;
}

.tab-item.small {
  padding: 6px 10px;
  font-size: 12px;
}

.tab-item:hover:not(.active) {
  background: rgba(255, 255, 255, 0.12);
  color: #e6edf3;
}

.cascader-tabs-content {
  flex: 1;
  overflow-y: auto;
  padding: 12px 16px;
}
</style>