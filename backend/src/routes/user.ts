import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, sign, verify } from "hono/jwt";
import {
  SignupInput,
  SigninInput,
} from "../../node_modules/@rugvedkute/common/dist/index";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    SECRET_KEY: string;
  };
}>();

userRouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const safeParseInput = SignupInput.safeParse(body);

  if (!safeParseInput.success) {
    c.status(400);
    return c.json({
      error: "Error in passing inputs",
    });
  }
  try {
    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: body.password,
      },
    });
    const jwt = await sign({ id: user.id }, c.env.SECRET_KEY);
    return c.json({ jwt });
  } catch (e) {
    console.error(e);
    c.status(403);
    return c.json({ error: "error while signing up" });
  }
});

userRouter.get("/allUsers", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const users = await prisma.user.findMany();
    return c.json(users);
  } catch (err) {
    c.status(500).send("Server Error");
  }
});

userRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const safeParseInput = SigninInput.safeParse(body);

  if (!safeParseInput.success) {
    c.status(400);
    return c.json({
      error: "Error in passing inputs",
    });
  }
  try {
    const user = await prisma.user.findFirst({
      where: { email: body.email, password: body.password },
    });

    if (!user) {
      c.status(404);
      return c.json({ error: "User does not exist" });
    }

    const jwt = await sign({ id: user.id }, c.env.SECRET_KEY);
    return c.json({ jwt });
  } catch (e) {
    console.error(e);
    c.status(403);
    return c.json({ message: "Error while logging in." });
  }
});
