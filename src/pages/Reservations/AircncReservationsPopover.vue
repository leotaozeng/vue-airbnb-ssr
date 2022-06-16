<script lang="ts" setup>
import { useReservationsStore } from '@/stores/reservations';

const { t } = useI18n();

const reservationsStore = useReservationsStore();
const reservations = computed(() => reservationsStore.reservations);

onBeforeMount(() => {
  reservationsStore.getReservations();
});
</script>

<template>
  <div class="popover">
    <h3 class="title pt-1 px-1 pb-4 text-gray-dark text-sm font-extrabold">
      {{ t('header.menu.reservationCenter') }}
    </h3>

    <ul>
      <li
        v-for="reservation in reservations"
        :key="reservation.reservationId"
        class="flex justify-between items-center">
        <!-- Left -->
        <div class="content">
          <div>
            <p>吉林的整套房子/公寓</p>
            <div>
              {{ JSON.parse(reservation.date)[0] }} -
              {{ JSON.parse(reservation.date)[1].slice(5) }} ·
              {{ reservation.nights }}晚
            </div>
          </div>

          <div>
            <el-button plain>{{ t('reservation.message') }}</el-button>
          </div>
        </div>

        <!-- Right -->
        <div class="thumbnail ml-4">
          <el-image :src="reservation.pictureURL" />
        </div>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.popover {
  .title {
    border-bottom: 1px solid #ebebeb;
  }

  .thumbnail {
    width: 88px;
    height: 66px;
  }
}
</style>
