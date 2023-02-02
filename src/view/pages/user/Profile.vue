<template>
  <ErrorProfile :isError="profile == null">
    <q-page>
      <div class="relative w-full">
        <ImgHerou />
        <div class="row items-center px-20 -mt-10">
          <div
            @mouseover="currentUserOnly ? (showEditeImage = true) : null"
            @mouseleave="currentUserOnly ? (showEditeImage = false) : null"
            style="bottom: -20px; left: 30px"
            class="absolute z-20"
          >
            <AvatarAccount state="profile" size="130px" />

            <q-btn
              class="text-white absolute bottom-1 right-2"
              @click="activeImageUploadAvatar()"
              style="background-color: #5e33af"
              v-show="showEditeImage"
              v-if="currentUserOnly"
              icon="crop_original"
              fab-mini
              round
            />
          </div>
          <div
            class="rounded z-10 pl-24 py-1 flex flex-col"
            style="height: 90px; width: 320px; background-color: #5e33af"
          >
            <span class="text-2xl text-white">{{
              startCase(String(profile?.fullname))
            }}</span>
            <span class="text-md text-white">{{ profile?.username }}</span>
            <span class="text-md text-grey">{{
              profile?.birthDate &&
              format(new Date(String(profile?.birthDate)), "dd/MM/yyyy")
            }}</span>
          </div>
        </div>
      </div>
      <div class="px-20 py-10 justify-evenly">
        <div v-if="currentUserOnly">
          <q-splitter v-model="splitterModel" style="height: 250px">
            <template v-slot:before>
              <q-tabs v-model="tab" vertical class="text-primary">
                <q-tab name="mails" icon="person" label="privade" />
                <q-tab name="alarms" icon="alarm" label="Alarms" />
                <q-tab name="movies" icon="movie" label="Movies" />
              </q-tabs>
            </template>

            <template v-slot:after>
              <q-tab-panels
                v-model="tab"
                animated
                swipeable
                vertical
                transition-prev="jump-up"
                transition-next="jump-up"
              >
                <q-tab-panel name="mails">
                  <div class="text-h4 q-mb-md">Mails</div>
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

                <q-tab-panel name="alarms">
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

                <q-tab-panel name="movies">
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
import imageChangeComposable from "@composables/uploadImageChange";
import { verifyProfile } from "@middlewares/one";
import { useUserStore } from "@stores/user";

// Componentes
import AvatarAccount from "@components/AvatarAccount.vue";
import ErrorProfile from "@components/ErrorProfile.vue";
import ImgHerou from "@components/ImgHerou.vue";

//Libraries
import { onBeforeRouteUpdate } from "vue-router";
import { storeToRefs } from "pinia";
import { startCase } from "lodash";
import { format } from "date-fns";
import { ref } from "vue";

let userStore = useUserStore();
const { currentUserOnly, profile, images } = storeToRefs(userStore);
const { toggleModal, defineField, setCropper } = imageChangeComposable();

const showEditeImage = ref(false);
const splitterModel = ref(20);
const tab = ref("mails");

const activeImageUploadAvatar = () => {
  setCropper(images.value("avatar"));
  defineField("avatar");
  toggleModal();
};

onBeforeRouteUpdate(verifyProfile);
</script>
