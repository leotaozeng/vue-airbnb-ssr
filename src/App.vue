<template>
  <router-view v-slot="{ Component: activeComponent }">
    <keep-alive>
      <suspense>
        <template #default>
          <component :is="activeComponent" />
        </template>
        <template #fallback>Loading...</template>
      </suspense>
    </keep-alive>
  </router-view>
</template>
