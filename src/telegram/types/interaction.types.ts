import { Context, NarrowedContext } from "telegraf";
import { Update } from "telegraf/typings/core/types/typegram";

export type IInteraction<T extends Context = any, K extends Update = any> =
	| Context
	| NarrowedContext<T, K>;