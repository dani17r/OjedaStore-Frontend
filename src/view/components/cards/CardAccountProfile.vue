<template>
  <q-card flat class="tw-mt-3 tw-mb-2">
    <q-item>
      <q-item-section avatar>
        <AvatarAccount size="70px" />
      </q-item-section>
      <q-item-section class="tw-truncate tw-pr-2">
        <q-item-label class="tw-text-lg tw-font-semibold">
          {{ startCase(String(user?.fullname)) }}
        </q-item-label>
        <q-item-label class="tw-font-semibold" caption>{{
          user?.username
        }}</q-item-label>
        <hr class="tw-my-2" />
        <q-item-label caption>
          {{ user?.email }}
        </q-item-label>
      </q-item-section>
    </q-item>
  </q-card>
</template>

<script setup lang="ts">
import AvatarAccount from "@components/images/avatars/AvatarAccountUser.vue";
import { useUserStore } from "@stores/user";
import { startCase } from "lodash";

const { user } = useUserStore();
</script>
