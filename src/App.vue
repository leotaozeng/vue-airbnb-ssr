<template>
  <router-view v-slot="{ Component: activeComponent }">
    <keep-alive>
      <component :is="activeComponent" />
    </keep-alive>
  </router-view>
</template>
