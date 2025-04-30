import { Request, Response } from "express";
import Service from "./service";

const service = new Service()

class Controller {
  public constructor() {}

  public async getAll(_req: Request, res: Response) {
    const members = await service.getAll();
    
    res.send({data: members});
  }

  public async getOne(req: Request, res: Response) {
    const username = req.params.username;

    if (!username) {
      res.status(400).send({data: {}, error: `params not found`})
      return;
    }

    const member = await service.getOne(username);

    res.send({data: member});
  }
}

export { Controller };

export default Controller;
