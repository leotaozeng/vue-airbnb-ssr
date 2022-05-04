<script setup lang="ts">
import { getLanguageApi, saveLanguageAPI } from '@/api/layouts';
import avatarUrl from '@/assets/images/avatar.jpeg';
import logoUrl from '@/assets/images/logo.png';
import en from 'element-plus/lib/locale/lang/en';
import zhCn from 'element-plus/lib/locale/lang/zh-cn';
import { defineEmits, onBeforeMount } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const emit = defineEmits<{ (event: 'changeLanguage', language: any): void }>();

async function handleSelect(key: string, keyPath: string[]) {
  if (keyPath[0] === 'language') {
    if (key === 'zh') {
      emit('changeLanguage', zhCn);
      await saveLanguageAPI('zh');
    } else if (key === 'en') {
      emit('changeLanguage', en);
      await saveLanguageAPI('en');
    }
  }
}

onBeforeMount(async () => {
  const response = await getLanguageApi();
  if (response && response.result) {
    if (response.result.name === 'zh') {
      emit('changeLanguage', zhCn);
    } else if (response.result.name === 'en') {
      emit('changeLanguage', en);
    }
  }
});
</script>

<template>
  <header class="w-full relative flex justify-between items-center">
    <el-image :src="logoUrl" alt="logo" class="logo-container z-10" />

    <el-menu
      mode="horizontal"
      class="menu w-full h-full justify-end font-semibold"
      @select="handleSelect">
      <!-- Trips -->
      <el-menu-item index="trips" class="menu-item">
        {{ t('menu.trips') }}
      </el-menu-item>

      <!-- Browsing History -->
      <el-menu-item index="history" class="menu-item">
        {{ t('menu.history') }}
      </el-menu-item>

      <!-- Language Selection -->
      <el-sub-menu index="language" class="submenu">
        <template #title>{{ t('menu.language') }}</template>
        <el-menu-item index="zh">{{ t('menu.chinese') }}</el-menu-item>
        <el-menu-item index="en">{{ t('menu.english') }}</el-menu-item>
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
    </el-menu>
  </header>
</template>

<style lang="scss" scoped>
header {
  height: 81px;

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
