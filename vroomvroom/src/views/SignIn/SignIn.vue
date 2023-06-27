<template>
  <div v-if="toggleSignInUp" class="form">
    <h1 class="form-item">Sign in</h1>
    <div class="form-item">
      <div class="form-text">Login(email)</div>
      <Input class="form-input"
        v-model="emailTemp"
      />
    </div>
    <div class="form-item">
      <div class="form-text">Password</div>
      <Input class="form-input"
        v-model="password"
      />
    </div>
    <Button class="form-item signin-button" @click="login(emailTemp,password)">Sign in</Button>
    <Button class="form-item signin-button" outlined @click="changeAttempt">Sign up?</Button>
    <p v-if="errorMsgServerSignIn">{{ errorMsgServerSignIn }}</p>
  </div>
  <div v-else class="form">
    <h1 class="form-item">Sign up</h1>
    <AvatarUploader v-model="image" label="AVATAR UPLOAD"/>
    <!-- <FilesUploader v-model="image" label="AVATAR UPLOAD"/> -->
    <div class="form-item">
      <div class="form-text">Ім'я</div>
      <Input class="form-input"
        v-model="firstName"
        placeholder="Андрій"
        :error="v$.firstName && v$.firstName.$error ? v$.firstName.$errors[0].$message as string : ''"
      />
    </div>
    <div class="form-item">
      <div class="form-text">Прізвище</div>
      <Input class="form-input"
        v-model="secondName"
        placeholder="Гончар"
        :error="v$.secondName && v$.secondName.$error ? v$.secondName.$errors[0].$message as string : ''"
      />
    </div>
    <div class="form-item">
      <div class="form-text">Пароль</div>
      <Input class="form-input"
        type="password"
        v-model="password"
        :error="v$.password && v$.password.$error ? v$.password.$errors[0].$message as string : ''"
      />
    </div>
    <div class="form-item">
      <div class="form-text">Повторити пароль</div>
      <Input class="form-input"
        v-model="confirmPassword"
        placeholder="super secret"
        :error="v$.confirmPassword && v$.confirmPassword.$error ? v$.confirmPassword.$errors[0].$message as string : ''"
      />
        <!-- :error="password != confirmPassword && confirmPassword != '' ? 'Паролі не збігаються' : ''" -->
    </div>
    <div class="form-item">
      <div class="form-text">Email</div>
      <Input class="form-input"
        v-model="emailTemp"
        :error="v$.emailTemp && v$.emailTemp.$error ? v$.emailTemp.$errors[0].$message as string : ''"
      />
    </div>
    <div class="form-item">
      <div class="form-text">Номер телефону</div>
      <Input class="form-input"
        v-model="phone"
        placeholder="+380777777777"
        :error="v$.phone && v$.phone.$error ? v$.phone.$errors[0].$message as string : ''"
      />
    </div>
    <Button
      class="form-item signin-button"
      @click="signUp"
    >Sign up</Button>
    <Button @click="saveImage">saveImage</Button>
    <Button class="form-item signin-button" outlined @click="changeAttempt">Are you already sign up? Sign in!</Button>
    <p v-if="errorMsgServer">{{ errorMsgServer }}</p>
  </div>
</template>
<script lang="ts">
import {
  computed, defineComponent, ref,
} from 'vue';
import { useRouter } from 'vue-router';

// components
import Input from '@/components/Input';
import Button from '@/components/Button';
import { useStore } from 'vuex';

import { Actions } from '@/store/props';
import AvatarUploader from '@/components/AvatarUploader';

import AuthApi from '@/api/auth.api';
import { helpers, sameAs, email } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';
import CommonApi from '@/api/common.api';
// import FilesUploader from '@/components/FilesUploader';

