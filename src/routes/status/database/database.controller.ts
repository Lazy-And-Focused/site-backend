import { Request, Response } from "express";
import Service from "./database.service";

const service = new Service()

class Controller {
  public constructor() {};

  public async get(_req: Request, res: Response) {
    const status = service.get();

    res.send({data: { status }});
  }
};

export { Controller };

export default Controller;
