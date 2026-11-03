import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Category } from "../types";
import { env } from "../env";
("../types.ts");

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: env.NEXT_PUBLIC_API_URL }),
  tagTypes: ["categories"],
  endpoints: (builder) => ({
    getCategories: builder.query<Category[], void>({
      query: () => `categories`,
      providesTags: ["categories"],
    }),
    createCategory: builder.mutation<Category, Partial<Category>>({
      query(body) {
        return {
          url: `categories`,
          method: "POST",
          body: body,
        };
      },
      invalidatesTags: ["categories"],
    }),
  }),
});

export const { useGetCategoriesQuery, useCreateCategoryMutation } = api;
