import { Module } from '@nestjs/common';
import { TrackController } from './track.controller';
import { TrackSerevice } from './track.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Track, TrackSchema } from './schemas/track.schema';
import { Comment, CommentSchema } from './schemas/comment.schema';
import { FileModule } from 'src/file/file.module';
import { FileService } from 'src/file/file.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Track.name, schema: TrackSchema }]),
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
  ],
  controllers: [TrackController],
  providers: [TrackSerevice, FileService],
})
export class TrackModule {}
