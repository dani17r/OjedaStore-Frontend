<template>
  <div
    class="text-center flex flex-center"
    style="height: 100vh; margin-top: -50px"
    v-if="props.isError"
  >
    <div>
      <div style="font-size: 10vh">Not fount user</div>

      <div class="text-h4" style="opacity: 0.4">Oops. Nothing user profile...</div>

      <q-btn
        class="q-mt-xl"
        color="white"
        text-color="blue"
        unelevated
        to="/"
        label="Go Home"
        no-caps
      />
    </div>
  </div>
  <div v-else>
    <slot />
  </div>
</template>

<script lang="ts" setup>
interface PropsI {
  isError: boolean;
}

const props = withDefaults(defineProps<PropsI>(), {
  isError: false,
});
</script>
