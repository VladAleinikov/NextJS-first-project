import { IAlbum } from '@/types/album'
import React from 'react'

interface AlbumItemProps{
      album: IAlbum
}
const AlbumItem: React.FC<AlbumItemProps> = ({album}) => {
  return (
    <div>AlbumItem</div>
  )
}

export default AlbumItem