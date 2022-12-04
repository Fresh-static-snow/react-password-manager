import { IAuthData } from "./authData";

export interface IWebsitePassword extends Omit<IAuthData, 'email'> {
  website: string;
  user: string;
}