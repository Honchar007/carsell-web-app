<template>
  <div class="profile-data">
    <Tabs :options="options" v-model="curTab" />
    <div v-if="curTab == options[0].value">
      <ProfileCarCard
        v-for="car in cars" :key="car.price"
        :image-car="car.image && car.image.type ? getBase64Img(car.image.type, decodeURIComponent(car.image.content)) : ''"
        :brand="car.brand"
        :model="car.model"
        :price="car.price"
        :volume="car.volume"
        :odometr="car.odometr"
        :year="car.year"
        :transmission="car.transmission"
        :description="car.description"
        :link-path="car._id"
      />
    </div>
    <div v-else>
      <CarCreate />
      <!-- <ProfileCarCard
      :image-car="car.image"
      :brand-car="car.brand"
      :model-car="car.model"
      :price="car.price"
      :volume="car.volume"
      :transmission="car.transmission"
      :description-car="car.description"
      :link-path="car.link"
      />
      <ProfileCarCard
        :image-car="car.image"
        :brand-car="car.brand"
        :model-car="car.model"
        :price="car.price"
        :volume="car.volume"
        :transmission="car.transmission"
        :description-car="car.description"
        :link-path="car.link"
      /> -->
    </div>
  </div>
  </template>

<script lang="ts">
import {
  computed, defineComponent, onMounted, ref, watch,
} from 'vue';

// components
import Tabs from '@/components/Tabs';
import ProfileCarCard from '@/components/ProfileCarCard';

// constants
import OptionCase from '@/shared/models/option-case';
import { useStore } from 'vuex';
import CommonApi from '@/api/common.api';

// helpers
import getBase64Img from '@/shared/helpers/get-base64-img';
import CarCreate from '@/components/CarCreate';

/* const car = {
  image: 'car-default.jpg',
  model: 'Slavuta',
  brand: 'ZAZ',
  price: 1300,
  volume: 1.2,
  transmission: 'Механіка',
  year: 2007,
  odometr: 150,
  description: `машина после 1 хозяина , родной пробег 64 тысячи ,
  нечего не красилось не крутилось , все расходники поменяны , газ вписан в тех паспорт только переоформление`,
  link: '/car-page',
}; */

// const options = ['Ваші авто', 'Ваші обрані авто'];

const options: OptionCase<any>[] = [
  {
    value: 0,
    label: 'Ваші авто',
  },
  {
    value: 1,
    label: 'Додати авто',
  }];

export default defineComponent({
  name: 'ProfileData',
  components: {
    Tabs,
    ProfileCarCard,
    CarCreate,
  },
  setup() {
    const store = useStore();
    // refs
    const curTab = ref<number>(0);
    const cars = ref<Array<any>>([]);

    const token = computed(() => store.getters.getToken);
    const id = computed(() => store.getters.getId);
    const user = computed(() => store.getters.user);
    // async helpers

    const fetchCarImages = async (car: any) => {
      if (car.carPicsPath[0]) {
        const image = await CommonApi.getImages(car._id, car.carPicsPath[0], '');
        car.image = { ...image[0] };
      }
    };

    onMounted(async () => {
      cars.value = await CommonApi.getOwnCars(token.value, id.value);
    });

    watch(cars, async (newCars) => {
      for (const car of newCars) {
        if (!car.image) {
          await fetchCarImages(car);
        }
      }
    });
    // cars.value.forEach(async (car: any) => {
    //   if (car.carPicsPath[0]) {
    //     const image = await CommonApi.getImages(car._id, car.carPicsPath[0], '');
    //     car.image = { ...image[0] };
    //   }
    // });

    watch(id, async (newId) => {
      cars.value = await CommonApi.getOwnCars(token.value, newId);
    });

    return {
      options,
      curTab,
      cars,
      getBase64Img,
    };
  },
});
</script>
<style lang="scss" scoped>
.profile-data {
  width: 100%;
}
</style>
