<template>
  <q-btn :icon="iconDark" @click="toggleDark()" round flat />
</template>

<script setup lang="ts">
import composableModeDark from "@composables/modeDark";

const { iconDark, toggleDark } = composableModeDark();
</script>
