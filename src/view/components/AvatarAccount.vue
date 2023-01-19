<template>
  <q-avatar :size="props.size" :color="props.color">
    <img :src="avatar" :width="props.size" />
  </q-avatar>
</template>

<script setup lang="ts">
import { useUserStore } from "@stores/user";
import { storeToRefs } from "pinia";
import { computed } from "vue";

const userStore = useUserStore();
const { user } = storeToRefs(userStore);

const avatar = computed(() => {
  let images = user.value?.images;
  if (!images) return "/avatar_placeholder.png";
  if (!images.avatar) return "/avatar_placeholder.png";
  return String(images.avatar);
});

interface PropsI {
  size?: string;
  color?: string;
}

const props = withDefaults(defineProps<PropsI>(), {
  color: "white",
  size: "40px",
});
</script>
