import { createStore } from 'vuex';
// import calcTimeDiff from '@/shared/helpers/calc-time-diff';
import AuthApi from '@/api/auth.api';
import parseTokenBundle from '@/shared/helpers/parse-token-bundle';
import UserInfo from './models/user-info';

// module types
import { Actions, Mutations } from './props';
import GlobalState from './models/global-state';
import TokenBundleWithExp from './models/token-bundle-with-exp';
import UserLogin from './models/user-login';
import TokenBundle from './models/token-bundle';

const initialUserInfo: UserInfo = {
  id: null,
  avatarPath: null,
  firstName: null,
  secondName: null,
  dateRegistration: null,
  email: null,
  phone: null,
  isAvtovukyp: false,
  isExpert: false,
};

export default createStore({
  state: {
    session: {
      token: null,
      refreshToken: null,
      expDate: null,
      refreshTimerId: null,
    },
    user: {
      ...initialUserInfo,
    },
    isLoading: true,
  },
  getters: {
    getUser: (state) => state.user,
    getEmail: (state) => state.user.email,
    getId: (state) => state.user.id,
    getToken: (state) => state.session.token,
    isAuthenticated: (state) => {
      const { token } = state.session;
      const { refreshToken } = state.session;

      if (token !== null && refreshToken !== null) {
        return true;
      }

      return false;
    },
    isLoading: (state) => !!state.isLoading,
    isAvtovukyp: (state): boolean => state.user.isAvtovukyp,
    isExpert: (state): boolean => state.user.isExpert,
  },
  mutations: {
    [Mutations.setTokenBundle](state: GlobalState, tokenBundle?: TokenBundleWithExp): void {
      state.session.token = tokenBundle?.token || null;
      state.session.refreshToken = tokenBundle?.refreshToken || null;
      state.session.expDate = tokenBundle?.expDate || null;
    },
    [Mutations.setRefreshTimerId](state: GlobalState, refreshId: number | null): void {
      state.session.refreshTimerId = refreshId || null;
    },
    [Mutations.setUserData](
      state: GlobalState,
      userInfo: UserInfo = initialUserInfo,
    ): void {
      state.user.id = userInfo.id;
      state.user.avatarPath = userInfo.avatarPath;
      state.user.firstName = userInfo.firstName;
      state.user.secondName = userInfo.secondName;
      state.user.dateRegistration = userInfo.dateRegistration;
      state.user.email = userInfo.email;
      state.user.phone = userInfo.phone;
      state.user.isAvtovukyp = userInfo.isAvtovukyp;
      state.user.isExpert = userInfo.isExpert;
    },
    [Mutations.setLoading](state: GlobalState, isLoading: boolean): void {
      state.isLoading = isLoading;
    },
  },
  actions: {
    [Actions.getFromLocalStorage]() {
      const tokenBundle = window.localStorage.getItem('user_data');

      if (tokenBundle) {
        return JSON.parse(tokenBundle);
      }

      return null;
    },
    [Actions.getFromLocalStorageUser]() {
      const email = window.localStorage.getItem('user_email');

      if (email) {
        return JSON.parse(email);
      }

      return null;
    },
    [Actions.setToLocalStorage]({ state }) {
      const { session: { token, refreshToken, expDate } } = state;

      const tokenBundleRow = token
        ? JSON.stringify({ token, refreshToken, expDate })
        : '';
      window.localStorage.setItem('user_data', tokenBundleRow);
    },
    [Actions.setToLocalStorageUser]({ state }) {
      const { user: { email } } = state;

      window.localStorage.setItem('user_email', email ? JSON.stringify(email) : '');
    },
    [Actions.clearLocalStorage]() {
      window.localStorage.removeItem('user_data');
    },
    async [Actions.updateFromLocalStorage]({ commit, state, dispatch }) {
      const tokenBundle = await dispatch(Actions.getFromLocalStorage);
      const email = await dispatch(Actions.getFromLocalStorageUser);
      commit(Mutations.setTokenBundle, tokenBundle);
      if (email && tokenBundle && tokenBundle.token) {
        await dispatch(Actions.GetUser, { email, providedToken: tokenBundle.token });
        await dispatch(Actions.waitTokenExpiration);
      }
    },
    async [Actions.refreshTokens]({ commit, state }): Promise<void> {
      if (state.session.refreshToken) {
        const response = await AuthApi.refreshToken(state.session.refreshToken);
        const { token, refreshToken } = response.data;

        commit('setTokenBundle', { token, refreshToken });

        localStorage.setItem('token', token);
        localStorage.setItem('refreshToken', refreshToken);
      }
    },
    async [Actions.login](
      { commit, dispatch },
      credentials: UserLogin,
    ): Promise<void> {
      commit(Mutations.setLoading, true);
      const rawTokenBundle = await AuthApi.authUser(credentials.email, credentials.password);
      const tokenBundle = parseTokenBundle(rawTokenBundle);
      // Save token and refresh token in Vuex store
      await commit(Mutations.setTokenBundle, tokenBundle);
      dispatch(Actions.setToLocalStorage);
      dispatch(Actions.waitTokenExpiration);

      if (tokenBundle.token) {
        await dispatch(Actions.GetUser, { email: credentials.email });
      }

      dispatch(Actions.setToLocalStorageUser);
    },
    async [Actions.GetUser](
      { commit, state, dispatch },
      { email, providedToken = null },
    ): Promise<any> {
      const token = state.session.token || providedToken;
      if (!token) {
        if (!providedToken) {
          dispatch(Actions.logout);
        }
        commit(Mutations.setLoading, false);
        throw new Error('User is not authorized.');
      }

      if (state.session.token) {
        try {
          const user = await AuthApi.getUserInfo(state.session.token, email);
          if (user) {
            const userState = JSON.parse(JSON.stringify(user));
            userState.id = user._id;
            commit(Mutations.setUserData, userState);
            commit(Mutations.setLoading, false);
          }
        } catch (error: any) {
          console.error(error);
          commit(Mutations.setLoading, false);
          throw new Error(error.message);
        }
      }
    },
    async [Actions.reqRefreshToken]({ commit, state, dispatch }) {
      const { session: { token, refreshToken } } = state;

      if (token && refreshToken) {
        try {
          const tokenBundle = await AuthApi.refreshToken(token);
          const newTokenBundle = parseTokenBundle(tokenBundle);

          commit(Mutations.setTokenBundle, newTokenBundle);
          dispatch(Actions.setToLocalStorage);
          dispatch(Actions.waitTokenExpiration);
        } catch (e) {
          console.error(e);
          commit(Mutations.setTokenBundle);
          dispatch(Actions.clearLocalStorage);
        }
      } else {
        commit(Mutations.setTokenBundle);
      }
    },
    async [Actions.waitTokenExpiration]({ state, commit, dispatch }) {
      const { session: { expDate, refreshTimerId } } = state;

      if (refreshTimerId !== null) {
        clearInterval(refreshTimerId);
        commit(Mutations.setRefreshTimerId, null);
      }

      if (expDate) {
        const curDate = +new Date();
        const endDate = +new Date(expDate);
        const diff = endDate - curDate;

        if (diff > 0) {
          const timerId = setTimeout(() => dispatch(Actions.reqRefreshToken), diff);
          commit(Mutations.setRefreshTimerId, timerId);
        } else {
          await dispatch(Actions.reqRefreshToken);
        }
      }
    },
    async [Actions.logout]({ commit, dispatch }) {
      commit(Mutations.setTokenBundle);
      dispatch(Actions.clearLocalStorage);
      dispatch(Actions.waitTokenExpiration);
    },
  },
  modules: {
  },
});
