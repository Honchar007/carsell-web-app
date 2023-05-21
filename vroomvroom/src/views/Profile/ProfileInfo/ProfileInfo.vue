<template>
  <div class="profile-wrapper">
    <div class="profile-avatar"><img src="@/assets/profile-default.jpg" alt="profile"></div>
    <div class="profile-info">
      <div>
        Ім'я: {{ name }}
      </div>
      <div>
        Прізвище: {{ name }}
      </div>
      <div>
        Номер телефону: {{ name }}
      </div>
    </div>
  </div>
  </template>

<script lang="ts">
import { defineComponent } from 'vue';

// components

export default defineComponent({
  name: 'ProfileInfo',
  components: {
  },
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  setup() {
    return {

    };
  },
});
</script>
<style lang="scss" scoped>
@import 'src/styles/typography';
@import 'src/styles/colors';

.profile-wrapper {
  display: flex;
  flex-direction: column;
  width: 30%;
  height: 100%;

  .profile-avatar {
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    margin-bottom: 1rem;

    img {
      object-fit: cover;
      width: 100%;
      border-radius: 2rem;
    }
  }

  .profile-info {
    @include typo-body-large-medium;

    border-radius: 2rem;
    background: $color-viridian-green;
    margin-bottom: 1.5rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
  }
}
</style>
