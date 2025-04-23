import Api from "services/telegram.api";

import Env from "env";

const channelId = new Env().get("TELEGRAM_NEWS_CHANNEL_ID")
const api = new Api();

class Service {
  public constructor() {}

  public get(length: number, offset: number) {
    return api.getMessages(channelId, offset, length);
  }
}

export { Service };

export default Service;
