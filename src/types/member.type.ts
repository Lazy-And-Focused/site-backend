import { ILInk } from "./link.type";

export const KEYS = [
  "username",
  "post",
  "description",
  "links",
] as const;

export interface IMember {
  username: string;
  post: string;
  description: string;
  
  links: ILInk[];
};