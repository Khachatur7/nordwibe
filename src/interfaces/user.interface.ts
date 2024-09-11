import { ENotificationsTypes } from "@/components/Notification"
import { IParameter } from "./parameter.interface"
import { TAnimals, THabits } from "@/config"
import { IFlat } from "./flat.interface"
import { IArticle } from "./article.interface"

export interface IFavourites {
  users: IUser[]
  flats: Array<IFlat>
  articles: Array<IArticle>
}

export interface IUser {
  id: number,
  name: string,
  age: number,
  username: string,
  animals: Array<TAnimals>,
  habits: Array<THabits>;
  parameters: Array<IParameter>,
  favourites: IFavourites,
  city: string,
  notifications: [ENotificationsTypes, string, boolean][],
  contact: {
    telegram: string;
    vk: string;
    phone: string;
    mail: string;
  };
}
