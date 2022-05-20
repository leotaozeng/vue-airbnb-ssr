<script setup lang="ts">
import { useRoomsStore } from '@/stores/rooms';

const roomsStore = useRoomsStore();

function handleCurrentChange(val: number) {
  console.log(`current page: ${val}`);
}
</script>

<template>
  <el-pagination
    background
    class="justify-center"
    layout="prev, pager, next"
    :currentPage="roomsStore.currentPage"
    :page-size="roomsStore.pageSize"
    :total="roomsStore.total"
    @current-change="handleCurrentChange" />
</template>

<style lang="scss" scoped></style>
