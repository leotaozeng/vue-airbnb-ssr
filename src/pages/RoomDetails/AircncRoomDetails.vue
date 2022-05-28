<script lang="ts" setup>
import ArrowRight from '@/assets/images/arrow-right.svg';
import useForm from '@/composables/auth/useForm';
import { useRoomsStore } from '@/stores/rooms';

const roomsStore = useRoomsStore();
const route = useRoute();

const { t } = useI18n();
const { ruleFormRef } = useForm();

const ruleForm = reactive({
  date: '',
  region: ''
});

const discounts = [
  {
    title: '春季特惠 8 折',
    description: '在 3月1日至5月31日 期间入住，可享受原房费的 8 折优惠。'
  },
  {
    title: '夏季特惠 8 折',
    description: '在 3月1日至5月31日 期间入住，可享受原房费的 8 折优惠。'
  },
  {
    title: '早鸟特惠 8 折',
    description: '在 3月1日至5月31日 期间入住，可享受原房费的 8 折优惠。'
  },
  {
    title: '月租优惠 7 折',
    description: '在 3月1日至5月31日 期间入住，可享受原房费的 8 折优惠。'
  },
  {
    title: '周租优惠 7.5 折',
    description: '在 3月1日至5月31日 期间入住，可享受原房费的 8 折优惠。'
  },
  {
    title: '连住优惠 满 2 天 8 折',
    description: '在 3月1日至5月31日 期间入住，可享受原房费的 8 折优惠。'
  }
];

onBeforeMount(() => {
  roomsStore.getRoomDetails(route.params.id as string);
});
</script>

