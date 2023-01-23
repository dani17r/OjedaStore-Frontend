<template>
  <q-page>
    <div class="relative w-full">
      <q-img :src="imgHeader" style="width: 100%; height: 200px" fit="cover" />
      <div class="row items-center px-20 -mt-10">
        <AvatarAccount
          style="bottom: -20px; left: 30px"
          class="absolute z-20"
          state="profile"
          size="130px"
        />
        <div
          class="rounded z-10 pl-24 py-1 flex flex-col"
          style="height: 90px; width: 320px; background-color: #5e33af"
        >
          <span class="text-2xl">{{ startCase(String(profile?.fullname)) }}</span>
          <span class="text-md text-grey">{{ profile?.username }}</span>
          <span class="text-md text-grey">{{
            profile?.birthDate &&
            format(new Date(String(profile?.birthDate)), "dd/MM/yyyy")
          }}</span>
        </div>
      </div>
    </div>
    <div class="px-20 py-10 justify-evenly">
      <q-list bordered class="rounded-borders">
        <q-expansion-item
          switch-toggle-side
          expand-separator
          icon="perm_identity"
          label="Account settings"
        >
          <q-card>
            <q-card-section>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius
              reprehenderit eos corrupti commodi magni quaerat ex numquam, dolorum
              officiis modi facere maiores architecto suscipit iste eveniet doloribus
              ullam aliquid.
            </q-card-section>
          </q-card>
        </q-expansion-item>

        <q-expansion-item
          switch-toggle-side
          expand-separator
          icon="signal_wifi_off"
          label="Wifi settings"
        >
          <q-card>
            <q-card-section>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius
              reprehenderit eos corrupti commodi magni quaerat ex numquam, dolorum
              officiis modi facere maiores architecto suscipit iste eveniet doloribus
              ullam aliquid.
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </q-list>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import AvatarAccount from "@components/AvatarAccount.vue";
import { useUserStore } from "@stores/user";
import { storeToRefs } from "pinia";
import { startCase } from "lodash";
import { format } from "date-fns";
import { computed } from "vue";

let userStore = useUserStore();
const { profile } = storeToRefs(userStore);

const imgHeader = computed(() => {
  let images = profile.value?.images;
  if (!images) return "/header_placeholder.png";
  if (!images.header) return "/header_placeholder.png";
  return String(images.header);
});
</script>
