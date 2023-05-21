<template>
  <div :style="{margin}">
    <label class="text-area-wrapper">
      <span v-if="label">{{ label }}</span>
      <textarea
        class="text-area"
        rows="5"
        :class="{
          'error': !!error,
        }"
        :value="modelValue"
        :placeholder="placeholder"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement)?.value)"
      />
      <span v-if="error" class="error-text">{{ error }}</span>
    </label>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TextArea',
  props: {
    label: {
      type: String,
      default: null,
    },
    modelValue: {
      type: String,
      default: null,
    },
    placeholder: {
      type: String,
      default: '',
    },
    error: {
      type: String,
      default: '',
    },
    margin: {
      type: String,
      default: null,
    },
  },
  emits: ['update:modelValue'],
});
</script>

<style lang="scss" scoped>
@import 'src/styles/typography';

.text-area-wrapper {
  @include typo-body-regular;
  margin: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  ::-webkit-scrollbar {
    // Width of vertical scroll bar
    width: 2rem;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 2rem;
    border: 0.5rem solid rgba(0, 0, 0, 0);
    background: #c2c9d2;
    background-clip: padding-box;
  }

  .text-area {
    @include typo-headline-4;
    width: 100%;
    padding: 1rem;
    color: $color-white;
    background: $color-secondary-background-molecules;
    border: 2px solid transparent;
    border-radius: 1.5rem;
    -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
    -moz-box-sizing: border-box;    /* Firefox, other Gecko */
    box-sizing: border-box;
    resize: none;
    transition: 0.5s ease-in-out all;

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

    &.error {
      color: $color-error;
      border: 2px solid $color-error;
      padding-right: 3rem;
    }
  }

  .error-text {
    padding-top: 0.25rem;
    color: $color-error;
  }
}
</style>
