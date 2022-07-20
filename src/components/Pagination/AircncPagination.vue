<script lang="ts" setup>
import { useRoomsStore } from '@/stores/rooms';

const { t } = useI18n();
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
    :total="roomsStore.total"
    :currentPage="roomsStore.currentPage"
    :page-size="roomsStore.pageSize"
    :prev-text="t('home.prev')"
    :next-text="t('home.next')"
    @current-change="handleCurrentChange" />
</template>

<style lang="scss" scoped>
:deep(.btn-prev),
:deep(.btn-next) {
  padding: 0 8px !important;
}
</style>
