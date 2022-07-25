<script lang="ts" setup>
import { fetchHistoryListAPI } from '@/api/history';
import { IHistory } from '@/api/interface';
import { ElMessage } from 'element-plus';

const { t } = useI18n();

const historyList = ref<IHistory[]>([]);
const loading = ref(true);

async function getHistoryList() {
  loading.value = true;
  const response = await fetchHistoryListAPI();
  if (response) {
    const { message, result, success } = response;
    loading.value = false;
    if (result) {
      historyList.value = result;
    }
    success
      ? ElMessage({ message, type: 'success', showClose: true })
      : ElMessage({ message, type: 'error', showClose: true });
  }
}

onBeforeMount(() => {
  getHistoryList();
});
</script>

<template>
  <div class="flex-1 relative">
    <div class="browsing-history masonry py-5">
      <el-skeleton :loading="loading" animated>
        <template #template>
          <div class="flex flex-wrap -mx-2 -mb-5">
            <div class="w-1/3 px-2 mb-5" v-for="index in 9" :key="index">
              <el-skeleton-item variant="image" class="w-full h-60 rounded" />
              <div class="leading-none">
                <!-- Title -->
                <el-skeleton-item variant="text" class="w-2/4 mt-2.5" />
                <!-- Description -->
                <el-skeleton-item variant="text" />
                <!-- Price -->
                <el-skeleton-item variant="text" class="w-1/4" />
              </div>
            </div>
          </div>
        </template>

        <template #default>
          <div
            class="columns-2 lg:columns-3 gap-4"
            v-if="historyList.length > 0">
            <div
              v-for="item in historyList"
              :key="item.historyId"
              class="item inline-block mb-5 leading-none text-none">
              <router-link
                :to="{ name: 'RoomDetails', params: { id: item.roomId } }">
                <el-image
                  :src="item.pictureURL"
                  :alt="item.title"
                  fit="cover"
                  class="rounded" />
                <div class="content">
                  <p class="title text-xs text-blue-dark font-semibold mt-2.5">
                    {{ t(`home.city.${item.city}`) }}的整套房子/公寓
                  </p>
                  <p
                    class="description text-base font-semibold text-gray-darkest line-clamp-2">
                    {{ item.title }}
                  </p>
                </div>
              </router-link>

              <!-- Price -->
              <div class="price text-gray-darkest">
                <span class="text-base font-semibold">￥{{ item.price }}</span>
                <span class="text-sm font-light ml-1">每晚</span>
              </div>
            </div>
          </div>

          <el-empty
            v-else
            :description="t(`history.empty`)"
            class="absolute left-2/4 top-2/4 -translate-y-1/2 -translate-x-1/2 p-0" />
        </template>
      </el-skeleton>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/abstracts/mixins.scss';

.browsing-history {
  @include secondary-wrapper;
}
</style>
