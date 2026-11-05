import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export const translateErrorToPersian = (err: FetchBaseQueryError): string => {
  if (err?.status === "PARSING_ERROR") {
    if (
      err?.data?.includes(
        'update or delete on table "categories" violates foreign key constraint "categories_parent_fkey" on table "categories"',
      )
    ) {
      return "دسته بندی دارای زیر مجموعه است";
    }
    if (
      err?.data?.includes(
        'update or delete on table "categories" violates foreign key constraint "products_category_fkey" on table "products"',
      )
    ) {
      return "برای دسته بندی کالای تعریف شده وجود دارد";
    }
    return err?.data;
  }
  return "error";
};
