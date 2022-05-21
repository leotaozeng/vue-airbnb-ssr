<script lang="ts" setup></script>

<template>
  <div class="home w-full">
    <!-- * Banner -->
    <div class="banner"></div>

    <!-- * Content -->
    <div class="content px-6">
      <h2 class="title text-2xl mt-6">title</h2>
      <h3 class="subtitle text-base mt-1.5 mb-6">subtitle</h3>
      <aircnc-home-list />
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

    .title {
      font-size: 22px;
    }
  }
}
</style>
