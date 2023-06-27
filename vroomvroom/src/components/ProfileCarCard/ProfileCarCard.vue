<!-- eslint-disable vuejs-accessibility/click-events-have-key-events -->
<template>
  <router-link
    class="car-link"
    :to="`/car-page/${linkPath}`"
  >
    <div class="card-wrapper" @click="openCarPage">
      <div class="card-main">
        <div class="car-image">
          <img v-if="imageCar != ''" :src="imageCar" :alt="brand">
          <img v-else :src="require(`@/assets/car-default.jpg`)" :alt="brand">
        </div>
        <div class="car-data">
          <div class="double-info">
            <div>
              Марка: {{ brand }}
            </div>
            <div>
              Модель: {{ model }}
            </div>
          </div>
          <div class="double-info additional-info">
            <div>Об'єм: {{ volume }}</div>
            <div>КПП: {{ transmission }}</div>
          </div>
          <div>Рік випуску: {{ year }}</div>
          <div class="additional-info">Пробіг: {{ odometr }} тис. км</div>
          <div>Тип пального: {{ FuelsCard[fuel] as string }}</div>
          <div class="car-price">Ціна: {{ price }}</div>
        </div>
      </div>
      <div class="car-description">
        Опис: {{descriptionCut}}
      </div>
    </div>
  </router-link>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useRouter } from 'vue-router';

// components
// constants
import FuelsCard from '@/shared/constants/fuelsCard';

export default defineComponent({
  name: 'ProfileCarCard',
  props: {
    linkPath: {
      type: String,
      required: true,
    },
    imageCar: {
      type: String,
      default: '',
      required: true,
    },
    model: {
      type: String,
      default: '',
      required: true,
    },
    brand: {
      type: String,
      default: '',
      required: true,
    },
    price: {
      type: Number,
      default: 0,
      required: true,
    },
    volume: {
      type: Number,
      default: 0,
      required: true,
    },
    transmission: {
      type: String,
      default: '',
      required: true,
    },
    description: {
      type: String,
      default: '',
      required: true,
    },
    year: {
      type: Number,
      default: 2000,
      required: true,
    },
    fuel: {
      type: String,
      required: true,
    },
    odometr: {
      type: Number,
      default: 100,
      required: true,
    },
  },
  components: {
  },
  setup(props) {
    const router = useRouter();

    const openCarPage = () => {
      router.push(`/car-page/${props.linkPath}`);
    };
    const descriptionCut = computed(() => ((props.description.length > 100)
      ? props.description.substring(0, 100).concat('...') : props.description));
    return {
      FuelsCard,
      openCarPage,
      descriptionCut,
    };
  },
});
</script>
<style lang="scss" scoped>
@import "src/styles/typography";
@import "src/styles/colors";
@import "src/styles/mixins";

.car-link {
  text-decoration: none;
  color: #2c3e50;
  .card-wrapper {
    border-radius: 2rem;
    background: $color-viridian-green;
    margin-top: 1rem;
    padding: 1rem;
    cursor: pointer;
    transition: 0.3s;

    .card-main {
      display: flex;
      flex-direction: row;
      text-decoration: none;
      width: 100%;

      @include for-xs-sm-width {
        flex-direction: column;
      }

      .car-image {
        height: 100%;
        width: 100%;
        border-radius: 2rem;
        overflow: hidden;

        img {
          width: 100%;
          height: 100%;
          border-radius: 2rem;
        }
      }

      .car-data {
        @include typo-headline-3;

        display: flex;
        flex-direction: column;
        text-align: start;
        width: 100%;
        margin-top: 0.5rem;
        margin-left: 0.5rem;
        @include for-xs-sm-width {
          margin-left: 0rem;
        }

        .double-info {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          width: 100%;

          @include for-xs-width {
            flex-direction: column;
          }

          @include for-md-width {
            flex-direction: column;
          }
        }
        @include for-md-width {
          .additional-info {
            display: none;
          }
        }
        @include for-xs-width {
          .additional-info {
            display: none;
          }
        }

        div {
          margin-bottom: 0.25rem;
        }
      }
    }
    .car-description {
      @include typo-body-large-medium;
    }

    &:hover {
      box-shadow: 0 0 0.5rem 0.25rem #fff, /* inner white */
      0 0 0.75rem 0.35rem $color-viridian-green, /* middle magenta */
      0 0 1rem 0.5rem $color-viridian-green; /* outer cyan */
    }
  }
}
</style>
