import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { createDefaultUser } from './database/seeders/CreateDefaultUser';
import { createDefaultCategory } from './database/seeders/CreateDefaultCategory';
import { PrismaService } from './database/prisma.service';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const prisma = app.get(PrismaService);
  await createDefaultUser(prisma);
  await createDefaultCategory(prisma);
  const config = new DocumentBuilder()
    .setTitle('Todo Api')
    .setDescription('API documentation with Scalar')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  app.use(
    '/docs',
    apiReference({
      content: document,
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
  console.log(`Consulte a documentação da API em /docs`);
}
bootstrap();
