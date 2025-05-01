import mongoose, { Schema } from "mongoose";
import { IProject } from "types/project.type";

import { MembersSchema } from "./members.model";

const schema = new Schema<IProject>({
  name: {
    type: mongoose.SchemaTypes.String,
    required: true,
    unique: true
  },

  author: {
    type: MembersSchema,
    required: true
  },

  contributors: [{
    type: MembersSchema
  }],

  description: {
    type: mongoose.SchemaTypes.String
  },

  urls: [{
    type: {
      name: mongoose.SchemaTypes.String,
      href: mongoose.SchemaTypes.String,
    }
  }],

  cover: {
    type: mongoose.SchemaTypes.String,
    required: false
  },

  icon_url: {
    type: mongoose.SchemaTypes.String,
    required: false
  }
});

const model = mongoose.model("projects", schema);

export {
  schema as ProjectsSchema,
  model as Projects
};

export default model;
