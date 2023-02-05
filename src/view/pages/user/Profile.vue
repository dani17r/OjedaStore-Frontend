<template>
  <ErrorProfile :isError="profile == null">
    <q-page>
      <div class="relative w-full">
        <ImgHerou />
        <IdentifyHerou />
      </div>
      <div class="p-10 justify-evenly">
        <div v-if="currentUserOnly">
          <q-splitter v-model="splitterModel" style="min-height: 216px" class="splitter-profile">
            <template v-slot:before>
              <q-tabs v-model="tab" vertical class="text-primary" noCaps>
                <q-tab name="1" icon="person" label="Datos" />
                <q-tab name="2" icon="room" label="Ubicaciones" />
                <q-tab name="3" icon="lock" label="Credenciales" />
              </q-tabs>
            </template>

            <template v-slot:after>
              <q-tab-panels v-model="tab" animated swipeable vertical>
                <q-tab-panel name="1" class="p-10">
                  <div class="text-h4 q-mb-md">Identificacion</div>
                  <div v-if="profile" class="grid gap-4">
                    <QInputEdit v-model="profile.username" label="Nombre de usuario" />
                    <QInputEdit v-model="profile.fullname" label="Nombre completo" class="capitalize" />
                    <QInputDate v-model="profile.birthDate" label="Fecha de nacimiento" />
                    <QInputSelect :options="['femenino', 'masculino']" label="Genero" v-model="profile.gender" />
                    <AddPhones />
                  </div>
                </q-tab-panel>

                <q-tab-panel name="2">
                  <div class="text-h4 q-mb-md">Alarms</div>
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

                <q-tab-panel name="3">
                  <div class="text-h4 q-mb-md">Movies</div>
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
        </div>

        <div v-else>
          <h2>Perfil publico</h2>
        </div>
      </div>
    </q-page>
  </ErrorProfile>
</template>

<script setup lang="ts">
// Internal proyect
import { verifyProfile } from "@middlewares/one";
import { useUserStore } from "@stores/user";

// Componentes
import IdentifyHerou from "@components/profile/IdentifyHerou.vue";
import QInputSelect from "@components/inputs/QInputSelect.vue";
import QInputDate from "@components/inputs/QInputDate.vue";
import QInputEdit from "@components/inputs/QInputEdit.vue";
import AddPhones from "@components/profile/AddPhones.vue";
import ErrorProfile from "@components/ErrorProfile.vue";
import ImgHerou from "@components/profile/ImgHerou.vue";

//Libraries
import { onBeforeRouteUpdate } from "vue-router";
import { storeToRefs } from "pinia";
import { ref } from "vue";

let userStore = useUserStore();
const { currentUserOnly, profile } = storeToRefs(userStore);

const splitterModel = ref(20);
const tab = ref("1");

onBeforeRouteUpdate(verifyProfile);
</script>

<style>
.splitter-profile>.q-splitter__panel.q-splitter__before {
  width: 13% !important;
}
</style>
