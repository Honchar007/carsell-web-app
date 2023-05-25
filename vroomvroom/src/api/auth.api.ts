// instances
import http from '@/instances/http';

// models
import TokenBundle from '@/store/models/token-bundle';
import CurrentUserInfoResponse from '@/store/models/user-info-response';

// constants
import DefaultAuthData from '@/shared/constants/default-auth-data';
import UserInfoResponseMongo from '@/store/models/user-info-response-mongo';

const AuthApi = {
  // eslint-disable-next-line
  async authUser(email: string, password: string): Promise<TokenBundle> {
    const res = await http.post(
      '/login',
      {
        email,
        password,
      },
    );
    return res.data;
  },
  async RegUser(user: CurrentUserInfoResponse): Promise<any> {
    const res = await http.post(
      'http://127.0.0.1:3000/signup',
      {
        avatarPath: user.avatarPath,
        firstName: user.firstName,
        secondName: user.secondName,
        email: user.email,
        phone: user.phone,
        isAvtovukyp: user.isAvtovukyp,
        isExpert: user.isExpert,
        password: user.password,
      },
    );
    return res.data;
  },
  // eslint-disable-next-line
  async refreshToken(refreshToken: string): Promise<any> {
    // eslint-disable-next-line camelcase
    const res = await http.post(
      'http://127.0.0.1:3000/refresh-token',
      {
        refreshToken,
      },
    );
    return res.data;
  },
  async getUserInfo(token: string, email: string): Promise<UserInfoResponseMongo> {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const res = await http.get(
      `http://127.0.0.1:3000/user/${email}`,
      { headers },
    );
    return res.data;
  },
};

export default AuthApi;
