<!-- SubscriptionConfigModal.vue - 支持平台独立关键词和备注 -->
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

            <!-- Key 输入框 -->
            <div class="key-input-row">
              <div class="key-input-wrapper">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M17 11V7a5 5 0 0 0-10 0v4"/>
                  <rect x="5" y="11" width="14" height="10" rx="2"/>
                </svg>
                <input
                    v-model="form.accessKey"
                    type="text"
                    placeholder="输入访问密钥(必填，如果没有可以在微信交流群公告中获取)"
                    class="key-input"
                />
              </div>
              <button class="key-btn" @click="applyKey">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </div>

            <!-- 订阅设置 -->
            <main class="scrollable-content">
              <section class="keyword-section">
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
<!--                    <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">-->
<!--                      <path d="M7 2v10M2 7h10"/>-->
<!--                    </svg>-->
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" stroke="none">
                      <path d="M7 2v10M2 7h10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                    </svg>
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
                             class="modern-input secret"/>
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
                             class="modern-input secret"/>
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
                        <div class="select-trigger modern-input secret" @click.stop="plat.selectOpen = !plat.selectOpen">
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

                    <!-- 平台独立关键词 - 调整布局 -->
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

                      <!-- 提示图标移到这里 -->
                      <div class="tip-icon" data-tip="此平台的独立关键词，仅在此平台推送。&#10;&#10;如果设置了独立关键词，则此平台关键词为：独立关键词列表+全局关键词列表。&#10;&#10;如果不设置独立关键词，则此平台关键词为：全局关键词列表。">
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
                          class="modern-input remark-input"
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
import {getSubscriptionConfig, updateSubscriptionConfig} from "@/api/api";
import {getLocalStorage, LOCAL_STORAGE_KEYS, setLocalStorage} from "@/utils/localStorageUtils";

