import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { env } from "../env";
import type {
  Category,
  FileType,
  MenuItemType,
  Parameter,
  ParametersGroup,
  Product,
  productSearchResult,
  Signin,
  Signup,
} from "../types";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: env.NEXT_PUBLIC_API_URL,
    credentials: "include",
  }),
  tagTypes: [
    "categories",
    "files",
    "products",
    "parametersGroups",
    "parameters",
  ],
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
    searchProducts: builder.query<productSearchResult[], string>({
      query: (search) => `/search?q=${search}`,
      providesTags: ["products"],
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
    signup: builder.mutation<void, Partial<Signup>>({
      query(body) {
        return {
          url: `auth/register`,
          method: "POST",
          body: body,
        };
      },
    }),
    getCategoriesTree: builder.query<MenuItemType[], void>({
      query: () => `categories/parent_categories`,
    }),
    getSubCategories: builder.query<Category[], string>({
      query: (slug) => `categories/sub_categories/${slug}`,
      providesTags: ["categories"],
    }),

    getProductsByCategorySlug: builder.query<Product[], string>({
      query: (slug) => `products/category_products/by_slug/${slug}`,
      providesTags: ["categories", "products"],
    }),
    getProductsByCategoriesSlugs: builder.query<Product[], string[]>({
      query: (slugs) => {
        const params = new URLSearchParams();
        slugs?.forEach((slug) => {
          params.append("slug", slug);
        });
        return `products/categories_products/by_slugs?${params}`;
      },
      providesTags: ["products"],
    }),

    getParametersGroups: builder.query<ParametersGroup[], void>({
      query: () => `parameters_groups`,
      providesTags: ["parametersGroups"],
    }),
    getParametersGroup: builder.query<ParametersGroup, string>({
      query: (id) => `parameters_groups/${id}`,
      providesTags: ["parametersGroups"],
    }),
    createParametersGroup: builder.mutation<void, Partial<ParametersGroup>>({
      query(body) {
        return {
          url: `parameters_groups`,
          method: "POST",
          body: body,
        };
      },
      invalidatesTags: ["parametersGroups"],
    }),
    editParametersGroup: builder.mutation<void, Partial<ParametersGroup>>({
      query(body) {
        return {
          url: `parameters_groups/${body.id}`,
          method: "PATCH",
          body: body,
        };
      },
      invalidatesTags: ["parametersGroups"],
    }),
    deleteParamatersGroup: builder.mutation<void, string>({
      query(id) {
        return {
          url: `parameters_groups/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["parametersGroups"],
    }),
    getParametersGroupsByCategoryAncestors: builder.query<
      ParametersGroup[],
      string
    >({
      query: (id) => `parameters_groups/by_category_ancestors/${id}`,
      providesTags: ["parametersGroups"],
    }),
    getParameters: builder.query<Parameter[], void>({
      query: () => `parameters`,
      providesTags: ["parameters"],
    }),
    getParameter: builder.query<Parameter, string>({
      query: (id) => `parameters/${id}`,
      providesTags: ["parameters"],
    }),
    getParametersByGroup: builder.query<Parameter[], string>({
      query: (id) => `parameters/by_group/${id}`,
      providesTags: ["parameters"],
    }),
    createParameter: builder.mutation<void, Partial<Parameter>>({
      query(body) {
        return {
          url: `parameters`,
          method: "POST",
          body: body,
        };
      },
      invalidatesTags: ["parameters"],
    }),
    editParameter: builder.mutation<void, Partial<Parameter>>({
      query(body) {
        return {
          url: `parameters/${body.id}`,
          method: "PATCH",
          body: body,
        };
      },
      invalidatesTags: ["parameters"],
    }),
    deleteParamater: builder.mutation<void, string>({
      query(id) {
        return {
          url: `parameters/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["parameters"],
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
  useSearchProductsQuery,

  useSigninMutation,
  useSignupMutation,

  useGetCategoriesTreeQuery,
  useGetSubCategoriesQuery,

  useGetProductsByCategorySlugQuery,
  useGetProductsByCategoriesSlugsQuery,

  useGetParametersGroupsQuery,
  useCreateParametersGroupMutation,
  useDeleteParamatersGroupMutation,
  useEditParametersGroupMutation,
  useGetParametersGroupQuery,
  useGetParametersGroupsByCategoryAncestorsQuery,

  useGetParametersQuery,
  useGetParametersByGroupQuery,
  useCreateParameterMutation,
  useDeleteParamaterMutation,
  useEditParameterMutation,
  useGetParameterQuery,
} = api;
