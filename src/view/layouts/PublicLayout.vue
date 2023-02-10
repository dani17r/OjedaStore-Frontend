<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar class="tw-bg-two">
        <LogoHeader />

        <q-btn :label="$t(`layouts.public.btn.${uri.name}`)" class="tw-capitalize" :icon="uri.icon" :to="uri" stretch
          flat />
        <ButtomLang />
      </q-toolbar>
    </q-header>

    <q-scroll-area :thumb-style="thumbStyle" style="height: 100vh; width: 100%" :tabindex="100">
      <q-page-container>
        <router-view />
      </q-page-container>
    </q-scroll-area>

    <ToggleDark class="tw-fixed tw-bottom-2 tw-right-4" />
  </q-layout>
</template>

<script setup lang="ts">
import { onBeforeRouteUpdate, RouteLocationNormalized } from "vue-router";
import ButtomLang from "@components/ButtomLang.vue";
import ToggleDark from "@components/ToggleDark.vue";
import LogoHeader from "@components/LogoHeader.vue";
import { useRoute } from "vue-router";
import { ref } from "vue";
const route = useRoute();

const thumbStyle: any = {
  backgroundColor: "#5e33af",
  borderRadius: "5px",
  opacity: 0.75,
  right: "2px",
  width: "5px",
};
const uris = {
  register: { name: "register", icon: "person_add_alt_1" },
  login: { name: "login", icon: "login" },
};
const uri = ref(uris.login);

const getPath = (router: RouteLocationNormalized) => {
  if (router.fullPath.includes("login")) {
    uri.value = uris.register;
  } else uri.value = uris.login;
};

getPath(route);

onBeforeRouteUpdate((to) => getPath(to));
</script>