export default {
  name: 'SubscriptionConfigModal',
  data() {
    return {
      activePlatform: '',
      addingKeyword: false,
      newKeyword: '',
      showAddPlatformModal: false,
      platformIdCounter: 0,

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
          name: '网易泡泡',
          icon: require('@/assets/image/wangyipopo.png'),
          glow: 'radial-gradient(circle at 50% 0%,rgba(42,171,238,.18),transparent 60%)',
          webhookPlaceholder: 'Webhook URL(必填)',
          webhookTip:'网易泡泡机器人的WebHook的URL地址',
          secretPlaceholder: 'Secret(必填)',
          secretTip:'网易泡泡机器人设置中的加签',
        }
      ],

      form: {
        accessKey: '',
        keywords: [],
        platforms: []
      },
      platformCountLimit: 10,
      publicKeyWordCountLimit: 10,
      privateKeyWordCountLimit: 10,
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
  },
  mounted() {
    window.addEventListener('keydown', this.onKey)
    this.webhookInit()
  },
  beforeUnmount() {
    window.removeEventListener('keydown', this.onKey)
  },
  methods: {
    webhookInit() {
      this.form.accessKey = getLocalStorage(LOCAL_STORAGE_KEYS.WEBHOOK_ACCESS_KEY)
      if (this.form.accessKey) {
        this.applyKey()
      }
    },
    close() {
      this.subscriptionSettingShow = false
    },
    startAddKeyword() {
      this.addingKeyword = true
      this.$nextTick(() => this.$refs.keywordInput?.focus())
    },
    addKeyword() {
      const v = this.newKeyword.trim()
      if (v && this.form.keywords.length < 10 && !this.form.keywords.includes(v)) {
        this.form.keywords.push(v)
      }
      this.newKeyword = ''
      this.addingKeyword = false
    },

    // 平台独立关键词相关方法
    startAddPlatformKeyword(plat) {
      if (!plat.platformKeywords) {
        plat.platformKeywords = []
      }
      if ((plat.platformKeywords?.length || 0) >= 10) return
      plat.addingKeyword = true
      plat.newKeyword = ''
      this.$nextTick(() => {
        const input = this.$refs[`platformKeywordInput_${plat.id}`]
        if (input && input[0]) {
          input[0].focus()
        }
      })
    },

    addPlatformKeyword(plat) {
      const v = (plat.newKeyword || '').trim()
      if (v) {
        if (!plat.platformKeywords) {
          plat.platformKeywords = []
        }
        if ((plat.platformKeywords.length || 0) < 10 && !plat.platformKeywords.includes(v)) {
          plat.platformKeywords.push(v)
        }
      }
      plat.addingKeyword = false
      plat.newKeyword = ''
    },

    removePlatformKeyword(plat, index) {
      if (plat.platformKeywords && plat.platformKeywords.length > index) {
        plat.platformKeywords.splice(index, 1)
      }
    },

    addPlatform(template) {
      if (this.form.platforms.length >= 10) {
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
        newKeyword: ''
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
      if (!this.form.accessKey || !this.isValidKey(this.form.accessKey)) {
        if (this.subscriptionSettingShow) {
          this.$message.error(errorMessage);
        }
      } else {
        getSubscriptionConfig(this.form)
            .then(res => {
              const result = res?.data?.data || false;
              if (result) {
                this.form.keywords = result.keywords || []

                this.form.platforms = []
                this.platformIdCounter = 0

                if (result.platforms && result.platforms.length > 0) {
                  result.platforms.forEach(platformData => {
                    const template = this.platformTemplates.find(t => t.type === platformData.type)
                    if (template) {
                      this.form.platforms.push({
                        ...template,
                        id: `${template.type}_${this.platformIdCounter++}`,
                        remark: platformData.remark || '',
                        platformKeywords: platformData.platformKeywords || [],
                        webhook: platformData.webhook || '',
                        secret: platformData.secret || '',
                        selectOpen: false,
                        addingKeyword: false,
                        newKeyword: ''
                      })
                    }
                  })
                }

                if (this.form.platforms.length > 0) {
                  this.activePlatform = this.form.platforms[0].id
                }

                setLocalStorage(LOCAL_STORAGE_KEYS.WEBHOOK_ACCESS_KEY, this.form.accessKey);
                window.umami.track('webhook密钥成功缓存');
                if (this.subscriptionSettingShow) {
                  this.$message.success(successMessage);
                }
              } else {
                this.form.keywords = []
                this.form.platforms = []
                if (this.subscriptionSettingShow) {
                  this.$message.error(errorMessage);
                }
              }
            })
            .finally(() => {
            });
      }
    },

    saveConfig() {
      // if (!this.form.accessKey || !this.isValidKey(this.form.accessKey)) return this.$message.error("密钥无效，请检查");
      if (this.form.keywords.length === 0 && !this.form.platforms.some(p => p.platformKeywords?.length > 0)) {
        return this.$message.error("请至少添加 1 个全局关键词或平台独立关键词")
      }
      const hasWebhook = this.form.platforms.some(p => p.webhook.trim())
      if (!hasWebhook) return this.$message.error("请至少填写 1 个 Webhook")

      const submitData = {
        accessKey: this.form.accessKey,
        keywords: this.form.keywords,
        platforms: this.form.platforms.map(p => ({
          type: p.type,
          remark: p.remark || '',
          platformKeywords: p.platformKeywords || [],
          webhook: p.webhook,
          secret: p.secret
        }))
      }

      updateSubscriptionConfig(submitData)
          .then(res => {
            const result = res?.data?.data || false;
            if (result) {
              this.$message.success("配置更新成功")
            } else {
              this.$message.error("配置更新失败")
            }
          })
          .finally(() => {
          });
    },

    onKey(e) {
      if (!this.subscriptionSettingShow) return
      if (e.key === 'Escape') {
        if (this.showAddPlatformModal) {
          this.showAddPlatformModal = false
        } else {
          this.close()
        }
      }

      // 检查是否有任何输入框正在活动
      const isAddingPlatformKeyword = this.form.platforms.some(p => p.addingKeyword)

      if (e.key === 'Enter' && !this.addingKeyword && !this.showAddPlatformModal && !isAddingPlatformKeyword) this.saveConfig()
    },

    isValidKey(str) {
      return /^[A-Za-z0-9]{4}(-[A-Za-z0-9]{4}){5}$/.test(str);
    }
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

/* Key 输入框样式 */
.key-input-row {
  margin: 0 28px 20px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.key-input-wrapper {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(40, 44, 56, .6);
  padding: 12px 16px;
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, .12);
  backdrop-filter: blur(8px);
}

.key-input-wrapper svg {
  color: #64b5ff;
  flex-shrink: 0;
}

.key-input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: #e6edf3;
  font-size: 14.5px;
}

.key-input::placeholder {
  color: #6b7280;
}

.key-btn {
  width: 46px;
  height: 46px;
  border-radius: 14px;
  background: linear-gradient(135deg, #409eff, #3a8fee);
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(64, 158, 255, .3);
  transition: all .25s;
}

.key-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(64, 158, 255, .4);
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

.keyword-section h3 {
  font-size: 17px;
  color: #e6edf3;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600
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
  background: rgba(40, 44, 56, .5);
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
  background: rgba(50, 55, 70, .7);
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

.custom-select {
  position: relative;
  width: 100%;
}

.select-trigger {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  user-select: none;
  transition: all 0.3s ease;
}

.select-trigger:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.select-trigger .arrow {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 0.5;
  margin-left: 8px;
}

.select-trigger .arrow.rotate {
  transform: rotate(180deg);
  opacity: 0.8;
}

.select-dropdown {
  position: absolute;
  bottom: calc(100% + 8px);
  left: 0;
  right: 0;
  background: #262834;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 12px;
  box-shadow: 0 -8px 24px rgba(0, 0, 0, 0.12);
  z-index: 100;
  overflow: hidden;
  animation: slideUpDropdown 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes slideUpDropdown {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.select-option {
  padding: 14px 18px;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.select-option::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 0;
  height: 100%;
  background: linear-gradient(90deg, rgba(99, 102, 241, 0.1), rgba(168, 85, 247, 0.1));
  transition: width 0.3s ease;
}

.select-option:hover::before {
  width: 100%;
}

.select-option:hover {
  background: rgba(99, 102, 241, 0.05);
  padding-left: 22px;
}

.select-option.selected {
  background: linear-gradient( #30313C, #272A36);
  color: #2db302;
  font-weight: 500;
}

.select-option.selected::after {
  content: '✓';
  position: absolute;
  right: 18px;
  opacity: 0.8;
}

.input-with-tip {
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 8px;
}

.input-with-tip .modern-input,
.input-with-tip .custom-select {
  flex: 1;
}

.tip-icon {
  flex-shrink: 0;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.4);
  cursor: help;
  transition: all 0.3s ease;
  position: relative;
}

.tip-icon:hover {
  color: #64b5ff;
}

.tip-icon::after {
  content: attr(data-tip);
  position: absolute;
  bottom: calc(100% + 8px);
  right: 0;
  min-width: 250px;
  max-width: 250px;
  padding: 10px 14px;
  background: rgba(20, 23, 32, 0.98);
  color: #e6edf3;
  font-size: 12px;
  line-height: 1.5;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(10px);
  opacity: 0;
  visibility: hidden;
  transform: translateY(4px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  pointer-events: none;
  z-index: 1000;
  white-space: pre-line;
  word-wrap: break-word;
}

.tip-icon::before {
  content: '';
  position: absolute;
  bottom: calc(100% + 2px);
  right: 8px;
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 6px solid rgba(20, 23, 32, 0.98);
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1001;
}

.tip-icon:hover::after,
.tip-icon:hover::before {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}
</style>