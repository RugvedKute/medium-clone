import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, sign, verify } from "hono/jwt";
import {
  createPostInput,
  updatePostInput,
} from "../../node_modules/@rugvedkute/common/dist/index";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    SECRET_KEY: string;
  };
}>();

blogRouter.use("*", async (c, next) => {
  const jwt = await c.req.header("Authorization");
  if (!jwt) {
    c.status(401);
    return c.json({ error: "unauthorized" });
  }
  console.log(jwt);
  const token = jwt.split(" ")[1];

  const payload = await verify(token, c.env.SECRET_KEY);
  if (!payload) {
    c.status(401);
    return c.json({ error: "unauthorized" });
  }

  console.log(payload);
  c.set("userId", payload.id);
  await next();
});

blogRouter.post("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const userId = c.get("userId");

  const safeParseInput = createPostInput.safeParse(body);

  if (!safeParseInput.success) {
    c.status(400);
    return c.json({
      error: "Error while passing inputs",
    });
  }
  try {
    await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: userId,
      },
    });
    c.status(200);
    return c.json({ message: "The blog has been created!" });
  } catch (err) {
    console.error(err);
    c.status(500);
    return c.json({ error: "Cannot create a new blog" });
  }
});

blogRouter.get("/all", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const posts = await prisma.post.findMany({
      select: {
        id: true,
        title: true,
        content: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });

    return c.json({ posts });
  } catch (err) {
    console.error(err);
    c.status(500);
    return c.json({ error: "Can not fetch all the blogs" });
  }
});

blogRouter.get("/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  const blogId = await c.req.param("id");

  try {
    const blog = await prisma.post.findUnique({
      where: { id: blogId },
      select: {
        id: true,
        content: true,
        title: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });
    c.status(200);
    return c.json({
      blog,
    });
  } catch (err) {
    console.error(err);
    c.status(500);
    return c.json({ message: "Failed to get blog by id." });
  }
});

blogRouter.put("/", async (c) => {
  const userId = c.get("userId");
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const safeParseInput = updatePostInput.safeParse(body);

  if (!safeParseInput.success) {
    c.status(400);
    return c.json({
      error: "Error while passing inputs",
    });
  }
  try {
    await prisma.post.update({
      where: {
        id: body.id,
        authorId: userId,
      },
      data: {
        title: body.title,
        content: body.content,
      },
    });

    return c.json({
      message: "The post has been updated!",
    });
  } catch (err) {
    console.error(err);
    c.status(500);
    return c.json({
      error: "Cannot update the blog",
    });
  }
});
