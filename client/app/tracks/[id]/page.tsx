"use client";
import {
  useAddCommentMutation,
  useFetchTrackQuery,
} from "@/lib/tracks/tracks.api";
import React, { useRef } from "react";

const Track = ({ params }: { params: { id: string } }) => {
  const { isLoading, isError, data: track } = useFetchTrackQuery(params.id);
  const [
    addComment,
    {
      isSuccess: isSuccessComment,
      isLoading: isLoadingComment,
      data: trackWithComment,
    },
  ] = useAddCommentMutation();
  const nameRef = useRef<HTMLInputElement>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);

  const addCommentHandler = () => {
    if (nameRef.current && textRef.current && track) {
      addComment({
        comment: {
          username: nameRef.current?.value,
          text: textRef.current?.value,
        },
        trackId: track._id,
      });
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 mt-8">
      {!isLoading && track ? (
        <div className="flex flex-col items-start gap-3">
          <img
            className="h-[400px] w-[400px] "
            src={"http://localhost:5000/" + track.picture}
            alt="preview"
          />
          <div>
            <h1>
              <b>Название трека</b> - {track.name}
            </h1>
            <h1>
              <b>Исполнитель</b> - {track.artist}
            </h1>
            <h1>
              <b>Прослушиваний</b> - {track.listens || 0}
            </h1>
          </div>
          <div>
            <h1>
              <b>Слова в треке</b>
            </h1>
            <p>{track.text}</p>
          </div>
          <div>
            <div className="flex flex-col items-start gap-3">
              <h1>
                <b>Комментарии</b>
              </h1>
              <div className="max-w-md min-w-[400px]">
                <div className="relative">
                  <input
                    type="search"
                    id="default-search"
                    className="block w-full p-4  text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Имя"
                    ref={nameRef}
                  />
                </div>
              </div>
              <div className="max-w-md min-w-[400px]">
                <div className="relative">
                  <textarea
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Комментарий"
                    rows={4}
                    ref={textRef}
                  ></textarea>
                </div>
              </div>{" "}
              <button
                className="text-white bg-blue-700 ease-in-out duration-300 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                onClick={addCommentHandler}
              >
                Отправить комментарий
              </button>
            </div>
          </div>
          <ul>
            {track.comments.map((comment) => (
              <li
                key={comment._id}
                className="border-l-4 border-blue-700 my-2 p-1"
              >
                <div>
                  <b>Автор</b> - {comment.username}
                </div>
                <div>
                  <b>Комментарий</b> - {comment.text}
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        "Загрузка"
      )}
    </div>
  );
};

export default Track;
