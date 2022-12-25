import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { Product } from './products.entity';
import { Category } from '../categories/categories.entity';
import { Keyword } from '../keywords/keywords.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesModule } from '../categories/categories.module';
import { KeywordsModule } from '../keywords/keywords.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, Category, Keyword]),
    CategoriesModule,
    KeywordsModule,
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
