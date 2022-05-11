<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';

const auth = useAuthStore();
</script>

<template>
  <div>
    <span>{{ auth.counter }}</span>
    <br /><br />
    <el-button type="primary" @click="auth.increment">Action</el-button>
  </div>
</template>

<style lang="scss" scoped></style>
