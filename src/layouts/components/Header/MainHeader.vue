<script setup lang="ts">
import { getLanguageApi, saveLanguageAPI } from '@/api/layouts';
import avatarUrl from '@/assets/images/avatar.jpeg';
import logoUrl from '@/assets/images/logo.png';
import en from 'element-plus/lib/locale/lang/en';
import zhCN from 'element-plus/lib/locale/lang/zh-CN';
import { defineEmits, onBeforeMount } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

const router = useRouter();
const { locale: localeLanguage } = useI18n({ useScope: 'global' });
const { t } = useI18n();
const emit = defineEmits<{ (event: 'changeLanguage', language: any): void }>();

async function handleSelect(key: string, keyPath: string[]) {
  if (keyPath[0] === 'language') {
    if (key === 'zh-CN') {
      emit('changeLanguage', zhCN);
      await saveLanguageAPI('zh-CN');
    } else if (key === 'en') {
      emit('changeLanguage', en);
      await saveLanguageAPI('en');
    }
  } else if (keyPath[0] === 'auth') {
    router.push({ name: 'Login' });
  }
}

onBeforeMount(async () => {
  const response = await getLanguageApi();
  if (response && response.result) {
    if (response.result.name === 'zh-CN') {
      emit('changeLanguage', zhCN);
    } else if (response.result.name === 'en') {
      emit('changeLanguage', en);
    }
  }
});
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
            <el-icon><icon-picture /></el-icon>
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
        <el-menu-item index="zh-CN" v-if="localeLanguage !== 'zh-CN'">
          {{ t('header.menu.chinese') }}
        </el-menu-item>

        <!-- English -->
        <el-menu-item index="en" v-if="localeLanguage !== 'en'">
          {{ t('header.menu.english') }}
        </el-menu-item>
      </el-sub-menu>

      <!-- Avatar -->
      <el-menu-item index="avatar" class="menu-item">
        <el-avatar
          :size="28"
          :src="avatarUrl"
          alt="avatar"
          class="avatar-container">
          <img
            src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
        </el-avatar>
      </el-menu-item>

      <!-- Auth -->
      <el-menu-item index="auth" class="menu-item">
        {{ t('auth.signinTab') }} / {{ t('auth.signupTab') }}
      </el-menu-item>
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
