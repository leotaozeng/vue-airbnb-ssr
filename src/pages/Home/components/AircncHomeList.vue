<script setup lang="ts">
import { useRoomsStore } from '@/stores/rooms';

const roomsStore = useRoomsStore();
</script>

<template>
  <div class="mb-10">
    <!-- * City Filter -->
    <el-row class="home-list" :gutter="16">
      <el-col
        v-for="item in roomsStore.rooms"
        :key="item.id"
        :span="8"
        class="pb-3">
        <img :src="item.pictureUrl" />
        <div class="pt-2">
          <p>{{ item.title }}</p>
          <p>{{ item.price }}</p>
        </div>
      </el-col>
    </el-row>

    <!-- * Pagination -->
    <aircnc-pagination />
  </div>
</template>

<style lang="scss" scoped></style>
