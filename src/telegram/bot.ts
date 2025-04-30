import Env from "env";

import { Telegraf } from "telegraf";
import { IDeployJson } from "./types/deploy-data.type";

const token = new Env().get("TELEGRAM_BOT_TOKEN");

class Client {
  public readonly bot: Telegraf;
  
  private initialized = false;
  private listenersInitialized = false;

  public constructor(public readonly data: IDeployJson) {
    this.bot = new Telegraf(token);
  };

  public writeCommands() {
    Object.values(this.data.commands).forEach(command => {
      console.log(`Loaded command: ${command.name}`);
    });
  }

  public launchListeners() {
    if (this.listenersInitialized) throw new Error("The listeners has initialized early.");
    this.listenersInitialized = true;

    Object.values(this.data.listeners).forEach((listener) => {
      console.log(`Loading "${listener.name}" listener on: ${listener.on}`);
      this.bot.on(listener.on, listener.execute);
    });
  }

  public callbackExecute<Data extends any[], Result extends any>(callback: (...data: Data) => Result) {
    if (this.initialized) throw new Error("The bot has initialized early.");
    this.initialized = true;

    return this.bot.launch(callback);
  }

  public async execute() {
    if (this.initialized) throw new Error("The bot has initialized early.");
    this.initialized = true;

    return await this.bot.launch(() => console.log("Telegram bot online!"));
  }
}

export default Client;
