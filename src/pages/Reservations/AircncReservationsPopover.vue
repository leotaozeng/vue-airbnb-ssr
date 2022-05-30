<script lang="ts" setup>
interface Props {
  virtualRef: any;
}

const props = defineProps<Props>();
const { t } = useI18n();
</script>

<template>
  <el-popover
    :virtual-ref="props.virtualRef"
    trigger="click"
    :title="t('header.menu.reservationCenter')"
    virtual-triggering
    :teleported="false">
  </el-popover>
</template>

<style lang="scss" scoped></style>
