import { Request, Response } from "express";
import QueryService from "services/queries.service";

import Service from "./news.service";
import { QUERY } from "./news.routes";

const getQuery = new QueryService(QUERY["GET"]);
const service = new Service();

class Controller {
  public constructor() {}

  public async get(req: Request, res: Response) {
    const query = getQuery.parse(req.query, { length: "5", offset: "0 "});

    const messages = service.get();
    
    res.send({data: messages});
  }
}

export { Controller };

export default Controller;
