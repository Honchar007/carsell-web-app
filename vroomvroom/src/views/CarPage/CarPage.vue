<template>
  <div class="car-page">
    <Carousel v-if="UploadedFiles.length > 0" :images="UploadedFiles" />
    <div v-else class="car-image-wrapper">
      <!-- <div v-if="UploadedFiles.length > 0">
        <div v-for="(file, index) in UploadedFiles" :key="index" class="car-block-img">
          <img :src="getBase64Img(file.type, decodeURIComponent(file.content))" :alt="car.brand">
        </div>
      </div> -->
      <div class="car-block-no-img">
        <img :src="require(`@/assets/car-default.jpg`)" :alt="car.brand">
      </div>
    </div>
    <div class="car-info-main">
      <div class="car-header">
        <div>{{ info }}</div>
        <div>Ціна: {{ priceTemp }}</div>
      </div>
      <div class="car-info">
        <div class="car-info-item"><span class="car-info-headline">Пробіг:</span> {{ odometrTemp }} тис. км</div>
        <div class="car-info-item"><span class="car-info-headline">Об'єм:</span> {{ volumeTemp }} л.</div>
        <div class="car-info-item"><span class="car-info-headline">КПП:</span> {{ transmissionTemp }}</div>
        <div class="car-info-item"><span class="car-info-headline">Колір:</span> {{ colorTemp }}</div>
      </div>
      <div class="car-description">
        <div>
          <span class="car-info-headline">Опис:</span> {{ descriptionTemp }}
        </div>
      </div>
    </div>
    <div class="car-menu">
      <Button @click="handleShowTel"> {{showTel ? curUser.phone : 'Дізнатися контакти'}}</Button>
      <Button v-if="curUserId == carOwnerId" @click="$router.push(`/car-edit/${$route.params.id}`)">Редагувати</Button>
      <Button v-if="curUserId != carOwnerId">Замовити перевірку</Button>
      <Button v-if="curUserId == carOwnerId" @click="deleteCar" class="delete" outlined>Видалити</Button>
    </div>
  </div>
  </template>

<script lang="ts">
import CommonApi from '@/api/common.api';
import Button from '@/components/Button';
import {
  computed, defineComponent, onMounted, ref,
} from 'vue';

import getBase64Img from '@/shared/helpers/get-base64-img';
import { useRoute, useRouter } from 'vue-router';
import Carousel from '@/components/Carousel';
import { useStore } from 'vuex';

// components

// constants
const car = {
  image: 'car-default.jpg',
  model: 'Slavuta',
  brand: 'ZAZ',
  price: 1300,
  volume: 1.2,
  transmission: 'Механіка',
  color: 'Червоний',
  year: 2007,
  odometr: 150,
  description: `машина после 1 хозяина , родной пробег 64 тысячи ,
  нечего не красилось не крутилось , все расходники поменяны , газ вписан в тех паспорт только переоформление`,
  link: '/car-page',
};

export default defineComponent({
  name: 'CarPage',
  components: {
    Button,
    Carousel,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();

    const UploadedFiles = ref<any>([]);
    const id = ref<string>('');
    const carOwnerId = ref<string>('');
    const info = ref<string>('');
    const priceTemp = ref<number>(car.price);
    const volumeTemp = ref<number>(car.volume);
    const colorTemp = ref<string>(car.color);
    const yearTemp = ref<number>(car.year);
    const odometrTemp = ref<number>(car.odometr);
    const transmissionTemp = ref<string>(car.transmission);
    const descriptionTemp = ref<string>(car.description);
    const carImages = ref<any>([]);
    const showTel = ref<boolean>(false);

    const handleShowTel = () => {
      showTel.value = !showTel.value;
    };

    const deleteCar = async () => {
      await CommonApi.DeleteCar('21', route.params.id as string).then(() => router.back());
    };

    const curUserId = computed(() => store.getters.getId);
    const curUser = computed(() => store.getters.getUser);

    const isAuthenticated = computed(() => store.getters.isAuthenticated);

    onMounted(async () => {
      const data = await CommonApi.getCarInfo('21', route.params.id as string);
      const imgPaths = data.carPicsPath.join(',');
      info.value = `${data.brand} ${data.model} ${data.year}`;
      carOwnerId.value = data.ownerId;
      priceTemp.value = data.price;
      volumeTemp.value = data.volume;
      colorTemp.value = data.color;
      yearTemp.value = data.year;
      odometrTemp.value = data.odometr;
      transmissionTemp.value = data.transmission;
      descriptionTemp.value = data.description;
      if (imgPaths.length > 0) {
        UploadedFiles.value = await CommonApi.getImages(route.params.id as string, imgPaths, 'asd');
      }
      // UploadedFiles.value = await CommonApi.getImage('21', 'car-default.jpg', 'asd');
    });

    return {
      car,
      carOwnerId,
      info,
      priceTemp,
      volumeTemp,
      colorTemp,
      yearTemp,
      odometrTemp,
      transmissionTemp,
      descriptionTemp,
      carImages,
      UploadedFiles,
      getBase64Img,
      deleteCar,
      curUserId,
      curUser,
      isAuthenticated,
      showTel,
      handleShowTel,
    };
  },
});
</script>
<style lang="scss" scoped>
@import "src/styles/typography";
@import "src/styles/colors";
@import "src/styles/mixins";

.car-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: $color-viridian-green;
  margin-top: 2rem;

  .car-image-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 100%;
    border-radius: 2rem;

    .car-block-no-img {
      height: 80%;
      margin: 0 auto;
      margin-bottom: 1rem;
      img {
        max-height: 20rem;
        width: 100%;
      }
    }

    .car-block-img {
        width: 100%;
        height: 80%;
      margin: 0 auto;
      margin-bottom: 1rem;
      img {
        width: 100%;
        object-fit: contain;
      }
    }
  }

  .car-info-main {
    @include typo-headline-4;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 80%;

    .car-header {
      @include typo-headline-2;

      display: flex;
      flex-direction: row;
      justify-content: space-between;
      width: 100%;
      margin-top: 1rem;
    }
    .car-info {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      width: 100%;
      margin-top: 1rem;

      .car-info-item {
        padding: 0.5rem;
        border-radius: 1rem;
        margin: 0rem 0rem 0.5rem 0rem;
        border: 0.15rem solid $color-secondary-component-background;
        color: $color-neutrals-6;
      }
    }
    .car-info-headline {
      @include typo-card-body;
      color: $color-viridian-green;
    }
    .car-description {
      width: 100%;
      border-radius: 1rem;
      border: 0.15rem solid $color-secondary-component-background;
      color: $color-neutrals-6;
      margin-bottom: 1rem;

      div {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem;
      }
    }
  }

  .car-menu {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    gap: 1rem;

    .delete {
      border: 2px solid $color-secondary-component-background;
      opacity: 0.8;
    }
  }
}
</style>
