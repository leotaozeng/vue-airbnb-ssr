<script setup lang="ts">
import { getLanguageApi, saveLanguageAPI } from '@/api/layouts';
import Header from '@/layouts/components/Header/MainHeader.vue';
import { ElConfigProvider } from 'element-plus';
import en from 'element-plus/lib/locale/lang/en';
import { onBeforeMount, ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { locale: localeLanguage } = useI18n({ useScope: 'global' });
const locale = ref(en);

async function changeLanguage(language: any) {
  localeLanguage.value = language.name;
  locale.value = language;
  await saveLanguageAPI(language);
}

onBeforeMount(async () => {
  const response = await getLanguageApi();
  if (response && response.result) {
    localeLanguage.value = response.result.name;
    locale.value = { name: response.result.name, el: response.result.el };
  }
});
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
