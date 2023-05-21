<template>
  <router-link
    class="car-link"
    :to="linkPath as any"
  >
    <div class="card-wrapper">
      <div class="card-main">
        <div class="car-image">
          <img :src="require(`@/assets/${imageCar}`)" :alt="brandCar">
        </div>
        <div class="car-data">
          <div class="double-info">
            <div>
              Марка: {{ brandCar }}
            </div>
            <div>
              Модель: {{ modelCar }}
            </div>
          </div>
          <div class="double-info">
            <div>Об'єм: {{ volume }}</div>
            <div>КПП: {{ transmission }}</div>
          </div>
          <div>Рік випуску: {{ yearCar }}</div>
          <div>Пробіг: {{ odometrCar }} тис. км</div>
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

// components

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
    modelCar: {
      type: String,
      default: '',
      required: true,
    },
    brandCar: {
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
    descriptionCar: {
      type: String,
      default: '',
      required: true,
    },
    yearCar: {
      type: Number,
      default: 2000,
      required: true,
    },
    odometrCar: {
      type: Number,
      default: 100,
      required: true,
    },
  },
  components: {
  },
  setup(props) {
    const descriptionCut = computed(() => ((props.descriptionCar.length > 100)
      ? props.descriptionCar.substring(0, 100).concat('...') : props.descriptionCar));
    return {
      descriptionCut,
    };
  },
});
</script>
<style lang="scss" scoped>
@import "src/styles/typography";
@import "src/styles/colors";

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

      .car-image {
        width: 100%;
        height: 100%;
        min-width: 20rem;
        max-width: 30rem;
        border-radius: 2rem;

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

        .double-info {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
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
