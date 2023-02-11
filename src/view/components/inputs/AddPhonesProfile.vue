<template>
  <div v-if="profile">
    <span>Telefonos</span>
    <template v-if="phones.length">
      <div class="m-5" id="contentInputs">
        <QInputEdit
          v-for="(phone, index) in phones"
          inputStyle="margin-left: -4px"
          label="Añadir telefono"
          :value="String(phone)"
          mask="## ###-####"
          prefix="+58 04"
          unmasked-value
          :key="index"
        />
      </div>
    </template>
    <div class="ml-5">
      <q-btn label="Añadir telefono" flat @click="addPhone()" />
    </div>
  </div>
</template>

<script setup lang="ts">
// Internal proyect
import QInputEdit from "@components/inputs/QInputEdit.vue";
import { userStore } from "@stores/user";

//Libraries
import { Ref, ref } from "vue";

const { profile } = userStore();
const phones = ref<String[]>([]);

const addPhone = () => {
  phones.value.push("");
  setTimeout(() => {
    let input = document.getElementById("contentInputs");
    if (input) {
      const element = input.children[phones.value.length - 1];
      element.dispatchEvent(new MouseEvent("dblclick"));
    }
  }, 150);
};
</script>
