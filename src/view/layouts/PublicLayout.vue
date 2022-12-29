<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar class="bg-two">
        <q-toolbar-title>
          <img src="/logo-250x41.png" width="250" />
        </q-toolbar-title>

        <q-btn
          :label="$t(`layouts.public.btn.${uri.name}`)"
          style="min-height: 50px"
          class="capitalize"
          :icon="uri.icon"
          :to="uri"
          flat
        />
        <ButtomLang />
      </q-toolbar>
    </q-header>

    <q-scroll-area
      :thumb-style="thumbStyle"
      style="height: 100vh; width: 100%"
      :tabindex="100"
    >
      <q-page-container>
        <router-view />
      </q-page-container>
    </q-scroll-area>
  </q-layout>
</template>

<script setup lang="ts">
import { onBeforeRouteUpdate, RouteLocationNormalized } from "vue-router";
import ButtomLang from "@components/ButtomLang.vue";
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
