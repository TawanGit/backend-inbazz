import { PrismaService } from '../prisma.service';
import * as bcrypt from 'bcrypt';
// main.ts or in a Seeder
export async function createDefaultUser(prisma: PrismaService) {
  const defaultEmail = 'inbazz@hire.com';
  const existing = await prisma.user.findFirst({
    where: { email: defaultEmail },
  });

  const hashPassword = await bcrypt.hash('123', 10);

  if (!existing) {
    await prisma.user.create({
      data: {
        name: 'Inbazz',
        email: defaultEmail,
        password: hashPassword,
      },
    });

    console.log('✅ Default user created');
  }
}
