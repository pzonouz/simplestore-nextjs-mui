import * as z from "zod";
import { catagorySchema } from "./scemats";
export type MenuItemType = {
  title: string;
  href?: string;
  children?: MenuItemType[];
};

export type Category = z.infer<typeof catagorySchema>;
