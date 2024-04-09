import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Album, AlbumSchema } from "./schemas/album.schema";
import { AlbumController } from "./album.controller";
import { AlbumService } from "./album.service";
import { FileService } from "src/file/file.service";
import { Track } from "src/track/schemas/track.schema";

@Module({
      imports: [
            MongooseModule.forFeature([{name: Album.name, schema: AlbumSchema}]),
            MongooseModule.forFeature([{name: Track.name, schema: AlbumSchema}])
      ],
      controllers: [AlbumController],
      providers: [AlbumService, FileService]
 })
export class AlbumModule{}