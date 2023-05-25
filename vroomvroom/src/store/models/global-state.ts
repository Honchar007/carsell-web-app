// models
import Session from './session';
import UserInfo from './user-info';

interface GlobalState {
  session: Session,
  isLoading: boolean,
  user: UserInfo,
}

export default GlobalState;
