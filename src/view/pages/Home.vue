<template>
  <h1>Inicio</h1>
  <div>pintando datos privados: {{ user }}</div>
</template>

<script setup lang="ts">
import { useUserStore } from "@stores/user";
import { storeToRefs } from "pinia";

const userStore = useUserStore();
const { user } = storeToRefs(userStore);
</script>
