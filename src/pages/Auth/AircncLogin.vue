<script setup lang="ts">
import { userSignInAPI, userSignUpAPI } from '@/api/auth';
import { useAuthStore } from '@/stores/auth';
import { Lock, UserFilled } from '@element-plus/icons-vue';
import { ElMessage, FormInstance, FormRules } from 'element-plus';
import 'element-plus/es/components/message/style/css';
import { reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

interface IRuleForm {
  phone: string;
  password: string;
}

const authStore = useAuthStore();
const { t } = useI18n();
const router = useRouter();

const activeName = ref<string>('signin');
const ruleFormRef = ref<FormInstance>();

const ruleForm = reactive<IRuleForm>({ phone: '', password: '' });
const rules = reactive<FormRules>({
  phone: [
    {
      required: true,
      message: t('require', { name: t('auth.phone') }),
      trigger: 'blur'
    },
    {
      min: 11,
      max: 11,
      message: '请输入正确的手机号码',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: t('require', { name: t('auth.password') }),
      trigger: 'blur'
    }
  ]
});

async function handleSubmitForm(formEl: FormInstance | undefined) {
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      const response =
        activeName.value === 'signup'
          ? await userSignUpAPI(ruleForm)
          : await userSignInAPI(ruleForm);

      if (response && response.success && response.result) {
        const { message, result } = response;
        const { status } = result;

        authStore.setLoggedIn(status);
        ElMessage({
          message,
          type: 'success',
          showClose: true
        });

        router.push({ name: 'Home' });
        return;
      }

      if (response && !response.success) {
        ElMessage({
          showClose: true,
          message: response.message,
          type: 'error'
        });
      }
    } else {
      console.error('Error submit', fields);
    }
  });
}

function handleResetForm(formEl: FormInstance | undefined) {
  if (!formEl) return;
  formEl.resetFields();
  console.log('reset!');
}
</script>

<template>
  <div class="login w-screen h-screen flex flex-row">
    <!-- * Left -->
    <div class="left-part"></div>

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
          @submit.prevent="handleSubmitForm(ruleFormRef)"
          @keyup.enter="handleSubmitForm(ruleFormRef)">
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
            <el-button round type="primary" class="w-full" native-type="submit">
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
