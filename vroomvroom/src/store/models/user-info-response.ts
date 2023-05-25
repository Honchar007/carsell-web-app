// models
import UserInfo from './user-info';

interface UserInfoResponse extends UserInfo {
  password: string,
}

export default UserInfoResponse;
