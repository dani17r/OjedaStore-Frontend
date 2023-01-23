<template>
  <q-avatar
    @click="previewImage && previewImg.togglePreview(avatar)"
    :color="props.color"
    :size="props.size"
  >
    <img :src="avatar" :width="props.size" />
  </q-avatar>
</template>

<script setup lang="ts">
import previewImageComposable from "@composables/previewImg";
import { useUserStore } from "@stores/user";
import { storeToRefs } from "pinia";
import { computed } from "vue";

interface PropsI {
  previewImage?: boolean;
  color?: string;
  state?: string;
  size?: string;
}

const props = withDefaults(defineProps<PropsI>(), {
  previewImage: true,
  color: "white",
  state: "user",
  size: "40px",
});

const userStore = useUserStore();
const { user, profile } = storeToRefs(userStore);
const previewImg = previewImageComposable();

const avatar = computed(() => {
  const isModule = props.state != "profile" ? user : profile;
  let images = isModule?.value?.images;
  if (!images) return "/avatar_placeholder.png";
  if (!images.avatar) return "/avatar_placeholder.png";
  return String(images.avatar);
});
</script>
