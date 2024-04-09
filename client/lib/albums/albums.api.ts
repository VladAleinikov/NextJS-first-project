import { IAlbum } from "@/types/album";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import queryString from "query-string";

export const albumApi = createApi({
  reducerPath: "albumApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/albums",
    paramsSerializer: (params: Record<string, unknown>) =>
      queryString.stringify(params, { arrayFormat: "none" }),
  }),
  tagTypes: ["Albums"],
  endpoints: (builder) => ({
    fetchAlbums: builder.query<IAlbum[], string>({
      query: (searchQuery = "") => ({
        url: "/",
        method: "get",
        params: {
          searchQuery: searchQuery,
        },
      }),
      providesTags: ["Albums"],
    }),
    fetchAlbum: builder.query<IAlbum, string>({
      query: (id) => ({
        url: "/" + id,
        method: "get",
      }),
      providesTags: ["Albums"],
    }),
    fetchAlbumsById: builder.query<IAlbum[], string[]>({
      query: (albumIds) => ({
        url: "/",
        method: "get",
        params: {
          albumIds: albumIds,
        },
      }),
    }),
    createAlbum: builder.mutation<IAlbum, FormData>({
      query: (formData) => ({
        url: "/",
        method: "post",
        body: formData,
      }),
      invalidatesTags: ["Albums"],
    }),
    deleteAlbum: builder.mutation<IAlbum, string>({
      query: (id) => ({
        url: "/" + id,
        method: "delete",
      }),
      invalidatesTags: ["Albums"],
    }),
    addTrack: builder.mutation<IAlbum, { id: string; trackId: string }>({
      query: ({ id, trackId }) => ({
        url: "/" + id,
        method: "put",
        body: {trackId: trackId},
      }),
    }),
  }),
});

export const {
      useFetchAlbumsQuery,
      useFetchAlbumQuery,
      useFetchAlbumsByIdQuery,
      useCreateAlbumMutation,
      useDeleteAlbumMutation,
      useAddTrackMutation,
} = albumApi;