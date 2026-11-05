import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Category, FileType } from "../types";
import { env } from "../env";
("../types.ts");

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: env.NEXT_PUBLIC_API_URL }),
  tagTypes: ["categories", "files"],
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
} = api;
