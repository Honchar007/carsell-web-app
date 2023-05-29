interface UserInfoResponseMongo {
  _id: number | null,
  avatarPath: string | null,
  firstName: string | null,
  secondName: string | null,
  dateRegistration?: Date | null,
  email: string | null,
  phone: string | null,
  isAvtovukyp: boolean,
  isExpert: boolean,
}

export default UserInfoResponseMongo;
