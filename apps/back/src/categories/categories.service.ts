import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './categories.dto';
import { Category } from './categories.entity';
import { Product } from '../products/products.entity';
import { ProductDto } from '../products/products.dto';
import { ProductsService } from '../products/products.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async getCategories(): Promise<Category[]> {
    return this.categoriesRepository.find();
  }

  getRootsCategories(): Promise<Category[]> {
    return this.categoriesRepository.findBy({ parentId: null });
  }

  addCategory(newCategory: CreateCategoryDto): Promise<Category> {
    return this.categoriesRepository.save(newCategory);
  }

  async getProductByCateogrySlug(slug: string): Promise<ProductDto[]> {
    const category = await this.categoriesRepository.findOne({
      where: { slug },
    });
    const products = await this.productsRepository
      .createQueryBuilder('product')
      .innerJoin(
        'product.categories',
        'category',
        'category.id = :categoryId',
        { categoryId: category.id },
      )
      .getMany();
    return ProductsService.mapArrayToProductDto(products);
  }

  async getCategoriesByProduct(productId: number): Promise<Category[]> {
    const query = this.categoriesRepository
      .createQueryBuilder('c')
      .leftJoin('c.products', 'p')
      .andWhere('p.id = :productId', {
        productId,
      });

    return await query.getMany();
  }

  async findByIds(ids: number[]) {
    return await this.productsRepository.find({
      where: { id: In(ids) },
    });
  }
}
