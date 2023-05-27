<template>
  <div v-if="toggleSignInUp" class="form">
    <h1 class="form-item">Sign in</h1>
    <div class="form-item">
      <div class="form-text">Login(email)</div>
      <Input class="form-input"
        v-model="email"
      />
    </div>
    <div class="form-item">
      <div class="form-text">Password</div>
      <Input class="form-input"
        v-model="password"
      />
    </div>
    <Button class="form-item signin-button" @click="login(email,password)">Sign in</Button>
    <Button class="form-item signin-button" outlined @click="changeAttempt">Sign up? {{toggleSignInUp}}</Button>
    <p>{{isLoading}}</p>
  </div>
  <div v-else class="form">
    <h1 class="form-item">Sign up</h1>
    <div class="form-item">
      <div class="form-text">Login</div>
      <Input class="form-input"
        v-model="email"
      />
    </div>
    <div class="form-item">
      <div class="form-text">Confirm login</div>
      <Input class="form-input"
        v-model="email"
      />
    </div>
    <div class="form-item">
      <div class="form-text">Password</div>
      <Input class="form-input"
        v-model="password"
      />
    </div>
    <div class="form-item">
      <div class="form-text">Confirm password</div>
      <Input class="form-input"
        v-model="password"
      />
    </div>
    <div class="form-item">
      <div class="form-text">Name</div>
      <Input class="form-input"
        v-model="password"
      />
    </div>
    <Button class="form-item signin-button">Sign up</Button>
    <Button class="form-item signin-button" outlined @click="changeAttempt">Are you already sign up? Sign in!</Button>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';

// components
import Input from '@/components/Input';
import Button from '@/components/Button';
import { useStore } from 'vuex';

import { Actions } from '@/store/props';

export default defineComponent({
  name: 'SignIn',
  components: {
    Input,
    Button,
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    const email = ref<string>('');
    const password = ref<string>('');
    const toggleSignInUp = ref<boolean>(true);

    // computed
    const isLoading = computed(() => store.state.isLoading);

    const changeAttempt = () => {
      toggleSignInUp.value = !toggleSignInUp.value;
    };

    // async helpers
    async function login(email: string, password: string): Promise<void> {
      console.log(email);
      console.log(password);
      await store.dispatch(Actions.login, { email, password })
        .then(
          () => {
            router.push('/home');
          },
        )
        .catch((error: any) => {
          console.error((error.response
              && error.response.data
              && error.response.data.message)
            || error.message
            || error.toString());
        });
    }

    return {
      email,
      password,
      toggleSignInUp,
      isLoading,
      changeAttempt,
      login,
    };
  },
});
</script>
<style lang="scss" scoped>
@import 'src/styles/typography';
  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    div {
      display: flex;
      flex-direction: row;
      align-items: center;
      width: 80%;

      .form-text {
        @include typo-headline-3;
        width: 30%;
      }
    }

    .form-item {
      margin-top: 1rem;

      &:last-child {
        margin-bottom: 1rem;
      }

      &.signin-button {
        width: 80%;
      }
    }
  }
</style>
