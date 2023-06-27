<template>
  <div class="container">
    <div class="container-cards">
      <ProfileCarCard
        v-for="car in cars" :key="car.price"
        :image-car="car.image && car.image.type ? getBase64Img(car.image.type, decodeURIComponent(car.image.content)) : ''"
        :brand="car.brand"
        :model="car.model"
        :price="car.price"
        :volume="car.volume"
        :odometr="car.odometr"
        :fuel="car.fuel"
        :year="car.year"
        :transmission="car.transmission"
        :description="car.description"
        :link-path="car._id"
      />
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
// models

// constants

import { useStore } from 'vuex';
import ProfileCarCard from '@/components/ProfileCarCard';
import CommonApi from '@/api/common.api';
import getBase64Img from '@/shared/helpers/get-base64-img';
import getRangeYear from '@/shared/helpers/get-range-years';

export default defineComponent({
  name: 'Avtovukyp',
  components: {
    ProfileCarCard,
  },
  setup() {
    const store = useStore();

    // refs
    const cars = ref<Array<any>>([]);

    // computed
    const isAuthenticated = computed(() => store.getters.isAuthenticated);
    const token = computed(() => store.getters.getToken);

    // helpers
    // async helpers
    const fetchCarImages = async (car: any) => {
      if (car.carPicsPath[0]) {
        const image = await CommonApi.getImages(car._id, car.carPicsPath[0]);
        car.image = { ...image[0] };
      }
    };

    onMounted(async () => {
      cars.value = await CommonApi.getCarsAvtovukyp(token.value);
    });

    // watchers
    watch(cars, async (newCars) => {
      for (const car of newCars) {
        if (!car.image) {
          await fetchCarImages(car);
        }
      }
    });

    // lifecycle hooks

    return {
      getBase64Img,
      getRangeYear,
      isAuthenticated,
      cars,
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
}
</style>
