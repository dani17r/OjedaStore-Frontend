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
      @click="toggleModal()"
      v-show="showEditeImage"
      v-if="currentUserOnly"
      icon="linear_scale"
      fab-mini
      round
      flat
    />
  </div>
</template>

<script setup lang="ts">
import imageChangeComposable from "@composables/imgChange";
import { onBeforeRouteUpdate } from "vue-router";
import { verifyProfile } from "@middlewares/one";
import { Preview } from "vue-advanced-cropper";
import { useUserStore } from "@stores/user";
import { onMounted, ref } from "vue";
import { storeToRefs } from "pinia";

let userStore = useUserStore();
const { images } = storeToRefs(userStore);
const { currentUserOnly, profile } = storeToRefs(userStore);
const { toggleModal, defineField, setCropper } = imageChangeComposable();

const showEditeImage = ref(false);

onBeforeRouteUpdate(verifyProfile);
onMounted(() => {
  defineField("herou");
  setCropper(images.value("herou"));
});
</script>
