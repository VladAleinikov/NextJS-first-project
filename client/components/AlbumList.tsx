import { IAlbum } from '@/types/album'
import React from 'react'
import AlbumItem from './AlbumItem';

interface AlbumListProps{
      albums: IAlbum[]
}
const AlbumList: React.FC<AlbumListProps> = ({ albums }) => {
      return (
            <ul role="list" className="divide-y divide-gray-100 min-w-[400px]">
                  {albums.map((album) => (
                        <AlbumItem key={album._id} album={album} />
                  ))}
            </ul>
      );
}

export default AlbumList