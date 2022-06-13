<script lang="ts" setup>
import { useRoomsStore } from '@/stores/rooms';

const adultsNum = ref(1);
const childrenNum = ref(0);
const infantsNum = ref(0);

const roomsStore = useRoomsStore();
const roomDetails = computed(() => roomsStore.roomDetails);

const { t } = useI18n();
</script>

<template>
  <div
    class="dropdown absolute bg-white w-full mb-4 p-4 z-10 leading-normal rounded shadow-md">
    <ul class="dropdown-menu">
      <li class="dropdown-menu-item mb-6 flex justify-between items-center">
        <div>
          <div class="title text-gray-dark text-base font-semibold">
            {{ t('rooms.adults.title') }}
          </div>
          <div class="subtitle pt-1">
            {{ t('rooms.adults.subtitle') }}
          </div>
        </div>
        <el-input-number v-model="adultsNum" :min="1" />
      </li>

      <li class="dropdown-menu-item mb-6 flex justify-between items-center">
        <div>
          <div class="title text-gray-dark text-base font-semibold">
            {{ t('rooms.children.title') }}
          </div>
          <div class="subtitle pt-1">
            {{ t('rooms.children.subtitle') }}
          </div>
        </div>
        <el-input-number v-model="childrenNum" :min="0" />
      </li>

      <li class="dropdown-menu-item mb-6 flex justify-between items-center">
        <div>
          <div class="title text-gray-dark text-base font-semibold">
            {{ t('rooms.infants.title') }}
          </div>
          <div class="subtitle pt-1">
            {{ t('rooms.infants.subtitle') }}
          </div>
        </div>
        <el-input-number v-model="infantsNum" :min="0" />
      </li>
    </ul>

    <div>
      <p class="mb-4 text-sm text-gray-dark font-normal">
        {{
          t('rooms.guestsDescription', {
            guestNumber: roomDetails.info.liveNumber
          })
        }}
      </p>
      <button
        type="button"
        class="w-full text-right text-base font-semibold"
        @click="roomsStore.hideDropdown">
        {{ t('rooms.close') }}
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.dropdown {
  top: 40px;
}
</style>
