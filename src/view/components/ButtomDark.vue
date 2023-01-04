<template>
  <q-btn :icon="mode.icon" @click="toggle()" round flat />
</template>

<script setup lang="ts">
import composableModeDark from "@composables/modeDark";

const { mode, toggle } = composableModeDark();
</script>
