import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../lib/generated/prisma/client';

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error('DATABASE_URL must be set to connect to PostgreSQL.');
}

const adapter = new PrismaPg({ connectionString: databaseUrl });

const prisma = new PrismaClient({
  adapter,
});

const genres = [
  { name: 'Art', icon: 'Film', showOnMenu: false },
  { name: 'Biography', icon: 'UserPen', showOnMenu: true },
  { name: 'Business', icon: 'BriefcaseBusiness', showOnMenu: false },
  { name: 'Children', icon: 'Baby', showOnMenu: false },
  { name: 'Finance', icon: 'Coins', showOnMenu: false },
  { name: 'Comics', icon: 'Smile', showOnMenu: false },
  { name: 'Cooking', icon: 'CookingPot', showOnMenu: false },
  { name: 'Thriller', icon: 'HatGlasses', showOnMenu: true },
  { name: 'Engineering', icon: 'ToolCase', showOnMenu: false },
  { name: 'Entertainment', icon: 'TvMinimalPlay', showOnMenu: false },
  { name: 'Fantasy', icon: 'Sparkles', showOnMenu: false },
  { name: 'Fiction', icon: 'Rocket', showOnMenu: true },
  { name: 'Drama', icon: 'Drama', showOnMenu: false },
  { name: 'Health', icon: 'Cross', showOnMenu: false },
  { name: 'History', icon: 'NotebookPen', showOnMenu: true },
  { name: 'Horror', icon: 'Skull', showOnMenu: false },
  { name: 'Religion', icon: 'Tent', showOnMenu: false },
  { name: 'Romance', icon: 'BookHeart', showOnMenu: true },
  { name: 'Science', icon: 'Microscope', showOnMenu: false },
  { name: 'Sports', icon: 'Volleyball', showOnMenu: false },
  { name: 'Technology', icon: 'Cpu', showOnMenu: false },
  { name: 'Travel', icon: 'BriefcaseConveyorBelt', showOnMenu: false },
  { name: 'Education', icon: 'GraduationCap', showOnMenu: false },
  { name: 'Psychology', icon: 'Brain', showOnMenu: false },
  { name: 'Medical', icon: 'BriefcaseMedical', showOnMenu: false },
];

async function main() {
  for (const genre of genres) {
    await prisma.genre.upsert({
      where: { name: genre.name },
      update: genre,
      create: genre,
    });
  }

  console.log('Database seeded successfully with genres.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
