<script lang="ts" setup>
import useForm from '@/composables/auth/useForm';
import { Lock, UserFilled } from '@element-plus/icons-vue';

const { t } = useI18n();
const {
  activeName,
  ruleFormRef,
  ruleForm,
  rules,
  handleSubmitForm,
  handleResetForm
} = useForm();
</script>

<template>
  <div class="login w-screen h-screen flex flex-row">
    <!-- * Left -->
    <div class="left-part">
      <router-link :to="{ name: 'Home' }" class="block w-full h-full" />
    </div>

    <!-- * Right -->
    <div class="right-part flex justify-center items-center">
      <div class="login-panel">
        <!-- * Tabs -->
        <el-tabs
          v-model="activeName"
          @tab-click="handleResetForm(ruleFormRef)"
          class="tabs">
          <el-tab-pane name="signin">
            <template #label>
              <span class="tabs-label text-lg">{{ t('auth.signinTab') }}</span>
            </template>
          </el-tab-pane>

          <el-tab-pane name="signup">
            <template #label>
              <span class="tabs-label text-lg">{{ t('auth.signupTab') }}</span>
            </template>
          </el-tab-pane>
        </el-tabs>

        <!-- * Form -->
        <el-form
          size="large"
          ref="ruleFormRef"
          class="mt-5"
          :model="ruleForm"
          :rules="rules"
          @keyup.enter.self="handleSubmitForm(ruleFormRef)">
          <!-- * Phone Number -->
          <el-form-item prop="phone">
            <el-input
              clearable
              class="input"
              :placeholder="t('auth.phone')"
              :prefix-icon="UserFilled"
              v-model="ruleForm.phone" />
          </el-form-item>

          <!-- * Password -->
          <el-form-item prop="password">
            <el-input
              clearable
              show-password
              class="input"
              :placeholder="t('auth.password')"
              :prefix-icon="Lock"
              v-model="ruleForm.password" />
          </el-form-item>

          <!-- * Submit Button -->
          <el-form-item class="mt-16">
            <el-button
              round
              type="primary"
              class="w-full"
              native-type="submit"
              @click.prevent="handleSubmitForm(ruleFormRef)">
              {{
                activeName === 'signin'
                  ? t('auth.signinBtn')
                  : t('auth.signupBtn')
              }}
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login {
  .left-part {
    flex: 3;
    background: #15258a url('../../assets/images/auth/background.png') no-repeat
      center/100%;
  }

  .right-part {
    flex: 2;

    .login-panel {
      width: 250px;
    }

    :deep(.el-tabs__nav-wrap) {
      &::after {
        display: none;
      }
    }

    :deep(.el-tabs__nav) {
      float: initial;
      text-align: center;
    }

    :deep(.el-tabs__item) {
      height: 36px;
    }

    :deep(.input) {
      .el-input__wrapper {
        background-color: rgb(243 244 246);
        border-radius: var(--el-border-radius-round);
        box-shadow: none;
      }
    }
  }
}
</style>
