import * as z from "zod";
import { NameError } from "./constants";
export const categoryCreateSchema = z.object({
  name: z.string({ error: NameError }).min(1, { error: NameError }),
  parent: z.string().nullish(),
  slug: z.string().nullish(),
  description: z.string().nullish(),
  priority: z.number().nullish(),
});
export const categorySchema = categoryCreateSchema.extend({
  id: z.string().readonly(),
  parentName: z.string().nullish().readonly(),
  createdAt: z.string().readonly(),
  updatedAt: z.string().readonly(),
});

export const parametersGroupCreateSchema = z.object({
  name: z.string({ error: NameError }).min(1, { error: NameError }),
  category: z
    .string({ message: "دسته بندی را وارد کنید" })
    .min(1, { message: "دسته بندی را وارد کنید" }),
});
export const parametersGroupSchema = parametersGroupCreateSchema.extend({
  id: z.string().readonly(),
  categoryName: z.string().nullish().readonly(),
  createdAt: z.string().readonly(),
  updatedAt: z.string().readonly(),
});

export const parameterCreateSchema = z.object({
  name: z.string({ error: NameError }).min(1, { error: NameError }),
  parametersGroup: z
    .string({ message: "گروه بندی را وارد کنید" })
    .min(1, { message: "گروه بندی را وارد کنید" }),
  parameterType: z.enum(["Boolean", "Selectable", "Text"]),
  selectableOptions: z.array(z.string()),
});
export const parameterSchema = parameterCreateSchema.extend({
  id: z.string().readonly(),
  parametersGroupName: z.string().nullish().readonly(),
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

export const productsParametersValueCreateSchema = z.object({
  parameter: z.string().nullish(),
  selectableValues: z.array(z.string()),
  BooleanValue: z.boolean().nullish(),
  TextValue: z.string().nullish(),
});
export const productParameterValueSchema =
  productsParametersValueCreateSchema.extend({
    id: z.string().readonly(),
    createdAt: z.string().readonly(),
    updatedAt: z.string().readonly(),
  });
export const packingTypeSchema = z.enum(["Volume", "Quantity", "Weight"]);
export const productCreateSchema = z.object({
  name: z.string({ error: NameError }).min(1, { error: NameError }),
  price: z.number(),
  count: z.number(),
  slug: z.string().nullish(),
  imageUrl: z.string().nullish(),
  fileIds: z.array(z.string()),
  category: z
    .string({ error: "نام دسته بندی را وارد کنید" })
    .min(1, { error: "نام دسته بندی را وارد کنید" }),
  description: z
    .string({ error: "توضیحات را وارد کنید" })
    .min(1, { error: "توضیحات را وارد کنید" }),
  packingType: packingTypeSchema,
  packingCoefficientTypes: z.array(z.number()),
  productsParametersValues: z.array(productsParametersValueCreateSchema),
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
    password: z
      .string({ error: "پسورد را وارد کنید" })
      .min(1, { error: "پسورد را وارد کنید" }),
    password2: z
      .string({ error: "پسورد را وارد کنید" })
      .min(1, { error: "پسورد را وارد کنید" }),
  })
  .superRefine((_, ctx) => {
    if (ctx.value.password !== ctx.value.password2) {
      ctx.addIssue({
        code: "custom",
        message: "پسوردها مطابقت ندارد",
        path: ["password2"],
      });
    }
  });
