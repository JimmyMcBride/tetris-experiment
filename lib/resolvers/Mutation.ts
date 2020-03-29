import {
  // @ts-ignore
  MutationResolvers,
  // @ts-ignore
  MutationAddTodoArgs,
  // @ts-ignore
  User,
  // @ts-ignore
  Todo,
  // @ts-ignore
  MutationAuthArgs,
  // @ts-ignore
  MutationEditTodoArgs,
  // @ts-ignore
  MutationDeleteTodoArgs,
  // @ts-ignore
  gibberish,
} from "*.graphqls";
import db from "../../data/config";
import jwt from "jsonwebtoken";
import { SignOptions } from "jsonwebtoken";
import bcrypt from "bcryptjs";

interface Payload {
  id: string;
}

// Generate a JSON web token 🌹
function genToken(user: User): string {
  const payload: Payload = {
    id: user.id,
  };

  const secret: string = String(process.env.SECRET);

  const options: SignOptions = {
    expiresIn: "1h",
  };

  return jwt.sign(payload, secret, options);
}

export const Mutation: Required<MutationResolvers> = {
  async addTodo(_: any, { data }: MutationAddTodoArgs): Promise<any> {
    if (data) {
      await db("todos").insert(data);
      const { name } = data;
      console.log(name);
      const todo: Todo = await db("todos")
        .where({ name })
        .first();
      console.log(todo);
      return todo;
    }
  },
  async register(_: any, { data }: MutationAuthArgs) {
    const { username, password } = data;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const user: User = {
      username,
      password: hashedPassword,
    };
    await db("users").insert(user);
    return db("users")
      .where({ username })
      .first();
  },
  async login(_: any, { data }: MutationAuthArgs): Promise<any> {
    const { username, password } = data;
    const user = await db("users")
      .where({ username })
      .first();
    if (bcrypt.compareSync(password, user?.password)) {
      const token = genToken(user);
      console.log(token);
      return { token };
    }
  },
  async editTodo(_: any, { data }: MutationEditTodoArgs) {
    const { id, name, description } = data;
    const args = { name, description };
    await db("todos")
      .where({ id })
      .update(args);
    return await db("todos")
      .where({ id })
      .first();
  },
  async deleteTodo(_: any, { id }: MutationDeleteTodoArgs) {
    await db("todos")
      .where({ id })
      .del();
    const message = "Todo has been deleted 💀";
    return { message };
  },
};
