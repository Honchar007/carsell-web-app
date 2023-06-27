<template>
  <div class="container">
    <div class="card-wrapper">
      <div class="head-search">
        <span>Пошук</span>
      </div>
      <div class="search">
        <Input
          class="search-input"
          v-model="searchName"
          type="search"
          placeholder="Search your vroom vroom..."
          vertical-padding="0.25rem"
          :small="true"
          :rounded="true"
        />
      </div>
      <div class="menu-item menu-double">
        <Select
          v-model="brand"
          :options="Brands" :name-label="'Оберіть марку автомобіля'">Оберіть марку авто</Select>
        <Select
          v-model="model"
          :options="[{ text: '', value: '' },...models]"
          :disabled="models.length == 0"
          :name-label="'Оберіть модель автомобіля'"
          >
        </Select>
      </div>
      <div class="menu-item menu-double">
        <Input
          class="card-input"
          v-model="minPrice"
          label="Ціна від:"
        />
        <Input
          class="card-input"
          v-model="maxPrice"
          :error="+minPrice > +maxPrice && maxPrice != 0 ? 'Мінімальна ціна більша за максимальну' : ''"
          label="Ціна до:"
        />
      </div>
      <Button class="menu-item" :outlined="true" @click="openDropdown">Додадткові параметри</Button>
      <div v-if="dropdownOpened" class="menu-item dropdown">
        <div class="menu-item menu-double">
          <Select
            v-model="minYear"
            :options="getRangeYear(1970, maxYear)"
            :name-label="'Від якого року випуску:'">
          </Select>
          <Select
            v-model="maxYear"
            :options="getRangeYear(minYear)"
            :name-label="'До якого року випуску:'"
          >
          </Select>
        </div>
        <div class="menu-item menu-double">
          <Input
            class="card-input"
            v-model="minOdo"
            label="Пробіг від:"
          />
          <Input
            class="card-input"
            v-model="maxOdo"
            label="Пробіг до:"
            :error="+minOdo > +maxOdo && maxOdo != 0 ? 'Мінімальна ціна більша за максимальну' : ''"
          />
        </div>
        <div class="menu-item menu-double">
          <Select v-model="fuel" :options="Fuels" :name-label="'Вид палива:'"></Select>
          <Select v-model="transmission" :options="Transmissions" :name-label="'Вид КПП:'"></Select>
        </div>
      </div>
      <Button class="search-btn" @click="search">
        <img src="@/assets/icons/search.svg" alt="search" />Знайти
      </Button>
    </div>
    <div class="container-cards">
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
        :fuel="car.fuel"
        :link-path="car._id"
      />
    </div>
    <div class="pagination">
      <div class="btn" aria-label="Previous page" @click="previousPage" :disabled="currPage === 1">
        &#10094;
      </div>
      <span class="pages">Сторінка {{ currPage }} з {{ totalP == 0 ? 1 : totalP}}</span>

      <div class="btn" aria-label="Next page" @click="nextPage" :disabled="currPage === totalP">
        &#10095;
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  ref,
  watch,
} from 'vue';

// store

// components
import Select from '@/components/Select';
import Input from '@/components/Input';
import Button from '@/components/Button';
// models

// constants
import Brands from '@/shared/constants/brands';
import Transmissions from '@/shared/constants/transmissions';
import Fuels from '@/shared/constants/fuels';

import { useStore } from 'vuex';
import ProfileCarCard from '@/components/ProfileCarCard';
import CommonApi from '@/api/common.api';
import getBase64Img from '@/shared/helpers/get-base64-img';
import getRangeYear from '@/shared/helpers/get-range-years';

