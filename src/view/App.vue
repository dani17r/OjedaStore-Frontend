<template>
  <RouterView :name="viewLayout" />
  <PreviewImageDialog />
</template>

<script setup lang="ts">
import PreviewImageDialog from "@components/PreviewImageDialog.vue";
import { useUserStore } from "@stores/user";
import { storeToRefs } from "pinia";
import { computed } from "vue";

let userStore = useUserStore();
const { user } = storeToRefs(userStore);
const viewLayout = computed(() => (user.value == null ? "default" : "auth"));
</script>
