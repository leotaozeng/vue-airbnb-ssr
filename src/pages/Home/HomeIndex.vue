<script setup lang="ts">
import { getElephantAPI } from '@/api';

async function fetchElephant() {
  try {
    const response = await getElephantAPI();
    console.log(response);
  } catch (error) {
    console.error('fetchElephant Error', error);
  }
}

// fetchElephant();
</script>

<template>
  <div>
    <el-date-picker type="datetime" placeholder="Select date and time" />
  </div>
</template>

<style lang="scss" scoped></style>
