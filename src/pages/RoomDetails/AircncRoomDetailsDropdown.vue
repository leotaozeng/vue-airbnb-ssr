<script lang="ts" setup>
import { useRoomsStore } from '@/stores/rooms';

const { t } = useI18n();
const roomsStore = useRoomsStore();
const form = computed(() => roomsStore.form);
const roomDetails = computed(() => roomsStore.roomDetails);
const { liveNumber } = roomDetails.value.info;

const adultsMax = ref(liveNumber);
const childrenMax = ref(adultsMax.value === 1 ? 0 : liveNumber);

function handleAdultsChange(currentValue: number | undefined) {
  if (typeof currentValue !== 'number') return;
  adultsMax.value = liveNumber - form.value.children;
  childrenMax.value = liveNumber - currentValue;
}

function handleChildrenChange(currentValue: number | undefined) {
  if (typeof currentValue !== 'number') return;
  adultsMax.value = liveNumber - currentValue;
  childrenMax.value = liveNumber - form.value.adults;
}
</script>

<template>
  <div
    class="dropdown absolute bg-white w-full mb-4 p-4 z-10 leading-normal rounded shadow-md">
    <ul class="dropdown-menu">
      <!-- Adults -->
      <li class="dropdown-menu-item mb-6 flex justify-between items-center">
        <div>
          <div class="title text-gray-darkest text-base font-semibold">
            {{ t('rooms.adults.title') }}
          </div>
          <div class="subtitle pt-1">
            {{ t('rooms.adults.subtitle') }}
          </div>
        </div>
        <el-input-number
          v-model="form.adults"
          :min="1"
          :max="adultsMax"
          @change="handleAdultsChange" />
      </li>

      <!-- Children -->
      <li class="dropdown-menu-item mb-6 flex justify-between items-center">
        <div>
          <div class="title text-gray-darkest text-base font-semibold">
            {{ t('rooms.children.title') }}
          </div>
          <div class="subtitle pt-1">
            {{ t('rooms.children.subtitle') }}
          </div>
        </div>
        <el-input-number
          v-model="form.children"
          :min="0"
          :max="childrenMax"
          @change="handleChildrenChange" />
      </li>

      <!-- Infants -->
      <li class="dropdown-menu-item mb-6 flex justify-between items-center">
        <div>
          <div class="title text-gray-darkest text-base font-semibold">
            {{ t('rooms.infants.title') }}
          </div>
          <div class="subtitle pt-1">
            {{ t('rooms.infants.subtitle') }}
          </div>
        </div>
        <el-input-number v-model="form.infants" :min="0" :max="5" />
      </li>
    </ul>

    <div>
      <p class="mb-4 text-sm text-gray-darkest font-normal">
        {{
          t('rooms.guestsDescription', {
            guestNumber: roomDetails.info.liveNumber
          })
        }}
      </p>

      <div class="w-full text-right">
        <button
          type="button"
          class="text-base text-cyan-dark font-semibold"
          @click="roomsStore.hideDropdown">
          {{ t('rooms.close') }}
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.dropdown {
  top: 40px;
}
</style>
