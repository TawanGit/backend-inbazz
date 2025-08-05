import { PrismaService } from '../prisma.service';

// main.ts or in a Seeder
export async function createDefaultCategory(prisma: PrismaService) {
  const defaultCategoryName = 'General';

  const existing = await prisma.category.findFirst({
    where: { name: defaultCategoryName },
  });

  if (!existing) {
    await prisma.category.create({
      data: {
        name: defaultCategoryName,
        description:
          'Default category for tasks without specific classification',
      },
    });

    console.log('✅ Default category created');
  }
}
