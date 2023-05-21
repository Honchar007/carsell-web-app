<template>
  <div class="profile-data">
    <Tabs :options="options" v-model="curTab" />
    <div v-if="curTab == options[0].value">
      <ProfileCarCard
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
      />
    </div>
    <div v-else>
      <ProfileCarCard
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
      />
    </div>
  </div>
  </template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

// components
import Tabs from '@/components/Tabs';
import ProfileCarCard from '@/components/ProfileCarCard';

// constants
import OptionCase from '@/shared/models/option-case';

const car = {
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
};

// const options = ['Ваші авто', 'Ваші обрані авто'];

const options: OptionCase<any>[] = [
  {
    value: 0,
    label: 'Ваші авто',
  },
  {
    value: 1,
    label: 'Ваші обрані авто',
  }];

export default defineComponent({
  name: 'ProfileData',
  components: {
    Tabs,
    ProfileCarCard,
  },
  setup() {
    const curTab = ref<number>(0);

    return {
      car,
      options,
      curTab,
    };
  },
});
</script>
<style lang="scss" scoped>
.profile-data {
  width: 100%;
}
</style>
