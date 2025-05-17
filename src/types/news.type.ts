export type INews = {
  author: string;

  /** ISO date format */
  date: string;

  text: string;
  banner?: string;

  icon?: string;
  image?: string;
}

export const DEFAULT = {
  banner: "" as const,
  icon: "" as const,
  image: "" as const,
} as const;

export const REQUIRED = [
  "author",
  "text",
] as const;

export const KEYS = [
  ...REQUIRED,
  "banner",
  "icon",
  "image",
] as const;