import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';
export class CaracteristicaProdutoDTO {
  @IsString()
  @IsNotEmpty({
    message: 'Nome Não pode ser nulo',
  })
  nome: string;

  @IsString()
  @IsNotEmpty({
    message: 'Descricao Não pode ser nula',
  })
  descricao: string;
}

export class ImagemProdutoDTO {
  @IsUrl(undefined, {
    message: 'Url Invalida',
  })
  url: string;
  @IsString()
  @IsNotEmpty({
    message: 'Descrição Da imagem não pode ser nula',
  })
  descricao: string;
}

export class CriaProdutoDTO {
  @IsString()
  @IsNotEmpty({
    message: 'Nome do produto não pode ser nulo',
  })
  nome: string;
  @IsNumber({
    maxDecimalPlaces: 2,
    allowNaN: false,
    allowInfinity: false,
  })
  valor: number;
  @IsNumber()
  @Min(0, {
    message: 'Quantidade invalidade < 1',
  })
  quantidade: number;
  @IsString()
  @IsNotEmpty({ message: 'Descrição do produto não pode ser vazia ' })
  @MaxLength(1000, {
    message: 'Descrição não pode ter mais que 1000 caracteres',
  })
  descricao: string;

  @ValidateNested()
  @IsArray()
  @Type(() => CaracteristicaProdutoDTO)
  caracteristicas: CaracteristicaProdutoDTO[];

  @ValidateNested()
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => ImagemProdutoDTO)
  imagens: ImagemProdutoDTO[];

  @IsString()
  @IsNotEmpty({ message: 'Categoria do produto não pode ser vazia' })
  categoria: string;
}
