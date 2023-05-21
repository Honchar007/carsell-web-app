<!-- eslint-disable vuejs-accessibility/click-events-have-key-events -->
<template>
  <teleport to="body">
    <div
      class="modal-backdrop"
      :style="{ backdropFilter: blurred ? 'blur(1.25rem)' : undefined }"
      @click.self="$emit('close')"
    >
      <template v-if="$slots.loader">
        <slot name="loader"></slot>
      </template>
      <div v-if="!$slots.loader" class="modal-container" :style="{ maxWidth }">
        <div
          class="modal"
          role="dialog"
          aria-labelledby="modalTitle"
          :style="{ padding: modalPadding }"
        >

          <header class="modal-header" id="modalTitle">
            <slot name="header"></slot>
            <button
              v-if="hasCloseButton"
              type="button"
              class="close-button"
              aria-label="Close modal"
              @click="$emit('close')"
            >
              <img src="@/assets/icons/close-filled.svg" alt="Close icon">
            </button>
          </header>

          <section v-if="hasBody" class="modal-body" :style="{ marginTop: blocksMargin }">
            <slot name="body"></slot>
          </section>

          <footer v-if="hasFooter" class="modal-footer" :style="{ marginTop: blocksMargin }">
            <slot name="footer"></slot>
            <Button
              v-if="hasCancelButton"
              outlined
              @click="$emit('close')"
            >
              {{ cancelButtonLabel }}
            </Button>
          </footer>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted } from 'vue';

// components
import Button from '@/components/Button';

export default defineComponent({
  name: 'Modal',
  components: { Button },
  props: {
    insideModal: {
      type: Boolean,
      default: false,
    },
    hasCloseButton: {
      type: Boolean,
      default: true,
    },
    hasBody: {
      type: Boolean,
      default: true,
    },
    hasCancelButton: {
      type: Boolean,
      default: false,
    },
    maxWidth: {
      type: String,
      default: '28.5rem',
    },
    hasFooter: {
      type: Boolean,
      default: true,
    },
    cancelButtonLabel: {
      type: String,
      default: 'Cancel',
    },
    modalPadding: {
      type: String,
      default: '2rem',
    },
    blocksMargin: {
      type: String,
      default: '2rem',
    },
    blurred: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['close'],
  setup(props) {
    onMounted(() => {
      document.body.style.overflow = 'hidden';
    });
    onUnmounted(() => {
      if (props.insideModal) return;

      document.body.style.overflow = 'auto';
    });
  },
});
</script>

<style lang="scss" scoped>
@import 'src/styles/mixins';

.modal-backdrop {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.35);
}

.modal-container {
  z-index: 1000;
  width: calc(100% - 2rem);
  overflow: hidden;
  background: $color-background;
  border-radius: 1.25rem;
}

.modal {
  @include hide-scrollbar;
  position: relative;
  display: flex;
  flex-direction: column;
  max-height: calc(100vh - 2rem);
  overflow: auto;
}

.modal-header {
  @include typo-headline-4;
  color: $color-white;

  .close-button {
    position: absolute;
    right: 0.25rem;
    top: 0.25rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
}

.modal-body {
  @include typo-body-regular;
}

.modal-footer {
  display: flex;
  flex-direction: column;

  .cancel-button {
    @include typo-button-default;
    margin-top: 0.5rem;
    padding: 0.75rem;
  }
}
</style>
