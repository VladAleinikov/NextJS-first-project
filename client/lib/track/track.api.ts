import { IComment, ITrack } from "@/types/track";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const tracksApi = createApi({
  reducerPath: "tracksApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/" }),
  tagTypes: ["Track", "Tracks"],
  endpoints: (builder) => ({
    fetchTracks: builder.query<ITrack[], string | void>({
      query: (query = "") => ({
        url: "tracks",
        method: "get",
        params: {
          searchQuery: query,
        },
      }),
      providesTags: ["Tracks"],
    }),
    fetchTrack: builder.query<ITrack, string>({
      query: (id) => ({ url: "tracks/" + id, method: "get" }),
      providesTags: ["Track"],
    }),
    addTrack: builder.mutation<ITrack, FormData>({
      query: (formData) => ({
        url: "tracks",
        method: "post",
        body: formData
      }),
      invalidatesTags: ["Tracks"],
    }),
    deleteTrack: builder.mutation<ITrack[], string>({
      query: (id) => ({ url: "tracks/" + id, method: "delete" }),
      invalidatesTags: ["Tracks"],
    }),
    addComment: builder.mutation<
      ITrack,
      { comment: Omit<IComment, "id">; trackId: number }
    >({
      query: ({ comment, trackId }) => ({
        url: "tracks/comment",
        method: "post",
        body: { ...comment, trackId },
        invalidatesTags: ["Track"],
      }),
    }),
  }),
});

export const {
  useFetchTracksQuery,
  useAddTrackMutation,
  useFetchTrackQuery,
  useAddCommentMutation,
  useDeleteTrackMutation,
} = tracksApi;
