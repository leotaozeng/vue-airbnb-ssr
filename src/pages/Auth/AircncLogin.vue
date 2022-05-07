<script setup lang="ts">
import { ref } from 'vue';
import type { TabsPaneContext } from 'element-plus';

const activeName = ref('signin');

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event);
};
</script>

<template>
  <div class="login w-screen h-screen flex flex-row">
    <!-- Left -->
    <div class="left-part"></div>

    <!-- Right -->
    <div class="right-part flex justify-center items-center">
      <div class="login-panel">
        <!-- Tabs -->
        <el-tabs
          v-model="activeName"
          class="demo-tabs"
          @tab-click="handleClick">
          <el-tab-pane name="signin">
            <template #label>
              <span class="tabs-label text-lg">登录</span>
            </template>
          </el-tab-pane>
          <el-tab-pane name="signup">
            <template #label>
              <span class="tabs-label text-lg">注册</span>
            </template>
          </el-tab-pane>
        </el-tabs>

        <!-- Form -->
        <div class="form"></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login {
  .left-part {
    flex: 3;
    background: #15258a url('../../assets/images/auth/background.png') no-repeat
      center/100%;
  }

  .right-part {
    flex: 2;

    .login-panel {
      width: 250px;
    }

    :deep(.el-tabs__nav) {
      float: initial;
      text-align: center;
    }
  }
}
</style>
