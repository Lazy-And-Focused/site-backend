import { Request, Response } from "express";
import Service from "./news.service";

const service = new Service()

class Controller {
  public constructor() {}

  public async get(_req: Request, res: Response) {
    const messages = service.get();
    
    res.send({data: messages});
  }
}

export { Controller };

export default Controller;
