<template>
  <div class="input-wrapper" :style="{ margin }">
    <p v-if="label" class="label-text" :class="{'label-text-required': required}">{{ label }}</p>
    <div class="input-content">
      <img v-if="type === InputTypes.Search" src="@/assets/icons/search.svg" :alt="InputTypes.Search">
      <input
        class="rounded"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :class="{
          small,
          icon: Object.values(InputTypes).includes(type),
          error: !!error,
          success: success,
        }"
        :disabled="disabledProps"
        :style="{ background, paddingTop: verticalPadding, paddingBottom: verticalPadding }"
        @focus="$emit('focus', $event)"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      />
    </div>
    <p v-if="error" class="error-text">{{ error }}</p>
    <span v-else-if="helper" class="helper-text">{{ helper }}</span>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
} from 'vue';

// components

// constants

const InputTypes = {
  Search: 'search',
  Twitter: 'twitter',
  Twitch: 'twitch',
  Youtube: 'youtube',
  Discord: 'discord',
  Instagram: 'instagram',
};

export default defineComponent({
  name: 'Input',
  components: { },
  props: {
    required: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: 'text',
    },
    small: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: '',
    },
    error: {
      type: String,
      default: '',
    },
    success: {
      type: Boolean,
      default: false,
    },
    rounded: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: null,
    },
    margin: {
      type: String,
      default: null,
    },
    background: {
      type: String,
      default: null,
    },
    disabledProps: {
      type: Boolean,
      default: false,
    },
    helper: {
      type: String,
      default: '',
    },
    icon: {
      type: Boolean,
      default: false,
    },
    verticalPadding: {
      type: String,
      default: undefined,
    },
    modelValue: {},
  },
  emits: ['update:modelValue', 'focus'],
  setup() {
    return {
      InputTypes,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "src/styles/typography";

.input-wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 20rem;

  .helper-text {
    margin-top: .25rem;
    @include typo-body-regular;
    color: $color-grey;
  }
}

p {
  margin-left: 0.75rem;
  &.label-text {
    padding-bottom: 0.25rem;

    &-required:after {
      content: '*';
    }
  }

  &.error-text {
    padding-top: 0.25rem;
    color: $color-error;
  }
}

.input-content {
  position: relative;
  display: inline-flex;
  width: 100%;
  .rounded {
    border: 2rem;
    border-radius: 10rem;
  }
  input {
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
  }

  img {
    position: absolute;
    top: 50%;
    left: 1rem;

    display: block;
    width: 1.125rem;
    height: 1.125rem;

    transform: translate(0, -50%);
    z-index: 1;
  }

  .verified-svg {
    position: absolute;
    top: 1.125rem;
    right: 1.125rem;
    z-index: 1;
    width: 1rem;
    transition: opacity 0.3s ease-in-out;

    &.small {
      top: 0.625rem;
      right: 0.625rem;
    }
  }
}
</style>
