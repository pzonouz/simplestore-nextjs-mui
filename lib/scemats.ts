import * as z from "zod";
import { NameError } from "./contants";
export const catagoryCreateSchema = z.object({
  name: z.string({ error: NameError }).min(1, { error: NameError }),
  parent: z.string().nullish(),
  description: z.string().nullish(),
});
export const catagorySchema = catagoryCreateSchema.extend({
  id: z.string().readonly(),
  parentName: z.string().nullish().readonly(),
  createdAt: z.string().readonly(),
});
