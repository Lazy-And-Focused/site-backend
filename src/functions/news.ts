const Service = require("../routes/news/news.service");

const service = new Service();

exports.handler = async () => {
  return { data: await service.get(5, 0) };
};