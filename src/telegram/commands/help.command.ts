import { ICommand } from "../types/command.type";
import { IInteraction } from "../types/interaction.types";

import { datas } from "../deployer";

class Command implements ICommand {
  public readonly name = "help";

  public async execute(interaction: IInteraction) {
    if (!interaction.text) {
      return interaction.reply("Не предвиненная ошибка. Текста запроса не найден.");
    };
    if (!interaction.from) {
      return interaction.reply("Не предвиденная ошибка. Отправитель не найден.");
    };

    if (interaction.text.split(" ").length > 1) {
      const command = interaction.text.split(" ")[1];
      
      const sendHelp = datas.help.get(command);

      if (!sendHelp) {
        return interaction.reply(`Команда ${command} не была найдена.`);
      }

      return sendHelp(interaction);
    };

    return interaction.reply(`Используйте /${this.name} {command name}, чтобы посмотреть команду.\nВсе возможные команды:\n/${Array.from(datas.help.keys()).join("\n/")}`);
  }
}

export default Command;
