import { Injectable } from '@nestjs/common';
import { Keyword } from './keywords.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class KeywordsService {
  constructor(
    @InjectRepository(Keyword)
    private keywordsRepository: Repository<Keyword>,
  ) {}

  async getKeywordsByProduct(productId: number): Promise<Keyword[]> {
    const query = this.keywordsRepository
      .createQueryBuilder('k')
      .leftJoin('k.products', 'p')
      .andWhere('p.id = :productId', {
        productId,
      });

    return await query.getMany();
  }

  async getAndCreateKeywords(words: string[]): Promise<Keyword[]> {
    return Promise.all(
      words.map(
        async (word) =>
          (await this.keywordsRepository.findOne({ where: { word } })) ??
          (await this.keywordsRepository.save({ word })),
      ),
    );
  }
}
