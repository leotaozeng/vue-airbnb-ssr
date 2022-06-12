<script lang="ts" setup>
const { t } = useI18n();
const count = ref(0);

function fetchApi() {
  return new Promise((resolve) => {
    setTimeout(() => {
      count.value = 6;
      resolve(true);
    }, 5000);
  });
}
await fetchApi();
</script>

<template>
  <div>abc</div>
</template>

<style lang="scss" scoped></style>
