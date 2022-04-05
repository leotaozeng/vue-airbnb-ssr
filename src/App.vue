<script setup lang="ts"></script>

<template>
  <router-link to="/">Home</router-link>
  <router-link to="/profile">Profile</router-link>

  <!-- route outlet -->
  <!-- component matched by the route will render here -->
  <router-view></router-view>
</template>

<style style="scss"></style>
