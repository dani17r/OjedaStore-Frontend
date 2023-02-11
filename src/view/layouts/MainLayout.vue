<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar class="tw-bg-one">
        <q-btn
          @click="toggleLeftDrawer()"
          aria-label="Menu"
          icon="menu"
          round
          flat
        />

        <LogoHeader />

        <q-btn round flat icon="notifications" class="tw-mr-4">
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
import BannerVerifyEmail from "@components/benners/warning/BannerVerifyEmail.vue";
import DrawerLeftOne from "@components/drawers/DrawerLeftOne.vue";
import MenuUserRight from "@components/menus/MenuRightUser.vue";
import ScrollMain from "@components/scrolls/ScrollMain.vue";
import LogoHeader from "@components/images/LogoHeader.vue";
import composableDrawers from "@composables/drawers";

const { toggleLeftDrawer } = composableDrawers();
</script>
