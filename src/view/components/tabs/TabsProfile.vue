<template>
  <q-splitter
    v-model="splitterModel"
    style="min-height: 216px"
    class="splitter-profile"
  >
    <template v-slot:before>
      <q-tabs v-model="tab" vertical class="tw-text-primary" noCaps>
        <q-tab name="1" icon="person" label="Identificacion" />
        <q-tab name="2" icon="room" label="Ubicaciones" />
        <q-tab name="3" icon="lock" label="Credenciales" />
      </q-tabs>
    </template>

    <template v-slot:after>
      <q-tab-panels v-model="tab" animated swipeable vertical>
        <q-tab-panel name="1" class="tw-p-10">
          <div class="tw-text-h4 q-mb-md">Identificacion Principal</div>
          <div v-if="profileCold" class="tw-grid tw-gap-4">
            <QInputEdit
              @save="(val) => changeField('fullname', val)"
              :value="profileCold.fullname"
              label="Nombre completo"
              class="tw-capitalize"
            />
            <QInputEdit
              @save="(val) => changeField('username', val)"
              :value="profileCold.username"
              label="Nombre de usuario"
            />
            <QInputDate
              @save="(val) => changeField('birthDate', val)"
              :value="profileCold.birthDate"
              label="Fecha de nacimiento"
            />
            <QInputSelect
              @save="(val) => changeField('gender', val)"
              :options="['femenino', 'masculino']"
              :value="profileCold.gender"
              label="Genero"
            />
            <AddPhones
              @save="(val) => changeField('phones', val)"
              :value="profileCold.phones"
              label="Telefonos"
            />
          </div>
        </q-tab-panel>

        <q-tab-panel name="2" class="tw-p-10">
          <div class="tw-text-h4 q-mb-md">Ubicacion Para Delivery</div>
          <div v-if="profile" class="tw-grid tw-gap-4">
            <AddLocations
              @save="(val) => changeField('locations', val as never)"
              :value="profile.locations"
            />
          </div>
        </q-tab-panel>

        <q-tab-panel name="3">
          <div class="tw-text-h4 q-mb-md">Movies</div>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis
            praesentium cumque magnam odio iure quidem, quod illum numquam
            possimus obcaecati commodi minima assumenda consectetur culpa fuga
            nulla ullam. In, libero.
          </p>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis
            praesentium cumque magnam odio iure quidem, quod illum numquam
            possimus obcaecati commodi minima assumenda consectetur culpa fuga
            nulla ullam. In, libero.
          </p>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis
            praesentium cumque magnam odio iure quidem, quod illum numquam
            possimus obcaecati commodi minima assumenda consectetur culpa fuga
            nulla ullam. In, libero.
          </p>
        </q-tab-panel>
      </q-tab-panels>
    </template>
  </q-splitter>
</template>

<script setup lang="ts">
// Internal proyect
import { useUserStore, userStore } from "@stores/user";

// Componentes
import QInputSelect from "@components/inputs/QInputSelect.vue";
import AddLocations from "@components/inputs/AddLocations.vue";
import QInputDate from "@components/inputs/QInputDate.vue";
import QInputEdit from "@components/inputs/QInputEdit.vue";
import AddPhones from "@components/inputs/AddPhones.vue";

//Libraries
import { ref, toRaw } from "vue";

const { changeField, profile } = userStore();
const userStoreNoRef = useUserStore();

const profileCold = toRaw(userStoreNoRef.profile);
const splitterModel = ref(20);
const tab = ref("1");
</script>

<style>
.splitter-profile > .q-splitter__panel.q-splitter__before {
  width: 13% !important;
}
</style>
