import { ENotificationsTypes } from "@/components/Notification";
import { IParameter } from "./parameter.interface";
import { TAnimals, THabits } from "@/config";
import { IFlat } from "./flat.interface";
import { IArticle } from "./article.interface";

export interface IFavourites {
  users: IUser[];
  flats: Array<IFlat>;
  articles: Array<IArticle>;
}

export interface IRealUserMe {
  id: number;
  first_name: string;
  date_joined: string;
  count_visits: number;
  avatar: string;
  purpose: string;
  occupation: string;
  smoking: string;
  pets: string;
  first_aid: string;
  social_interaction: string;
  home_town: string;
  my_town: string;
  is_favorite: true;
  username: string;
  email: string;
  date_birthday: string;
  gender: string;
  type_auth: string;
  is_staff: boolean;
  is_active: boolean;
  last_login: string;
  is_superuser: true;
}

export interface IRealUser {
  id: number;
  first_name: string;
  date_joined: string;
  count_visits: number
  avatar: string;
  purpose: string;
  occupation: string;
  smoking: string;
  pets: string;
  first_aid: string;
  social_interaction: string;
  home_town: string;
  my_town: string;
  is_favorite: true;
}

export interface IUser {
  id: number;
  name: string;
  age: number;
  username: string;
  animals: Array<TAnimals>;
  habits: Array<THabits>;
  parameters: Array<IParameter>;
  favourites: IFavourites;
  city: string;
  notifications: [ENotificationsTypes, string, boolean][];
  contact: {
    telegram: string;
    vk: string;
    phone: string;
    mail: string;
  };
}
