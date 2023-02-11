<template>
  <RouterView :name="viewLayout" />
  <ImgViewerBasic />
  <UploadImageChange />
</template>

<script setup lang="ts">
//Components
import UploadImageChange from "@components/images/uploads/UploadImageChange.vue";
import ImgViewerBasic from "@components/images/views/ImgViewerBasic.vue";

//Internal Project
import { useUserStore } from "@stores/user";

//Libraries
import { storeToRefs } from "pinia";
import { computed } from "vue";

//Stores
let userStore = useUserStore();
const { user } = storeToRefs(userStore);

//Computeds
const viewLayout = computed(() => (user.value == null ? "default" : "auth"));
</script>
