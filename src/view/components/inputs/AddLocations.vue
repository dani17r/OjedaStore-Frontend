<template>
  <div class="tw-mt-1">
    <div class="tw-mb-10">
      <AddOrEditLocation
        @save="(val:LocationI[]) => emits('save', val)"
        v-model="modal"
      />
      <q-btn
        label="Añadir Ubicacion"
        @click="add()"
        color="grey"
        no-caps
        flat
      />
    </div>
    <div class="tw-my-4" v-if="props.value.length">
      <div
        v-for="(location, index) in props.value"
        class="tw-full tw-px-5 tw-relative"
        :key="index"
      >
        <div class="tw-grid tw-gap-3 p-2">
          <div class="tw-flex tw-flex-col">
            <span class="tw-text-two-3 tw-text-xs">Pais</span>
            <span class="tw-text-two-2 tw-text-sm">{{
              location.country?.name
            }}</span>
          </div>

          <div class="tw-flex tw-flex-col">
            <span class="tw-text-two-3 tw-text-xs">Estado</span>
            <span class="tw-text-two-2 tw-text-sm">{{
              location.state?.name
            }}</span>
          </div>

          <div class="tw-flex tw-flex-col">
            <span class="tw-text-two-3 tw-text-xs">Ciudad</span>
            <span class="tw-text-two-2 tw-text-sm">{{
              location.city?.name
            }}</span>
          </div>

          <div class="tw-flex tw-flex-col">
            <span class="tw-text-two-3 tw-text-xs">Direccion</span>
            <span class="tw-text-two-2 tw-text-sm">{{
              location?.address
            }}</span>
          </div>

          <div class="tw-flex tw-flex-col">
            <span class="tw-text-two-3 tw-text-xs">Referencia</span>
            <span class="tw-text-two-2 tw-text-sm">{{
              location?.references
            }}</span>
          </div>
        </div>
        <div class="tw-absolute tw-top-0 tw-right-2">
          <q-btn
            @click="remove(index)"
            class="tw-text-two-2"
            size="15px"
            icon="delete"
            round
            flat
          />
          <q-btn
            @click="edit(index)"
            class="tw-text-two-2"
            size="15px"
            icon="edit"
            round
            flat
          />
        </div>
        <hr
          class="tw-mt-8 tw-mb-10"
          :style="
            index + 1 == props.value.length ? 'display:none' : 'display:block'
          "
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AddOrEditLocation from "@components/modals/AddOrEditLocation.vue";
import locationsComposable from "@composables/locations";
import { LocationI } from "@interfaces/user";
import { onMounted, ref } from "vue";

const props = defineProps<{ value: LocationI[] }>();

const emits = defineEmits({
  save: (val: LocationI[]) => val,
});

const { removeLocation, lengthLocation, newLocation, modeEdit, init } =
  locationsComposable();
const modal = ref(false);

const add = () => {
  lengthLocation.value = null;
  modeEdit.value = false;
  modal.value = true;
  newLocation();
};

const edit = (index: number) => {
  lengthLocation.value = index;
  modeEdit.value = true;
  modal.value = true;
};

const remove = (index: number) => {
  const list = removeLocation(index);
  emits("save", list);
};

onMounted(() => init(props.value));
</script>
