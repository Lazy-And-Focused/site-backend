import { IInteraction } from "../types/interaction.types";
import { IListener, ListenerType } from "../types/listener.type";

import { datas } from "../deployer";

const { commands } = datas;
const space = /\s+/;;

class Listener implements IListener<[IInteraction]> {
  public readonly name = "interaction";
  public readonly on: ListenerType = "message";

  public execute(interaction: IInteraction) {
    if (!(interaction.text && interaction.text.startsWith("/"))) return;
    if (!interaction.from) return;
  
    const commandName = interaction.text.match(space) !== null
      ? interaction.text.slice(1, interaction.text.indexOf((<RegExpMatchArray>interaction.text.match(space))[0]))
      : interaction.text.slice(1, interaction.text.length);

    const command = commands.get(commandName);

    if (!command) return interaction.reply("ListenerError: Команда не была найдена.");
  
    try {
      return command.execute(interaction);
    } catch (error) {
      console.error(error);
      return interaction.reply("ListenerError: Команда вернула ошибку.");
    }
  }
}

export default Listener;