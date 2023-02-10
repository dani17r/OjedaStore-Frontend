<template>
  <div @dblclick="edite()">
    <q-input v-bind="$attrs" v-model="val" :class="valueEdit ? 'edit-date' : 'no-edit'" :disable="!valueEdit">
      <template v-slot:before>
        <q-icon class="tw-absolute tw-right-10 tw-z-50" name="calendar_today" @click="edite()" />
      </template>
      <q-popup-proxy v-model="valueEdit" transition-show="scale" transition-hide="scale" @before-hide="blur()">
        <q-date v-model="val" @update:model-value="(newVal) => val = newVal" :locale="localeEs">
          <div class="tw-row tw-items-center tw-justify-end">
            <q-btn v-close-popup label="Guardar" color="primary" flat @click="save()" />
          </div>
        </q-date>
      </q-popup-proxy>
    </q-input>
  </div>
</template>

<script lang="ts">
import langComposable from "@composables/modeLang";
import { computed, ref, defineComponent } from "vue";

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
    const { langDefault } = langComposable();

    const dispatchEvent = ref(true);
    const valueEdit = ref(false);
    const val = ref(props.value);

    const localeEs = computed(() => {
      const calendEs = {
        days: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
        daysShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
        months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        monthsShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
      };

      return langDefault.value == 'en' ? calendEs : {};
    })

    const edite = () => {
      valueEdit.value = true;
    };

    const save = () => {
      dispatchEvent.value = false;
      valueEdit.value = false;
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
      valueEdit,
      localeEs,
      cancel,
      edite,
      save,
      blur,
      val,
    }
  }
})
</script>

<style>
.edit-date .q-field__control:before {
  border-bottom: 2px solid var(--q-primary);
}

.edit-date .q-field__control:hover:before {
  border-color: var(--q-primary) !important;
}
</style>