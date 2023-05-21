// models
import UserInfo from './user-info';

interface UserInfoResponse extends UserInfo {
  password: string,
  login: string,
}

export default UserInfoResponse;
