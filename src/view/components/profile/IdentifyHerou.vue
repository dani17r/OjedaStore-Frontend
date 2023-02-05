<template>
  <div class="row items-center px-20 -mt-10">
    <div
      @mouseover="currentUserOnly ? (showEditeImage = true) : null"
      @mouseleave="currentUserOnly ? (showEditeImage = false) : null"
      style="bottom: -20px; left: 30px"
      class="absolute z-20"
    >
      <AvatarAccount state="profile" size="130px" :only="true" />

      <q-btn
        class="text-white absolute bottom-1 right-2"
        @click="activeImageUploadAvatar()"
        style="background-color: #5e33af"
        v-show="showEditeImage"
        v-if="currentUserOnly"
        icon="crop_original"
        fab-mini
        round
      />
    </div>
    <div
      class="rounded z-10 pl-24 py-1 flex flex-col"
      style="height: 90px; width: 320px; background-color: #5e33af"
    >
      <span class="text-2xl text-white">{{ startCase(String(profile?.fullname)) }}</span>
      <span class="text-md text-white">{{ profile?.username }}</span>
      <span class="text-md text-grey">{{
        profile?.birthDate && format(new Date(String(profile?.birthDate)), "dd/MM/yyyy")
      }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
// Internal proyect
import imageChangeComposable from "@composables/uploadImageChange";
import { useUserStore } from "@stores/user";

// Componentes
import AvatarAccount from "@components/AvatarAccount.vue";

//Libraries
import { storeToRefs } from "pinia";
import { startCase } from "lodash";
import { format } from "date-fns";
import { ref } from "vue";

let userStore = useUserStore();
const { currentUserOnly, profile, images } = storeToRefs(userStore);
const { toggleModal, defineField, setCropper } = imageChangeComposable();

const showEditeImage = ref(false);

const activeImageUploadAvatar = () => {
  setCropper(images.value("avatar"));
  defineField("avatar");
  toggleModal();
};
</script>
