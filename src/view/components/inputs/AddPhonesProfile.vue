<template>
  <div v-if="profile" class="tw-mt-3">
    <span>Telefonos</span>
    <template v-if="phones.length">
      <div class="tw-my-4" id="contentInputs">
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
    </template>
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
import { userStore } from "@stores/user";

//Libraries
import { ref } from "vue";

const { profile } = userStore();
const phones = ref<String[]>([]);
const modoEdit = ref(false);

const removePhone = (index: number) => {
  phones.value.splice(index, 1);
  modoEdit.value = false;
};
const savePhone = (val: string, index: number) => {
  phones.value[index] = val;
  modoEdit.value = false;
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
