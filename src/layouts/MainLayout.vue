<script setup lang="ts">
import Footer from '@/layouts/components/Footer/MainFooter.vue';
import Header from '@/layouts/components/Header/MainHeader.vue';
import { useLocaleStore } from '@/stores/locale';
import { ElConfigProvider } from 'element-plus';

const localeStore = useLocaleStore();
</script>

<template>
  <el-config-provider :locale="localeStore.locale">
    <el-container direction="vertical" class="h-full">
      <!-- Header -->
      <Header />

      <!-- Content -->
      <el-main>
        <router-view></router-view>
      </el-main>

      <!-- Footer -->
      <Footer />
    </el-container>
  </el-config-provider>
</template>

<style style="scss"></style>
