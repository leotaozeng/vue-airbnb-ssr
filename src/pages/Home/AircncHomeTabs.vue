<script lang="ts" setup>
import { useRoomsStore } from '@/stores/rooms';
import type { TabsPaneContext } from 'element-plus';

const { t } = useI18n();
const roomsStore = useRoomsStore();
const cities = [
  {
    name: 'home.city.hz',
    code: 'hz'
  },
  {
    name: 'home.city.sh',
    code: 'sh'
  },
  {
    name: 'home.city.nj',
    code: 'nj'
  },
  {
    name: 'home.city.cd',
    code: 'cd'
  },
  {
    name: 'home.city.cq',
    code: 'cq'
  },
  {
    name: 'home.city.bj',
    code: 'bj'
  },
  {
    name: 'home.city.sz',
    code: 'sz'
  },
  {
    name: 'home.city.gz',
    code: 'gz'
  }
];

function handleClickCity(tab: TabsPaneContext) {
  roomsStore.getRooms(1, 6, tab.props.name as string);
}
</script>

<template>
  <div>
    <el-tabs
      class="tabs"
      v-model="roomsStore.cityCode"
      @tab-click="handleClickCity">
      <el-tab-pane
        v-for="city in cities"
        :key="city.code"
        :label="t(city.name)"
        :name="city.code"
        :lazy="true">
        <el-row :gutter="16">
          <el-col
            v-for="item in roomsStore.rooms"
            :key="item.id"
            :span="8"
            class="home pb-3">
            <div v-if="item.pictureUrl">
              <router-link
                :to="{ name: 'RoomDetails', params: { id: item.id } }"
                class="rounded overflow-hidden">
                <el-image
                  fit="cover"
                  class="picture rounded"
                  :src="item.pictureUrl"
                  :alt="item.title" />
              </router-link>
            </div>

            <div
              v-show="item.title && item.price"
              class="info pt-2 text-gray-darkest font-heiti">
              <router-link
                :to="{ name: 'RoomDetails', params: { id: item.id } }">
                <p class="title line-clamp-2 font-extrabold">
                  {{ item.title }}
                </p>
              </router-link>
              <div class="mt-0.5">
                <span class="font-semibold">￥{{ item.price }}</span>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </div>
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
      background: #055256;
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
