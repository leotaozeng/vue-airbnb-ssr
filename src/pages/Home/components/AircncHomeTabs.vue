<script lang="ts" setup>
import { useRoomsStore } from '@/stores/rooms';
import type { TabsPaneContext } from 'element-plus';

const roomsStore = useRoomsStore();
const cities = [
  {
    name: '杭州',
    code: 'hz'
  },
  {
    name: '上海',
    code: 'sh'
  },
  {
    name: '南京',
    code: 'nj'
  },
  {
    name: '成都',
    code: 'cd'
  },
  {
    name: '重庆',
    code: 'cq'
  },
  {
    name: '北京',
    code: 'bj'
  },
  {
    name: '苏州',
    code: 'sz'
  }
];

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab.props, event);
  roomsStore.getRoomList(1, 6, tab.props.name as string);
};
</script>

<template>
  <el-tabs
    v-model="roomsStore.cityCode"
    type="card"
    class="demo-tabs"
    @tab-click="handleClick">
    <el-tab-pane
      v-for="city in cities"
      :key="city.name"
      :label="city.name"
      :name="city.code">
    </el-tab-pane>
  </el-tabs>
</template>

<style lang="scss" scoped></style>
