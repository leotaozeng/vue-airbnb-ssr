<script lang="ts" setup>
import { userSignOutAPI } from '@/api/auth';
import avatarUrl from '@/assets/images/avatar.jpeg';
import logoUrl from '@/assets/images/logo.png';
import { useAuthStore } from '@/stores/auth';
import { useLocaleStore } from '@/stores/locale';
import { ElMessage } from 'element-plus';
import en from 'element-plus/lib/locale/lang/en';
import zhCN from 'element-plus/lib/locale/lang/zh-CN';

const { locale: localeLanguage } = useI18n();
const { t } = useI18n();
const router = useRouter();
const route = useRoute();
const routes = ['Home'];
const authStore = useAuthStore();
const localeStore = useLocaleStore();

const isHeaderIndependent = computed(() => {
  return !routes.includes(route.name as string);
});
const headerClassObject = computed(() => {
  return {
    relative: isHeaderIndependent.value,
    absolute: !isHeaderIndependent.value
  };
});
const menuClassObject = computed(() => {
  return {
    'border-b': isHeaderIndependent.value,
    'border-b-0': !isHeaderIndependent.value,
    'show-white-text': !isHeaderIndependent.value
  };
});

async function handleSelect(key: string, keyPath: string[]) {
  if (keyPath[0] === 'language') {
    if (key === 'zh-cn') {
      localeLanguage.value = 'zh-cn';
      localeStore.setLanguage(zhCN);
    } else if (key === 'en') {
      localeLanguage.value = 'en';
      localeStore.setLanguage(en);
    }
  } else if (keyPath[0] === 'auth') {
    router.push({ name: 'Login' });
  } else if (keyPath[0] === 'avatar') {
    if (key === 'signout') {
      const response = await userSignOutAPI();
      if (response && response.success && response.result) {
        const { message, result } = response;
        const { status } = result;

        authStore.setLoggedIn(status);
        ElMessage({
          message,
          type: 'success',
          showClose: true
        });

        router.push({ name: 'Home' });
      }
    }
  }
}
</script>

<template>
  <el-header
    class="w-full flex justify-between items-center p-0"
    :class="headerClassObject"
    height="81px">
    <!-- Left -->
    <router-link :to="{ name: 'Home' }">
      <h1 class="m-0 text-base">
        <el-image :src="logoUrl" alt="logo" class="logo-container z-10">
          <template #error>
            <div class="image-slot">
              <el-icon>
                <i-ep-picture />
              </el-icon>
            </div>
          </template>
        </el-image>
      </h1>
    </router-link>

    <!-- Right -->
    <el-menu
      mode="horizontal"
      background-color="transparent"
      class="menu w-full h-full justify-end font-semibold"
      :class="menuClassObject"
      :ellipsis="false"
      @select="handleSelect">
      <!-- Reservation Center -->
      <el-menu-item index="reservationCenter" class="menu-item">
        {{ t('header.menu.reservationCenter') }}
      </el-menu-item>

      <!-- Browsing History -->
      <el-menu-item index="history" class="menu-item">
        {{ t('header.menu.history') }}
      </el-menu-item>

      <!-- Language Selection -->
      <el-sub-menu
        index="language"
        class="submenu"
        popper-class="menu-popup-container"
        :popper-offset="-15">
        <template #title>{{ t('header.menu.language') }}</template>

        <!-- Chinese -->
        <el-menu-item index="zh-cn" v-show="localeLanguage !== 'zh-cn'">
          {{ t('header.menu.chinese') }}
        </el-menu-item>

        <!-- English -->
        <el-menu-item index="en" v-show="localeLanguage !== 'en'">
          {{ t('header.menu.english') }}
        </el-menu-item>

        <!-- Spanish -->
        <el-menu-item index="spanish" v-show="localeLanguage !== 'spanish'">
          {{ t('header.menu.spanish') }}
        </el-menu-item>
      </el-sub-menu>

      <!-- Auth -->
      <el-menu-item
        v-if="authStore.loggedIn === 0"
        index="auth"
        class="menu-item">
        {{ t('auth.signinTab') }} / {{ t('auth.signupTab') }}
      </el-menu-item>

      <!-- Avatar -->
      <el-sub-menu
        v-else
        index="avatar"
        class="submenu"
        popper-class="menu-popup-container"
        :popper-offset="-15">
        <template #title>
          <el-avatar
            :size="28"
            :src="avatarUrl"
            alt="avatar"
            class="avatar-container">
            <img
              src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
          </el-avatar>
        </template>

        <el-menu-item index="signout"> {{ t('auth.signoutBtn') }}</el-menu-item>
      </el-sub-menu>
    </el-menu>
  </el-header>
</template>

<style lang="scss" scoped>
.el-header {
  .logo-container {
    position: absolute;
    left: 24px;
    top: 50%;
    transform: translate3d(0, -50%, 0);
    width: 162px;

    .image-slot {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 80px;
      background: var(--el-fill-color-light);
      color: var(--el-text-color-secondary);
      font-size: 30px;

      .el-icon {
        font-size: 30px;
      }
    }
  }

  .menu {
    padding: 0 24px;
    border-color: #ebebeb;

    &.show-white-text {
      .menu-item {
        color: white;
      }

      .submenu {
        :deep(.el-sub-menu__title) {
          color: white;
        }
      }
    }

    .menu-item {
      padding: 0 12px;

      &:hover,
      &:focus {
        background-color: transparent;
      }
    }

    .submenu {
      :deep(.el-sub-menu__title) {
        padding: 0 12px;
        background-color: transparent !important;
      }
    }
  }

  .avatar-container {
    box-shadow: rgb(235 235 235) 0px 0px 0px 2px !important;
  }
}
</style>
