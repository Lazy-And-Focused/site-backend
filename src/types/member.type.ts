import { ILink } from "./link.type";

export type IMember = {
  name: string;
  role: string;
  tag: string;

  description: string;
  socials: ILink[];
  
  avatar?: string;
  meta?: string[];
};

export const KEYS = [
  "name",
  "role",
  "tag",

  "description",
  "socials",

  "avatar",
  "meta"
] as const;