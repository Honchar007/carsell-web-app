<template>
  <label>
      <span class="checkbox-container">
        <input
          type="checkbox"
          hidden
          :disabled="disabled"
          :checked="modelValue"
          @change="$emit('update:modelValue', $event.target.checked)"
        />
        <span class="checkmark" />
      </span>
      <span class="label">{{ label }}</span>
  </label>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Checkbox',
  props: {
    label: {
      type: String,
      default: '',
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    modelValue: {
    },
  },
  emits: ['update:modelValue'],
});
</script>

<style lang="scss" scoped>
@import 'src/styles/mixins';
@import "src/styles/typography";

label {
  display: flex;
  align-items: center;
  justify-content: flex-start;

  .checkbox-container {
    @include checkbox-button;
  }

  .label {
    @include typo-body-large-medium;
    color: white;
    padding-left: 0.25rem;
    padding-right: 0.25rem;
    border-radius: 2rem;
    margin-left: 0.5rem;
  }
}
</style>
