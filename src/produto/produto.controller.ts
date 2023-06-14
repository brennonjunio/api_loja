import { Body, Controller, Get, Post } from '@nestjs/common';
import { produtoRepository } from './produto.repository';
import { CriaProdutoDTO } from 'src/produto/dto/CriaProduto.dto';

@Controller('produtos')
export class produtoController {
  constructor(private produtoRepository: produtoRepository) {}

  @Post()
  async criarProduto(@Body() dadosProduto: CriaProdutoDTO) {
    const produtoCadastrado = this.produtoRepository.salvarProd(dadosProduto);
    return produtoCadastrado;
  }
  @Get()
  async listarProdutos() {
    return this.produtoRepository.listar();
  }
}
