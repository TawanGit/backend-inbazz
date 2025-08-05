import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { createDefaultUser } from './database/seeders/CreateDefaultUser';
import { createDefaultCategory } from './database/seeders/CreateDefaultCategory';
import { PrismaService } from './database/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const prisma = app.get(PrismaService);
  await createDefaultUser(prisma);
  await createDefaultCategory(prisma);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
