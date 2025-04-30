import { Document, ObjectId } from "mongoose";

import {
  KEYS as MEMBER_KEYS,
  IMember
} from "types/member.type";

const MODELS = [
  "members"
] as const;

type IModels = (typeof MODELS)[number];
const KEYS: Record<IModels, string[]|readonly string[]> = {
  members: MEMBER_KEYS
} as const;

type IAllModels = {
  members: IMember
};

type IDocument<T> = Document<unknown, {}, T, {}> & T & { _id: ObjectId; } & { __v: number; }

class Parser<Model extends IModels> {
  private readonly keys: string[] | readonly string[];
  
  public constructor(public readonly model: Model) {
    this.keys = KEYS[model];
  }

  public execute<T = IAllModels[Model]>(data: T | { [key: string]: unknown } | IDocument<T>): T {
    return Object.fromEntries(this.keys.map((k) => [k, (data as { [key: string]: unknown })[k]])) as T;
  };
}

export { Parser };

export default Parser;
