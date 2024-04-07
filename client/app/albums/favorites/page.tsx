import { useFetchAlbumsByIdQuery } from '@/lib/albums/albums.api'
import { useAppSelector } from '@/lib/hooks'
import React from 'react'

const FavoritesAlbums = () => {
      const { albumIds } = useAppSelector(state => state.album);
      const { isLoading, isError, data: albums } = useFetchAlbumsByIdQuery(albumIds);
      return (
            <div>FavoritesAlbums</div>
      )
}

export default FavoritesAlbums