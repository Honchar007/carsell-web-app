import { createStore } from 'vuex';
import calcTimeDiff from '@/shared/helpers/calc-time-diff';
import AuthApi from '@/api/auth.api';
import UserInfo from './models/user-info';

// module types
import { Actions, Modules, Mutations } from './props';
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
    isAuthenticated: (state): boolean => !!(state.session.token && state.session.refreshTimerId),
    isAvtovukyp: (state): boolean => !!(state.session.token && state.session.refreshTimerId)
      && state.user.isAvtovukyp,
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
    async [Actions.updateFromLocalStorage](
      { commit, dispatch },
      providedAddress?: string,
    ): Promise<void> {
      const address = providedAddress || await dispatch(Actions.getLastSelectedUser);

      const tokenBundle: TokenBundleWithExp = await dispatch(Actions.getFromLocalStorage, 'user-token');

      if (!tokenBundle) {
        commit(Mutations.setLoading, false);
        return;
      }

      const isTokenExpired = calcTimeDiff(tokenBundle.expDate as string) <= 0;

      if (isTokenExpired) {
        dispatch(Actions.reqRefreshToken, { ...tokenBundle, address, forceUpdate: true });
      } else {
        commit(Mutations.setTokenBundle, tokenBundle);
        await dispatch(Actions.GetUser, tokenBundle.token);
        dispatch(Actions.setToLocalStorage, address);
        dispatch(Actions.waitTokenExpiration);
        commit(Mutations.setLoading, false);
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
      { commit, state, dispatch },
      credentials: UserLogin,
    ): Promise<void> {
      commit(Mutations.setLoading, true);
      const { token, refreshToken } = await AuthApi.authUser(credentials.email, credentials.password);
      console.log(token, refreshToken);
      // Save token and refresh token in Vuex store
      commit('setTokenBundle', { token, refreshToken });
      if (token) {
        await dispatch(Actions.GetUser, credentials.email);
      }
      dispatch(Actions.waitTokenExpiration);
      // Save token and refresh token in local storage
      if (token) { localStorage.setItem('token', token); }
      if (refreshToken) { localStorage.setItem('refreshToken', refreshToken); }
      localStorage.setItem('last_selected_user', credentials.email);
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
            commit('setUserData', userState);
            commit(Mutations.setLoading, false);
          }
        } catch (error: any) {
          console.error(error);
          commit(Mutations.setLoading, false);
          throw new Error(error.message);
        }
      }
    },
    async [Actions.logout]({ commit, dispatch, state }): Promise<void> {
      commit(Mutations.setTokenBundle);
      commit(Mutations.setUserData);

      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('last_selected_user');

      dispatch(Actions.waitTokenExpiration);
    },
    async [Actions.reqRefreshToken](
      { commit, dispatch },
      {
        email,
        token,
        refreshToken,
        forceUpdate,
      }: TokenBundle & { email: string, forceUpdate: boolean },
    ): Promise<void> {
      if (token && refreshToken) {
        try {
          const tokenBundle = await AuthApi.refreshToken(refreshToken);

          if (forceUpdate) {
            await dispatch(Actions.GetUser, tokenBundle.token);
          } else {
            dispatch(Actions.GetUser, tokenBundle.token);
          }

          commit(Mutations.setTokenBundle, tokenBundle);
          dispatch(Actions.waitTokenExpiration);
        } catch (e) {
          console.error(e);
          dispatch(Actions.logout, email);
          commit(Mutations.setLoading, false);
        }
      } else {
        dispatch(Actions.logout);
        commit(Mutations.setLoading, false);
      }
    },
    async [Actions.waitTokenExpiration]({ state, commit, dispatch }): Promise<void> {
      const { expDate, refreshTimerId } = state.session;
      const { session, user } = state;

      if (refreshTimerId !== null) {
        clearTimeout(refreshTimerId);
        commit(Mutations.setRefreshTimerId);
      }

      if (expDate) {
        const diff = calcTimeDiff(expDate);

        if (diff > 0) {
          const timerId = setTimeout(
            () => {
              dispatch(Actions.reqRefreshToken, {
                email: user.email,
                token: session.token,
                refreshToken: session.refreshToken,
                forceUpdate: false,
              });
            },
            diff,
          );
          commit(Mutations.setRefreshTimerId, timerId);
        } else {
          await dispatch(Actions.reqRefreshToken, {
            email: user.email,
            token: session.token,
            refreshToken: session.refreshToken,
            forceUpdate: false,
          });
        }
      }
    },
  },
  modules: {
  },
});
