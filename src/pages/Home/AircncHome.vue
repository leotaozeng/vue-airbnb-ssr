<script lang="ts" setup>
const { t } = useI18n();
</script>

<template>
  <div class="home w-full">
    <!-- * Banner -->
    <div class="banner"></div>

    <!-- * Content -->
    <div class="content px-6 my-10">
      <div class="mb-10">
        <h2 class="title font-semibold">{{ t('home.title') }}</h2>
        <h3 class="subtitle text-base mt-3">{{ t('home.subtitle') }}</h3>
      </div>

      <aircnc-home-list />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/abstracts/mixins.scss';

.home {
  .banner {
    height: 530px;
    background: url('@/assets/images/banner.jpeg') no-repeat center/cover;
  }

  .content {
    @include primary-wrapper;

    .title {
      font-size: 22px;
      line-height: 26px;
    }
  }
}
</style>
