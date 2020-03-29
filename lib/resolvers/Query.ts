// @ts-ignore
import { QueryResolvers, QueryUserArgs, QueryUserTodosArgs } from "*.graphqls";
import db from "../../data/config";

export const Query: Required<QueryResolvers> = {
  async users() {
    return db("users");
  },
  async user(_: any, { id }: QueryUserArgs) {
    return await db("users")
      .where({ id })
      .first();
  },
  async todos() {
    return await db("todos as t")
      .join("users as u", "u.id", "t.userId")
      .select("t.id", "t.name", "t.description", "t.createdAt", "u.username");
  },
};
