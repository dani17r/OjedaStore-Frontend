<template>
  <q-avatar @click="props.previewImage && previewImg.togglePreview(avatar)" class="tw-cursor-pointer"
    :color="props.color" :size="props.size">
    <q-img v-if="!stateProfile?.images.avatar.image?.src" :src="'/avatar_placeholder.png'" :width="props.size" />
    <Preview :style="`width: ${props.size}; height: ${props.size}; border: 1px solid #fff; border-radius: 50%;`"
      :coordinates="stateProfile?.images.avatar?.coordinates" :image="stateProfile?.images.avatar?.image" v-else />
  </q-avatar>
</template>

<script setup lang="ts">
//Components
import imageViewerComposable from "@composables/imageViewer";

//Internal Imports
import { useUserStore } from "@stores/user";

//Libraries
import { Preview } from "vue-advanced-cropper";
import { storeToRefs } from "pinia";
import { computed } from "vue";

const props = defineProps({
  previewImage: {
    type: Boolean,
    default: true,
  },
  color: {
    type: String,
    default: "white",
  },
  size: {
    type: String,
    default: "40px",
  },
  only: {
    type: Boolean,
    default: false,
  },
});

const userStore = useUserStore();
const { user, profile, currentUserOnly } = storeToRefs(userStore);
const previewImg = imageViewerComposable();

const stateProfile = computed(() => {
  return !currentUserOnly.value && props.only ? profile.value : user.value;
});

const avatar = computed(() => {
  if (!stateProfile.value?.images.avatar.image?.src) return "/avatar_placeholder.png";
  else return stateProfile.value?.images.avatar.image.src;
});
</script>
