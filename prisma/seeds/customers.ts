import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';

export const getCustomers = async (): Promise<
  Prisma.CustomerUpsertArgs['create'][]
> => {
  return [
    {
      id: '9e391faf-64b2-4d4c-b879-463532920fd3',
      email: 'user@gmail.com',
      password: await bcrypt.hash('randow-password', 10),
    },
    {
      id: '9e391faf-64b2-4d4c-b879-463532920fd4',
      email: 'user2@gmail.com',
      password: await bcrypt.hash('randow-password', 10),
    },
  ];
};
