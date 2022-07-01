<script lang="ts" setup>
import { fetchHistoryListAPI } from '@/api/history';
import { IHistory } from '@/api/interface';
import { ElMessage } from 'element-plus';

const { t } = useI18n();
const historyList = ref<IHistory[]>([]);

async function getHistoryList() {
  const response = await fetchHistoryListAPI();
  if (response) {
    const { message, result, success } = response;
    if (result) historyList.value = result;
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
  <!-- {{ historyList }} -->
  <div
    class="browsing-history masonry h-full p-5 columns-3 lg:columns-4 xl:columns-5">
    <div
      v-for="item in historyList"
      :key="item.historyId"
      class="item inline-block mb-5 leading-none text-none">
      <router-link :to="{ name: 'RoomDetails', params: { id: item.roomId } }">
        <el-image :src="item.pictureURL" :alt="item.title" fit="cover" />
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
      <div class="price text-gray-darkest">
        <span class="text-base font-semibold">￥{{ item.price }}</span>
        <span class="text-sm font-light ml-1">每晚</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.masonry {
  column-gap: 20px;
}
</style>
