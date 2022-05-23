<script lang="ts" setup>
import { useRoomsStore } from '@/stores/rooms';

const roomsStore = useRoomsStore();

function handleChangePage(currentPage: number) {
  roomsStore.getRoomList(currentPage);
}
</script>

<template>
  <div>
    <!-- * City Filter -->
    <aircnc-home-tabs />

    <!-- * Pagination -->
    <aircnc-pagination @change-page="handleChangePage" />
  </div>
</template>

<style lang="scss" scoped></style>
