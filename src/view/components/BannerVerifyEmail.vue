<template>
  <q-banner class="tw-text-white tw-bg-red tw-fixed tw-bottom-0 tw-w-full tw-p-0 tw-m-0 tw-px-4"
    style="z-index: 1000; min-height: 5px" v-if="emailIsVerify && !close" inline-actions>
    <q-icon color="white" name="warning" size="20px" class="mr-4" />
    <span class="tw-mr-4"> {{ $t("layouts.main.banner.text") }}. </span>
    <a class="tw-underline tw-cursor-pointer" @click="sendAgainVerifyEmail()" v-if="sendEmail">{{
      $t("layouts.main.banner.link")
    }}</a>
    <template v-slot:action>
      <q-btn flat round color="white" icon="close" @click="closeBanner()" />
    </template>
  </q-banner>
</template>

<script setup lang="ts">
import { useUserStore } from "@stores/user";
import { Notify, SessionStorage } from "quasar";
import * as httpAuth from "@http/auth";
import { storeToRefs } from "pinia";
import { ref } from "vue";

const userStore = useUserStore();
const { emailIsVerify, user } = storeToRefs(userStore);
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
    .verifyEmail(String(user.value?.email), "users")
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
