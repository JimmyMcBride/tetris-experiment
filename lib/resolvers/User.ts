// @ts-ignore
import { Maybe, Todo, UserResolvers, User as Parent } from "*.graphqls";
import db from "../../data/config";

export const User: Required<UserResolvers> = {
  async id(user: Parent) {
    return String(user.id);
  },
  async username(user: Parent) {
    console.log(user);
    return String(user.username);
  },
  async password(user: Parent) {
    console.log(user);
    return String(user.password);
  },
  async todos(user: Parent): Promise<Array<Maybe<Todo>>> {
    const userId = user.id;
    return await db("todos").where({ userId });
  },
  async __isTypeOf() {
    return true;
  },
};
