<script lang="ts" setup>
import { fetchHistoryListAPI } from '@/api/history';
import { ElMessage } from 'element-plus';

const history = ref([]);

async function getHistoryList() {
  const response = await fetchHistoryListAPI();
  if (response) {
    const { message, result, success } = response;
    success
      ? ElMessage({ message, type: 'success', showClose: true })
      : ElMessage({ message, type: 'error', showClose: true });
    if (result) history.value = result;
  }
}

onBeforeMount(() => {
  getHistoryList();
});
</script>

<template>
  <div>{{ history }}</div>
</template>

<style lang="scss" scoped></style>
