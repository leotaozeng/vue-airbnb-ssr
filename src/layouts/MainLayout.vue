<script setup lang="ts">
import Header from '@/layouts/components/Header/MainHeader.vue';
import { ElConfigProvider } from 'element-plus';
import en from 'element-plus/lib/locale/lang/en';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { locale: localeLanguage } = useI18n({ useScope: 'global' });
const locale = ref(en);

const changeLanguage = (language: any) => {
  localeLanguage.value = language.name;
  locale.value = language;
};
</script>

<template>
  <el-config-provider :locale="locale">
    <!-- Header -->
    <Header @changeLanguage="changeLanguage" />

    <!-- Content -->
    <main>
      <router-view></router-view>
    </main>
  </el-config-provider>
</template>

<style style="scss"></style>
