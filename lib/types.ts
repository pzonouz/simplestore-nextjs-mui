import type * as z from "zod";
import type {
  categorySchema,
  fileSchema,
  packingTypeSchema,
  parameterSchema,
  parametersGroupSchema,
  productParameterValueCreateSchema,
  productParameterValueSchema,
  productSchema,
  signinSchema,
  signupSchema,
} from "./schemas";
export type MenuItemType = {
  id: string;
  name: string;
  slug?: string;
  root?: boolean;
  children?: MenuItemType[];
};

export type Category = z.infer<typeof categorySchema>;
export type ParametersGroup = z.infer<typeof parametersGroupSchema>;
export type Parameter = z.infer<typeof parameterSchema>;
export type ProductParameterValue = z.infer<typeof productParameterValueSchema>;
export type ProductParameterValueCreate = z.infer<
  typeof productParameterValueCreateSchema
>;
export type FileType = z.infer<typeof fileSchema>;
export type PackingType = z.infer<typeof packingTypeSchema>;
export type Product = z.infer<typeof productSchema>;
export type Signin = z.infer<typeof signinSchema>;
export type Signup = z.infer<typeof signupSchema>;

export type FormType = "CREATE" | "EDIT";

export type productSearchResult = {
  _source: { id: string; name: string; image_url: string; slug: string };
};
export type ParameterType = "Boolean" | "Selectable" | "Text";
