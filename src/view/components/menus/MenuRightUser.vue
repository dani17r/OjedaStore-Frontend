<template>
  <q-btn flat round>
    <AvatarAccount :previewImage="false" />
    <q-menu anchor="bottom right" self="top end" :offset="[-2, 5]">
      <q-item clickable @click="toggle()">
        <q-item-section avatar> <q-icon name="dark_mode" /></q-item-section>
        <q-item-section>
          <q-toggle v-model="status" size="40px" color="one-1" />
        </q-item-section>
      </q-item>
      <q-item clickable @click="toggleLang()">
        <q-item-section avatar> <q-icon name="translate" /></q-item-section>
        <q-item-section class="tw-capitalize">{{ langDefault }}</q-item-section>
      </q-item>
      <q-item clickable @click="authStore.logout()">
        <q-item-section avatar> <q-icon name="logout" /></q-item-section>
        <q-item-section>{{ $t("layouts.main.items.logout") }}</q-item-section>
      </q-item>
    </q-menu>
  </q-btn>
</template>

<script setup lang="ts">
import AvatarAccount from "@components/images/avatars/AvatarAccountUser.vue";
import composableModeDark from "@composables/modeDark";
import composableLang from "@composables/modeLang";
import { useAuthStore } from "@stores/auth";

const authStore = useAuthStore();
const { toggle, status } = composableModeDark();
const { langDefault, toggleLang } = composableLang();
</script>
