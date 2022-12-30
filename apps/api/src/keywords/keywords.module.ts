import { Module } from '@nestjs/common';
import { Keyword } from './keywords.entity';
import { KeywordsService } from './keywords.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Keyword])],
  providers: [KeywordsService],
  exports: [KeywordsService],
})
export class KeywordsModule {}
