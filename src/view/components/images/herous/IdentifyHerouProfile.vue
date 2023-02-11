<template>
  <div class="tw-px-20 tw-mt-2">
    <div
      @mouseover="currentUserOnly ? (showEditeImage = true) : null"
      @mouseleave="currentUserOnly ? (showEditeImage = false) : null"
      style="bottom: -18px; left: 54px"
      class="tw-absolute"
    >
      <AvatarAccount state="profile" size="130px" :only="true" />

      <q-btn
        class="tw-text-white tw-absolute tw-bottom-1 tw-right-2"
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
      class="tw-pl-24 tw-flex tw-flex-col tw-justify-center"
      style="height: 90px; padding-left: 130px"
    >
      <span class="name">{{ startCase(String(profile?.fullname)) }}</span>
      <span class="">{{ profile?.username }}</span>
      <span class="tw-text-sm tw-text-two-2 tw-mt-1">{{
        profile?.birthDate &&
        format(new Date(String(profile?.birthDate)), "dd/MM/yyyy")
      }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
// Internal proyect
import imageChangeComposable from "@composables/uploadImageChange";
import { useUserStore } from "@stores/user";

// Componentes
import AvatarAccount from "@components/images/avatars/AvatarAccountUser.vue";

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

<style lang="scss" scoped>
.name {
  @apply tw-text-3xl;

  .body--light {
    @apply tw-text-white;
  }

  .body--dark {
    @apply tw-text-black;
  }
}

.username {
  @apply tw-text-3xl;

  .body--light {
    @apply tw-text-black;
  }

  .body--dark {
    @apply tw-text-two-1;
  }
}
</style>
