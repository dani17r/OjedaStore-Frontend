<template>
  <div @dblclick="edite()" class="dbclick">
    <q-input
      :class="{ 'no-edit': !valueEdit }"
      @keyup.esc="cancel()"
      :disable="!valueEdit"
      @keyup.enter="save()"
      ref="inputElement"
      v-bind="$attrs"
      @blur="blur()"
      v-model="val"
    >
      <template v-for="(_, name) in $slots" #[nameSlot(name)]="slotProps">
        <slot :name="name" v-bind="slotProps" :key="name" />
      </template>
      <template #before>
        <div
          class="tw-absolute tw-right-10 tw-z-50"
          :style="`right:${positionIconEdite}`"
        >
          <q-icon name="edit" @click="edite()" v-if="!valueEdit" />
          <div v-else class="tw-flex tw-gap-2">
            <q-icon name="save" @click="save()" />
            <q-icon name="cancel" color="red" @click="cancel()" />
          </div>
        </div>
      </template>
    </q-input>
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
    positionIconEdite: {
      type: String,
    },
  },
  emits: {
    save(val: never) {
      return val;
    },
    blur(val = true) {
      return val;
    },
  },
  setup(props, ctx) {
    const val = ref(props.value);

    const valueEdit = ref(false);
    const dispatchEvent = ref(true);
    const inputElement = ref<Ref | null>(null);

    const edite = () => {
      valueEdit.value = true;
      setTimeout(() => inputElement.value.focus(), 150);
    };

    const save = () => {
      if (String(val.value).length > 4) {
        dispatchEvent.value = false;
        valueEdit.value = false;
        ctx.emit("save", val.value as never);
      }
    };

    const cancel = () => {
      dispatchEvent.value = true;
      val.value = props.value;
      valueEdit.value = false;
    };

    const blur = () => {
      setTimeout(() => {
        if (dispatchEvent.value) {
          cancel();
          if (!val.value) ctx.emit("blur");
        }
        dispatchEvent.value = true;
      }, 250);
    };

    const nameSlot = (val: string | number) => String(val) ?? "default";

    return {
      inputElement,
      valueEdit,
      nameSlot,
      edite,
      cancel,
      save,
      blur,
      val,
    };
  },
});
</script>

<style>
.no-edit .q-field__control:before {
  border-bottom: 0px !important;
}

.no-edit .q-field__inner {
  cursor: default;
}
</style>
