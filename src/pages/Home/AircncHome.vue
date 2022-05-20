<script lang="ts">
import { useRoomsStore } from '@/stores/rooms';
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    const roomsStore = useRoomsStore();
    return { roomsStore };
  }
});
</script>

<template>
  <div class="home w-full">
    <!-- * Banner -->
    <div class="banner"></div>

    <!-- * Content -->
    <div class="content px-6">
      <h2 class="title text-2xl">title</h2>
      <h3 class="subtitle text-base">subtitle</h3>
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
  }
}
</style>
