<template>
  <q-btn @click="toggleLang()" :label="langDefault" icon="language" stretch flat />
</template>

<script setup lang="ts">
import composableLang from "@composables/modeLang";

const { langDefault, toggleLang } = composableLang();
</script>
