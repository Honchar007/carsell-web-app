<template>
  <button
    :class="{
      'button-small': small,
      'button-nano': nano,
      'primary': primary,
      'outlined': outlined,
      'disabled': disabled,
      'full-width': fullWidth,
    }"
    :disabled="disabled"
  >
    <span v-if="$slots.prefix" class="prefix">
      <slot name="prefix"></slot>
    </span>

    <slot></slot>

    <span v-if="$slots.postfix" class="postfix">
      <slot name="postfix"></slot>
    </span>
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Button',
  props: {
    small: {
      type: Boolean,
      default: false,
    },
    nano: {
      type: Boolean,
      default: false,
    },
    primary: {
      type: Boolean,
      default: false,
    },
    outlined: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    prefix: {
      type: Boolean,
      default: false,
    },
    postfix: {
      type: Boolean,
      default: false,
    },
    fullWidth: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<style lang="scss" scoped>
@import "src/styles/_typography.scss";

button {
  @include typo-button-default;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 2rem;
  gap: 1rem;
  color: $color-background;
  background: $color-peach-secondary;
  border: 2px solid $color-peach-secondary;
  border-radius: 5.6rem;
  transition: color 0.3s ease-in-out,
    background 0.3s ease-in-out,
    border 0.3s ease-in-out,
    box-shadow 0.3s ease-in-out;

  :slotted(img) {
    transition: filter 0.3s ease-in-out;
    filter: brightness(1);
  }

  &.button-small {
    @include typo-button-small;

    padding: 0.5rem 1rem;
  }

  &.primary {
    border: none;
    background: none;
    color: $color-viridian-green;
    padding: 0;

    &.disabled {
      color: $color-grey;
      cursor: default;
      opacity: 0.5;
    }

    &.button-nano {
      @include typo-caption-bold;
    }
  }

  &.outlined {
    color: $color-white;
    background: transparent;
    border: 2px solid $color-white;

    &.primary {
      border: none;
      background: none;
      color: $color-viridian-green;
    }
    img {
      filter: brightness(0) invert(100%);
    }
  }

  &.disabled {
    cursor: default;
    opacity: 0.5;
  }

  &.full-width {
    width: 100%;
  }

  .prefix {
    display: flex;
  }

  .postfix {
    display: flex;
  }

  .img {
    filter: brightness(0);
  }

  &:not(.disabled):hover {
    color: $color-background;
    background: $color-white;
    border: 2px solid $color-white;
    box-shadow: $shadow-button;

    &.primary {
      border: none;
      background: none;
      box-shadow: none;
      color: $color-neutrals-6;
    }
    img {
      filter: brightness(0);
    }

    :slotted(img)[alt='WalletConnect'] {
      filter: brightness(0);
    }
  }
}

</style>
