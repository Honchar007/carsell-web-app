// models
import Comment from './comment';

interface CarInfo {
  id: number,
  ownerId: number,
  carPicsPath: string[] | null,
  brand: string,
  model: string,
  price: number,
  volume: number,
  transmission: string,
  color: string,
  year: number,
  town: string,
  odometr: number,
  vincode: string | null,
  plates: string | null,
  description: string | null,
  comments: Comment[] | null,
  isAvtovukypSale: boolean,
  datePublication: Date,
}

export default CarInfo;
