<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
const router = useRouter();
const route = useRoute();

console.log(route.query);

const pushWithQuery = (query: { id: number }) => {
  router.push({
    name: 'Home',
    query
  });
};
</script>

<template>
  <div>
    <el-button type="primary" @click="pushWithQuery({ id: 1 })">
      Go to Home</el-button
    >
  </div>
</template>

<style lang="scss" scoped></style>
