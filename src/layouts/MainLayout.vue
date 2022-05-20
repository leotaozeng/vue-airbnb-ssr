<script setup lang="ts">
import { useLocaleStore } from '@/stores/locale';
const localeStore = useLocaleStore();
</script>

<template>
  <el-config-provider :locale="localeStore.locale">
    <el-container direction="vertical" class="h-full">
      <main-header />

      <el-main class="p-0 flex-none">
        <router-view />
      </el-main>

      <main-footer />
    </el-container>
  </el-config-provider>
</template>

<style style="scss" scoped></style>
