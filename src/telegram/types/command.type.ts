import { IInteraction } from "./interaction.types";

export interface ICommand<Execute = any> {
  name: string;
  execute: (interaction: IInteraction) => Execute
}

export type Commands = Map<string, ICommand>;