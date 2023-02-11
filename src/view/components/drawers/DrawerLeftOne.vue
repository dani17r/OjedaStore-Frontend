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
import CardAccount from "@components/cards/CardAccountProfile.vue";
import ButtomLink from "@components/buttoms/ButtomLink.vue";
import composableDrawers from "@composables/drawers";
import { useUserStore } from "@stores/user";

const { user } = useUserStore();

const { drawerOne, changeStorageDrawerOne } = composableDrawers();
const items = [
  {
    to: { name: "home" },
    description: "start page",
    title: "Home",
    icon: "home",
  },
  {
    to: { name: "profile-user", params: { id: user?._id } },
    description: "your account",
    title: "Profile",
    icon: "account_circle",
  },
];
</script>
