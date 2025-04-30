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

const help =
  "Учтите, Вы должны передавать участник в типе JSON на следующей строке.\n"
  + "Например:\n/addMember\n"
  + helpJson;

export const sendHelp = (interaction: IInteraction) => {
  return interaction.reply(help, { entities: [{
    offset: help.length - helpJson.length,
    length: helpJson.length,
    type: "blockquote"
  }]});
}

const parser = new Parser("members");

class Command implements ICommand {
  public readonly name = "addMember";

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
    if (interaction.text.split("\n").length < 2) {
      return sendHelp(interaction);
    }

    try {
      const json = {
        socials: [],
        description: "",
        ...JSON.parse(interaction.text.split("\n").splice(1).join(""))
      } as IMember;

      KEYS.forEach(k => {
        if (!(k in json)) throw new Error(`Ключ ${k} не найден в JSON`);
      });

      const member = await Members.create(parser.execute(json));

      return interaction.reply("Создан новый участник.\n" + JSON.stringify(parser.execute(member), undefined, 2));
    } catch (error) {
      return interaction.reply("Произошла непредвиденная ошибка.\n" + error);
    }
  }
}

export default Command;
