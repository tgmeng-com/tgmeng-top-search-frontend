<script setup>

import { computed } from 'vue';
import { useStore } from 'vuex';
const store = useStore();
// 通过 computed 来访问 Vuex 中的 state
const count = computed(() => store.getters.getCount);
// 触发 mutation
const increment = () => store.commit('increment');
const decrement = () => store.commit('decrement');
// 触发 action
const incrementAsync = () => store.dispatch('incrementAsync');


import { ref } from 'vue'
const drawer = ref(false)

</script>

<template>
  <div>
    <el-button type="primary" style="margin-left: 16px" @click="drawer = true">
      open
    </el-button>

    <el-drawer v-model="drawer" title="I am the title" :with-header="false" :direction="'ttb'">
      <h1>Current Count: {{ count }}</h1>
      <button @click="increment">Increment</button>
      <button @click="decrement">Decrement</button>
      <button @click="incrementAsync">Increment Async</button>
    </el-drawer>
  </div>
</template>

<style>

</style>