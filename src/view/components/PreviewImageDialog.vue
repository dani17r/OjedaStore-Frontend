<template>
  <q-dialog v-model="previewImg.preview.value">
    <q-img
      style="width: 100%; heigth: 50vh"
      spinner-color="white"
      loading="lazy"
      :src="previewImg.image.value"
    />
  </q-dialog>
</template>

<script setup lang="ts">
import previewImageComposable from "@composables/previewImg";

const previewImg = previewImageComposable();
</script>
