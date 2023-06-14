import { Body, Controller, Get, Post } from '@nestjs/common';
import { produtoRepository } from './produto.repository';

@Controller('produtos')
export class produtoController {
  constructor(private produtoRepository: produtoRepository) {}

  @Post()
  async criarProduto(@Body() dadosProduto) {
    this.produtoRepository.salvarProd(dadosProduto);
    return dadosProduto;
  }
  @Get()
  async listarProdutos() {
    return this.produtoRepository.listar();
  }
}
