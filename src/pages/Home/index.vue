<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();

const pushWithQuery = (query: { id: number }) => {
  router.push({
    name: 'Profile',
    query,
  });
};
</script>

<template>
  <div>
    <el-button @click="pushWithQuery({ id: 2 })">Go to Profile</el-button>
  </div>
</template>

<style lang="scss" scoped></style>
