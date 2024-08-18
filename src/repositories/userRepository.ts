import { User, NewUser } from '@models/User';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createNewUser(user: NewUser): Promise<User> {
  const newUser = await prisma.user.create({
    data: user
  });
  return newUser;
}
