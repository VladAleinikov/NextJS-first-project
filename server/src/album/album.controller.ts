import { Body, Controller, Delete, Get, Param, Post, Put, Query, UploadedFile, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { AlbumService } from './album.service';
import { ObjectId } from "mongoose";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { CreateAlbumDto } from './dto/create-album.dto';

@Controller('/albums')
export class AlbumController {
      constructor(private AlbumService: AlbumService) { }

      @Get(':id')
      getOne(@Param('id') id: ObjectId) {
            return this.AlbumService.getOne(id);
      }

      @Get()
      search(
            @Query('searchQuery') searchQuery: string,
            @Query('count') count: number,
            @Query('page') page: number,
      ) {
            return this.AlbumService.search(searchQuery, count, page)
      }

      @Post()
      @UseInterceptors(
            FileFieldsInterceptor(
                  [{ name: 'picture', maxCount: 1 }]
            )
      )
      create(@UploadedFiles() files, @Body() dto: CreateAlbumDto) {
            const { picture } = files;
            return this.AlbumService.create(dto, picture[0])
      }

      @Put('/addTrack/:id')
      addTrack(@Param('id') id: ObjectId, @Param('trackId') trackId: ObjectId) {
            return this.AlbumService.addTrack(id, trackId);
      }

      @Delete(':id')
      delete(@Param('id') id: ObjectId) {
            return this.AlbumService.delete(id);
      }
}