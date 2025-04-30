import Env from "env";

import { ICommand } from "../types/command.type";
import { IInteraction } from "../types/interaction.types";
import { KEYS, IMember } from "types/member.type";

import { Members } from "models/members.model";
import Parser from "database/parse";
import { ILink } from "types/link.type";

const env = new Env();

const helpJson = JSON.stringify(<IMember>{
  name: "FOCKUSTY",
  role: "CEO",
  description: "Идеальный Друг И Отличный Товарищ.",
  socials: [<ILink>{
    name: "GitHub",
    href: "https://github.com/fockusty"
  }],
  tag: "???"
}, undefined, 2);

const actions = ["add", "update", "delete"];

const help =
  "Учтите, Вы должны передавать участник в типе JSON на следующей строке.\n"
  + "Например:\n/member add\n"
  + helpJson

const addition =
  "\n\nВсе возможные вариации команды:\n" + actions.map(c => "/member " + c).join("\n")
  + "\n\nДля обновления пользователя введите: /member update {{ member name }}\n{{ JSON data }}"
  + "\n\nДля удаления пользователя введите /member delete {{ member name }}";

export const sendHelp = (interaction: IInteraction, prefix: string = "") => {
  return interaction.reply((prefix + "\n") + help + addition, { entities: [{
    offset: (prefix + "\n").length + help.length - helpJson.length,
    length: helpJson.length,
    type: "blockquote"
  }]});
}

const parser = new Parser("members");

class Command implements ICommand {
  public readonly name = "member";

  public async execute(interaction: IInteraction) {
    if (!interaction.from) {
      return interaction.reply("Произошла непредвиденная ошибка.\ninteraction.from is not defined")
    };
    if (!env.get("TELEGRAM_BOT_ADMINS_ID").split(",").includes(`${interaction.from.id}`)) {
      return interaction.reply("Вас нет в списке администраторов LAF, вы не можете мной воспользоваться.");
    };
    if (!interaction.text) {
      return interaction.reply("Текст взаимодействия не найден.")
    };
    if (interaction.text.split("\n").length < 2 && interaction.text.split(" ")[1] !== "delete") {
      return sendHelp(interaction, "Ошикба 3. JSON не найден.");
    };
    if (interaction.text.split("\n")[0].split(" ").length < 2) {
      return sendHelp(interaction, "Ошибка 4. Действие не вписано.");
    };

    let action: string = interaction.text.split(" ")[1].split("\n")[0];
    let name: string = "NONE";
    
    if (!actions.includes(action)) {
      return sendHelp(interaction, "Ошибка 1. Действие не найдено.");
    };
    if (action !== "add") {
      if (interaction.text.split(" ").length < 3) {
        return sendHelp(interaction, "Ошибка 2. Имя не вписано.");
      }

      name = interaction.text.split(" ")[2].split("\n")[0];
    };
    
    try {
      if (action === "delete") {
        return interaction.reply(
          "Действие выполнено.\n" + JSON.stringify(
            await Members.deleteOne({ name: name }), undefined, 2
        ));
      };

      const json = {
        socials: [],
        description: "",
        avatar: "",
        meta: "",
        ...JSON.parse(interaction.text.split("\n").splice(1).join(""))
      } as IMember;

      KEYS.forEach(k => {
        if (!(k in json)) throw new Error(`Ключ ${k} не найден в JSON`);
      });

      return interaction.reply("Действие выполнено.\n" + JSON.stringify((
        action === "add"
          ? await Members.create(parser.execute(json))
          : await Members.updateOne({ name: name }, json)
      ), undefined, 2));
    } catch (error) {
      return interaction.reply("Произошла непредвиденная ошибка.\n" + error);
    }
  }
}

export default Command;
