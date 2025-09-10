import dataSource from '../db/data-source';
import { User } from './users/user.entity';

async function seed() {
  await dataSource.initialize();
  const userRepo = dataSource.getRepository(User);
  await userRepo.save([
    { name: 'Alice', email: 'alice@example.com' },
    { name: 'Bob', email: 'bob@example.com' },
  ]);
  await dataSource.destroy();
}

seed().then(() => {
  console.log('Seeding complete!');
}).catch((err) => {
  console.error('Seeding failed:', err);
});