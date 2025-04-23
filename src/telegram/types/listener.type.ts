import { Guard, MaybeArray } from "telegraf/typings/core/helpers/util";
import { Update } from "telegraf/typings/core/types/typegram";
import { UpdateType } from "telegraf/typings/telegram-types";

export type ListenerType = MaybeArray<UpdateType | Guard<Update>>

export interface IListener<Data extends any[] = any[], Result extends any = any> {
  name: string;
  on: ListenerType;
  execute: (...data: Data) => Result
};

export type Listeners = Map<string, IListener>;