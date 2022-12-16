import mongoose from "mongoose";
import { Password } from "../services/password";
// import { Schema, model, connect } from 'mongoose';
const Schema = mongoose.Schema;

// 1. Create an interface representing a document in MongoDB.
interface UserAttrs {
  email: string;
  password: string;
}

// an interface that describes the properties
// that a User Model has

interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

// an interface that describes the properties of that the user document has
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
  // createdAt: string;  //in case we have extra properties
  // updatedAt: string;
}

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    //Json representation of the document
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = await Password.toHash(this.get("password"));
    this.set("password", hashed);
  }
  done();
});
//adding a function to the model in the mongoose
userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };

// const buildUser = (attrs: UserAttrs) => {
//   return new User(attrs);
// };

// buildUser({
//   email: "test@test.com",
//   password: "password",
// });

// User.build({
//   email: "akshayace@gmail.com",
//   password: "password",
// });
// user.email;
// user.password;
