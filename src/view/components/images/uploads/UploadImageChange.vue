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
            <q-img :src="`/${field}_placeholder.png`" fit="cover" />
          </div>
        </div>
      </q-card-section>

      <q-card-actions class="flex justify-between">
        <q-btn
          label="Search Image"
          @click="open()"
          color="primary"
          padding="5px 20px"
          rounded
        />
        <q-btn label="guardar" @click="saveImage()" flat />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { Cropper, CropperResult, CircleStencil } from "vue-advanced-cropper";
import imageChangeComposable from "@composables/uploadImageChange";
import { useFileDialog } from "@vueuse/core";
import { useUserStore } from "@stores/user";
import { base64URL } from "@tools/utils";
import { ref, watchEffect } from "vue";
import * as httpUser from "@http/user";
import { storeToRefs } from "pinia";

const { modal, field, getCropper, setCropper, toggleModal } =
  imageChangeComposable();
const userStore = useUserStore();
const { user } = storeToRefs(userStore);
const { files, open, reset } = useFileDialog();

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
  const { coordinates, image }: CropperResult =
    elementImgCropper.value?.getResult();
  const img = {
    coordinates: { ...coordinates, top: coordinates.top - 10 },
    image,
  };
  const imgUrlDB = user.value?.images[field.value].image?.src;

  userStore.changeImage(field.value, img);
  setCropper(img);

  if (tempImageFile.value) {
    httpUser.uploadImage({
      _id: String(user.value?._id),
      file: tempImageFile.value,
      field: field.value,
      data: img,
    });
  } else {
    httpUser.updateImage({
      data: { ...img, image: { ...img.image, src: imgUrlDB } },
      _id: String(user.value?._id),
      field: field.value,
    });
  }

  toggleModal();
};

watchEffect(async () => {
  if (files.value) {
    const imageString = await base64URL(files.value[0]);
    setCropper({ image: { src: String(imageString) } });
    tempImageFile.value = files.value[0];
  }
});

const resetComponent = () => {
  loading.value = true;
  reset();
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
