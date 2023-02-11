<template>
  <q-toggle
    :label="flippedMode.title"
    :icon="flippedMode.icon"
    @toggle="toggle()"
    v-model="status"
  />
</template>

<script setup lang="ts">
import composableModeDark from "@composables/modeDark";

const { flippedMode, status, toggle } = composableModeDark();
</script>
