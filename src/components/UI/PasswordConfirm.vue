<!-- PasswordConfirmDialog.vue -->
<template>
  <transition name="dialog-fade">
    <div v-if="visible" class="dialog-overlay" @click="handleClose">
      <!-- 对话框 -->
      <div class="dialog-container" @click.stop>
        <!-- 关闭按钮 -->
        <button class="close-btn" @click="handleClose">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <!-- 头部 -->
        <div class="dialog-header">
          <div class="header-content">
            <div class="icon-wrapper">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div>
            <h2 class="dialog-title">{{ title }}</h2>
          </div>
          <p class="dialog-description" v-html="description"></p>
        </div>

        <!-- 表单内容 -->
        <div class="dialog-body">
          <div class="input-wrapper">
            <input
                ref="passwordInput"
                v-bind:type="showPassword ? 'text' : 'password'"
                v-model="password"
                v-on:keydown.enter="handleSubmit"
                placeholder="请输入密码"
                class="password-input"
                v-bind:class="{ 'input-error': error }"
                v-bind:disabled="isLoading"
            />
            <button
                type="button"
                class="toggle-password-btn"
                @click="showPassword = !showPassword"
            >
              <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                <line x1="1" y1="1" x2="23" y2="23"></line>
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
            </button>
          </div>

          <!-- 错误提示 -->
          <transition name="error-shake">
            <p v-if="error" class="error-message">{{ error }}</p>
          </transition>

          <!-- 按钮组 -->
          <div class="button-group">
            <button
                type="button"
                class="btn btn-cancel"
                @click="handleClose"
                v-bind:disabled="isLoading"
            >
              取消
            </button>
            <button
                type="button"
                class="btn btn-confirm"
                @click="handleSubmit"
                v-bind:disabled="isLoading"
            >
              {{ isLoading ? '验证中...' : '确认' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'PasswordConfirmDialog',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '密码确认'
    },
    description: {
      type: String,
      default: '请输入密码以确认操作'
    },
    onConfirm: {
      type: Function,
      required: true
    }
  },
  emits: ['update:visible'],
  data() {
    return {
      password: '',
      showPassword: false,
      error: '',
      isLoading: false
    };
  },
  watch: {
    visible(newVal) {
      if (newVal) {
        this.$nextTick(() => {
          if (this.$refs.passwordInput) {
            this.$refs.passwordInput.focus();
          }
        });
      } else {
        this.resetForm();
      }
    }
  },
  methods: {
    async handleSubmit() {
      if (!this.password.trim()) {
        this.error = '请输入密码';
        return;
      }

      this.isLoading = true;
      this.error = '';

      try {
        await this.onConfirm(this.password);
        this.handleClose();
      } catch (err) {
        this.error = err.message || '密码错误，请重试';
      } finally {
        this.isLoading = false;
      }
    },
    handleClose() {
      this.$emit('update:visible', false);
    },
    resetForm() {
      this.password = '';
      this.error = '';
      this.showPassword = false;
    }
  }
};
</script>

<style scoped>
.dialog-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
}

.dialog-container {
  position: relative;
  background: white;
  border-radius: 1rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  width: 100%;
  max-width: 28rem;
}

.close-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  color: #9ca3af;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
  transition: color 0.2s;
}

.close-btn:hover {
  color: #4b5563;
}

.dialog-header {
  padding: 1.5rem 1.5rem 1rem;
}

.header-content {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
}

.icon-wrapper {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background-color: #dbeafe;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #2563eb;
}

.dialog-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #111827;
  margin: 0;
}

.dialog-description {
  color: #6b7280;
  margin: 0;
  margin-left: 3.75rem;
  text-align: left;
}

.dialog-body {
  padding: 0 1.5rem 1.5rem;
}

.input-wrapper {
  position: relative;
}

.password-input {
  width: 100%;
  padding: 0.75rem 3rem 0.75rem 1rem;
  border: 2px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: all 0.2s;
  outline: none;
  background-color: white;
  color: #111827;
}

.password-input:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
}

.password-input.input-error {
  border-color: #ef4444;
}

.password-input.input-error:focus {
  box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.1);
}

.password-input:disabled {
  background-color: #f3f4f6;
  cursor: not-allowed;
}

.toggle-password-btn {
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #9ca3af;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
  display: flex;
  align-items: center;
  transition: color 0.2s;
}

.toggle-password-btn:hover {
  color: #4b5563;
}

.error-message {
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: #ef4444;
  text-align: left;
}

.button-group {
  display: flex;
  gap: 0.75rem;
  margin-top: 1.5rem;
}

.btn {
  flex: 1;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-cancel {
  background-color: #f3f4f6;
  color: #374151;
}

.btn-cancel:hover:not(:disabled) {
  background-color: #e5e7eb;
}

.btn-confirm {
  background-color: #3b82f6;
  color: white;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.btn-confirm:hover:not(:disabled) {
  background-color: #2563eb;
  transform: scale(1.05);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

/* 动画 */
.dialog-fade-enter-active {
  animation: fadeIn 0.2s ease-out;
}

.dialog-fade-leave-active {
  animation: fadeIn 0.2s ease-out reverse;
}

.dialog-fade-enter-active .dialog-container {
  animation: slideUp 0.3s ease-out;
}

.error-shake-enter-active {
  animation: shake 0.3s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes shake {
  0%, 100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-5px);
  }
  75% {
    transform: translateX(5px);
  }
}

/* 深色模式支持 */
@media (prefers-color-scheme: dark) {
  .dialog-container {
    background: #1f2937;
  }

  .dialog-title {
    color: #f9fafb;
  }

  .dialog-description {
    color: #9ca3af;
  }

  .icon-wrapper {
    background-color: rgba(37, 99, 235, 0.2);
    color: #60a5fa;
  }

  .password-input {
    background-color: #374151;
    border-color: #4b5563;
    color: #f9fafb;
  }

  .password-input::placeholder {
    color: #9ca3af;
  }

  .password-input:focus {
    border-color: #3b82f6;
  }

  .btn-cancel {
    background-color: #374151;
    color: #d1d5db;
  }

  .btn-cancel:hover:not(:disabled) {
    background-color: #4b5563;
  }

  .close-btn:hover {
    color: #d1d5db;
  }
}
</style>