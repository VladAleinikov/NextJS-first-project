import { useDebounce } from '@/hooks/debounce';
import { useFetchAlbumsQuery } from '@/lib/albums/albums.api'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

const Albums = () => {
  const router = useRouter();
  const [search, setSearch] = useState<string>("");
  const debounced = useDebounce(search);
  const { isLoading, isError, data: albums } = useFetchAlbumsQuery(debounced);
  
  
  return (
    <div className="flex flex-col items-center gap-4 mt-8">
      <div className="flex flex-col items-center gap-3">
        <h1 className="text-slate-900 font-extrabold text-4xl tracking-tight text-center dark:text-white">
          Список альбомов
        </h1>
        <button
          className="text-white bg-blue-700 ease-in-out duration-300 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          onClick={() => router.push("/albums/create")}
        >
          Добавить альбом
        </button>
      </div>
      </div>
  )
}

export default Albums