import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId, Types } from "mongoose";
import { Album, AlbumDocument } from 'src/album/schemas/album.schema';
import { Track, TrackDocument } from "src/track/schemas/track.schema";
import { FileService, FileType } from 'src/file/file.service';
import { CreateAlbumDto } from "./dto/create-album.dto";

@Injectable()
export class AlbumService {
      constructor(
            @InjectModel(Album.name) private albumModel: Model<AlbumDocument>,
            @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
            private FileService: FileService
      ) { }

      async create(dto: CreateAlbumDto, picture): Promise<Album> {
            const pictureoPath = this.FileService.createFile(FileType.IMAGE, picture);
            const album = await this.albumModel.create({
                  ...dto,
                  picture: pictureoPath
            });
            return album;
      }
      async search(searchQuery = '', count = 10, page = 0): Promise<Album[]> {
            const albums = await this.albumModel
                  .find({
                        name: { $regex: new RegExp(searchQuery, 'i') }
                  })
                  .skip(page * count)
                  .limit(count);
            return albums;
      }
      async getOne(id: ObjectId): Promise<Album>{
            const album = (await this.albumModel.findById(id)).populate('tracks')
            return album;
      }
      async delete(id: ObjectId): Promise<Types.ObjectId>{
            const album = await this.albumModel.findByIdAndDelete(id);
            return album.id;
      }
      async addTrack(id: ObjectId, trackId: ObjectId): Promise<Album>{
            const album = await this.albumModel.findById(id);
            const track = await this.trackModel.findById(trackId);
            album.tracks.push(track.id);
            track.albums.push(album.id);
            await album.save();
            await track.save();
            return album;
      }
}