import { Category } from '../categories/entities/category.entity';
import { Color } from '../categories/entities/color.entity';
import { User } from '../users/entities/user.entity';
import { InitialSeend } from './initial-seed';

export const seedDatabase = async () => {
  // TODO Needs to purge data before seeding

  // Add user
  const user = await User.create({
    email: InitialSeend.email,
    password: InitialSeend.password,
  }).save();

  // Add colors to database
  for (const color of InitialSeend.colors) {
    await Color.create({
      hexCode: color,
    }).save();
  }

  await Category.create({
    color: await Color.findOne({ where: { hexCode: InitialSeend.colors[0] } }),
    name: 'Work',
    user: user,
  }).save();
};
