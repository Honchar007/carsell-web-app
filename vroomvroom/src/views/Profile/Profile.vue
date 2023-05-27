<template>
  <div class="profile">
    <ProfileInfo name="Гончар" />
    <ProfileData />
  </div>
  </template>

<script lang="ts">
import { defineComponent } from 'vue';

// components
import ProfileInfo from './ProfileInfo';
import ProfileData from './ProfileData';

export default defineComponent({
  name: 'Profile',
  components: {
    ProfileInfo,
    ProfileData,
  },
});
</script>
<style lang="scss" scoped>
@import 'src/styles/mixins';

.profile {
  display: flex;
  flex-direction: row;
  margin: 2rem 2rem 1rem 2rem;
  gap: 1rem;

  @include for-xs-sm-md-width {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
</style>
