import mongoose, { Schema } from "mongoose";
import { INews } from "types/news.type";

const schema = new Schema<INews>({
  author: {
    type: mongoose.SchemaTypes.String,
    required: true
  },

  date: {
    type: mongoose.SchemaTypes.String,
    required: true
  },

  text: {
    type: mongoose.SchemaTypes.String,
    required: true
  },

  banner: {
    type: mongoose.SchemaTypes.String,
    required: true
  },

  icon: {
    type: mongoose.SchemaTypes.String,
    required: true
  },

  image: {
    type: mongoose.SchemaTypes.String,
    required: true
  }
});

const model = mongoose.model("news", schema);

export {
  schema as NewsSchema,
  model as News
};

export default model;
