interface UserInfo {
  id: number,
  avatarPath: string | null,
  firstName: string | null,
  secondName: string | null,
  dateRegistration: Date,
  email: string | null,
  phone: string,
  isAvtovukyp: boolean,
  isExpert: boolean,
}

export default UserInfo;
