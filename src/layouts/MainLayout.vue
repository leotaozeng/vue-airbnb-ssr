<script setup lang="ts">
import { useLocaleStore } from '@/stores/locale';
const localeStore = useLocaleStore();
</script>

<template>
  <el-config-provider :locale="localeStore.locale">
    <el-container direction="vertical" class="min-h-full">
      <main-header />

      <el-main class="flex p-0">
        <router-view />
      </el-main>

      <main-footer />
    </el-container>
  </el-config-provider>
</template>
