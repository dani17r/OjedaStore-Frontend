import { ImageT, nameImage } from "@interfaces/user";
import { ref } from "vue";

const defaultCropper = {
  coordinates: null,
  image: { src: null },
};

const modal = ref(false);
const field = ref<nameImage>("herou");
const getCropper = ref<Partial<ImageT>>(defaultCropper);

export default () => {
  const toggleModal = () => {
    modal.value = !modal.value;
  };

  const defineField = (name: nameImage) => (field.value = name);

  const setCropper = (value: Partial<ImageT>) => {
    getCropper.value = value;
  };

  const resetCropper = (value?: Partial<ImageT>) => {
    getCropper.value = value ?? defaultCropper;
  };

  return {
    resetCropper,
    toggleModal,
    defineField,
    setCropper,
    getCropper,
    modal,
    field,
  };
};
