import { IComment, ITrack } from "@/types/track";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const tracksApi = createApi({
  reducerPath: "tracksApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/tracks" }),
  tagTypes: ["Track", "Tracks"],
  endpoints: (builder) => ({
    fetchTracks: builder.query<ITrack[], string>({
      query: (query = "") => ({
        url: "/",
        method: "get",
        params: {
          searchQuery: query,
        },
      }),
      providesTags: ["Tracks"],
    }),
    fetchTrack: builder.query<ITrack, string>({
      query: (id) => ({ url: "/" + id, method: "get" }),
      providesTags: ["Track"],
    }),
    addTrack: builder.mutation<ITrack, FormData>({
      query: (formData) => ({
        url: "/",
        method: "post",
        body: formData,
      }),
      invalidatesTags: ["Tracks"],
    }),
    deleteTrack: builder.mutation<ITrack[], string>({
      query: (id) => ({ url: "/" + id, method: "delete" }),
      invalidatesTags: ["Tracks"],
    }),
    addComment: builder.mutation<
      ITrack,
      { comment: Omit<IComment, "_id">; trackId: string }
    >({
      query: ({ comment, trackId }) => ({
        url: "/comment",
        method: "post",
        body: { ...comment, trackId },
        invalidatesTags: ["Track"],
      }),
    }),
    addListen: builder.query<ITrack, string>({
      query: (id) => ({
        url: "/listen/" + id,
        method: "put"
      }),
    }),
  }),
});

export const {
  useFetchTracksQuery,
  useLazyFetchTracksQuery,
  useAddTrackMutation,
  useFetchTrackQuery,
  useAddCommentMutation,
  useDeleteTrackMutation,
  useLazyAddListenQuery,
} = tracksApi;
