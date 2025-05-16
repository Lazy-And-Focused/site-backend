import Client from "./bot";

import Deployer, { datas } from "./deployer";

import { ICommand } from "./types/command.type";
import { IListener } from "./types/listener.type";

import { join, resolve } from "path";

console.log(__dirname, __filename);
const DIR_NAME = resolve(join("./", `${process.env.NODE_ENV === "dev" ? "src" : "dist/src"}/telegram`));

const commands = new Deployer<ICommand>({
  datasPath: [DIR_NAME, "commands"],
  type: "commands"
}).execute();

const listeners = new Deployer<IListener>({
  datasPath: [DIR_NAME, "listeners"],
  type: "listeners"
}).execute();

const client = new Client({
  commands: Object.fromEntries(commands.datas.entries()),
  listeners: Object.fromEntries(listeners.datas.entries()),
  help: Object.fromEntries(datas.help.entries())
});

let started = false;

const start = () => {
  if (started) return client;

  client.launchListeners();
  client.writeCommands();
  client.execute();

  started = true;

  return client;
};

export {
  commands, listeners, client,
  start
};

export default client;