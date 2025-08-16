import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';
import { PrismaService } from './modules/database/prisma.service';
import { createDefaultUser } from './modules/database/seeders/CreateDefaultUser';
import { createDefaultCategory } from './modules/database/seeders/CreateDefaultCategory';

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
