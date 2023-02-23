<template>
  <q-dialog v-bind="$attrs" @beforeHide="close()">
    <q-card style="min-width: 460px">
      <q-card-section>
        <div class="text-h6">
          {{ modeEdit ? "Actualizar Ubicacion" : "Agregar Ubicacion" }}
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div class="tw-grid tw-gap-4" v-if="locations[position]">
          <SelectCountryStateCity
            @saveCountry="(val:CountryT) => (locations[position].country = val)"
            @saveState="(val: StateT) => (locations[position].state = val)"
            @saveCity="(val:CityT) => (locations[position].city = val)"
            :countries="countriesStatesCities"
            :location="locations[position]"
          />
          <q-input
            placeholder="Av. tal, Barrio tal, sector tal, casa nº tal..."
            v-model="locations[position].address"
            label="Dirección"
          />
          <q-input
            placeholder="Diagonal a, frente a, al lado de, casa color..."
            v-model="locations[position].references"
            label="Referencia"
          />
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          @click="save()"
          label="Guardar"
          color="primary"
          v-close-popup
          flat
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import SelectCountryStateCity from "@components/inputs/SelectCountryStateCity.vue";
import { CityT, CountryT, LocationI, StateT } from "@interfaces/user";
import locationsComposable from "@composables/locations";
import { deleteProxys, verifyObjects } from "@tools/utils";
import { cloneDeep } from "lodash";
import { ref } from "vue";

const {
  countriesStatesCities,
  removeLocation,
  copyLocations,
  locations,
  position,
  modeEdit,
} = locationsComposable();

//Identificar si se le dio al boton guardar
const isSave = ref(false);

const emits = defineEmits({
  save: (val: LocationI[]) => val,
});

const close = () => {
  //Al cerrar verificamos si no le dimos click a guardar
  if (!isSave.value) {
    // verificamos que los datos del imput hayan cambiado
    if (verifyObjects(locations.value, copyLocations.value)) {
      // insertamos los datos antiguos al cerrar
      locations.value = cloneDeep(copyLocations.value);
    }
  }
  // De lo contrario entonces le dimos guardar
  else {
    //Preguntamos no esta en modo edicion para
    //elimar el ultimo array agregado
    !modeEdit && removeLocation();

    //Volvemos al estado origial el click guardar.
    isSave.value = false;
  }
};

const save = () => {
  //Activamos el modo guardar
  isSave.value = true;

  //Obtenemos los cambios realizados sin la reactividad
  const changeLocation = deleteProxys(locations.value);

  //Guardamos el nuevo cambio en la copia para cuando
  //necesitemos cancelar algun cambio nuevamente
  copyLocations.value = cloneDeep(changeLocation);

  //Enviamos los cambios
  emits("save", changeLocation);
};
</script>
