<template>
  <q-dialog v-model="modal" @hide="resetComponent()">
    <q-card>
      <q-card-section class="q-pt-none cropper">
        <div class="content-cropper">
          <div class="loading-image">
            <q-spinner-ios color="primary" size="30px" v-show="loading" />
            {{ getCropper.image?.src }}
          </div>
          <div v-if="getCropper.image?.src">
            <Cropper
              :default-position="getCropper.coordinates"
              :stencil-size="{ height: 90, width: 600 }"
              :default-size="getCropper.coordinates"
              :stencil-props="{ handlers: {} }"
              :src="getCropper.image?.src"
              @ready="loading = false"
              ref="elementImgCropper"
              class="cropper"
            />
          </div>
          <div v-else>
            <q-img :src="'/herou_placeholder.png'" fit="cover" />
          </div>
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <button class="button">
          <input type="file" @change="loadImage" accept="image/*" />
        </button>
        <q-btn label="guardar" @click="saveImage()" flat />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { Cropper, CropperResult } from "vue-advanced-cropper";
import imageChangeComposable from "@composables/imgChange";
import { useUserStore } from "@stores/user";
import { storeToRefs } from "pinia";
import { ref } from "vue";

const userStore = useUserStore();
const { images } = storeToRefs(userStore);
const { modal, field, getCropper, setCropper, resetCropper } = imageChangeComposable();

const elementImgCropper = ref<typeof Cropper>();
const loading = ref(true);

const saveImage = () => {
  const { coordinates, image }: CropperResult = elementImgCropper.value?.getResult();
  const coord = { ...coordinates, top: coordinates.top - 10 };
  userStore.changeImage(field.value, { coordinates: coord, image });
  setCropper({ coordinates: coord, image });
};

const loadImage = (event: Event) => {
  const { files } = <HTMLInputElement>event.target;
  if (files && files[0]) {
    if (getCropper.value.image?.src) URL.revokeObjectURL(getCropper.value.image.src);

    const blob = URL.createObjectURL(files[0]);

    const reader = new FileReader();
    reader.readAsArrayBuffer(files[0]);
    reader.onload = () => setCropper({ image: { src: blob } });
  }
};

const resetComponent = () => {
  const imgCropper = getCropper.value.image?.src;
  const imgUser = images.value(field.value).image?.src;
  if (imgCropper != imgUser) resetCropper();
  else resetCropper(images.value(field.value));
};
</script>

<style lang="scss">
@import "vue-advanced-cropper/dist/style.css";
.q-dialog__inner > div {
  overflow: hidden;
  padding: 1px;
}
.cropper {
  max-height: 600px;
  width: 100%;
}
.content-cropper {
  min-height: 200px;
  min-width: 520px;
}
.loading-image {
  justify-content: center;
  position: absolute;
  display: flex;
  width: 100%;
  left: 0vw;
  top: 45%;
}
</style>
