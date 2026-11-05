import * as z from "zod";
import { NameError } from "./contants";
export const categoryCreateSchema = z.object({
  name: z.string({ error: NameError }).min(1, { error: NameError }),
  parent: z.string().nullish(),
  description: z.string().nullish(),
});
export const categorySchema = categoryCreateSchema.extend({
  id: z.string().readonly(),
  parentName: z.string().nullish().readonly(),
  createdAt: z.string().readonly(),
  updatedAt: z.string().readonly(),
});

export const fileCreateSchema = z.object({
  name: z.string({ error: NameError }).min(1, { error: NameError }),
  url: z
    .string({ error: "یک فایل انتخاب کنید" })
    .min(1, { error: "یک فایل انتخاب کنید" }),
});
export const fileSchema = fileCreateSchema.extend({
  id: z.string().readonly(),
  createdAt: z.string().readonly(),
  updatedAt: z.string().readonly(),
});
