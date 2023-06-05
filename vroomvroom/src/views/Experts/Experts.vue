<template>
  <h1>Експерти</h1>
  <Tabs class="tabs" :options="options" v-model="curTab" />
  <div v-if="curTab == options[0].value" class="car-list">
    <div v-for="(carCheck, index) in carChecks" :key="index">
      <CarCheckCard
        :idCheck="carCheck._id"
        :linkPath="carCheck.link"
        :model="carCheck.model"
        :brand="carCheck.brand"
        :town="carCheck.town"
        :phone="carCheck.phone"
        :firstName="carCheck.firstName"
        :email="carCheck.email"
      />
    </div>
  </div>
  <div v-else>
    <div v-for="(carCheck, index) in ownCarChecks" :key="index">
      <CarCheckCard
        :deleteCheck="true"
        :idCheck="carCheck._id"
        :linkPath="carCheck.link"
        :model="carCheck.model"
        :brand="carCheck.brand"
        :town="carCheck.town"
        :phone="carCheck.phone"
        :firstName="carCheck.firstName"
        :email="carCheck.email"
      />
    </div>
  </div>
  </template>

<script lang="ts">
import CommonApi from '@/api/common.api';
import store from '@/store';
import {
  computed, defineComponent, onMounted, ref,
} from 'vue';

// components
import CarCheckCard from '@/components/CarCheck';
import Tabs from '@/components/Tabs';

// constants
import OptionCase from '@/shared/models/option-case';

const options: OptionCase<any>[] = [
  {
    value: 0,
    label: 'Хочуть перевірки',
  },
  {
    value: 1,
    label: 'Перевіряються вами',
  }];

export default defineComponent({
  name: 'Experts',
  components: {
    CarCheckCard,
    Tabs,
  },
  setup() {
    const curTab = ref<number>(0);

    const carChecks = ref<Array<any>>([]);
    const ownCarChecks = ref<Array<any>>([]);

    const token = computed(() => store.getters.getToken);
    const userId = computed(() => store.getters.getId);

    onMounted(async () => {
      carChecks.value = await CommonApi.getCarChecks(token.value);
      ownCarChecks.value = await CommonApi.getOwnCarChecks(token.value, userId.value);
    });

    return {
      curTab,
      options,
      carChecks,
      ownCarChecks,
    };
  },
});
</script>
<style lang="scss" scoped>
  .tabs {
    margin-left: 2rem;
  }
</style>
