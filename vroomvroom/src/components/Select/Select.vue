<template>
  <div class="select-container">
    <div v-if="!!nameLabel" class="head-select"> {{ nameLabel }} </div>
    <select
      class="search-input"
      v-model="selectValue"
      :disabled="disabled"
      :class="{
        'error': !!error,
      }"
    >
      <option class="option" v-for="option in options" :key="option.value" :value="option.value">
        {{ option.text }}
      </option>
    </select>
    <p v-if="error" class="error-text">{{ error }}</p>
  </div>
</template>

<script lang="ts">
import {
  defineComponent, computed,
} from 'vue';

// models

// constants

export default defineComponent({
  name: 'Select',
  props: {
    options: {
      type: Array as any,
      required: true,
    },
    disabled: {
      type: Boolean,
    },
    error: {
      type: String,
      default: '',
    },
    modelValue: {
      required: true,
    },
    nameLabel: {
      type: String,
      required: false,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    // refs
    // computed
    const selectValue = computed({
      get: () => props.modelValue,
      set: (value) => {
        emit('update:modelValue', value);
      },
    });

    return {
      selectValue,
    };
  },
});

</script>

<style lang="scss" scoped>
@import "src/styles/typography";
@import "src/styles/colors";

.select-container {
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 100%;
  .head-select {
    @include typo-headline-3;

    margin-left: 1.5rem;
    margin-bottom: 0.25rem;
    color: $color-viridian-green;
  }
  .search-input {
    @include typo-headline-3;
    position: relative;
    width: 100%;
    padding: 0.875rem;
    color: $color-white;
    background: $color-secondary-background-molecules;
    border: 2px solid transparent;
    border-radius: 1rem;
    transition: 0.3s ease-in-out all;

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
    .option {
      display: flex;
      align-items: center;
      padding: 1rem;
      cursor: pointer;

      &.active {
        background-color: rgba($color-white, 0.05);
      }

      &:hover {
        background-color: rgba($color-white, 0.1);
      }

      .label {
        display: inline-flex;
        align-items: center;
        cursor: inherit;

        img {
          display: inline-flex;
          height: 1.5rem;
          margin-right: 0.5rem;
          cursor: inherit;
        }
      }
    }
  }
}

p {
  @include typo-headline-4;

  margin-left: 0.75rem;

  &.error-text {
    padding-top: 0.25rem;
    color: $color-error;
  }
}
</style>
