<template>
  <q-banner
    class="text-white bg-red fixed bottom-0 w-full p-0 m-0 px-4"
    style="z-index: 1000; min-height: 5px"
    v-if="emailIsVerify && !close"
    inline-actions
  >
    <q-icon color="white" name="warning" size="20px" class="mr-4" />
    <span class="mr-4"> {{ $t("layouts.main.banner.text") }}. </span>
    <a
      class="underline cursor-pointer"
      @click="sendAgainVerifyEmail()"
      v-if="sendEmail"
      >{{ $t("layouts.main.banner.link") }}</a
    >
    <template v-slot:action>
      <q-btn flat round color="white" icon="close" @click="closeBanner()" />
    </template>
  </q-banner>
</template>

<script setup lang="ts">
import { useAccountStore } from "@stores/account";
import { Notify, SessionStorage } from "quasar";
import * as httpAuth from "@http/auth";
import { storeToRefs } from "pinia";
import { ref } from "vue";

const accountStore = useAccountStore();
const { emailIsVerify, account } = storeToRefs(accountStore);
let nameSend = "sendEmailVeriyAccount";

const isSend = () => {
  let getSend = SessionStorage.getItem(nameSend);
  return getSend ? getSend < new Date().getTime() : true;
};
const sendEmail = ref(isSend());

const close = ref(false);

const closeBanner = () => (close.value = true);

const sendAgainVerifyEmail = () => {
  httpAuth
    .verifyEmail({
      email: String(account.value?.email),
      model: String(account.value?.model),
    })
    .then(() => {
      let timestamp = new Date();
      let deadline = timestamp.setHours(timestamp.getHours() + 5);
      SessionStorage.set(nameSend, deadline);
      sendEmail.value = false;
    })
    .catch(() => {
      Notify.create({
        type: "negative",
        message: "No se pudo enviar el email",
      });
    });
};
</script>
