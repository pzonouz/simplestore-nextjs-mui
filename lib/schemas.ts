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

export const packingTypeSchema = z.enum(["Volume", "Quantity", "Weight"]);
export const productCreateSchema = z.object({
  name: z.string({ error: NameError }).min(1, { error: NameError }),
  price: z.number(),
  count: z.number(),
  imageurl: z.string().nullish(),
  category: z
    .string({ error: "نام دسته بندی را وارد کنید" })
    .min(1, { error: "نام دسته بندی را وارد کنید" }),
  description: z.string().nullish(),
  packingType: packingTypeSchema,
  packingCoefficientTypes: z.array(z.number()),
});
export const productSchema = productCreateSchema.extend({
  id: z.string().readonly(),
  categoryName: z.string().nullish().readonly(),
  createdAt: z.string().readonly(),
  updatedAt: z.string().readonly(),
});
export const signinSchema = z.object({
  email: z
    .string({ error: "ایمیل را وارد کنید" })
    .min(1, { error: "ایمیل را وارد کنید" })
    .pipe(z.email({ error: "ایمیل معتبر نیست" })),
  password: z
    .string({ error: "پسورد را وارد کنید" })
    .min(1, { error: "پسورد را وارد کنید" }),
});
export const signupSchema = z
  .object({
    email: z
      .string({ error: "ایمیل را وارد کنید" })
      .min(1, { error: "ایمیل را وارد کنید" })
      .pipe(z.email({ error: "ایمیل معتبر نیست" })),
    papssword: z
      .string({ error: "پسورد را وارد کنید" })
      .min(1, { error: "پسورد را وارد کنید" }),
    papssword2: z
      .string({ error: "پسورد را وارد کنید" })
      .min(1, { error: "پسورد را وارد کنید" }),
  })
  .superRefine((ctx, values) => {
    console.log("ctx", ctx), console.log("values", values);
  });
