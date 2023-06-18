import { Type } from 'class-transformer';
import * as classValidator from 'class-validator';
export class CaracteristicaProdutoDTO {
  @classValidator.IsString()
  @classValidator.IsNotEmpty({
    message: 'Nome Não pode ser nulo',
  })
  nome: string;

  @classValidator.IsString()
  @classValidator.IsNotEmpty({
    message: 'Descricao Não pode ser nula',
  })
  descricao: string;
}

export class ImagemProdutoDTO {
  @classValidator.IsUrl(undefined, {
    message: 'Url Invalida',
  })
  url: string;
  @classValidator.IsString()
  @classValidator.IsNotEmpty({
    message: 'Descrição Da imagem não pode ser nula',
  })
  descricao: string;
}

export class CriaProdutoDTO {
  @classValidator.IsString()
  @classValidator.IsNotEmpty({
    message: 'Nome do produto não pode ser nulo',
  })
  nome: string;
  @classValidator.IsNumber({
    maxDecimalPlaces: 2,
    allowNaN: false,
    allowInfinity: false,
  })
  valor: number;
  @classValidator.IsNumber()
  @classValidator.Min(0, {
    message: 'Quantidade invalidade < 1',
  })
  quantidade: number;
  @classValidator.IsString()
  @classValidator.IsNotEmpty({
    message: 'Descrição do produto não pode ser vazia ',
  })
  @classValidator.MaxLength(1000, {
    message: 'Descrição não pode ter mais que 1000 caracteres',
  })
  descricao: string;

  @classValidator.ValidateNested()
  @classValidator.IsArray()
  @Type(() => CaracteristicaProdutoDTO)
  caracteristicas: CaracteristicaProdutoDTO[];

  @classValidator.ValidateNested()
  @classValidator.IsArray()
  @classValidator.ArrayMinSize(1)
  @Type(() => ImagemProdutoDTO)
  imagens: ImagemProdutoDTO[];

  @classValidator.IsString()
  @classValidator.IsNotEmpty({
    message: 'Categoria do produto não pode ser vazia',
  })
  categoria: string;
}
