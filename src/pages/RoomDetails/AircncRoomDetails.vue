<script lang="ts" setup>
import useForm from '@/composables/auth/useForm';
import { useRoomsStore } from '@/stores/rooms';

const roomsStore = useRoomsStore();
const route = useRoute();

const { t } = useI18n();
const { activeName, ruleFormRef, ruleForm, rules, handleSubmitForm } =
  useForm();

onBeforeMount(() => {
  roomsStore.getRoomDetails(route.params.id as string);
});
</script>

<template>
  <div v-if="roomsStore.roomDetails">
    <div v-if="roomsStore.roomDetails.imgs.length > 0" class="slide-container">
      <el-carousel
        class="slide py-4"
        type="card"
        indicator-position="none"
        height="406px"
        :autoplay="false">
        <el-carousel-item
          class="slide-item rounded-md"
          v-for="img in roomsStore.roomDetails.imgs"
          :key="img">
          <el-image :src="img" class="w-full" />
        </el-carousel-item>
      </el-carousel>
    </div>

    <div class="room-details flex">
      <div class="details">
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
                  已验证身份 ·
                </span>
                <span v-if="roomsStore.roomDetails.info.goodOwner">
                  超赞房东
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

      <div class="form w-1/3">
        <!-- * Form -->
        <el-form
          size="large"
          ref="ruleFormRef"
          class="mt-5"
          :model="ruleForm"
          :rules="rules"
          @keyup.enter.self="handleSubmitForm(ruleFormRef)">
          <!-- * Phone Number -->
          <el-form-item prop="phone">
            <el-input
              clearable
              class="input"
              :placeholder="t('auth.phone')"
              v-model="ruleForm.phone" />
          </el-form-item>

          <!-- * Submit Button -->
          <el-form-item class="mt-16">
            <el-button
              round
              type="primary"
              class="w-full"
              native-type="submit"
              @click.prevent="handleSubmitForm(ruleFormRef)">
              {{
                activeName === 'signin'
                  ? t('auth.signinBtn')
                  : t('auth.signupBtn')
              }}
            </el-button>
          </el-form-item>
        </el-form>
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

.room-details {
  @include secondary-wrapper;

  .details {
    width: 58.333333333333336%;
  }

  .form {
    margin-left: 8.333333333333332%;
  }

  .title {
    font-size: 32px;
    line-height: 1.125em;
  }

  .line {
    border-bottom: 1px solid #ebebeb;
  }
}
</style>
