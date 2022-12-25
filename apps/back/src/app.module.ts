import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesModule } from './roles/roles.module';
import { UsersModule } from './users/users.module';
import { KeywordsModule } from './keywords/keywords.module';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { AuthModule } from './auth/auth.module';
import { User } from './users/users.entity';
import { Role } from './roles/roles.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'eshoponline_user',
      password: 'password',
      database: 'test',
      entities:
        process.env.NODE_ENV === 'test'
          ? [__dirname + 'src/**/*.entity.ts']
          : [__dirname + 'dist/**/*.js'],
      synchronize: true,
      keepConnectionAlive: true,
      autoLoadEntities: true,
    }),
    RolesModule,
    UsersModule,
    RolesModule,
    ProductsModule,
    CategoriesModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
