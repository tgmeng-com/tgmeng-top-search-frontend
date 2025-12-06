// 安装客户端的提示弹窗
<template>
  <div>
    <!-- 通知弹窗 -->
    <div class="notification" :class="{ show: notificationShow }">
      <button class="close-btn" @click="hideNotification">×</button>

      <div class="notification-header">
        <span class="notification-icon">{{ notification.icon }}</span>
        <span>{{ notification.title }}</span>
      </div>

      <div class="notification-body">
        {{ notification.message }}
      </div>

      <div class="notification-buttons">
        <button
            v-for="(btn, idx) in notification.buttons"
            :key="idx"
            class="notification-btn"
            :class="btn.type"
            @click="btn.action"
        >
          {{ btn.text }}
        </button>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      deferredPrompt: null,

      notificationShow: false,
      notification: {
        icon: "",
        title: "",
        message: "",
        buttons: []
      },
    };
  },

  mounted() {
    this.initPWA();
  },

  beforeUnmount() {
    document.removeEventListener("mousemove", this.onMouseMove);
    document.removeEventListener("mouseup", this.onMouseUp);
    document.removeEventListener("touchmove", this.onTouchMove);
    document.removeEventListener("touchend", this.onTouchEnd);
    document.removeEventListener("click", this.handleClickOutside);
  },

  methods: {
    initPWA() {
      // iOS Safari: 手动提示
      if (this.isIOS && this.isInStandaloneMode) {
        // iOS 已经安装，不提示
        return;
      }else if (this.isIOS && !this.isInStandaloneMode) {
        setTimeout(() => {
          this.showInstallIOSPrompt()
        }, 2000);
      }else if (this.isBeforeInstallPromptSupported){
        // 除ios手机端之外的，其他的都走这个事件，因为只有ios手机没有beforeinstallprompt事件
        window.addEventListener('beforeinstallprompt', (e) => {
          // 阻止 浏览器的自动安装弹窗
          e.preventDefault();
          this.deferredPrompt = e;
          // 显示自定义通知弹窗
          this.showInstallClientPrompt()
        });
      }else {
        setTimeout(() => {
          this.showInstallNotSupportedPrompt()
        }, 2000);
      }
    },
    /** ---------------- 通知弹窗 ---------------- **/
    showNotification({icon, title, message, buttons}) {
      this.notification.icon = icon;
      this.notification.title = title;
      this.notification.message = message;
      this.notification.buttons = buttons;
      this.notificationShow = true;
    },

    hideNotification() {
      this.notificationShow = false;
    },

    /** ---------------- 提示安装客户端弹框 ---------------- **/
    // 提示安装客户端弹框
    showInstallClientPrompt() {
      this.showNotification({
        icon: '📲',
        title: '添加本站到主屏幕',
        message: '将本站添加到主屏幕，便于随时快速访问',
        buttons: [
          {
            text: '稍后提醒',
            type: 'secondary',
            action: this.hideNotification
          },
          {
            text: '立即添加',
            type: 'primary',
            action: async () => {
              this.hideNotification();
              if (this.deferredPrompt) {
                this.deferredPrompt.prompt(); // 弹出原生安装弹窗
                const choiceResult = await this.deferredPrompt.userChoice;
                if (choiceResult.outcome === "accepted"){
                  window.umami.track('💻客户端安装【系统:'+this.detectDevice+',浏览器:'+this.detectBrowser+'】')
                }
                this.deferredPrompt = null;
              }
            }
          }
        ]
      });
    },

    // iOS安装客户端提示弹框
    showInstallIOSPrompt() {
      this.showNotification({
        icon: '📲',
        title: '添加到主屏幕',
        message: '请通过 Safari 底部的分享按钮，选择“添加到主屏幕”，即可快速访问本站内容',
        buttons: [
          {text: '我知道了', type: 'primary', action: this.hideNotification}
        ]
      });
    },
    showInstallNotSupportedPrompt() {
      this.showNotification({
        icon: '⚠️',
        title: '暂不支持自动安装',
        message: '您的浏览器暂不支持自动安装本站客户端。建议使用 Chrome 浏览器获取最佳体验',
        buttons: [
          {text: '我知道了', type: 'primary', action: this.hideNotification}
        ]
      });
    },


  },
  computed: {
    isIOS() {
      return /iphone|ipad|ipod/.test(window.navigator.userAgent.toLowerCase());
    },
    isInStandaloneMode() {
      return ('standalone' in window.navigator) && window.navigator.standalone;
    },
    detectDevice() {
      const ua = navigator.userAgent.toLowerCase();

      // ===== iPhone / iPod =====
      if (ua.includes("iphone")) return "iPhone";
      if (ua.includes("ipod")) return "iPod";

      // ===== iPad / iPadOS（含伪装成 macOS 的 iPadOS）=====
      const isIPadOS =
          navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1;

      if (ua.includes("ipad") || isIPadOS) return "iPad";

      // ===== Android（区分手机和平板）=====
      if (ua.includes("android")) {
        const isTablet =
            !ua.includes("mobile") ||
            window.screen.width / window.devicePixelRatio > 600;

        return isTablet ? "Android Tablet" : "Android Phone";
      }

      // ===== HarmonyOS（鸿蒙系统）=====
      if (ua.includes("harmony") || ua.includes("arkui") || ua.includes("hlk-")) {
        return "HarmonyOS Device";
      }

      // ===== PC =====
      if (ua.includes("windows nt")) return "Windows PC";
      if (ua.includes("mac os x")) return "macOS";
      if (ua.includes("linux")) return "Linux PC";

      return "Unknown Device";
    },
    detectBrowser() {
      const ua = navigator.userAgent.toLowerCase();

      if (ua.includes('edg/')) return 'Edge';                       // 新 Edge (Chromium)
      if (ua.includes('opr/') || ua.includes('opera')) return 'Opera';
      if (ua.includes('brave')) return 'Brave';
      if (ua.includes('samsungbrowser')) return 'Samsung';
      if (ua.includes('qqbrowser')) return 'QQ Browser';
      if (ua.includes('micromessenger')) return 'WeChat';
      if (ua.includes('firefox')) return 'Firefox';

      // Safari 必须放在 Chrome 前面判断
      if (ua.includes('safari') && !ua.includes('chrome')) return 'Safari';

      // 最后判断 Chrome（避免被其他 Chromium 浏览器误伤）
      if (ua.includes('chrome')) return 'Chrome';

      return 'Unknown';
    },
    isBeforeInstallPromptSupported() {
      return 'onbeforeinstallprompt' in window;
    }
  }
};
</script>


<style>
/* 你原样的所有 CSS，1 字不动 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.notification {
  position: fixed;
  top: -200px;
  left: 50%;
  transform: translateX(-50%);
  background: white;
  color: #333;
  padding: 20px 30px;
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  z-index: 10000;
  max-width: 90%;
  width: 400px;
  transition: top 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.notification.show {
  top: 20px;
}

.notification-header {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  font-weight: bold;
  font-size: 1.1em;
}

.notification-icon {
  font-size: 1.5em;
  margin-right: 10px;
}

.notification-body {
  margin-bottom: 15px;
  line-height: 1.5;
  color: #666;
}

.notification-buttons {
  display: flex;
  gap: 10px;
}

.notification-btn {
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s;
}

.notification-btn.primary {
  background: #4285f4;
  color: white;
}

.notification-btn.primary:hover {
  background: #3367d6;
}

.notification-btn.secondary {
  background: #ae8204;
  color: white;
}

.notification-btn.secondary:hover {
  background: #736001;
}

.close-btn {
  position: absolute;
  top: 5px;
  right: 5px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #999;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s;
}

.close-btn:hover {
  background: #f1f3f4;
  color: #333;
}
</style>
