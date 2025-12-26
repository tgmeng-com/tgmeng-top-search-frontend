<!-- LicenseComponent.vue - 密钥管理界面（完整版 + 模拟数据） -->
<template>
  <div>
    <teleport to="body">
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
                window.umami.track('licenseCode密钥成功缓存');
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
.config-backdrop { position: fixed; inset: 0; background: rgba(0, 0, 0, .85); backdrop-filter: blur(20px) saturate(120%); display: flex; align-items: center; justify-content: center; z-index: 1999; padding: 12px; animation: fadeIn .3s ease; }
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


861B-0FQM-JI1S-60R7-BWP7-1YQO
8Q0L-K300-LN4P-WEX0-X6S3-6HHQ
SPKZ-DYS2-BI2F-MZZQ-1AP3-RALB
EY7D-B726-2U6K-1JLF-7PZ1-NUPF
1RRE-BIJE-K7V6-SKRE-Y1TX-WFJ4
UUX1-4DYS-EPPD-5P6Z-7ST7-YJNB
O7L1-XFHA-VC0V-YM17-K2KV-61GP
AEOI-R592-5G5B-RWIM-DJ7Q-3VF2
KI8F-NS9X-JMWN-2K1P-FJ43-BVRR
NJH6-FGT0-4KVC-LB9S-5ZTG-2HGX
NG8V-AZ7A-FCYX-O6AZ-QWK1-0ML5
WS0I-00LD-HX18-N1GA-V35H-BHUM
J1OT-R634-UEGZ-HRZG-DCIU-VEIP
7OGS-5QLZ-A4UL-6OZQ-1BIZ-KOSS
RRQZ-7GBN-NREB-GJ54-XT45-ILHO
MQ0Y-G4A3-10Q4-QNGA-T60T-9VED
1CWV-IL9B-9IKU-2OG4-N1PZ-4ODI
BE8F-Z9LC-UJXM-KUW3-IGR4-8QQD
AJ8N-EBVX-72ON-2SDH-09DV-M736
6B23-27OY-GRRP-FVHK-ZSU0-TVN4
9FWP-4KC0-DF09-MLK2-9OOU-ZF8R
2HE9-CZ3R-D2C2-W69H-85CF-IRYU
K8MS-JX9D-8MCX-02A1-70SD-9F4E
7QRR-VRAO-QPJ3-WBUX-FT4B-1I1P
SY7T-M9B3-ELPZ-R8ES-NL6T-Z7EP
FXMM-UAWM-F8O2-SEW9-E774-YOKQ
AOHR-4LP1-1OF8-YFE3-FOPA-H1DX
1R3O-SQMY-XR5F-R1CO-Q0LO-5PNO
FWBA-E0P0-QBPC-V7JW-9PY2-T1MH
FQ40-XJNW-C2RW-SP73-K5KN-C6JE
XVAU-2TMP-3JJQ-POT7-Z1Q7-ORWZ
KN6A-XW0N-R1EV-X9ZR-XOS7-HZXG
17JY-AKN0-HWES-8BBG-OH6H-LPJP
QXUD-7OR6-LJI5-95I6-LQZJ-QZN3
SYX6-KDER-EANB-GXUW-8ZTC-DFSL
1OFQ-TNF1-22C0-K7Q1-9T2F-CMA5
TS86-32KC-D1OM-VZGE-INGL-LRDY
PMUB-2A0T-RV9Q-F5S0-2BGR-2X03
TYZA-IE4W-HUFN-ZHMY-NA3H-H72X
EWJJ-M9WP-MI6K-TUO2-TRTY-5V0D
4YTX-245U-YTSG-XGVN-RDRZ-HLUG
KK3R-3BC9-4XF9-M6MZ-EYHW-TA25
U5IF-QHBZ-0BPO-2SU3-KDHP-2LMV
RWKG-PI2N-MAGE-WT5P-6TIP-2FDB
FNQA-UX0R-T1MD-5IGD-PYZW-ZDPX
YGSZ-FPVG-UBPI-Z2MS-KAS2-T4WT
X50V-VDHS-G7VS-1GMS-QKQY-MJW3
P18H-CRE7-2A7U-IJGH-7GDU-26A1
ZEXG-WEDA-BMV9-SD73-DB1Q-U4MO
SNVK-OW9P-V85P-2G31-5OWO-NMDF
PCO4-54V8-GZY9-TPPM-RR1I-NG8K
XI5G-FSC1-UKU9-YT96-YRPZ-NR3N
EWV9-BXYD-K77P-MECM-M80L-V0WR
NQIF-T6Q9-L8CX-JVJS-OVHS-S0IO
LVQS-0MS3-133O-L1B6-BA2X-AHGZ
JFX6-1F2J-P09T-4ZJO-0DNA-CX5I
TBQ6-KIPA-LRHM-TO1M-HBQS-ZTOA
R4B1-JTZ1-EAIG-1A9C-RVFU-7OKA
HKJY-FXCY-113V-TJT5-JW7D-LJN6
TNED-YIZN-LZSZ-XH4M-FH9T-QNIM
FBHV-8ILG-9WAN-GWWC-5B4R-S9TL
MLR5-IJPC-KSUJ-1W4H-NQEV-2X97
7CSE-ESPN-9I8L-XNG0-TAVH-JMBH
RQ6A-74HE-ZA60-EPXF-0GGD-QDWU
MEKY-AYC0-9E5P-5UEE-0ITJ-5OMZ
ZF4L-A6B2-HI8X-WLC2-PN8R-42B8
ACTG-JYXF-3SN5-IX9Q-ZF9P-A2HW
3F58-1XFV-YVAP-KBLK-MSX2-NDJG
MONY-DW5P-IP58-WRLX-WZNF-W94B
5O5W-ZBI7-32LD-XN4O-5B65-81VG
FP13-N9TN-4VR4-1KUL-625B-DCOY
133Y-94WD-UTUL-O0UX-II5T-YGLF
47U3-CXWV-NBEX-YTJ3-DGVQ-FEXL
RFTH-7QS3-JCV9-0UDD-CZIK-M1CL
THKN-WUJM-WG0X-A1H9-IGOO-OUV1
4S8T-NCQG-GBL7-SUCW-83KV-193O
R2L4-CRSC-XLJV-MM24-60WP-OXSN
U5E9-KTH3-YG6Z-3W0E-VRVP-BB4C
C1K5-EY5I-JJX6-Y1SY-GE6U-LJRN
K2Y3-YU37-YG76-56IV-7QQQ-P3ZI
UFUI-XL8F-Q3PF-GSVE-6NQ9-CWXJ
39WP-B4B0-0KJA-FLCW-E0RU-4N5E
ZBC2-G3Z9-SIED-RTJ5-QTD4-C0PT
2O35-7ODZ-0KMO-RD2R-KZ5B-1BGF
US7M-Y05V-X28Z-DX72-XOYY-FSSA
83HF-BY2W-W8X7-4YUA-J6ME-8YCH
2EBL-A0TB-6VM0-YOU5-RZVS-ZG9C
5Q4D-R50P-57B2-7X6G-4EDQ-1U4Z
HWZZ-DQ4W-6GW2-LMJT-0S3C-PE7O
ZWDU-ICWX-C27C-OHMM-S0Y1-U02W
GQIN-7IZM-FAMZ-7H20-5ZQN-7DJZ
V1VO-ENW4-AOVN-JELL-HNM5-1JYE
69YU-79LK-EZFX-NROM-Z6RB-7AQG
DMFN-4DLU-E9SC-RV0X-YQ0K-FPG1
XLQU-BLPY-KT37-2TBK-LUM3-1MXB
NCEE-O0PR-AWTS-DXN5-0Q9M-O4YU
ZQNX-XHQW-OJEY-RDZ8-GF28-S6NO
4YUA-88TP-0G2Z-MNL0-ZGN0-38QL
J9WT-MAXB-IF3Q-7VBX-RBUJ-YPUJ
P5EJ-9RQN-2BXB-STVB-27D2-JCTB