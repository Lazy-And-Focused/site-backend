import Env from "env";

import { Update } from "telegraf/typings/core/types/typegram";

const env = new Env();

class Api {
  private readonly api_url = "https://api.telegram.org/bot" + env.get("TELEGRAM_BOT_TOKEN");

  public constructor() {};

  public async getMessages(chatId: string, offset: number, limit: number) {
    const url = `${this.api_url}/getUpdates`;

    const data = ((await (await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })).json()).result as Update[]).filter((m: any) => `${m?.channel_post?.chat?.id}` === chatId).sort((m1: any, m2: any) => m1.date - m2.date);

    return data.splice(offset, limit);
  }
}

export default Api;
