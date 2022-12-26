<template>
  <h1>Inicio</h1>
  <div>pintando datos privados: {{ account }}</div>
</template>

<script setup lang="ts">
import { useAccountStore } from "@stores/account";
import { storeToRefs } from "pinia";

const accountStore = useAccountStore();
const { account } = storeToRefs(accountStore);
</script>
