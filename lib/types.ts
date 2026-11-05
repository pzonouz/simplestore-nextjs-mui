import type * as z from "zod";
import type {
  categorySchema,
  fileSchema,
  packingTypeSchema,
  productSchema,
  signinSchema,
  signupSchema,
} from "./schemas";
export type MenuItemType = {
  title: string;
  href?: string;
  children?: MenuItemType[];
};

export type Category = z.infer<typeof categorySchema>;
export type FileType = z.infer<typeof fileSchema>;
export type PackingType = z.infer<typeof packingTypeSchema>;
export type Product = z.infer<typeof productSchema>;
export type Signin = z.infer<typeof signinSchema>;
export type Signup = z.infer<typeof signupSchema>;

export type FormType = "CREATE" | "EDIT";
