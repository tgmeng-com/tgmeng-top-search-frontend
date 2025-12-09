<!-- SubscriptionConfigModal.vue （只修复输入框 + Key 框改成文本框） -->
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

            <!-- 新增一行 Key 输入框（普通文本框） -->
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
                <h3>订阅关键词 <span class="counter">{{ form.keywords.length }}/10</span></h3>
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
                      :class="{ disabled: form.keywords.length >= 10 }"
                      @click="form.keywords.length < 10 && startAddKeyword()"
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                      <path d="M7 2v10M2 7h10"/>
                    </svg>
                  </div>
                </div>
              </section>

              <section class="platforms-grid">
                <div
                    v-for="plat in form.platforms"
                    :key="plat.type"
                    class="platform-card"
                    :class="{ active: activePlatform === plat.type }"
                    @click="activePlatform = plat.type"
                >
                  <div class="card-glow" :style="{ background: plat.glow }"></div>

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
                        <div class="select-trigger modern-input secret" @click="plat.selectOpen = !plat.selectOpen">
                          <span>{{ plat.secret || '请选择推送格式' }}</span>
                          <svg class="arrow" :class="{ rotate: plat.selectOpen }" width="12" height="12"
                               viewBox="0 0 12 12">
                            <path d="M2 4l4 4 4-4" stroke="currentColor" stroke-width="2" fill="none"/>
                          </svg>
                        </div>
                        <div class="select-dropdown" v-show="plat.selectOpen">
                          <div class="select-option"
                               :class="{ selected: plat.secret === 'markdown' }"
                               @click="plat.secret = 'markdown'; plat.selectOpen = false">
                            markdown
                          </div>
                          <div class="select-option"
                               :class="{ selected: plat.secret === 'text' }"
                               @click="plat.secret = 'text'; plat.selectOpen = false">
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
      // accessKey: '',   // 访问密钥

      activePlatform: 'DINGDING',
      addingKeyword: false,
      newKeyword: '',
      form: {
        accessKey: '',
        keywords: [],
        platforms: [
          {
            type: 'DINGDING',
            name: '钉钉',
            icon: require('@/assets/image/dingding.png'),
            glow: 'radial-gradient(circle at 50% 0%,rgba(0,162,255,.18),transparent 60%)',
            webhookPlaceholder: 'Webhook URL(必填)',
            webhookTip:'钉钉机器人的WebHook的URL地址',
            secretPlaceholder: 'Secret(必填)',
            secretTip:'钉钉机器人设置中的加签',
            webhook: '',
            secret: ''
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
            webhook: '',
            secret: ''
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
            webhook: '',
            secret: '',
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
            webhook: '',
            secret: ''
          },
          {
            type: 'NTFY',
            name: 'NTFY',
            icon: require('@/assets/image/ntfy.png'),
            glow: 'radial-gradient(circle at 50% 0%,rgba(42,171,238,.18),transparent 60%)',
            webhookPlaceholder: 'Webhook URL(必填)',
            webhookTip:'你的ntfy的服务器地址加上tipic名，例如：https://ntfy.sh/Xiz2J23124324',
            secretPlaceholder: '不填',
            secretTip:'不需要填这个',
            webhook: '',
            secret: '',
          }
        ]
      },

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
                this.form.keywords = result.keywords
                this.form.platforms.forEach(item => {
                  const match = result.platforms.find(item2 => item2.type === item.type);
                  if (match) {
                    item.webhook = match.webhook;
                    item.secret = match.secret;
                  }
                })
                setLocalStorage(LOCAL_STORAGE_KEYS.WEBHOOK_ACCESS_KEY, this.form.accessKey);
                window.umami.track('webhook密钥成功缓存');
                if (this.subscriptionSettingShow) {
                  this.$message.success(successMessage);
                }
              } else {
                this.form.keywords = []
                this.form.platforms.forEach(item => {
                  item.webhook = '';
                  item.secret = '';
                })
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
      if (!this.form.accessKey || !this.isValidKey(this.form.accessKey)) return this.$message.error("密钥无效，请检查");
      if (this.form.keywords.length === 0) return this.$message.error("请至少添加 1 个关键词")
      const hasWebhook = Object.values(this.form.platforms).some(p => p.webhook.trim())
      if (!hasWebhook) return this.$message.error("请至少填写 1 个 Webhook")
      updateSubscriptionConfig(this.form)
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
      if (e.key === 'Escape') this.close()
      if (e.key === 'Enter' && !this.addingKeyword) this.saveConfig()
    },
    isValidKey(str) {
      return /^[A-Za-z0-9]{4}(-[A-Za-z0-9]{4}){5}$/.test(str);
    }
  }
}
</script>

<style scoped>
/* 只加了下面这两小段样式，其余和你原来的一字不改！ */

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

/* 下面是你原来的全部样式，一字未改！ */
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
  grid-template-columns: repeat(3, 1fr);  /* 默认 3 列 */
  gap: 18px;
  margin-top: 24px
}

/* 中等屏幕：2 列 */
@media (max-width: 1024px) {
  .platforms-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* 小屏幕：1 列（已有的样式保持不变） */
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
  transition: all .35s cubic-bezier(.16, 1, .3, 1)
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
  transition: opacity .3s
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

  .platforms-grid {
    grid-template-columns: 1fr;
    gap: 16px;
    margin-top: 20px
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
  animation: slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes slideUp {
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

/* 输入框容器 */
.input-with-tip {
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
}

.input-with-tip .modern-input,
.input-with-tip .custom-select {
  flex: 1;
}

/* 提示图标 */
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

/* Tooltip 提示框 */
.tip-icon::after {
  content: attr(data-tip);
  position: absolute;
  bottom: calc(100% + 8px);
  right: 0;
  min-width: 300px;
  max-width: 400px;
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

/* 小三角箭头 */
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