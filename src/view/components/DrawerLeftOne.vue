<template>
  <q-drawer v-model="drawerOne" @hide="changeStorageDrawerOne()">
    <q-list>
      <CardAccount />

      <template v-for="item in items" :key="item.title">
        <ButtomLink v-bind="item" />
      </template>
    </q-list>
  </q-drawer>
</template>

<script setup lang="ts">
import CardAccount from "@components/CardAccount.vue";
import composableDrawers from "@composables/drawers";
import ButtomLink from "@components/ButtomLink.vue";

const { drawerOne, changeStorageDrawerOne } = composableDrawers();
const items = [
  {
    to: { name: "home-shop" },
    description: "start page",
    title: "Home",
    icon: "home",
  },
  {
    to: { name: "profile-shop" },
    description: "your account",
    title: "Profile",
    icon: "account_circle",
  },
];
</script>
