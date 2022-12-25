import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Query,
  Body,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductDto, CreateProductDto } from './products.dto';
import { ApiCreatedResponse, ApiTags, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';

@ApiTags('Products')
@Controller('api/products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  @ApiCreatedResponse({
    description: 'All products.',
    type: [ProductDto],
  })
  @ApiQuery({
    name: 'category',
    required: false,
    type: String,
  })
  async getProducts(
    @Query('category') categoryId?: number,
  ): Promise<ProductDto[]> {
    return this.productsService.getProducts({
      categoryId: categoryId,
    });
  }

  @Get(':id')
  @ApiCreatedResponse({
    description: 'Product by id.',
    type: ProductDto,
  })
  async getProductById(@Param('id') id: number): Promise<ProductDto> {
    return this.productsService.getProductById(id);
  }

  @Get('slug/:slug')
  @ApiCreatedResponse({
    description: 'Product by slug.',
    type: ProductDto,
  })
  async getProductBySlug(@Param('slug') slug: string): Promise<ProductDto> {
    return this.productsService.getProductBySlug(slug);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Post()
  async addProducts(
    @Body() productParam: CreateProductDto,
  ): Promise<ProductDto> {
    return this.productsService.addProduct(productParam);
  }

  @UseGuards(JwtAuthGuard)
  @Roles('admin')
  @Patch()
  async updateProducts(@Body() productParam: ProductDto): Promise<ProductDto> {
    return this.productsService.updateProduct(productParam);
  }
}
