<template>
  <div class="tabs-wrapper">
    <div class="tabs">
      <Button
        v-for="option in options"
        small
        primary
        :key="option as any"
        :class="{ active: option.value === modelValue }"
        @click="$emit('update:modelValue', option.value)"
      >
        {{ option.label }}
      </Button>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
} from 'vue';

// components
import Button from '@/components/Button/Button.vue';

// models
import OptionCase from '@/shared/models/option-case';

export default defineComponent({
  name: 'Tabs',
  components: { Button },
  props: {
    options: {
      type: Object as () => OptionCase<string>[],
      required: true,
    },
    modelValue: {
      type: Number,
      default: 0,
    },
  },
  emits: ['update:modelValue'],
});
</script>

<style lang="scss" scoped>
@import 'src/styles/typography';

.tabs-wrapper {
  flex-basis: 20%;
  width: 100%;
  overflow: hidden;

  .tabs {
    display: flex;
    flex-wrap: wrap;

    &::-webkit-scrollbar, &::-webkit-scrollbar-thumb {
      display: none;
    }

    button {
      padding: .5rem 1rem .5rem 0;
      &.active {
        color: $color-peach-secondary;
      }
    }
  }
}
</style>
