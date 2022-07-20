<script lang="ts" setup>
import { useRoomsStore } from '@/stores/rooms';

const roomsStore = useRoomsStore();
const emit = defineEmits<{
  (e: 'changePage', currentPage: number): void;
}>();

function handleCurrentChange(val: number) {
  emit('changePage', val);
}
</script>

<template>
  <el-pagination
    background
    class="justify-center"
    layout="prev, pager, next"
    role="navigation"
    :currentPage="roomsStore.currentPage"
    :page-size="roomsStore.pageSize"
    :total="roomsStore.total"
    @current-change="handleCurrentChange" />
</template>

<style lang="scss" scoped></style>
