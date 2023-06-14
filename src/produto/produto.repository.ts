import { Injectable } from '@nestjs/common';

@Injectable()
export class produtoRepository {
  private produtos = [];
  async salvarProd(produto) {
    this.produtos.push(produto);
    console.log('produtos>>>', this.produtos);
  }
}
