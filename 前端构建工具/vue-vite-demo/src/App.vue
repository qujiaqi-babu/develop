<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<template>
  <router-view />
  <div>
    <RouterLink to="/">Home Page</RouterLink>
    <span> | </span>
    <RouterLink to="/babu">Babu Page</RouterLink>
  </div>
</template>