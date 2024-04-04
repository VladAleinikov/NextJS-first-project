import { IComment, ITrack } from "@/types/track";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const tracksApi = createApi({
  reducerPath: "tracksApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/" }),
  tagTypes: ["Track", "Tracks"],
  endpoints: (builder) => ({
    fetchTracks: builder.query<ITrack[], string | void >({
      query: (query = "") => ({
        url: "tracks/search",
        method: "get",
        params: {
          query,
        },
      }),
      providesTags: ["Tracks"],
    }),
    fetchTrack: builder.query<ITrack, string>({
      query: (id) => ({ url: "tracks/" + id, method: "get" }),
      providesTags: ["Track"],
    }),
    addTrack: builder.mutation<ITrack, FormData>({
      query: () => ({
        url: "tracks",
        method: "post",
      }),
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
  useLazyFetchTracksQuery,
  useAddTrackMutation,
    useFetchTrackQuery,
  useAddCommentMutation,
} = tracksApi;
