import Members from "models/members.model";
import Parser from "database/parse";

const parser = new Parser("members");

class Service {
  public constructor() {}

  public async getAll() {
    return (await Members.find()).map(m => parser.execute(m));
  }

  public getOne(username: string) {
    return Members.findOne({username: username});
  }
}

export { Service };

export default Service;
