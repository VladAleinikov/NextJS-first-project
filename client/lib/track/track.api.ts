import { ITrack } from "@/types/track";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const tracksApi = createApi({
      reducerPath: 'tracksApi',
      baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/" }),
      endpoints: (builder) => ({
            fetchTracks: builder.query<ITrack[], void>({
                  query: () => ({
                        url: 'tracks',
                  })
            })
      })
}
)

export const { useFetchTracksQuery} = tracksApi;