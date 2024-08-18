import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function saveKey(key: string) {
  const newKey = await prisma.key.create({ data: { key } });
  return newKey;
}

export async function findKey(key: string) {
  const data = await prisma.key.findFirst({
    where: { key }
  });
  return data;
}
