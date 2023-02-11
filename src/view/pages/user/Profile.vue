<template>
  <ErrorProfile :isError="profile == null">
    <q-page>
      <div class="tw-relative tw-w-full">
        <ImgHerou />
        <IdentifyHerou />
      </div>
      <div class="tw-p-10 tw-justify-evenly">
        <div v-if="currentUserOnly">
          <q-splitter v-model="splitterModel" style="min-height: 216px" class="splitter-profile">
            <template v-slot:before>
              <q-tabs v-model="tab" vertical class="tw-text-primary" noCaps>
                <q-tab name="1" icon="person" label="Datos" />
                <q-tab name="2" icon="room" label="Ubicaciones" />
                <q-tab name="3" icon="lock" label="Credenciales" />
              </q-tabs>
            </template>

            <template v-slot:after>
              <q-tab-panels v-model="tab" animated swipeable vertical>
                <q-tab-panel name="1" class="tw-p-10">
                  <div class="tw-text-h4 q-mb-md">Identificacion</div>
                  <div v-if="profile && profileCold" class="tw-grid tw-gap-4">
                    <QInputEdit :value="profileCold.fullname" label="Nombre completo" class="tw-capitalize"
                      @save="(val) => changeField('fullname', val)" />
                    <QInputEdit :value="profileCold.username" @save="(val) => changeField('username', val)"
                      label="Nombre de usuario" />
                    <QInputDate :value="profileCold.birthDate" @save="(val) => changeField('birthDate', val)"
                      label="Fecha de nacimiento" />
                    <QInputSelect :options="['femenino', 'masculino']" label="Genero" v-model="profile.gender" />
                    <AddPhones />
                  </div>
                </q-tab-panel>

                <q-tab-panel name="2">
                  <div class="tw-text-h4 q-mb-md">Alarms</div>
                  <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis
                    praesentium cumque magnam odio iure quidem, quod illum numquam
                    possimus obcaecati commodi minima assumenda consectetur culpa fuga
                    nulla ullam. In, libero.
                  </p>
                  <p class="bg-one">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis
                    praesentium cumque magnam odio iure quidem, quod illum numquam
                    possimus obcaecati commodi minima assumenda consectetur culpa fuga
                    nulla ullam. In, libero.
                  </p>
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
import IdentifyHerou from "@components/images/herous/IdentifyHerouProfile.vue";
import QInputSelect from "@components/inputs/QInputSelect.vue";
import QInputDate from "@components/inputs/QInputDate.vue";
import QInputEdit from "@components/inputs/QInputEdit.vue";
import AddPhones from "@components/inputs/AddPhonesProfile.vue";
import ErrorProfile from "@components/errors/ErrorProfile.vue";
import ImgHerou from "@components/images/herous/ImgHerouProfile.vue";

//Libraries
import { onBeforeRouteUpdate } from "vue-router";
import { ref, toRaw } from "vue";
import { profileFields } from "@interfaces/user";

const { currentUserOnly, profile, changeField } = useUserStore();

const profileCold = toRaw(profile);

const splitterModel = ref(20);
const tab = ref("1");

onBeforeRouteUpdate(verifyProfile);
</script>

<style>
.splitter-profile>.q-splitter__panel.q-splitter__before {
  width: 13% !important;
}
</style>
