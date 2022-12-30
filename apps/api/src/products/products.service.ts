import { Inject, Injectable } from '@nestjs/common';
import { Product } from './products.entity';
import { Keyword } from '../keywords/keywords.entity';
import { Category } from '../categories/categories.entity';
import { CategoriesService } from '../categories/categories.service';
import { KeywordsService } from '../keywords/keywords.service';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductDto, CreateProductDto } from './products.dto';
import { Repository } from 'typeorm';

export interface getProductsOptions {
  categoryId?: number;
}

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    @InjectRepository(Keyword)
    private keywordsRepository: Repository<Keyword>,
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
    @Inject(CategoriesService)
    private categoriesService: CategoriesService,
    @Inject(KeywordsService)
    private keywordsService: KeywordsService,
  ) {}

  async getProducts(options: getProductsOptions): Promise<ProductDto[]> {
    let products;
    if (options.categoryId) {
      products = await this.getProductsByCategory(options.categoryId);
    } else {
      products = await this.productsRepository.find();
    }
    return ProductsService.mapArrayToProductDto(products);
  }

  async getProductById(id: number): Promise<ProductDto> {
    const product = await this.productsRepository.findOneBy({ id });
    product.categories = await this.categoriesService.getCategoriesByProduct(
      product.id,
    );
    product.keywords = await this.keywordsService.getKeywordsByProduct(
      product.id,
    );

    return ProductsService.mapToProductDto(product);
  }

  async getProductBySlug(slug: string): Promise<ProductDto> {
    const product = await this.productsRepository.findOneBy({ slug });
    product.categories = await this.categoriesService.getCategoriesByProduct(
      product.id,
    );
    product.keywords = await this.keywordsService.getKeywordsByProduct(
      product.id,
    );

    return ProductsService.mapToProductDto(product);
  }

  async addProduct(productParam: CreateProductDto): Promise<ProductDto> {
    const categories = await this.categoriesService.findByIds(
      productParam.categories,
    );

    const keywords = await this.keywordsService.getAndCreateKeywords(
      productParam.keywords,
    );

    const newProduct = {
      ...productParam,
      createDate: new Date(),
      updateDate: new Date(),
      categories,
      keywords,
    };

    const product = await this.productsRepository.save(newProduct);
    return ProductsService.mapToProductDto(product);
  }

  async updateProduct(productParam: ProductDto): Promise<ProductDto> {
    const categories = await this.categoriesRepository
      .createQueryBuilder('cat')
      .where('cat.id IN (:...categories)', {
        categories: productParam.categories,
      })
      .select('cat.id')
      .getMany();

    const keywords = await this.keywordsService.getAndCreateKeywords(
      productParam.keywords,
    );

    const product: Product = {
      ...productParam,
      createDate: new Date(),
      updateDate: new Date(),
      categories,
      keywords,
    };

    await this.productsRepository.save(product);
    return ProductsService.mapToProductDto(product);
  }

  static async mapToProductDto(product: Product): Promise<ProductDto> {
    const categories = product.categories
      ? product.categories.map((c) => c.id)
      : null;

    const keywords = product.keywords
      ? product.keywords.map((c) => c.word)
      : null;

    const productDto = {
      ...product,
      categories,
      keywords,
    };
    return productDto;
  }

  async getProductsByCategory(categoryId: number): Promise<Product[]> {
    return this.productsRepository
      .createQueryBuilder('product')
      .innerJoin(
        'product.categories',
        'category',
        'category.id = :categoryId',
        { categoryId },
      )
      .getMany();
  }

  static async mapArrayToProductDto(
    products: Product[],
  ): Promise<ProductDto[]> {
    return Promise.all(products.map(async (p) => this.mapToProductDto(p)));
  }
}
