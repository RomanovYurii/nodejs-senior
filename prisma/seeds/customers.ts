import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';

export const getCustomers = async (): Promise<
  Prisma.CustomerUpsertArgs['create'][]
> => [
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
  {
    id: '63735609-70c3-4f29-90ff-3f9308e10460',
    email: 'admin@site.com',
    password: await bcrypt.hash('yr_991020_admin', 10),
    role: 'ADMIN',
  },
  {
    id: '08fea605-d604-48ae-b68f-a80e702b7409',
    email: 'user@site.com',
    password: await bcrypt.hash('yr_991020_user', 10),
    role: 'USER',
  },
];
