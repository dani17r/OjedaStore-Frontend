import { ImageT, nameImage } from "@interfaces/user";
import { ref } from "vue";

const defaultCropper = {
  coordinates: null,
  image: { src: null },
};

const getCropper = ref<Partial<ImageT>>(defaultCropper);
const field = ref<nameImage>("herou");
const modal = ref(false);

export default () => {
  const setCropper = (value: Partial<ImageT>) => (getCropper.value = value);
  const defineField = (name: nameImage) => (field.value = name);
  const toggleModal = () => (modal.value = !modal.value);

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
