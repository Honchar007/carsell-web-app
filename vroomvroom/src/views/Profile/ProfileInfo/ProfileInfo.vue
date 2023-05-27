<template>
  <div class="profile-wrapper">
    <div class="profile-avatar"><img src="@/assets/profile-default.jpg" alt="profile"></div>
    <div class="profile-info">
      <div>
        Ім'я: {{ user.firstName }}
      </div>
      <div>
        Прізвище: {{ user.secondName }}
      </div>
      <div>
        Номер телефону: {{ user.phone }}
      </div>
    </div>
  </div>
  </template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';

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
    const store = useStore();

    // computed
    const isAuthenticated = computed(() => store.getters.isAuthenticated);

    const user = computed(() => store.getters.getUser);
    return {
      user,
    };
  },
});
</script>
<style lang="scss" scoped>
@import 'src/styles/typography';
@import 'src/styles/colors';
@import 'src/styles/mixins';

.profile-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 30%;
  height: 100%;
  @include for-xs-sm-md-width {
    width: 100%;
  }

  .profile-avatar {
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    margin-bottom: 1rem;
    width: 100%;

    @include for-xs-sm-width {
      width: 100%;
    }

    @include for-md-width {
      width: 50%;
    }

    img {
      object-fit: cover;
      width: 100%;
      border-radius: 2rem;
    }
  }

  .profile-info {
    @include typo-body-large-medium;
    width: 100%;

    border-radius: 2rem;
    background: $color-viridian-green;
    margin-bottom: 1.5rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
  }
}
</style>
