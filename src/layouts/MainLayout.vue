<script setup lang="ts">
import { useLocaleStore } from '@/stores/locale';
const localeStore = useLocaleStore();
</script>

<template>
  <div>
    <el-config-provider :locale="localeStore.locale">
      <el-container direction="vertical">
        <main-header />

        <el-main class="p-0">
          <router-view />
        </el-main>

        <main-footer />
      </el-container>
    </el-config-provider>
  </div>
</template>

<style style="scss" scoped></style>
