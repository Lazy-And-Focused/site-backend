import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";

import { Service } from "../routes/news/news.service";

const handler: Handler = async () => {
  const data = await new Service().get(5, 0);

  return {
    statusCode: 200,
    body: JSON.stringify(data)
  };
};

export { handler };
