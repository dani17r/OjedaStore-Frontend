<template>
  <q-input
    :class="{ 'no-edit': !modoEdite }"
    v-model="$props.modelValue"
    @blur="modoEdite = false"
    :disable="!modoEdite"
    ref="inputElement"
  >
    <template v-slot:before>
      <div class="absolute right-10 z-50">
        <q-icon name="edit" @click="activeEdite" v-if="!modoEdite" />
        <div v-else class="flex gap-2">
          <q-icon name="save" @click="modoEdite = false" />
          <q-icon name="cancel" color="red" @click="modoEdite = false" />
        </div>
      </div>
    </template>
  </q-input>
</template>

<script setup lang="ts">
import { ref, Ref } from "vue";

defineProps({
  modelValue: {
    type: String,
  },
});

let modoEdite = ref(false);
let inputElement = ref<Ref | null>(null);

const activeEdite = () => {
  modoEdite.value = true;
  setTimeout(() => inputElement.value.focus(), 150);
};
</script>

<style>
.no-edit .q-field__control:before {
  border-bottom: 0px !important;
}
.no-edit .q-field__inner {
  cursor: default;
}
</style>
