<template>
  <ErrorProfile :isError="profile == null">
    <q-page>
      <div class="tw-relative tw-w-full">
        <ImgHerou />
        <IdentifyHerou />
        <div class="absolute" style="right: 80px; bottom: 45px">
          <h3 class="tw-capitalize">
            {{ currentUserOnly ? "te uniste:" : "se unio:" }}
            {{ formatDate(profile?.createdAt) }}
          </h3>
        </div>
      </div>
      <div class="tw-p-10 tw-justify-evenly">
        <div v-if="currentUserOnly">
          <TabsProfile />
        </div>

        <div v-else>
          <h2>Perfil publico</h2>
        </div>
      </div>
    </q-page>
  </ErrorProfile>
</template>

<script setup lang="ts">
// Internal proyect
import { verifyProfile } from "@middlewares/one";
import { userStore } from "@stores/user";

// Componentes
import IdentifyHerou from "@components/images/herous/IdentifyHerouProfile.vue";
import ImgHerou from "@components/images/herous/ImgHerouProfile.vue";
import ErrorProfile from "@components/errors/ErrorProfile.vue";
import TabsProfile from "@components/tabs/TabsProfile.vue";

//Libraries
import { onBeforeRouteUpdate } from "vue-router";
import { formatDate } from "@tools/utils";

const { profile, currentUserOnly } = userStore();

onBeforeRouteUpdate(verifyProfile);
</script>

<style>
.splitter-profile > .q-splitter__panel.q-splitter__before {
  width: 13% !important;
}
</style>
