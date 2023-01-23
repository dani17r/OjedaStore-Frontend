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
import { useUserStore } from "@stores/user";
import { storeToRefs } from "pinia";

const userStore = useUserStore();
const { user } = storeToRefs(userStore);

const { drawerOne, changeStorageDrawerOne } = composableDrawers();
const items = [
  {
    to: { name: "home" },
    description: "start page",
    title: "Home",
    icon: "home",
  },
  {
    to: { name: "profile-user", params: { id: user?.value?._id } },
    description: "your account",
    title: "Profile",
    icon: "account_circle",
  },
];
</script>
