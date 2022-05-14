<script setup lang="ts">
import { userSignOutAPI } from '@/api/auth';
import avatarUrl from '@/assets/images/avatar.jpeg';
import logoUrl from '@/assets/images/logo.png';
import { useAuthStore } from '@/stores/auth';
import { useLocaleStore } from '@/stores/locale';
import { Picture as IconPicture } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import en from 'element-plus/lib/locale/lang/en';
import zhCN from 'element-plus/lib/locale/lang/zh-CN';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const localeStore = useLocaleStore();
const router = useRouter();
const { locale: localeLanguage } = useI18n({ useScope: 'global' });
const { t } = useI18n();

async function handleSelect(key: string, keyPath: string[]) {
  if (keyPath[0] === 'language') {
    if (key === 'zh-cn') {
      localeLanguage.value = 'zh-cn';
      localeStore.setLanguage(zhCN);
    } else if (key === 'en') {
      localeLanguage.value = 'en';
      localeStore.setLanguage(en);
    }
  } else if (keyPath[0] === 'auth') {
    router.push({ name: 'Login' });
  } else if (keyPath[0] === 'avatar') {
    if (key === 'signout') {
      const response = await userSignOutAPI();
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
      }
    }
  }
}
</script>

<template>
  <el-header
    class="w-full relative flex justify-between items-center p-0"
    height="81px">
    <!-- Left -->
    <h1 class="m-0 text-base">
      <el-image :src="logoUrl" alt="logo" class="logo-container z-10">
        <template #error>
          <div class="image-slot">
            <el-icon>
              <icon-picture />
            </el-icon>
          </div>
        </template>
      </el-image>
    </h1>

    <!-- Right -->
    <el-menu
      mode="horizontal"
      class="menu w-full h-full justify-end font-semibold border-neutral-150"
      @select="handleSelect">
      <!-- Trips -->
      <el-menu-item index="trips" class="menu-item">
        {{ t('header.menu.trips') }}
      </el-menu-item>

      <!-- Browsing History -->
      <el-menu-item index="history" class="menu-item">
        {{ t('header.menu.history') }}
      </el-menu-item>

      <!-- Language Selection -->
      <el-sub-menu
        index="language"
        class="submenu"
        popper-class="menu-popup-container"
        :popper-offset="-15">
        <template #title>{{ t('header.menu.language') }}</template>
        <!-- Chinese -->
        <el-menu-item index="zh-cn" v-show="localeLanguage !== 'zh-cn'">
          {{ t('header.menu.chinese') }}
        </el-menu-item>

        <!-- English -->
        <el-menu-item index="en" v-show="localeLanguage !== 'en'">
          {{ t('header.menu.english') }}
        </el-menu-item>

        <!-- Spanish -->
        <el-menu-item index="spanish" v-show="localeLanguage !== 'spanish'">
          {{ t('header.menu.spanish') }}
        </el-menu-item>
      </el-sub-menu>

      <!-- Auth -->
      <el-menu-item
        v-if="authStore.loggedIn === 0"
        index="auth"
        class="menu-item">
        {{ t('auth.signinTab') }} / {{ t('auth.signupTab') }}
      </el-menu-item>

      <!-- Avatar -->
      <el-sub-menu
        v-else
        index="avatar"
        class="submenu"
        popper-class="menu-popup-container"
        :popper-offset="-15">
        <template #title>
          <el-avatar
            :size="28"
            :src="avatarUrl"
            alt="avatar"
            class="avatar-container">
            <img
              src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
          </el-avatar>
        </template>
        <el-menu-item index="signout"> {{ t('auth.signoutBtn') }}</el-menu-item>
      </el-sub-menu>
    </el-menu>
  </el-header>
</template>

<style lang="scss" scoped>
.el-header {
  .logo-container {
    position: absolute;
    left: 24px;
    top: 50%;
    transform: translate3d(0, -50%, 0);
    width: 162px;

    .image-slot {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 80px;
      background: var(--el-fill-color-light);
      color: var(--el-text-color-secondary);
      font-size: 30px;

      .el-icon {
        font-size: 30px;
      }
    }
  }

  .menu {
    padding: 0 24px;

    .menu-item {
      padding: 0 12px;
    }

    .submenu {
      :deep(.el-sub-menu__title) {
        padding: 0 12px;
      }
    }
  }

  .avatar-container {
    box-shadow: rgb(235 235 235) 0px 0px 0px 2px !important;
  }
}
</style>
