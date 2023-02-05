import { ref } from "vue";

const preview = ref(false);
const image = ref("");

export default () => {
  const chengeImage = (img: string) => {
    if (preview.value) image.value = img;
    else image.value = "";
  };

  const togglePreview = (img: string) => {
    console.log(img);

    preview.value = !preview.value;
    chengeImage(img);
  };

  return {
    togglePreview,
    preview,
    image,
  };
};
