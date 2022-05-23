<script lang="ts" setup></script>

<template>
  <div>
    <el-carousel
      :interval="4000"
      type="card"
      height="200px"
      indicator-position="none">
      <el-carousel-item v-for="item in 3" :key="item">
        <h3 text="2xl" justify="center">{{ item }}</h3>
      </el-carousel-item>
    </el-carousel>

    <div class="room-details">
      <div class="details-left">
        <h2>title</h2>

        <div>
          <div class="bedrooms">󰄄 1 间卧室</div>
          <div class="beds">󰄃 1 张床</div>
          <div class="baths">󰄁 1 间卫生间</div>
          <div class="guests">󰄂 可住 2 人</div>
        </div>

        <div class="tags">
          <el-tag class="ml-2" type="success">4.9分 · 270条评论</el-tag>
        </div>
      </div>

      <div class="details-right"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
