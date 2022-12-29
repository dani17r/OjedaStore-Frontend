<template>
  <div class="row justify-center items-center" style="height: 100vh">
    <div v-if="message" class="text-lg capitalize">
      {{ message }}
    </div>
    <q-spinner-oval color="primary" size="3.5em" v-else />
  </div>
</template>

<script setup lang="ts">
import { autoDestroyNotify } from "@helps/customNotify";
import * as httpAuth from "@http/auth";
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";

const route = useRoute();
const message = ref(null);

onMounted(() => {
  httpAuth
    .activeEmail({
      token: String(route.params?.token),
      model: "accounts",
    })
    .then((data) => {
      setTimeout(() => {
        message.value = data.message;
        autoDestroyNotify("Esta pestaña se auto cerrara");
      }, 200);
    })
    .catch((data) => {
      setTimeout(() => {
        message.value = data.response.data?.message;
      }, 200);
    });
});
</script>
