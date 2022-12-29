<template>
  <q-btn
    style="min-height: 50px"
    @click="toggleLang()"
    :label="langDefault"
    icon="language"
    flat
  />
</template>

<script setup lang="ts">
import composableLang from "@composables/modeLang";

const { langDefault, toggleLang } = composableLang();
</script>
