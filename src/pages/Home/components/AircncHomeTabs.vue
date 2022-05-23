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
  },
  {
    name: '广州',
    code: 'gz'
  },
  {
    name: '长沙',
    code: 'cs'
  },
  {
    name: '西安',
    code: 'xa'
  }
];

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab.props, event);
  roomsStore.getRoomList(1, 6, tab.props.name as string);
};
</script>

<template>
  <el-tabs class="tabs" v-model="roomsStore.cityCode" @tab-click="handleClick">
    <el-tab-pane
      v-for="city in cities"
      :key="city.name"
      :label="city.name"
      :name="city.code"
      :lazy="true">
      <el-row :gutter="16">
        <el-col
          v-for="item in roomsStore.rooms"
          :key="item.id"
          :span="8"
          class="home pb-3">
          <router-link
            v-if="item.pictureUrl"
            :to="{ name: 'RoomDetails', params: { id: item.id } }"
            class="rounded overflow-hidden">
            <img class="picture object-cover" :src="item.pictureUrl" />
          </router-link>

          <div class="info pt-2 text-gray-dark font-heiti">
            <p class="title line-clamp-2 font-extrabold">{{ item.title }}</p>
            <div class="mt-0.5">
              <span class="font-semibold">￥{{ item.price }}</span>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-tab-pane>
  </el-tabs>
</template>

<style lang="scss" scoped>
.tabs {
  :deep(.el-tabs__header) {
    margin-bottom: 0;
  }

  :deep(.el-tabs__nav-wrap) {
    &::after {
      display: none;
    }
  }

  :deep(.el-tabs__nav-scroll) {
    padding-bottom: 24px;
  }

  :deep(.el-tabs__active-bar) {
    display: none;
  }

  :deep(.el-tabs__item) {
    min-width: 120px;
    height: 48px;
    margin-right: 16px;
    border: 0.5px solid #d8d8d8;
    border-radius: 4px;
    padding: 14px 16px !important;
    text-align: center;
    font-size: 17px;
    font-weight: bold;
    line-height: 20px;
    box-shadow: 0px 1px 2px rgb(0 0 0 / 15%);
    color: #484848;
    background-color: white;

    &.is-active {
      color: #ffffff;
      background: #00848a;
      box-shadow: 0px 7px 14px rgb(0 132 138 / 15%);
      border: solid 0.5px #00848a;
    }
  }

  .picture {
    width: 100%;
    height: 250px;
  }

  .info {
    .title {
      line-height: 22px;
    }
  }
}
</style>
