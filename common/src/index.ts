import { z } from "zod";

export const SignupInput = z.object({
  email: z.string().email(),
  name: z.string().optional(),
  password: z.string(),
});

export type SignupType = z.infer<typeof SignupInput>;

export const SigninInput = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type SigninType = z.infer<typeof SigninInput>;

export const createPostInput = z.object({
  title: z.string(),
  content: z.string(),
});

export type CreatePostType = z.infer<typeof createPostInput>;

export const updatePostInput = z.object({
  title: z.string().optional(),
  content: z.string().optional(),
});

export type UpdatePostType = z.infer<typeof updatePostInput>;
