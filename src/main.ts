import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  /*Para o class-validator resolver as dependências que só o Nest sabe resolver,
   precisamos passar o mesmo contêiner de resolução de dependências que o Nest usa.
    Portanto, no useContainer(), basta passarmos uma referência para o root module da nossa aplicação.
   A partir da raiz da aplicação, ele conseguirá resolver qualquer dependência que esteja abaixo dessa raiz.
   Assim, o class-validator conseguirá resolver suas dependências e das classes nele contidas do mesmo jeito que o Nest resolve. 
   Ademais, vamos passar um segundo parâmetro,
    definindo que o class-validator deve usar o seu próprio contêiner para tentar solucionar a dependência, caso não consiga resolvê-la como o Nest:*/
  await app.listen(3001);
}
bootstrap();
