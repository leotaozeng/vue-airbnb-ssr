<template>
  <router-view v-slot="{ Component: activeComponent }">
    <transition name="fade" mode="out-in">
      <keep-alive>
        <suspense>
          <template #default>
            <component :is="activeComponent" />
          </template>
          <template #fallback>Loading...</template>
        </suspense>
      </keep-alive>
    </transition>
  </router-view>
</template>
