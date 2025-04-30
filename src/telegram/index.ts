import Client from "./bot";

import Deployer from "./deployer";

import { ICommand } from "./types/command.type";
import { IListener } from "./types/listener.type";

const commands = new Deployer<ICommand>({
  datasPath: [__dirname, "commands"],
  type: "commands"
}).execute();

const listeners = new Deployer<IListener>({
  datasPath: [__dirname, "listeners"],
  type: "listeners"
}).execute();

const client = new Client({
  commands: Object.fromEntries(commands.datas.entries()),
  listeners: Object.fromEntries(listeners.datas.entries())
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