<script setup lang="ts">
import { useStore } from 'vuex'
const store = useStore()
store.commit('setName', '瞿佳琪')
console.log(store.state.name)
</script>

<template>
  <div>
    <img src="../assets/img/babu.svg" class="logo babu" alt="Babu logo" />
  </div>
  <h1 class="babu-title">Babu Page</h1>
  <p>Welcome to the Babu Page!</p>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Babu',
});
</script>