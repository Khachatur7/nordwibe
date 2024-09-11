import { IUser } from "./user.interface";

export interface IFlat {
  id: number;
  user: IUser;
  price: number;
}