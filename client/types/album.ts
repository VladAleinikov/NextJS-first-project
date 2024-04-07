import { ITrack } from "./track";

export interface IAlbum {
      _id: string,
      name: string,
      description: string,
      picture: string,
      tracks: ITrack[]
}