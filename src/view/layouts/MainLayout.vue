<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar class="bg-two">
        <q-btn flat round icon="menu" aria-label="Menu" @click="toggleLeftDrawer()" />

        <LogoHeader />

        <q-btn round flat icon="notifications" class="mr-4">
          <q-badge floating color="red" label="4" />
        </q-btn>

        <MenuUserRight />
      </q-toolbar>
    </q-header>

    <DrawerLeftOne />
    <ScrollMain>
      <q-page-container>
        <router-view />
      </q-page-container>
    </ScrollMain>

    <BannerVerifyEmail />
  </q-layout>
</template>

<script setup lang="ts">
import BannerVerifyEmail from "@components/BannerVerifyEmail.vue";
import ScrollMain from "@components/scroll/ScrollMain.vue";
import MenuUserRight from "@components/MenuUserRight.vue";
import DrawerLeftOne from "@components/DrawerLeftOne.vue";
import composableDrawers from "@composables/drawers";
import LogoHeader from "@components/LogoHeader.vue";

const { toggleLeftDrawer } = composableDrawers();
</script>
