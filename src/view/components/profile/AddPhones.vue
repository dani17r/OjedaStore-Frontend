<template>
  <div v-if="profile">
    <span>Telefonos</span>
    <template v-if="profile.phones.length">
      <div v-for="(phone, index) in profile.phones" :key="index" class="m-5">
        <q-input :modelValue="phone" label="Nombre de usuario" />
      </div>
    </template>
    <div v-else class="ml-5">
      <QInputEdit
        inputStyle="margin-left: -4px"
        label="Añadir telefono"
        mask="## ###-####"
        v-model="newPhone"
        unmasked-value
        prefix="+58 04"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
// Internal proyect
import QInputEdit from "@components/inputs/QInputEdit.vue";
import { useUserStore } from "@stores/user";

//Libraries
import { storeToRefs } from "pinia";
import { ref } from "vue";

const newPhone = ref("");
let userStore = useUserStore();
const { profile } = storeToRefs(userStore);
</script>
