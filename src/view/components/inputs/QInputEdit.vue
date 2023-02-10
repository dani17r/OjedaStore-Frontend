<template>
  <div @dblclick="edite()">
    <q-input v-bind="$attrs" v-model="val" :class="{ 'no-edit': !valueEdit }" @blur="blur()" ref="inputElement"
      :disable="!valueEdit" @keyup.esc="cancel()" @keyup.enter="save()">
      <template v-slot:before>
        <div class="tw-absolute tw-right-10 tw-z-50">
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
  },
  emits: {
    save(val: never) { return val },
  },
  setup(props, ctx) {
    const val = ref(props.value)

    const valueEdit = ref(false);
    const dispatchEvent = ref(true);
    const inputElement = ref<Ref | null>(null);

    const edite = () => {
      valueEdit.value = true;
      setTimeout(() => inputElement.value.focus(), 150);
    };

    const save = () => {
      dispatchEvent.value = false
      valueEdit.value = false
      ctx.emit("save", val.value as never);
    }
    const cancel = () => {
      dispatchEvent.value = false
      val.value = props.value;
      valueEdit.value = false
    }

    const blur = () => {
      if (dispatchEvent.value) {
        setTimeout(() => cancel(), 250)
      } else dispatchEvent.value = true
    }

    return {
      inputElement,
      valueEdit,
      edite,
      cancel,
      save,
      blur,
      val,
    }
  }
})
</script>


<style>
.no-edit .q-field__control:before {
  border-bottom: 0px !important;
}

.no-edit .q-field__inner {
  cursor: default;
}
</style>
