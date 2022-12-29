<template>
  <q-btn :icon="modeDark.icon" @click="toggleDark()" round flat />
</template>

<script setup lang="ts">
import composableModeDark from "@composables/modeDark";

const { modeDark, toggleDark } = composableModeDark();
</script>
