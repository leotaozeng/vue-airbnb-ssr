<script lang="ts" setup>
import { useRoomsStore } from '@/stores/rooms';

const roomsStore = useRoomsStore();

function handleChangePage(currentPage: number) {
  roomsStore.getRoomList(currentPage);
}
</script>

<template>
  <div class="mb-10">
    <!-- * City Filter -->
    <aircnc-home-tabs />

    <!-- * Home List -->
    <el-row class="home-list" :gutter="16">
      <el-col
        v-for="item in roomsStore.rooms"
        :key="item.id"
        :span="8"
        class="home pb-3">
        <div class="rounded overflow-hidden" v-if="item.pictureUrl">
          <img class="picture object-cover" :src="item.pictureUrl" />
        </div>

        <div class="info pt-2 text-gray-dark font-heiti">
          <p class="title line-clamp-2 font-extrabold">{{ item.title }}</p>
          <div class="mt-0.5">
            <span class="font-semibold">￥{{ item.price }}</span>
          </div>
        </div>
      </el-col>
    </el-row>

    <!-- * Pagination -->
    <aircnc-pagination @change-page="handleChangePage" />
  </div>
</template>

<style lang="scss" scoped>
.home {
  .picture {
    width: 100%;
    height: 250px;
  }

  .info {
    .title {
      line-height: 22px;
    }
  }
}
</style>
