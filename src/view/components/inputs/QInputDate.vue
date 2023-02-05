<template>
  <q-input v-model="value" :class="modoEdite ? 'edit-date' : 'no-edit'" :disable="!modoEdite">
    <template v-slot:before>
      <q-icon class="absolute right-10 z-50" name="calendar_today" @click="modoEdite = true;" />
      <q-popup-proxy transition-show="scale" transition-hide="scale" @before-hide="modoEdite = false"
        @hide="value = copy">
        <q-date v-model="value" @update:model-value="(val) => value = val" :locale="localeEs">
          <div class="row items-center justify-end">
            <q-btn v-close-popup label="Guardar" color="primary" flat @click="copy = value" />
          </div>
        </q-date>
      </q-popup-proxy>
    </template>
  </q-input>
</template>

<script setup lang="ts">
import langComposable from "@composables/modeLang";
import { computed, ref } from "vue";
import { clone } from "lodash";

const { langDefault } = langComposable();

const props = defineProps({
  modelValue: {
    type: String,
  },
});

const copy = clone(props.modelValue);
const value = ref(props.modelValue);
const modoEdite = ref(false);

const localeEs = computed(() => {
  const calendEs = {
    days: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
    daysShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
    months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    monthsShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
  };

  return langDefault.value == 'en' ? calendEs : {};
});
</script>

<style>
.edit-date .q-field__control:before {
  border-bottom: 2px solid var(--q-primary);
}

.edit-date .q-field__control:hover:before {
  border-color: var(--q-primary) !important;
}
</style>