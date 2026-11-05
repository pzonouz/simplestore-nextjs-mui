import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { env } from "../env";
import type { Category, FileType, Product, Signin } from "../types";

("../types.ts");

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: env.NEXT_PUBLIC_API_URL,
    credentials: "include",
  }),
  tagTypes: ["categories", "files", "products"],
  endpoints: (builder) => ({
    getCategories: builder.query<Category[], void>({
      query: () => `categories`,
      providesTags: ["categories"],
    }),
    getCategory: builder.query<Category, string>({
      query: (id) => `categories/${id}`,
      providesTags: ["categories"],
    }),
    createCategory: builder.mutation<void, Partial<Category>>({
      query(body) {
        return {
          url: `categories`,
          method: "POST",
          body: body,
        };
      },
      invalidatesTags: ["categories"],
    }),
    editCategory: builder.mutation<void, Partial<Category>>({
      query(body) {
        return {
          url: `categories/${body.id}`,
          method: "PATCH",
          body: body,
        };
      },
      invalidatesTags: ["categories"],
    }),
    deleteCategory: builder.mutation<void, string>({
      query(id) {
        return {
          url: `categories/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["categories"],
    }),
    getFiles: builder.query<FileType[], void>({
      query: () => `files`,
      providesTags: ["files"],
    }),
    getFile: builder.query<FileType, string>({
      query: (id) => `files/${id}`,
      providesTags: ["files"],
    }),
    createFile: builder.mutation<void, Partial<FileType>>({
      query(body) {
        return {
          url: `files`,
          method: "POST",
          body: body,
        };
      },
      invalidatesTags: ["files"],
    }),
    editFile: builder.mutation<void, Partial<FileType>>({
      query(body) {
        return {
          url: `files/${body.id}`,
          method: "PATCH",
          body: body,
        };
      },
      invalidatesTags: ["files"],
    }),
    deleteFile: builder.mutation<void, string>({
      query(id) {
        return {
          url: `files/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["files"],
    }),
    uploadFile: builder.mutation<{ url: string }, FormData>({
      query(body) {
        return {
          url: `files/upload`,
          method: "POST",
          body: body,
        };
      },
      invalidatesTags: ["files"],
    }),
    getProducts: builder.query<Product[], void>({
      query: () => `products`,
      providesTags: ["products"],
    }),
    getProduct: builder.query<Product, string>({
      query: (id) => `products/${id}`,
      providesTags: ["products"],
    }),
    createProduct: builder.mutation<void, Partial<Product>>({
      query(body) {
        return {
          url: `products`,
          method: "POST",
          body: body,
        };
      },
      invalidatesTags: ["products"],
    }),
    editProduct: builder.mutation<void, Partial<Product>>({
      query(body) {
        return {
          url: `products/${body.id}`,
          method: "PATCH",
          body: body,
        };
      },
      invalidatesTags: ["products"],
    }),
    deleteProduct: builder.mutation<void, string>({
      query(id) {
        return {
          url: `products/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["products"],
    }),
    signin: builder.mutation<void, Partial<Signin>>({
      query(body) {
        return {
          url: `auth/login`,
          method: "POST",
          body: body,
        };
      },
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useEditCategoryMutation,
  useGetCategoryQuery,
  useGetFilesQuery,
  useGetFileQuery,
  useCreateFileMutation,
  useEditFileMutation,
  useUploadFileMutation,
  useDeleteFileMutation,
  useGetProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
  useEditProductMutation,
  useGetProductQuery,
  useSigninMutation,
} = api;
