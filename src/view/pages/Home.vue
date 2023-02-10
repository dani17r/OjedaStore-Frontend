<template>
  <div class="q-mx-lg tw-flex tw-items-center tw-mt-5 tw-gap-3">
    <h2 class="tw-text-xl">Tiendas</h2>
    <hr class="tw-border tw-border-two-1 tw-w-full" />
  </div>
  <q-carousel style="background-color: transparent" transition-prev="slide-right" transition-next="slide-left"
    v-model="slide" :dark="false" height="200px" swipeable animated autoplay infinite>
    <q-carousel-slide :name="1" class="tw-flex tw-fit tw-gap-2 tw-no-wrap">
      <q-img class="rounded-borders"
        src="https://www.prensalibre.com/wp-content/uploads/2018/12/eee060b0-296f-4463-8429-542adef7bb6b.jpg?quality=52&w=760&h=430&crop=1" />
      <q-img class="rounded-borders"
        src="https://www.prensalibre.com/wp-content/uploads/2018/12/19e53419-0eca-429e-9127-0c5210a878ef.jpg?quality=52&w=760&h=800&crop=1" />
      <q-img class="rounded-borders"
        src="https://www.guatemala.com/fotos/201706/Los-nombres-de-tiendas-de-barrio-que-todos-en-Guatemala-han-visto-alguna-vez-885x500.jpg" />
      <q-img class="rounded-borders" src="https://live.staticflickr.com/1686/24376931332_e7977d94cd_b.jpg" />
      <q-img class="rounded-borders"
        src="https://www.infobae.com/new-resizer/DSlTIQW8zaDvY7zdPrem78A8MeU=/1200x900/filters:format(webp):quality(85)//cloudfront-us-east-1.images.arcpublishing.com/infobae/SPKPQAIZDJBW5CGQXOUXMQNENM.jpg" />
    </q-carousel-slide>
    <q-carousel-slide :name="2" class="tw-flex tw-fit tw-gap-2 tw-no-wrap">
      <q-img class="rounded-borders" src="https://img.lalr.co/cms/2017/08/23175348/tiendas.jpg?size=xl" />
      <q-img class="rounded-borders"
        src="https://i.pinimg.com/originals/a4/d0/14/a4d014f31fd0163b58cbc7772bdeaf66.jpg" />
      <q-img class="rounded-borders"
        src="https://www.elheraldo.co/sites/default/files/styles/414x310/public/articulo/2015/05/24/eco_tienda.jpg?itok=KQmaKezs" />
      <q-img class="rounded-borders"
        src="https://www.portafolio.co/files/article_multimedia/uploads/2016/02/05/56b54ba671038.jpeg" />
      <q-img class="rounded-borders"
        src="https://www.elheraldo.co/sites/default/files/articulo/2021/01/16/tiendas.jpg" />
    </q-carousel-slide>
  </q-carousel>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
// import { useUserStore } from "@stores/account";
// import { storeToRefs } from "pinia";
const slide = ref(1);
// const userStore = useUserStore();
// const { user } = storeToRefs(userStore);
</script>
