<template>
  <div class="slider">
    <div class="content-wrapper">
      <template></template>
      <div v-for="(file, index) in images" :key="index" class="content-img" :style="getItemStyle(index)">
        <img v-if="current==index" :src="getBase64Img(file.type as string, decodeURIComponent(file.content))" :alt="`${index}`">
      </div>
    </div>
    <div v-if="images.length > 1" class="menu">
      <div class="btn" aria-label="Previous slide" @click="event => slide(event, -1)">
        &#10094;
      </div>
      <div class="btn" aria-label="Next slide" @click="event => slide(event, 1)">
        &#10095;
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import getBase64Img from '@/shared/helpers/get-base64-img';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'Carousel',
  props: {
    images: {
      type: Array as any,
      required: true,
    },
  },
  setup(props) {
    const current = ref<number>(0);
    const direction = ref<number>(0);
    const transitionName = ref<string>('fade');
    const show = ref<boolean>(false);

    const slide = (event: MouseEvent, dir: number) => {
      event.preventDefault();
      direction.value = dir;
      transitionName.value = dir === 1
        ? ('slide-next')
        : ('slide-prev');
      const len = props.images.length - 1;
      if (transitionName.value === 'slide-next') {
        current.value = len > current.value ? current.value + 1 : 0;
      } else {
        current.value = current.value === 0 ? len : current.value - 1;
      }
    };

    const getItemStyle = (index: number) => {
      const translateX = index * -100; // Adjust based on slide width
      return {
        transform: `translateX(${translateX}%)`,
      };
    };

    return {
      getBase64Img,
      slide,
      current,
      show,
      getItemStyle,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "src/styles/_typography.scss";
@import "src/styles/colors.scss";
@import "src/styles/mixins.scss";

.slider {
  width: 80%;
  margin-bottom: 2rem;

  .content-wrapper {
    display: flex;
    width: 100%;

    .content-img {
      flex: 0 0 100%; // Adjust based on slide width
      margin: 0 auto;
      margin-bottom: 1rem;
      img {
        width: 100%;
        object-fit: contain;
      }
    }
  }
}

.slide {
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.menu {
  display: flex;
  justify-content: end;
  align-items: center;
  width: 100%;
  gap: 1rem;

  @include for-xs-sm-width {
    justify-content: center;
    align-items: center;
  }
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
}

.btn:hover {
  transform: scale(1.1);
}

</style>
