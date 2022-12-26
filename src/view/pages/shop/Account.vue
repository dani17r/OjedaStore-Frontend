<template>
  <q-page class="row items-center justify-evenly">
    <div>{{ account }}</div>
  </q-page>
</template>

<script setup lang="ts">
import { useAccountStore } from "@stores/account";
import { storeToRefs } from "pinia";

let accountStore = useAccountStore();
const { account } = storeToRefs(accountStore);
</script>
