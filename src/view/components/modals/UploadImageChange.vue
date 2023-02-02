<template>
  <q-dialog v-model="modal" @hide="resetComponent()">
    <q-card>
      <q-card-section class="q-pt-none cropper">
        <div class="content-cropper">
          <div class="loading-image">
            <q-spinner-ios color="primary" size="30px" v-show="loading" />
          </div>
          <div v-if="getCropper.image?.src">
            <Cropper
              :default-position="getCropper.coordinates"
              :default-size="getCropper.coordinates"
              :src="getCropper.image?.src"
              v-bind="bindMode[field]"
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

      <q-card-actions class="flex justify-between">
        <button class="button">
          <input type="file" @change="loadImage" accept="image/*" />
        </button>
        <q-btn label="guardar" @click="saveImage()" flat />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { Cropper, CropperResult, CircleStencil } from "vue-advanced-cropper";
import imageChangeComposable from "@composables/uploadImageChange";
import { useUserStore } from "@stores/user";
import * as httpUser from "@http/user";
import { storeToRefs } from "pinia";
import { ref } from "vue";

const userStore = useUserStore();
const { images, user } = storeToRefs(userStore);
const { modal, field, getCropper, setCropper, resetCropper } = imageChangeComposable();

const elementImgCropper = ref<typeof Cropper>();
const tempImageFile = ref<Blob>();
const loading = ref(true);

const bindMode = {
  avatar: {
    "stencil-component": CircleStencil,
    "stencil-size": { height: 320, width: 320 },
  },
  herou: {
    "stencil-size": { height: 90, width: 600 },
    "stencil-props": { handlers: {} },
  },
};

const saveImage = () => {
  const { coordinates, image }: CropperResult = elementImgCropper.value?.getResult();
  const images = { coordinates: { ...coordinates, top: coordinates.top - 10 }, image };

  userStore.changeImage(field.value, images);
  setCropper(images);

  if (tempImageFile.value) {
    httpUser.uploadImage({
      file: tempImageFile.value as Blob,
      _id: user.value?._id as string,
      field: field.value,
      data: images,
    });
  } else {
    httpUser.updateImage({
      _id: user.value?._id as string,
      field: field.value,
      data: images,
    });
  }
};

const loadImage = (event: Event) => {
  const { files } = <HTMLInputElement>event.target;
  if (files && files[0]) {
    if (getCropper.value.image?.src) URL.revokeObjectURL(getCropper.value.image.src);

    const blob = URL.createObjectURL(files[0]);

    const reader = new FileReader();
    reader.readAsArrayBuffer(files[0]);
    reader.onload = () => {
      setCropper({ image: { src: blob } });
      tempImageFile.value = files[0];
    };
  }
};

const resetComponent = () => {
  const imgCropper = getCropper.value.image?.src;
  const imgUser = images.value(field.value).image?.src;
  if (imgCropper != imgUser) resetCropper();
  else resetCropper(images.value(field.value));
  loading.value = true;
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
