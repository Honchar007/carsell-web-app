interface CarCheck {
  id: number,
  idWantForCheck: number,
  name: string,
  phone: string,
  idCarForCheck: number | null,
  link: string,
  info: string,
  expertId: number | null,
}

export default CarCheck;
