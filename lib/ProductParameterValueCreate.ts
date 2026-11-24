import type * as z from "zod";
import type { productsParametersValueCreateSchema } from "./schemas";

export type ProductParameterValueCreate = z.infer<
  typeof productsParametersValueCreateSchema
>;
