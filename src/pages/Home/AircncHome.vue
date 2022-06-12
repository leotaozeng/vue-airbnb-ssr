<script lang="ts" setup>
const { t } = useI18n();
const buttonRef = ref();
</script>

<template>
  <div class="home w-full">
    <div class="banner"></div>
    <div class="content px-6 my-10">
      <h2 class="title font-semibold">{{ t('home.title') }}</h2>
      <h3 class="subtitle text-base mt-3 mb-10">{{ t('home.subtitle') }}</h3>
      <aircnc-home-list />
    </div>

    <el-button ref="buttonRef">Click me</el-button>

    <!-- Popover -->
    <el-popover
      :virtual-ref="buttonRef"
      :teleported="false"
      trigger="click"
      title="With title"
      virtual-triggering>
      <span> Some content </span>
    </el-popover>
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
