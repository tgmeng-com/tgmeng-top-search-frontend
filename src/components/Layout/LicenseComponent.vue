<!-- LicenseComponent.vue - 密钥管理界面（完整版 + 模拟数据） -->
<template>
  <div>
    <teleport to="body" >
      <transition name="modal">
        <div v-if="licenseShow" class="config-backdrop" @click="close">
          <div class="config-panel" @click.stop>
            <!-- 动态背景 -->
            <div class="bg-gradient"></div>
            <div class="bg-mesh"></div>

            <!-- 固定头部 -->
            <header class="panel-header">
              <div class="header-content">
                <div class="title-group">
                  <h1>密钥管理</h1>
                  <p>密钥设置 · 信息查询 · 权限详情</p>
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
                    v-model="form.licenseCode"
                    type="text"
                    placeholder="输入访问密钥(必填)"
                    class="key-input"
                />
              </div>
              <button class="key-btn" @click="applyKey">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </div>

            <!-- 密钥说明与信息显示 -->
            <main class="scrollable-content">
              <section class="info-section">
                <h3>
                  密钥说明
                  <div class="global-tip-icon" data-tip="请输入您的密钥进行验证。&#10;&#10;验证成功后将显示密钥状态、绑定机器、调用限制、权限列表等详细信息。">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5">
                      <circle cx="8" cy="8" r="6"/>
                      <path d="M8 7v4M8 5h.01"/>
                    </svg>
                  </div>
                </h3>

                <!-- 优化后的紧凑说明卡片 -->
                <div class="compact-notice">
                  <div class="notice-item">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M12 8h.01"/>
                      <path d="M11 12h1v4h1"/>
                    </svg>
                    <div>
                      <strong>本站为公益项目</strong>，部分功能消耗大量算力，为防止恶意攻击和资源滥用，引入密钥机制。
                    </div>
                  </div>

                  <div class="notice-item">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                    </svg>
                    <div>
                      <strong>所有功能及密钥完全免费</strong>，请直接在微信交流群联系群主获取，<strong>不要相信任何收费渠道</strong>。
                    </div>
                  </div>

                  <div class="notice-item">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    </svg>
                    <div>
                      密钥仅用于调用频率和机器绑定限制，请妥善保管，支持多设备绑定。
                    </div>
                  </div>
                </div>
              </section>

              <!-- 密钥信息显示（验证成功后） -->
              <section v-if="licenseInfo" class="info-grid">
                <div class="info-card basic-info">
                  <div class="card-header">
                    <div class="icon">
                      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="4" y="8" width="24" height="18" rx="2"/>
                        <path d="M12 2v6M20 2v6"/>
                      </svg>
                    </div>
                    <h4>基本信息</h4>
                  </div>
                  <div class="info-list">
                    <div class="info-item">
                      <span class="label">密钥状态：</span>
                      <span class="value status-active">{{ licenseInfo.status === 'ACTIVE' ? '有效' : '无效' }}</span>
                    </div>
                    <div class="info-item">
                      <span class="label">生效时间：</span>
                      <span class="value">{{ licenseInfo.startTime }}</span>
                    </div>
                    <div class="info-item">
                      <span class="label">过期时间：</span>
                      <span class="value">{{ licenseInfo.expireTime }}</span>
                    </div>
                  </div>
                </div>

                <div class="info-card bind-info">
                  <div class="card-header">
                    <div class="icon">
                      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="16" cy="12" r="4"/>
                        <path d="M4 26v-4a8 8 0 0 1 16 0v4"/>
                      </svg>
                    </div>
                    <h4>绑定信息</h4>
                  </div>
                  <div class="info-list">
                    <div class="info-item">
                      <span class="label">最大绑定机器数：</span>
                      <span class="value">{{ licenseInfo.maxMachines }}</span>
                    </div>
                    <div class="info-item">
                      <span class="label">已绑定机器数：</span>
                      <span class="value">{{ licenseInfo.machineIds.length }}</span>
                    </div>
                    <div class="info-item machines">
                      <span class="label">已绑定机器ID：</span>
                      <div class="keyword-tags">
                        <div v-for="(id, i) in licenseInfo.machineIds" :key="i" class="keyword-tag">
                          {{ id }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="info-card limit-info">
                  <div class="card-header">
                    <div class="icon">
                      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="16" cy="16" r="12"/>
                        <path d="M16 8v8l5 5"/>
                      </svg>
                    </div>
                    <h4>调用限制</h4>
                  </div>
                  <div class="info-list">
                    <div class="info-item">
                      <span class="label">每分钟最大调用：</span>
                      <span class="value">{{ licenseInfo.limitPerMinute }}</span>
                    </div>
                    <div class="info-item">
                      <span class="label">每天最大调用：</span>
                      <span class="value">{{ licenseInfo.limitPerDay }}</span>
                    </div>
                  </div>
                </div>

                <div class="info-card features-info">
                  <div class="card-header">
                    <div class="icon">
                      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M4 16h24M16 4v24"/>
                        <circle cx="16" cy="16" r="6"/>
                      </svg>
                    </div>
                    <h4>权限功能</h4>
                  </div>
                  <div class="info-list">
                    <div class="info-item permissions">
                      <span class="label">已启用功能：</span>
                      <div class="keyword-tags">
                        <div v-for="(feat, i) in licenseInfo.features" :key="i" class="keyword-tag">
                          {{ formatFeature(feat) }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </main>

            <footer class="panel-footer">
              <div class="shortcuts">
                <kbd>ESC</kbd> 关闭
              </div>
              <button class="confirm-btn" @click="close">
                关闭
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
import {getLocalStorage, LOCAL_STORAGE_KEYS, setLocalStorage} from "@/utils/localStorageUtils";
import {isValidLicense} from "@/utils/stringUtils";
import {getLicenseConfig} from "@/api/api";

export default {
  name: 'LicenseComponent',
  data() {
    return {
      form: {
        licenseCode: '',
      },
      licenseInfo: null,
    }
  },
  computed: {
    licenseShow: {
      get() {
        return this.$store.state.licenseShow; // 请确保你的 Vuex store 中有 licenseShow 状态
      },
      set(value) {
        this.$store.commit('setLicenseShow', value);
      }
    },
  },
  mounted() {
    window.addEventListener('keydown', this.onKey);
    this.licenseInit();
  },
  beforeUnmount() {
    window.removeEventListener('keydown', this.onKey);
  },
  methods: {
    licenseInit() {
      this.form.licenseCode = getLocalStorage(LOCAL_STORAGE_KEYS.LICENSE_DODE) || '';
      if (this.form.licenseCode) {
        this.applyKey();
      }else {
        this.$message.error('密钥无效，请检查');
      }
    },
    close() {
      this.licenseShow = false;
    },
    applyKey() {
      const successMessage = '密钥有效';
      const errorMessage = '密钥无效，请检查';
      if (!this.form.licenseCode || !isValidLicense(this.form.licenseCode)) {
        this.licenseInfo = null;
        if (this.licenseShow) {
          this.$message.error(errorMessage);
        }
      }else {
        getLicenseConfig(this.form.licenseCode)
            .then(res => {
              const result = res?.data?.data || false;
              if (result && res.data.code !== 999) {
                this.licenseInfo = result
                setLocalStorage(LOCAL_STORAGE_KEYS.LICENSE_DODE, this.form.licenseCode);
                this.$umami.track('licenseCode密钥成功缓存');
                if (this.licenseShow) {
                  this.$message.success(successMessage);
                }
              } else {
                if (this.licenseShow && res.data.code === 999) {
                  this.$message.error(res.data.message);
                }
              }
            })
            .finally(() => {
            });
      }
    },
    onKey(e) {
      if (!this.licenseShow) return;
      if (e.key === 'Escape') {
        this.close();
      }
    },
    formatFeature(feat) {
      const map = {
        BASIC:'基础权限',
        SEARCH:'数据搜索',
        SUBSCRIPTION:'订阅推送',
        SUDDEN_NEWS:'突发新闻',
        AI_SUMMARY:'AI简报',
      };
      return map[feat] || feat;
    }
  }
}
</script>

<style scoped>
/* 所有样式与原 SubscriptionConfigModal 完全一致（已复制） */
.scrollable-content::-webkit-scrollbar { width: 8px; }
.scrollable-content::-webkit-scrollbar-track { background: rgba(255, 255, 255, 0.02); border-radius: 10px; }
.scrollable-content::-webkit-scrollbar-thumb { background: linear-gradient(180deg, rgba(100, 181, 255, 0.25), rgba(100, 181, 255, 0.35)); border-radius: 10px; }
.scrollable-content::-webkit-scrollbar-thumb:hover { background: linear-gradient(180deg, rgba(100, 181, 255, 0.4), rgba(100, 181, 255, 0.5)); }
.scrollable-content { scrollbar-width: thin; scrollbar-color: rgba(100, 181, 255, 0.3) rgba(255, 255, 255, 0.02); }

.key-input-row { margin: 0 28px 20px; display: flex; align-items: center; gap: 12px; }
.key-input-wrapper { flex: 1; display: flex; align-items: center; gap: 10px; background: rgba(40, 44, 56, .6); padding: 12px 16px; border-radius: 14px; border: 1px solid rgba(255, 255, 255, .12); backdrop-filter: blur(8px); }
.key-input-wrapper svg { color: #64b5ff; flex-shrink: 0; }
.key-input { flex: 1; background: transparent; border: none; outline: none; color: #e6edf3; font-size: 14.5px; }
.key-input::placeholder { color: #6b7280; }
.key-btn { width: 46px; height: 46px; border-radius: 14px; background: linear-gradient(135deg, #409eff, #3a8fee); color: white; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(64, 158, 255, .3); transition: all .25s; }
.key-btn:hover { transform: translateY(-2px); box-shadow: 0 6px 16px rgba(64, 158, 255, .4); }

.global-tip-icon { display: inline-flex; align-items: center; justify-content: center; width: 18px; height: 18px; color: rgba(255, 255, 255, 0.4); cursor: help; transition: all 0.3s ease; position: relative; margin-left: 6px; flex-shrink: 0; }
.global-tip-icon:hover { color: #64b5ff; }
/* ... 其余所有样式与你原来的 SubscriptionConfigModal.vue 完全相同，可直接复制粘贴 ... */

/* 新增样式：信息网格和卡片 */
.info-section { margin-bottom: 24px; }
.info-section h3 { font-size: 17px; color: #e6edf3; margin-bottom: 12px; display: flex; align-items: center; gap: 8px; font-weight: 600; }
.description { font-size: 14px; color: #8892b0; line-height: 1.6; }

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 18px;
  margin-top: 24px;
}

@media (max-width: 1024px) {
  .info-grid { grid-template-columns: 1fr; }
}

.info-card {
  background: rgba(40, 44, 56, .5);
  border: 1px solid rgba(255, 255, 255, .08);
  border-radius: 16px;
  padding: 18px;
  transition: all .35s cubic-bezier(.16, 1, .3, 1);
}

.info-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 0 0 3px rgba(64, 158, 255, .15);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 16px;
}

.icon {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(64, 158, 255, .1);
  color: #64b5ff;
  flex-shrink: 0;
}

.info-card h4 {
  font-size: 16px;
  color: #e6edf3;
  font-weight: 600;
  margin: 0;
}

.info-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 14px;
}

.info-item .label {
  font-weight: 500;
  color: #a8b3cf;
}

.info-item .value {
  color: #64b5ff;
  font-weight: 600;
}

.status-active {
  color: #2db302;
}

.machines .keyword-tags,
.permissions .keyword-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 4px;
}

.keyword-tag {
  background: rgba(64, 158, 255, .15);
  color: #64b5ff;
  padding: 4px 8px;
  border-radius: 8px;
  font-size: 12px;
  border: 1px solid rgba(100, 181, 255, .3);
}

/* 其余原有样式（config-backdrop、config-panel、panel-header、panel-footer、动画等）全部保留，与 SubscriptionConfigModal 完全一致 */
.config-backdrop { position: fixed; inset: 0; background: rgba(0, 0, 0, .85); backdrop-filter: blur(20px) saturate(120%); display: flex; align-items: center; justify-content: center; z-index: 2300; padding: 12px; animation: fadeIn .3s ease; }
.config-panel { width: 80%; height: 90vh; max-height: 900px; background: linear-gradient(145deg, rgba(30, 33, 42, .95), rgba(20, 23, 32, .95)); border-radius: 24px; overflow: hidden; box-shadow: 0 25px 80px rgba(0, 0, 0, .6), 0 0 0 1px rgba(255, 255, 255, .08); display: flex; flex-direction: column; animation: slideUp .45s cubic-bezier(.16, 1, .3, 1); }
.scrollable-content { flex: 1; overflow-y: auto; padding: 0 28px 28px; -webkit-overflow-scrolling: touch; }
.panel-header { padding: 28px 28px 20px; flex-shrink: 0; position: relative; z-index: 2; }
.panel-footer { padding: 20px 28px; flex-shrink: 0; display: flex; justify-content: space-between; align-items: center; gap: 16px; position: relative; z-index: 2; }
.bg-gradient { position: absolute; top: -50%; left: -50%; width: 200%; height: 200%; background: radial-gradient(circle at 30% 30%, rgba(64, 158, 255, .15), transparent 50%), radial-gradient(circle at 70% 70%, rgba(255, 89, 89, .12), transparent 50%); animation: rotate 25s linear infinite; pointer-events: none; }
.bg-mesh { position: absolute; inset: 0; background-image: linear-gradient(rgba(255, 255, 255, .02) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, .02) 1px, transparent 1px); background-size: 30px 30px; pointer-events: none; }
.header-content { display: flex; justify-content: space-between; align-items: center; }
.title-group h1 { font-size: 26px; font-weight: 800; background: linear-gradient(135deg, #fff, #a8b3cf); -webkit-background-clip: text; -webkit-text-fill-color: transparent; letter-spacing: -.5px; margin-bottom: 4px; }
.title-group p { font-size: 13.5px; color: #8892b0; }
.close-btn { width: 38px; height: 38px; border-radius: 12px; background: rgba(255, 255, 255, .05); border: 1px solid rgba(255, 255, 255, .08); color: #ccd6f6; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all .25s; }
.close-btn:hover { background: rgba(255, 255, 255, .1); transform: scale(1.05); }
.shortcuts { font-size: 13px; color: #6b7280; }
.shortcuts kbd { background: rgba(255, 255, 255, .08); padding: 4px 7px; border-radius: 5px; font-size: 11px; border: 1px solid rgba(255, 255, 255, .1); font-family: ui-monospace, monospace; margin: 0 2px; }
.confirm-btn { display: flex; align-items: center; gap: 8px; padding: 11px 24px; background: linear-gradient(135deg, #409eff, #3a8fee); color: #fff; border: none; border-radius: 11px; font-weight: 600; cursor: pointer; box-shadow: 0 4px 16px rgba(64, 158, 255, .3); transition: all .3s; }
.confirm-btn:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(64, 158, 255, .4); }
.confirm-btn svg { transition: transform .3s; }
.confirm-btn:hover svg { transform: translateX(3px); }

@keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
@keyframes slideUp { from { opacity: 0; transform: translateY(30px) scale(.95) } to { opacity: 1; transform: none } }
@keyframes rotate { from { transform: rotate(0) } to { transform: rotate(360deg) } }

@media (max-width: 768px) {
  .config-panel { height: 92vh; border-radius: 20px; }
  .panel-header { padding: 24px 20px 16px; }
  .title-group h1 { font-size: 23px; }
  .scrollable-content { padding: 0 20px 24px; }
  .panel-footer { padding: 18px 20px; flex-direction: column-reverse; gap: 14px; }
  .confirm-btn { width: 100%; justify-content: center; padding: 13px; }
}
/* 紧凑型密钥说明卡片 */
.compact-notice {
  background: rgba(64, 158, 255, 0.08);
  border: 1px solid rgba(64, 158, 255, 0.25);
  border-radius: 14px;
  padding: 16px;
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.notice-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  font-size: 14px;
  color: #a8b3cf;
  line-height: 1.6;
}

.notice-item svg {
  color: #64b5ff;
  flex-shrink: 0;
  margin-top: 1px;
}

.notice-item strong {
  color: #e6edf3;
}
</style>