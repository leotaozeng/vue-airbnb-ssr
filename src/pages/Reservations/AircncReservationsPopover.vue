<script lang="ts" setup>
import { useReservationsStore } from '@/stores/reservations';
import { ClickOutside as vClickOutside } from 'element-plus';

const { t } = useI18n();

const router = useRouter();
const reservationsStore = useReservationsStore();
const reservations = computed(() => reservationsStore.reservations);

function handleNavigateToRoomDetails(id: number | null) {
  if (!id) return;
  router.push({ name: 'RoomDetails', params: { id } });
  reservationsStore.hideReservationsPopover();
}

function handleNavigateToReservations() {
  router.push({ name: 'Reservations' });
  reservationsStore.hideReservationsPopover();
}

onBeforeMount(() => {
  reservationsStore.getReservations();
});
</script>

<template>
  <div
    class="popover"
    v-click-outside="reservationsStore.hideReservationsPopover">
    <div v-if="reservations.length > 0">
      <!-- Name -->
      <h3 class="name pt-1 px-1 pb-4 text-gray-darkest text-sm font-extrabold">
        {{ t('header.menu.reservationCenter') }}
      </h3>

      <!-- Reservation List -->
      <ul>
        <li
          v-for="(reservation, index) in reservations"
          :key="reservation.reservationId ? reservation.reservationId : index"
          class="cursor-pointer"
          @click="handleNavigateToRoomDetails(reservation.roomId)">
          <div class="reservation py-4 flex justify-between items-center">
            <div class="content">
              <div>
                <p class="title text-sm font-semibold text-gray-darkest">
                  {{ t(`home.city.${reservation.city}`) }}的整套房子/公寓
                </p>

                <div
                  v-if="JSON.parse(reservation.date).length === 2"
                  class="text-gray-dark">
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

            <div v-if="reservation.pictureURL" class="thumbnail ml-4">
              <el-image :src="reservation.pictureURL">
                <template #error>
                  <div class="image-slot">
                    <el-icon>
                      <i-ep-picture />
                    </el-icon>
                  </div>
                </template>
              </el-image>
            </div>
          </div>
        </li>
      </ul>

      <!-- More -->
      <button
        type="button"
        class="pt-4 pb-1 font-semibold text-cyan-dark hover:underline cursor-pointer"
        @click="handleNavigateToReservations">
        {{ t('reservation.more') }}
      </button>
    </div>
    <div v-else>空空如也～</div>
  </div>
</template>

<style lang="scss" scoped>
.popover {
  .name {
    border-bottom: 1px solid #ebebeb;
  }

  .reservation {
    border-bottom: 1px solid #f2f2f2;

    &:hover {
      border-bottom-color: #767676;
    }

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
