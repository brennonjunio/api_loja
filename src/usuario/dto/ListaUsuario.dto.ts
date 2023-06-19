export class ListaUsuarioDto {
  constructor(readonly id: string, readonly nome: string) {}
}

export class retornoUsuarioAtualizadoDTO {
  constructor(readonly id: string, readonly nome: string, email: string) {}
}

//DTO criado para aparecer somente esses dados na resposta do cliente, não é interessante aparecer tudo para o cliente
