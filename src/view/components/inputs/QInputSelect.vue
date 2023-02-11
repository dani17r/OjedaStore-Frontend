<template>
  <div @dblclick="activeSelect()">
    <div tabindex="1" class="tw-absolute" ref="divElement"></div>
    <q-select
      v-bind="$attrs"
      :disable="!modeActive"
      ref="inputSelect"
      :class="[
        'tw-capitalize edit-select',
        !modeActive ? 'q-field--disabled' : 'not-select',
      ]"
      @popupHide="desactive"
      popupContentClass="tw-capitalize"
      @popupShow="modeActive = true"
      style="padding-left: 15px"
      v-model="val"
      @update:modelValue="(value) => $emit('save', value as never)"
    >
      <template v-slot:after>
        <q-icon name="edit" @click="activeSelect()" />
      </template>
    </q-select>
  </div>
</template>

<script lang="ts">
import { ref, Ref, defineComponent } from "vue";
export default defineComponent({
  inheritAttrs: false,
  props: {
    value: {
      type: String,
    },
  },
  emits: {
    save(val: never) {
      return val;
    },
  },
  setup(props) {
    const val = ref(props.value);
    const divElement = ref<Ref | null>(null);
    const inputSelect = ref<Ref | null>(null);
    const modeActive = ref(false);

    const desactive = () => {
      modeActive.value = false;
      setTimeout(() => divElement.value.focus(), 150);
    };

    const activeSelect = () => {
      modeActive.value = true;
      setTimeout(() => inputSelect.value.showPopup(), 150);
    };

    return {
      activeSelect,
      inputSelect,
      divElement,
      modeActive,
      desactive,
      val,
    };
  },
});
</script>

<style>
.edit-select .q-field__inner {
  cursor: default;
}

.edit-select .q-field__control:before {
  border: 0px !important;
}

.edit-select.not-select .q-field__control:after {
  height: 0px !important;
}
</style>