export default defineComponent({
  name: 'SignIn',
  components: {
    Input,
    Button,
    AvatarUploader,
    // FilesUploader,
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    const firstName = ref<string>('');
    const secondName = ref<string>('');
    const confirmPassword = ref<string>('');
    const phone = ref<string>('');
    const emailTemp = ref<string>('');
    const password = ref<string>('');
    const image = ref<any>(null);

    const toggleSignInUp = ref<boolean>(true);

    const errorMsgServerSignIn = ref<string>('');
    const errorMsgServer = ref<string>('');
    // validations
    const validations = {
      firstName: {
        required: helpers.withMessage('Необхідно вказати ім\'я', (value) => !!value),
      },
      secondName: {
        required: helpers.withMessage('Необхідно вказати прізвище', (value) => !!value),
      },
      password: {
        required: helpers.withMessage('Необхідно вказати пароль', (value) => !!value),
      },
      confirmPassword: {
        required: helpers.withMessage('Необхідно повторити пароль', (value) => !!value),
        sameAs: helpers.withMessage('Паролі не співпадають', sameAs(password)),
      },
      phone: {
        required: helpers.withMessage('Необхідно вказати номер телефону', (value) => !!value),
        regex: helpers.withMessage('Некоректний формат номера телефону', (value: string) => /^\+380[0-9]{3}[0-9]{3}[0-9]{3}$/.test(value)),

      },
      emailTemp: {
        required: helpers.withMessage('Необхідно вказати пошту', (value) => !!value),
        email: helpers.withMessage(
          'Некоректний формат пошти',
          email,
        ),
      },
    };

    const v$ = useVuelidate(validations, {
      firstName,
      secondName,
      confirmPassword,
      phone,
      emailTemp,
      password,
      image,
    });

    // computed
    const isLoading = computed(() => store.state.isLoading);

    // helpers
    const validation = () => {
      if (
        firstName.value
        && secondName.value
        && confirmPassword.value
        && phone.value
        && emailTemp.value
        && password.value
        && image.value
      ) {
        return true; // All fields are filled
      }
      return false; // At least one field is empty
    };

    const changeAttempt = () => {
      toggleSignInUp.value = !toggleSignInUp.value;
    };

    // async helpers
    async function login(email: string, password: string): Promise<void> {
      await store.dispatch(Actions.login, { email, password })
        .then(
          () => {
            router.push('/home');
          },
        )
        .catch((error: any) => {
          errorMsgServerSignIn.value = ((error.response
              && error.response.data
              && error.response.data.message)
            || error.message
            || error.toString());
        });
    }

    async function signUp(): Promise<void> {
      v$.value.$touch();
      if (!v$.value.$invalid) {
        const user = {
          avatarPath: '',
          firstName: firstName.value,
          secondName: secondName.value,
          email: emailTemp.value,
          phone: phone.value,
          isAvtovukyp: false,
          isExpert: false,
          password: password.value,
        };
        await AuthApi.RegUser(user)
          .then(
            async () => {
              toggleSignInUp.value = true;
              await CommonApi.uploadImage(emailTemp.value, image.value);
              firstName.value = '';
              secondName.value = '';
              emailTemp.value = '';
              password.value = '';
              confirmPassword.value = '';
              phone.value = '';
              v$.value.$reset();
            },
          )
          .catch((error: any) => {
            errorMsgServer.value = ((error.response
              && error.response.data
              && error.response.data.message)
            || error.message
            || error.toString());
          });
      }
    }

    const saveImage = async () => {
      await CommonApi.uploadImage(emailTemp.value, image.value);
    };

    return {
      saveImage,
      firstName,
      secondName,
      confirmPassword,
      phone,
      emailTemp,
      password,
      errorMsgServer,
      errorMsgServerSignIn,
      v$,
      image,
      toggleSignInUp,
      isLoading,
      changeAttempt,
      login,
      signUp,
    };
  },
});
</script>
<style lang="scss" scoped>
@import 'src/styles/typography';
@import 'src/styles/mixins';
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
        text-align: start;

        width: 35%;

        @include for-xs-width {
          text-align: center;
          width: 100%;
        }
      }

      .form-input {
        @include for-xs-width {
          width: 100%;
        }
      }
    }

    .form-item {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin-top: 1rem;

      @include for-xs-width {
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }

      &:last-child {
        margin-bottom: 1rem;
      }

      &.signin-button {
        width: 80%;
      }
    }
  }
</style>