export default defineComponent({
  name: 'Home',
  components: {
    Select,
    Input,
    Button,
    ProfileCarCard,
  },
  setup() {
    const store = useStore();

    // refs
    const searchName = ref<string>('');
    const brand = ref<string>('');
    const model = ref<string>('');
    const minPrice = ref<number>(0);
    const maxPrice = ref<number>(0);
    const minOdo = ref<number>(0);
    const maxOdo = ref<number>(0);
    const minYear = ref<number>(1970);
    const maxYear = ref<number>(2023);
    const fuel = ref<string>('');
    const transmission = ref<string>('');

    const currPage = ref<number>(1);
    const totalP = ref<number>(0);
    const dropdownOpened = ref<boolean>(false);
    const cars = ref<any>([]);
    const models = ref<Array<any>>([]);

    const openDropdown = (): void => {
      dropdownOpened.value = !dropdownOpened.value;
    };

    const previousPage = (): void => {
      if (currPage.value > 1) {
        currPage.value -= 1;
        search();
      }
    };

    const nextPage = (): void => {
      if (currPage.value < totalP.value) {
        currPage.value += 1;
        search();
      }
    };
    // computed
    const isAuthenticated = computed(() => store.getters.isAuthenticated);

    // helpers
    // async helpers
    const fetchCarImages = async (car: any) => {
      if (car.carPicsPath[0]) {
        const image = await CommonApi.getImages(car._id, car.carPicsPath[0]);
        car.image = { ...image[0] };
      }
    };

    const search = async () => {
      const query: {[key: string]: any} = {};
      if (searchName.value !== '') query.search = searchName.value;
      if (model.value !== '') query.model = model.value;
      if (brand.value !== '') query.brand = brand.value;
      if (minPrice.value !== 0) query.minPrice = minPrice.value;
      if (maxPrice.value !== 0 && +minPrice.value < +maxPrice.value) query.maxPrice = maxPrice.value;
      if (minOdo.value !== 0) query.minOdo = minOdo.value;
      if (maxOdo.value !== 0 && +minOdo.value < +maxOdo.value) query.maxOdo = maxOdo.value;
      if (minYear.value !== 0) query.minYear = minYear.value;
      if (minYear.value !== 0) query.maxYear = maxYear.value;
      if (fuel.value !== '') query.fuel = fuel.value;
      if (transmission.value !== '') query.transmission = transmission.value;
      query.currentPage = currPage.value;
      const { carsres, totalPages, currentPage } = await CommonApi.getCars({ ...query });
      cars.value = [...carsres];
      console.log(cars);
      totalP.value = totalPages;
      if (currentPage) currPage.value = currentPage;
    };

    onMounted(async () => {
      const { carsres, totalPages, currentPage } = await CommonApi.getCars({ });
      console.log(carsres);
      cars.value = carsres.length > 0 ? [...carsres] : [];
      console.log(cars.value);
      totalP.value = totalPages;
      if (currentPage) currPage.value = currentPage;
    });

    // watchers
    watch(minOdo, async (newOdo) => {
      if (newOdo > maxOdo.value && maxOdo.value > 0) maxOdo.value = newOdo;
    });

    // watch(currPage, () => {
    //   search();
    // });

    watch(cars, async (newCars: Array<any>) => {
      for (const car of newCars) {
        if (!car.image) {
          await fetchCarImages(car);
        }
      }
    });

    watch(brand, async (newBrand) => {
      if (newBrand !== '') {
        const brandmodel = await CommonApi.getModels(newBrand);
        models.value = brandmodel.models;
      } else {
        model.value = '';
      }
    });
    // lifecycle hooks

    return {
      Brands,
      Transmissions,
      Fuels,
      searchName,
      model,
      brand,
      minPrice,
      maxPrice,
      minOdo,
      maxOdo,
      minYear,
      maxYear,
      fuel,
      transmission,
      currPage,
      totalP,
      dropdownOpened,
      openDropdown,
      previousPage,
      nextPage,
      getBase64Img,
      getRangeYear,
      isAuthenticated,
      search,
      cars,
      models,
    };
  },
});
</script>

<style scoped lang="scss">
@import 'src/styles/typography';
@import 'src/styles/mixins';

.container {
  @import 'src/styles/colors';

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 2rem;

  .container-cards {
    width: 90%;
  }

  .card-wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    box-sizing: border-box;
    padding: 1rem;

    .search {
      margin-bottom: 2rem;
      .search-input {
        width: 100%;
      }
    }

    .head-search {
      @include typo-headline-2;
      color: $color-viridian-green;
      margin-bottom: 1rem;
    }

    .menu-item {
      margin-bottom: 1rem;
      width: 100%;
    }

    .menu-double {
      display: flex;
      flex-direction: row;
      gap: 5rem;

      @include for-xs-sm-width {
        flex-direction: column;
        gap: 1rem;
      }
    }

    .dropdown {
      .caryear {
        margin-top: 1.5rem;
      }
    }

    .card-input {
      @include typo-headline-3;
      width: 100%;
      padding: 0 1rem 1rem 1rem;
      color: $color-grey;
      background: $color-secondary-background-molecules;
      border: 2px solid transparent;
      border-radius: 1rem;
      transition: 0.3s ease-in-out all;

      @include for-xs-sm-width {
        padding: 0;
      }

      &::placeholder {
        color: $color-white;
      }

      &:hover {
        box-shadow: $shadow-common;
      }

      &:focus {
        border: 2px solid $color-white;
        box-shadow: $shadow-common;
      }

      &.small {
        padding: 0.5rem;
      }

      &.icon {
        padding-left: 3rem;
      }

      &.success {
        border: 2px solid $color-peach-secondary;
        padding-right: 3rem;
      }

      &.error {
        color: $color-error;
        border: 2px solid $color-error;
        padding-right: 3rem;
      }
    }
  }
  .posts-list {
    display: flex;
    flex-direction: column;
    width: 100%;

    .post {
      margin-bottom: 2rem;
    }

    .loader {
      padding: 2rem 0;
    }

    .no-data-text {
      @include typo-body-regular;
      padding: 2rem 0;
      text-align: center;
      color: $color-peach-primary;
    }
  }

  .pagination {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 1rem;

    .btn {
      cursor: pointer;
      border: 0.1rem solid $color-viridian-green;
      border-radius: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 4.25rem;
      height: 4.25rem;
      transition: transform 0.3s ease-in-out;

      &:last-child {
        margin-right: 1rem;
      }
    }

    .btn:hover {
      transform: scale(1.1);
    }
  }
}
</style>
