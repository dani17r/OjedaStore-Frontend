<template>
  <q-scroll-area style="height: 100vh" ref="scrollAreaRef">
    <slot />
    <q-btn
      icon="keyboard_arrow_up"
      class="btn-scroll-top"
      @click="scrollTop()"
      v-show="showBtn"
      color="one"
      round
    />
  </q-scroll-area>
</template>

<script setup lang="ts">
import { computed, ref, Ref } from "vue";

const scrollAreaRef = ref<Ref | null>(null);

const scrollTop = () => {
  if (scrollAreaRef.value) {
    scrollAreaRef.value.setScrollPosition("vertical", 0, 200);
  }
};

const showBtn = computed(() => {
  if (scrollAreaRef.value) {
    return scrollAreaRef.value.getScrollPosition().top > 50;
  } else return 0;
});
</script>
