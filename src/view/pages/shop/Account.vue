<template>
  <q-page class="row items-center justify-evenly">
    <div>{{ user }}</div>
  </q-page>
</template>

<script setup lang="ts">
import { useUserStore } from "@stores/user";
import { storeToRefs } from "pinia";

let userStore = useUserStore();
const { user } = storeToRefs(userStore);
</script>
