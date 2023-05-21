<template>
  <h1>Швидкий продаж авто</h1>
  <div class="car-list">
    <router-link :to="'home'" class="card-link">
      <CarCard></CarCard>
    </router-link>
    <router-link :to="'home'" class="card-link">
      <CarCard></CarCard>
    </router-link>
    <router-link :to="'home'" class="card-link">
      <CarCard></CarCard>
    </router-link>
    <router-link :to="'home'" class="card-link">
      <CarCard></CarCard>
    </router-link>
  </div>
  </template>

<script lang="ts">
import { defineComponent } from 'vue';

// components
import CarCard from '@/components/CarCard';

export default defineComponent({
  name: 'CarFastOrder',
  components: {
    CarCard,
  },
});
</script>
  <style lang="scss" scoped>
  .car-list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
    padding-left: 3rem;
    gap: 0.5rem;

    .card-link {
      margin-top: 1rem;
      width: 30%;
      text-decoration: none;
      transition: 0.2s ease-out;

      &:hover {
        transform: translate(0, -0.5rem);
        filter: drop-shadow(0 0 0.5rem #09cdcd);
      }
    }
  }
  </style>
