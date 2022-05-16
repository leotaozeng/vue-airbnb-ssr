<script setup lang="ts"></script>

<template>
  <div class="home w-full">
    <!-- * Banner -->
    <div class="banner"></div>

    <!-- * Content -->
    <div class="content px-6">
      <h2 class="title text-2xl">title</h2>
      <h3 class="subtitle text-base">subtitle</h3>

      <!-- * Home List -->
      <el-row class="home-list" :gutter="16">
        <el-col v-for="(item, index) in 6" :key="index" :span="8" class="pb-3">
          <img src="@/assets/images/auth/background.png" />
          <div class="pt-2">
            <p>房屋标题</p>
            <p>134</p>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/abstracts/mixins.scss';

.home {
  .banner {
    height: 530px;
    background: url('@/assets/images/banner.jpeg') no-repeat center/100%;
  }

  .content {
    @include main-wrapper;
  }
}
</style>
