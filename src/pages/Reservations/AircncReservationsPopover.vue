<script lang="ts" setup>
import { useReservationsStore } from '@/stores/reservations';
import { ClickOutside as vClickOutside } from 'element-plus';

const { t } = useI18n();

const reservationsStore = useReservationsStore();
const reservations = computed(() => reservationsStore.reservations);

onBeforeMount(() => {
  reservationsStore.getReservations();
});
</script>

<template>
  <div
    class="popover"
    v-click-outside="reservationsStore.hideReservationsPopover">
    <h3 class="name pt-1 px-1 pb-4 text-gray-darkest text-sm font-extrabold">
      {{ t('header.menu.reservationCenter') }}
    </h3>

    <ul>
      <li v-for="reservation in reservations" :key="reservation.reservationId">
        <router-link
          :to="{
            name: 'RoomDetails',
            params: { id: reservation.reservationId }
          }">
          <div class="reservation py-4 flex justify-between items-center">
            <!-- Left -->
            <div class="content">
              <div>
                <p class="title text-sm font-semibold text-gray-darkest">
                  吉林的整套房子/公寓
                </p>
                <div class="text-gray-dark">
                  {{ JSON.parse(reservation.date)[0] }} -
                  {{ JSON.parse(reservation.date)[1].slice(5) }} ·
                  {{ reservation.nights }}晚
                </div>
                <div class="text-gray-dark">
                  <span class="inline-block mr-1">行程已完成</span>
                  <span> · ￥{{ reservation.price * reservation.nights }}</span>
                </div>
              </div>

              <div class="mt-2">
                <el-button plain>{{ t('reservation.message') }}</el-button>
              </div>
            </div>

            <!-- Right -->
            <div class="thumbnail ml-4">
              <el-image :src="reservation.pictureURL">
                <template #error>
                  <div class="image-slot">
                    <el-icon><i-ep-picture /></el-icon>
                  </div>
                </template>
              </el-image>
            </div>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.popover {
  .name {
    border-bottom: 1px solid #ebebeb;
  }

  .reservation {
    border-bottom: 1px solid #f2f2f2 !important;

    .content {
      .title {
        margin-bottom: 2.4px;
      }
    }

    .thumbnail {
      width: 88px;
      height: 66px;

      .el-image {
        width: 100%;
        height: 100%;
      }

      .image-slot {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        background: var(--el-fill-color-light);
        color: var(--el-text-color-secondary);
      }
    }
  }
}
</style>
