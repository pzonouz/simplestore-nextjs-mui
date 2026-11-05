import * as z from "zod";
import { categorySchema, fileSchema } from "./schemas";
export type MenuItemType = {
  title: string;
  href?: string;
  children?: MenuItemType[];
};

export type Category = z.infer<typeof categorySchema>;
export type FileType = z.infer<typeof fileSchema>;

export type FormType = "CREATE" | "EDIT";