<template>
  <div v-if="roomsStore.roomDetails">
    <!-- Carousel -->
    <div v-if="roomsStore.roomDetails.imgs.length > 0" class="slide-container">
      <el-carousel
        class="slide pt-4 pb-12"
        type="card"
        indicator-position="none"
        height="590px">
        <el-carousel-item
          class="slide-item rounded-md"
          v-for="img in roomsStore.roomDetails.imgs"
          :key="img">
          <el-image :src="img" class="w-full h-full" fit="cover" />
        </el-carousel-item>
      </el-carousel>
    </div>

    <!-- Details -->
    <div class="details flex">
      <!-- Room Details -->
      <div class="room-details">
        <section
          v-if="roomsStore.roomDetails.info && roomsStore.roomDetails.title">
          <!-- Title -->
          <h1 class="title mb-2 py-1.5 font-extrabold text-gray-dark font-sans">
            {{ roomsStore.roomDetails.title }}
          </h1>

          <!-- Room Info -->
          <div class="flex mb-4">
            <div
              v-if="roomsStore.roomDetails.info.room > 0"
              class="flex items-center bedrooms mr-4">
              <span class="mr-2 font-airmoji">󰄄</span>
              <span>{{ roomsStore.roomDetails.info.room }} 间卧室</span>
            </div>

            <div
              v-if="roomsStore.roomDetails.info.bed > 0"
              class="flex items-center beds mr-4">
              <span class="mr-2 font-airmoji">󰄃</span>
              <span>{{ roomsStore.roomDetails.info.bed }} 张床</span>
            </div>

            <div
              v-if="roomsStore.roomDetails.info.toilet > 0"
              class="flex items-center baths mr-4">
              <span class="mr-2 font-airmoji">󰄁</span>
              <span>{{ roomsStore.roomDetails.info.toilet }} 间卫生间</span>
            </div>

            <div
              v-if="roomsStore.roomDetails.info.liveNumber > 0"
              class="flex items-center guests">
              <span class="mr-2 font-airmoji">󰄂</span>
              <span>可住 {{ roomsStore.roomDetails.info.liveNumber }} 人</span>
            </div>
          </div>

          <!-- Tags -->
          <div class="tags mb-6">
            <el-tag
              v-if="roomsStore.roomDetails.info.remarks > 0"
              class="mb-2 mr-1 rounded-2xl text-green-dark font-extrabold"
              type="success">
              {{ roomsStore.roomDetails.info.remarks }}条评论
            </el-tag>
            <el-tag
              v-if="roomsStore.roomDetails.info.luggage"
              class="mb-2 mr-1 rounded-2xl text-gray-dark font-extrabold"
              type="info">
              行李寄存
            </el-tag>
            <el-tag
              v-if="roomsStore.roomDetails.info.parking"
              class="mb-2 mr-1 rounded-2xl text-gray-dark font-extrabold"
              type="info">
              免费停车
            </el-tag>
            <el-tag
              v-if="roomsStore.roomDetails.info.metro"
              class="mb-2 mr-1 rounded-2xl text-gray-dark font-extrabold"
              type="info">
              近地铁站
            </el-tag>
          </div>

          <div class="line my-4"></div>
        </section>

        <section
          v-if="roomsStore.roomDetails.info && roomsStore.roomDetails.owner">
          <!-- * Owner Details -->
          <div class="owner-details flex">
            <!-- * Avatar -->
            <div v-if="roomsStore.roomDetails.owner.avatar">
              <el-avatar
                :src="roomsStore.roomDetails.owner.avatar"
                :size="64" />
            </div>

            <!-- * Info -->
            <div class="ml-4 py-2">
              <p
                v-if="roomsStore.roomDetails.owner.name"
                class="mb-2 font-extrabold text-base text-gray-dark">
                房东：{{ roomsStore.roomDetails.owner.name }}
              </p>

              <p class="font-semibold text-sm text-gray-dark">
                <span v-if="roomsStore.roomDetails.owner.certify">
                  已验证身份
                </span>
                <span v-if="roomsStore.roomDetails.info.goodOwner">
                  · 超赞房东
                </span>
              </p>
            </div>
          </div>

          <!-- * Room Introduction -->
          <div class="room-introduction mt-4 mb-8">
            <div class="p-4 bg-gray-lightest rounded">
              <p class="font-normal text-base text-gray-dark">
                {{ roomsStore.roomDetails.owner.introduce }}
              </p>
            </div>
          </div>
        </section>
      </div>

      <div class="form-container w-1/3">
        <div class="border border-solid border-zinc-200 pt-4 px-6">
          <!-- Price -->
          <div>
            <span class="price">
              <span class="text-gray-dark font-extrabold"
                >￥{{ roomsStore.roomDetails.price }}</span
              >
            </span>
            <span class="text-gray-dark text-xs font-semibold">/晚</span>
          </div>

          <!-- Discounts -->
          <ul class="mt-px">
            <li
              v-for="discount in discounts"
              :key="discount.title"
              class="inline-flex items-center mr-2">
              <span class="mr-1">
                <el-icon color="#bbbbbb"><i-ep-circle-check-filled /></el-icon>
              </span>
              <span class="text-xs text-gray-muted">{{ discount.title }}</span>
            </li>
          </ul>

          <div class="line my-4"></div>

          <!-- Form -->
          <el-form
            size="large"
            ref="ruleFormRef"
            class="mt-5"
            label-position="top"
            :model="ruleForm">
            <!-- Date Range -->
            <el-form-item class="form-item" :label="t('rooms.date')">
              <el-date-picker
                v-model="ruleForm.date"
                type="daterange"
                range-separator="To"
                :start-placeholder="t('rooms.startDate')"
                :end-placeholder="t('rooms.endDate')">
                <template #range-separator>
                  <arrow-right />
                </template>
              </el-date-picker>
            </el-form-item>

            <!-- Guests -->
            <el-form-item class="form-item" :label="t('rooms.guests')">
              <el-select v-model="ruleForm.region">
                <el-option label="Zone one" value="shanghai" />
                <el-option label="Zone two" value="beijing" />
              </el-select>
            </el-form-item>

            <!-- Submit Button -->
            <el-form-item class="mt-6">
              <el-button type="danger" class="w-full">
                {{ t('rooms.reserve') }}
              </el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/abstracts/mixins.scss';

.slide-container {
  .slide-item {
    border: 10px solid #fff;
    box-shadow: 0 2px 5px 0 rgb(0 0 0 / 20%);
  }
}

.details {
  @include secondary-wrapper;

  .line {
    border-bottom: 1px solid #ebebeb;
  }

  .room-details {
    width: 58.333333333333336%;

    .title {
      font-size: 32px;
      line-height: 1.125em;
    }
  }

  .form-container {
    margin-left: 8.333333333333332%;

    .price {
      font-size: 18px;
      line-height: 1.44444em;

      > span {
        font-size: 22px;
      }
    }

    .form-item {
      :deep(.el-form-item__label) {
        margin: 0;
        height: auto;
        color: #484848;
        font-size: 12px;
        font-weight: 600;
        line-height: 1.33333em;
      }
    }
  }
}
</style>
