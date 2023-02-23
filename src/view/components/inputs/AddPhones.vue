<template>
  <div class="tw-mt-3">
    <span>{{ props.label }}</span>
    <div class="tw-my-4" id="contentInputs" v-if="phones.length">
      <QInputEdit
        :position-icon-edite="!modoEdit ? '70px' : 'none'"
        @save="(val) => savePhone(val, index)"
        :label="`Telefono nº ${index + 1}`"
        v-for="(phone, index) in phones"
        @blur="() => removePhone(index)"
        :value="String(phone)"
        mask="## ###-####"
        prefix="+58 04"
        unmasked-value
        :key="index"
      >
        <template #after v-if="phone.length > 1">
          <q-icon
            @click="removePhone(index)"
            style="margin-top: 2px"
            name="delete"
            class="z-50"
          />
        </template>
      </QInputEdit>
    </div>
    <div class="tw-mt-3">
      <q-btn
        label="Añadir telefono"
        @click="addPhone()"
        v-show="!modoEdit"
        color="grey"
        no-caps
        flat
      />
    </div>
  </div>
</template>

<script setup lang="ts">
// Internal proyect
import QInputEdit from "@components/inputs/QInputEdit.vue";

//Libraries
import { ref } from "vue";

const emits = defineEmits({
  save: (val: never) => {
    return val;
  },
});

const props = defineProps({
  value: {
    required: false,
    type: Array || undefined,
  },
  label: {
    required: true,
    type: String,
  },
});

const phones = ref<String[]>(props.value as String[]);
const modoEdit = ref(false);

const removePhone = (index: number) => {
  phones.value.splice(index, 1);
  modoEdit.value = false;
  emits("save", phones.value as never);
};

const savePhone = (val: string, index: number) => {
  phones.value[index] = val;
  modoEdit.value = false;
  emits("save", phones.value as never);
};

const addPhone = () => {
  phones.value.push("");
  setTimeout(() => {
    let input = document.getElementById("contentInputs");
    if (input) {
      const element = input.children[phones.value.length - 1];
      element.dispatchEvent(new MouseEvent("dblclick"));
      modoEdit.value = true;
    }
  }, 150);
};
</script>
