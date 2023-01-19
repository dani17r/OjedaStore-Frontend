<template>
  <q-card flat class="mt-3 mb-2">
    <q-item>
      <q-item-section avatar>
        <AvatarAccount size="70px" />
      </q-item-section>
      <q-item-section class="truncate pr-2">
        <q-item-label class="text-lg font-semibold">
          {{ startCase(String(user?.fullname)) }}
        </q-item-label>
        <q-item-label class="font-semibold" caption>{{ user?.username }}</q-item-label>
        <hr class="my-2" />
        <q-item-label caption>
          {{ user?.email }}
        </q-item-label>
      </q-item-section>
    </q-item>
  </q-card>
</template>

<script setup lang="ts">
import AvatarAccount from "@components/AvatarAccount.vue";
import { useUserStore } from "@stores/user";
import { storeToRefs } from "pinia";
import { startCase } from "lodash";

const userStore = useUserStore();
const { user } = storeToRefs(userStore);
</script>
