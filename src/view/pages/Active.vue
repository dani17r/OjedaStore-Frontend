<template>
  <div class="row justify-center items-center" style="height: 100vh">
    <div v-if="message" class="text-lg tw-capitalize">
      {{ message }}
    </div>
    <q-spinner-oval color="primary" size="3.5em" v-else />
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "@stores/auth";
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";

const authStore = useAuthStore();
const message = ref(null);
const route = useRoute();

onMounted(() => authStore.sendVerifyEmail(route, message));
</script>
