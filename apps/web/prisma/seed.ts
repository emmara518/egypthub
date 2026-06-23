import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash('EgyptHub@2026', 10);

  // Admin
  const admin = await prisma.user.upsert({
    where: { email: 'admin@egypthub.com' },
    update: {},
    create: { email: 'admin@egypthub.com', passwordHash: password, name: 'Admin', role: Role.ADMIN },
  });

  // Ambassador 1
  const amb1User = await prisma.user.upsert({
    where: { email: 'karim@egypthub.com' },
    update: {},
    create: { email: 'karim@egypthub.com', passwordHash: password, name: 'Karim Mansour', role: Role.AMBASSADOR, phone: '+201001234567' },
  });
  await prisma.ambassador.upsert({
    where: { userId: amb1User.id },
    update: {},
    create: { userId: amb1User.id, name: 'Karim Mansour', nameEn: 'Karim Mansour', city: 'sharm-el-sheikh', bio: 'Dive instructor with 10 years of experience in the Red Sea.', specialties: ['Diving', 'Snorkeling'], rating: 4.8 },
  });

  // Ambassador 2
  const amb2User = await prisma.user.upsert({
    where: { email: 'nadia@egypthub.com' },
    update: {},
    create: { email: 'nadia@egypthub.com', passwordHash: password, name: 'Nadia Omar', role: Role.AMBASSADOR, phone: '+201009876543' },
  });
  await prisma.ambassador.upsert({
    where: { userId: amb2User.id },
    update: {},
    create: { userId: amb2User.id, name: 'Nadia Omar', nameEn: 'Nadia Omar', city: 'cairo', bio: 'Certified tour guide specializing in Islamic and Coptic Cairo.', specialties: ['History', 'Architecture'], rating: 4.9 },
  });

  // Partner 1
  const p1User = await prisma.user.upsert({
    where: { email: 'info@redsea-divers.com' },
    update: {},
    create: { email: 'info@redsea-divers.com', passwordHash: password, name: 'Red Sea Divers', role: Role.PARTNER, phone: '+201155554444' },
  });
  await prisma.partner.upsert({
    where: { userId: p1User.id },
    update: {},
    create: { userId: p1User.id, name: 'Red Sea Divers', nameEn: 'Red Sea Divers', category: 'Dive Center', city: 'sharm-el-sheikh', description: 'Premium diving center in Sharm El Sheikh offering PADI courses.', services: ['Diving Courses', 'Equipment Rental', 'Boat Trips'], contactEmail: 'info@redsea-divers.com', contactPhone: '+201155554444', rating: 4.7, status: 'approved' },
  });

  // Partner 2
  const p2User = await prisma.user.upsert({
    where: { email: 'book@catara ct.com' },
    update: {},
    create: { email: 'book@cataract.com', passwordHash: password, name: 'Old Cataract Aswan', role: Role.PARTNER, phone: '+201977776666' },
  });
  await prisma.partner.upsert({
    where: { userId: p2User.id },
    update: {},
    create: { userId: p2User.id, name: 'Old Cataract Aswan', nameEn: 'Old Cataract Aswan', category: 'Hotel', city: 'aswan', description: 'Historic luxury hotel on the banks of the Nile in Aswan.', services: ['Luxury Rooms', 'Spa', 'Fine Dining', 'Nile Cruises'], contactEmail: 'book@cataract.com', contactPhone: '+201977776666', rating: 4.9, featured: true, status: 'approved' },
  });

  console.log('Seed complete:');
  console.log(`  Admin: admin@egypthub.com`);
  console.log(`  Ambassadors: karim@egypthub.com, nadia@egypthub.com`);
  console.log(`  Partners: info@redsea-divers.com, book@cataract.com`);
  console.log(`  Password (all): EgyptHub@2026`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
