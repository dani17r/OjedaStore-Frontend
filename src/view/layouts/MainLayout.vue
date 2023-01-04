<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar class="bg-two">
        <q-btn flat round icon="menu" aria-label="Menu" @click="toggleLeftDrawer()" />

        <q-toolbar-title>
          <img src="/logo-250x41.png" width="250" />
        </q-toolbar-title>

        <q-btn round flat icon="notifications" class="mr-4">
          <q-badge floating color="red" label="4" />
        </q-btn>

        <MenuUserRight />
      </q-toolbar>
    </q-header>

    <DrawerLeftOne />
    <q-page-container>
      <router-view />
    </q-page-container>
    <BannerVerifyEmail />
  </q-layout>
</template>

<script setup lang="ts">
import BannerVerifyEmail from "@components/BannerVerifyEmail.vue";
import MenuUserRight from "@components/MenuUserRight.vue";
import DrawerLeftOne from "@components/DrawerLeftOne.vue";
import composableDrawers from "@composables/drawers";

const { toggleLeftDrawer } = composableDrawers();
</script>
