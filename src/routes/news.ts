import { env } from "../utils/env";

import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";

import Api from "services/telegram.api";

const handler: Handler = async () => {
  const data = await new Api().getMessages(env.get("TELEGRAM_NEWS_CHANNEL_ID"), 0, 10);

  return {
    statusCode: 200,
    body: JSON.stringify(data)
  };
};

export { handler };
