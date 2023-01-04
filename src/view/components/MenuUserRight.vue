<template>
  <q-btn flat round>
    <AvatarAccount />
    <q-menu anchor="bottom right" self="top end" :offset="[-2, 5]">
      <q-item clickable @click="toggleLang()">
        <q-item-section avatar> <q-icon name="language" /></q-item-section>
        <q-item-section class="capitalize">{{ langDefault }}</q-item-section>
      </q-item>
      <q-item clickable @click="toggle()">
        <q-item-section avatar> <q-icon :name="mode.icon" /></q-item-section>
        <q-item-section>{{
          $t(`layouts.main.items.modeDark.${camelCase(mode.title)}`)
        }}</q-item-section>
      </q-item>
      <q-item clickable @click="authStore.logout()">
        <q-item-section avatar> <q-icon name="logout" /></q-item-section>
        <q-item-section>{{ $t("layouts.main.items.logout") }}</q-item-section>
      </q-item>
    </q-menu>
  </q-btn>
</template>

<script setup lang="ts">
import AvatarAccount from "@components/AvatarAccount.vue";
import composableModeDark from "@composables/modeDark";
import composableLang from "@composables/modeLang";
import { useAuthStore } from "@stores/auth";
import { camelCase } from "lodash";

const authStore = useAuthStore();
const { mode, toggle } = composableModeDark();
const { langDefault, toggleLang } = composableLang();
</script>
