<template>
  <div
    class="relative"
    @mouseover="currentUserOnly ? (showEditeImage = true) : null"
    @mouseleave="currentUserOnly ? (showEditeImage = false) : null"
  >
    <q-img
      style="width: 100%; height: 200px"
      :src="'/herou_placeholder.png'"
      v-if="!profile?.images.herou.image?.src"
    />
    <Preview
      style="width: 100%; height: 200px"
      :coordinates="profile?.images.herou.coordinates"
      :image="profile?.images.herou.image"
      v-else
    />
    <q-btn
      class="text-white absolute bottom-5 right-5"
      @click="activeImageUploadHerou()"
      style="background-color: #5e33af"
      v-show="showEditeImage"
      v-if="currentUserOnly"
      icon="crop_original"
      fab-mini
      round
      flat
    />
  </div>
</template>

<script setup lang="ts">
//Internal Project
import imageChangeComposable from "@composables/uploadImageChange";
import { verifyProfile } from "@middlewares/one";
import { useUserStore } from "@stores/user";

//Libraries
import { onBeforeRouteUpdate } from "vue-router";
import { Preview } from "vue-advanced-cropper";
import { storeToRefs } from "pinia";
import { ref } from "vue";

//Stores
let userStore = useUserStore();
const { images } = storeToRefs(userStore);
const { currentUserOnly, profile } = storeToRefs(userStore);

//Composables
const { toggleModal, defineField, setCropper } = imageChangeComposable();

// Variable
const showEditeImage = ref(false);

// Actions
const activeImageUploadHerou = () => {
  setCropper(images.value("herou"));
  defineField("herou");
  toggleModal();
};

//lifecycle
onBeforeRouteUpdate(verifyProfile);
</script>
