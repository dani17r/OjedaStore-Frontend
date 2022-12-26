<template>
  <q-btn flat round>
    <AvatarAccount />
    <q-menu anchor="bottom right" self="top end" :offset="[-2, 5]">
      <q-item clickable @click="authStore.logout()">
        <q-item-section avatar> <q-icon name="login" /></q-item-section>
        <q-item-section>Logout</q-item-section>
      </q-item>
      <q-item clickable @click="toggleDark()">
        <q-item-section avatar> <q-icon :name="iconDark" /></q-item-section>
        <q-item-section>Mode</q-item-section>
      </q-item>
    </q-menu>
  </q-btn>
</template>

<script setup lang="ts">
import AvatarAccount from "@components/AvatarAccount.vue";
import composableModeDark from "@composables/modeDark";
import { useAuthStore } from "@stores/auth";

const authStore = useAuthStore();
const { iconDark, toggleDark } = composableModeDark();
</script>
