<template>
  <RouterView :name="viewLayout" />
  <ImgViewerBasic />
  <ImgChangeUpload />
</template>

<script setup lang="ts">
import ImgChangeUpload from "@components/modals/ImgChangeUpload.vue";
import ImgViewerBasic from "@components/modals/ImgViewerBasic.vue";
import { useUserStore } from "@stores/user";
import { storeToRefs } from "pinia";
import { computed } from "vue";

let userStore = useUserStore();
const { user } = storeToRefs(userStore);
const viewLayout = computed(() => (user.value == null ? "default" : "auth"));
</script>
