<script lang="ts" setup>
import { useRoomsStore } from '@/stores/rooms';

const roomsStore = useRoomsStore();

function handleChangePage(currentPage: number) {
  roomsStore.getRooms(currentPage);
}
</script>

<template>
  <div>
    <aircnc-home-tabs />
    <aircnc-pagination @change-page="handleChangePage" />
  </div>
</template>

<style lang="scss" scoped></style>
