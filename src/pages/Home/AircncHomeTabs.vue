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
  }
];

const handleClickCity = (tab: TabsPaneContext) => {
  roomsStore.getRoomList(1, 6, tab.props.name as string);
};
</script>

<template>
  <!-- * 城市筛选 -->
  <el-tabs
    class="tabs"
    v-model="roomsStore.cityCode"
    @tab-click="handleClickCity">
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
            <img class="picture object-cover rounded" :src="item.pictureUrl" />
          </router-link>

          <div
            v-if="item.title && item.price"
            class="info pt-2 text-gray-dark font-heiti">
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
    padding: 0px 14px;
    margin: 0px -14px;

    &::after {
      display: none;
    }

    .el-tabs__nav-prev,
    .el-tabs__nav-next {
      top: 50%;
      transform: translate3d(0, calc(-50% - 12px), 0);
      display: flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background-color: white;
      box-shadow: rgb(0 0 0 / 14%) 0px 1px 1px 1px;
      z-index: 10;
      font-size: 16px;
      color: #484848;

      &.is-disabled {
        display: none;
      }
    }

    .el-tabs__nav-prev {
      left: 1px;
    }

    .el-tabs__nav-next {
      right: 1px;
    }

    .el-tabs__nav-next.is-disabled ~ .el-tabs__nav-wrap::after {
      color: red;
    }

    .el-tabs__nav-scroll {
      padding-bottom: 24px;
    }
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
    transition: box-shadow 0.5s;

    &:last-of-type {
      margin-right: 0;
    }

    &.is-active {
      color: #ffffff;
      background: #00848a;
      box-shadow: 0px 7px 14px rgb(0 132 138 / 15%);
      border: solid 0.5px #00848a;
    }

    &:not(.is-active):hover {
      box-shadow: 0px 3px 6px rgb(0 0 0 / 15%);
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
