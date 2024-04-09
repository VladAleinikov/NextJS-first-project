"use client"
import TrackItem from '@/components/TrackItem'
import TrackList from '@/components/TrackList'
import { useDebounce } from '@/hooks/debounce'
import { useAddTrackMutation, useFetchAlbumQuery } from '@/lib/albums/albums.api'
import { useAppSelector } from '@/lib/hooks'
import { useFetchTracksQuery, useLazyFetchTracksQuery } from '@/lib/tracks/tracks.api'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Album = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const [search, setSearch] = useState<string>("");
  const [dropdown, setDropdown] = useState<boolean>(false)
  const debounced = useDebounce(search);
  const [addTrack, { isLoading, isError }] = useAddTrackMutation()
  const { isLoading: isLoadingAlbum, isSuccess: isSuccessAlbum, data: album } = useFetchAlbumQuery(params.id)
  const { isLoading: isLoadingTracks, isError: isErrorTracks, data: tracks } = useFetchTracksQuery(debounced, {
    skip: debounced.length < 3,
    refetchOnFocus: true
  });

  const addTrackToAlbum = (trackId: string) => {
    if (isSuccessAlbum && album.tracks.filter(track => track._id !== trackId).length) {
      addTrack({ id: album?._id, trackId: trackId });
    }
  }
  useEffect(() => {
    setDropdown(debounced.length >= 3 && tracks?.length! > 0);
  }, [debounced, tracks]);
  return (
    <div>
      <div className="relative w-[560px]">
        <input
          type="text"
          className="border py-2 px-4 w-full h-[42px] mb-2"
          placeholder="Search for GitHub username..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {dropdown && (
          <ul className="llist-none absolute top-[42px] left-0 right-0 max-h-[200px] overflow-y-scroll shadow-md bg-white">
            {isLoading && <p className="text-center">Loading...</p>}
            {tracks?.map((track) => (
              <li
                key={track.id}
                onClick={() => addTrackToAlbum(track._id)}
                className="py-2 px-4 hover:bg-gray-500 hover:text-white transition-colors cursor-pointer"
              >
                <div className="flex gap-x-4 w-full p-2 rounded-lg ease-in-out duration-300 hover:ring-slate-300 dark:bg-slate-800 dark:highlight-white/5 dark:hover:bg-slate-700">
                  <img
                    className="h-12 w-12 flex-none rounded-full bg-gray-50"
                    src={"http://localhost:5000/" + track.picture}
                    alt="preview"
                  />
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 dark:text-slate-200">
                      {track.name}
                    </p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                      {track.artist}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      {!isLoading && album ? <TrackList tracks={album?.tracks} /> : "Загрузка"}
    </div>
  );
}

export default Album