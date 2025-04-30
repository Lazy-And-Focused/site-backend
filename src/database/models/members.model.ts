import mongoose, { Schema } from "mongoose";
import { IMember } from "types/member.type";

const schema = new Schema<IMember>({
  username: {
    type: mongoose.SchemaTypes.String,
    required: true,
    unique: true
  },

  post: {
    type: mongoose.SchemaTypes.String,
    required: true
  },

  description: {
    type: mongoose.SchemaTypes.String
  },

  links: [{
    type: mongoose.SchemaTypes.String,
  }]
});

const model = mongoose.model("members", schema);

export {
  schema as MembersSchema,
  model as Members
};

export default model;
